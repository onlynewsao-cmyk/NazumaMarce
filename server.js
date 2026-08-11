require('dotenv').config();
const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const { syncToMongoDB, restoreFromMongoDB } = require('./ARQUIVES/rpg/mongodb.js');
const auth = require('./ARQUIVES/dashboard/auth.js');
const dashboardUI = require('./ARQUIVES/dashboard/html.js');
const rpgDb = require('./ARQUIVES/rpg/database.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cookie parser manual simples sem precisar instalar dependência extra
function parseCookies(req) {
    const list = {};
    const rc = req.headers.cookie;
    if (rc) {
        rc.split(';').forEach(cookie => {
            const parts = cookie.split('=');
            list[parts.shift().trim()] = decodeURI(parts.join('='));
        });
    }
    return list;
}

// Middleware de verificação de autenticação
function requireAuth(req, res, next) {
    const cookies = parseCookies(req);
    const token = cookies.auth_token || req.headers.authorization;
    if (auth.verifyToken(token)) {
        req.userToken = token;
        return next();
    }
    res.redirect('/login');
}

// Lista de APIs e Chaves Integradas (System Dark by KRAD)
const SYSTEM_APIS = {
    "botName": "System Dark",
    "author": "KRAD",
    "botNumber": "244949926074",
    "ownerNumber": "244945280380",
    "apis": [
        { "name": "API Free LLM", "env": "APIFREELLM_KEY", "key": process.env.APIFREELLM_KEY || "apf_lxor1g8l885...a40q2brd", "purpose": "Inteligência Artificial & LLM" },
        { "name": "Google Gemini AI", "env": "GEMINI_API_KEY", "key": process.env.GEMINI_API_KEY || "AQ.Ab8RN6LMM...[CONFIGURADO_NO_RENDER]", "purpose": "Processamento e IA Multimodal" },
        { "name": "Groq AI Cloud", "env": "GROQ_API_KEY", "key": process.env.GROQ_API_KEY || "gsk_BjXo2aQ...[CONFIGURADO_NO_RENDER]", "purpose": "Respostas Ultrarrápidas de IA" },
        { "name": "ElevenLabs Speech", "env": "ELEVENLABS_API_KEY", "key": process.env.ELEVENLABS_API_KEY || "sk_d0a9b2...[CONFIGURADO_NO_RENDER]", "purpose": "Geração de Vozes e TTS" },
        { "name": "MongoDB Atlas Cloud", "env": "MONGODB_URI", "key": process.env.MONGODB_URI || "mongodb+srv://darkbot:****@cluster0.yzpwymq.mongodb.net/?appName=Cluster0", "purpose": "Persistência 24/7 na Nuvem Render Free" },
        { "name": "Cloudinary Media", "env": "CLOUDINARY_API_KEY", "key": process.env.CLOUDINARY_API_KEY || "Key: 121927... (Cloud: dvnmvvego)", "purpose": "Hospedagem de Imagens e Figurinhas" },
        { "name": "AssemblyAI Audio", "env": "ASSEMBLYAI_API_KEY", "key": process.env.ASSEMBLYAI_API_KEY || "d23b7206fbfe...91b89e5", "purpose": "Transcrição de Áudios no WhatsApp" },
        { "name": "Cerebras AI", "env": "CEREBRAS_API_KEY", "key": process.env.CEREBRAS_API_KEY || "csk-jwpct336...phr", "purpose": "Aceleração Lógica IA" },
        { "name": "HuggingFace Hub", "env": "HUGGINGFACE_API_KEY", "key": process.env.HUGGINGFACE_API_KEY || "hf_jYdgj...[CONFIGURADO_NO_RENDER]", "purpose": "Modelos Open-Source de IA" },
        { "name": "Tavily Search API", "env": "TAVILY_API_KEY", "key": process.env.TAVILY_API_KEY || "tvly-dev-yAXF...6UQ3xsmk", "purpose": "Pesquisa Web em Tempo Real" },
        { "name": "SystemZone API", "env": "SYSTEMZONE_API_KEY", "key": process.env.SYSTEMZONE_API_KEY || "freekey (https://systemzone.store)", "purpose": "APIs Gerais e Ferramentas" },
        { "name": "Invertexto API", "env": "INVERTEXTO_API_KEY", "key": process.env.INVERTEXTO_API_KEY || "6117|oJqDz5g3Uf9...rVEV", "purpose": "Ferramentas de Linguagem e CEP" }
    ]
};

// Estado global do Bot gerendiado com o processo filho
let botChildProcess = null;
let currentBotStatus = {
    connected: false,
    pairCode: null,
    defaultNumber: "244949926074",
    lastPairRequest: 0
};

// === ROTAS DE AUTENTICAÇÃO E LOGIN ===
app.get('/login', (req, res) => {
    const cookies = parseCookies(req);
    if (auth.verifyToken(cookies.auth_token)) {
        return res.redirect('/dashboard');
    }
    res.status(200).send(dashboardUI.getLoginPage());
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const result = auth.login(username, password);
    if (result.success) {
        res.setHeader('Set-Cookie', `auth_token=${result.token}; Path=/; HttpOnly; Max-Age=86400`);
        return res.redirect('/dashboard');
    }
    res.status(401).send(dashboardUI.getLoginPage(result.reason));
});

app.get('/logout', (req, res) => {
    const cookies = parseCookies(req);
    if (cookies.auth_token) {
        auth.logout(cookies.auth_token);
    }
    res.setHeader('Set-Cookie', `auth_token=; Path=/; Max-Age=0`);
    res.redirect('/login');
});

// === ROTA PRINCIPAL DO PAINEL DE CONTROLE (/dashboard) ===
app.get('/dashboard', requireAuth, (req, res) => {
    const mem = process.memoryUsage();
    const ramUsage = `${Math.round(mem.rss / 1024 / 1024)} MB`;
    const uptimeSec = Math.round(process.uptime());
    const uptimeFormatted = `${Math.floor(uptimeSec / 3600)}h ${Math.floor((uptimeSec % 3600) / 60)}m`;

    const statusData = {
        ...currentBotStatus,
        ramUsage,
        uptimeFormatted,
        mongoStatus: process.env.MONGODB_URI ? "Online (Atlas Cloud) ☁️" : "Offline (Apenas SQLite Local)"
    };

    const allUsers = rpgDb.getAllUsers();
    const totalBerries = allUsers.reduce((sum, u) => sum + (u.berries || 0), 0);
    const allGuilds = rpgDb.getAllGuilds();
    const activeRaid = rpgDb.getActiveRaid();

    const rpgStats = {
        totalUsers: allUsers.length,
        totalBerries,
        totalGuilds: allGuilds.length,
        activeRaid
    };

    res.status(200).send(dashboardUI.getDashboardPage(statusData, SYSTEM_APIS.apis, rpgStats));
});

// === ENDPOINTS API DO PAINEL ===
app.post('/api/paircode', requireAuth, async (req, res) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber || String(phoneNumber).length < 8) {
        return res.status(400).json({ success: false, error: "Número de telefone inválido" });
    }

    const cleaned = String(phoneNumber).replace(/\D/g, "");
    currentBotStatus.defaultNumber = cleaned;
    currentBotStatus.lastPairRequest = Date.now();

    // 1. Envia pedido via IPC ao processo Baileys (ou gera código de demonstração/ativo se em ambiente Web)
    if (botChildProcess && botChildProcess.send) {
        botChildProcess.send({ type: "REQUEST_PAIR_CODE", phoneNumber: cleaned });
    }

    // 2. Simula ou consulta o arquivo de resposta do Baileys
    const pairFile = path.join(__dirname, "ARQUIVES/pair_status.json");
    let code = "KRAD-2026"; // Código de teste ou gerado

    if (fs.existsSync(pairFile)) {
        try {
            const p = JSON.parse(fs.readFileSync(pairFile, "utf8"));
            if (p.code) code = p.code;
        } catch (e) {}
    } else {
        // Gera um código de 8 caracteres formatado XXXX-YYYY para pareamento
        const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase() + "-" +
                          Math.random().toString(36).substring(2, 6).toUpperCase();
        code = randomHex;
        fs.writeFileSync(pairFile, JSON.stringify({ code, phoneNumber: cleaned, timestamp: Date.now() }), "utf8");
    }

    currentBotStatus.pairCode = code;
    res.status(200).json({ success: true, pairCode: code, phoneNumber: cleaned });
});

app.post('/api/admin-action', requireAuth, async (req, res) => {
    const { action } = req.body;

    if (action === "backup") {
        await syncToMongoDB();
        return res.status(200).json({ success: true, message: "Backup sincronizado no MongoDB Cloud com sucesso!" });
    }

    if (action === "raid-reset") {
        rpgDb.saveActiveRaid({
            id: Date.now(),
            boss_name: "Kaido Forma Dragão Colossal",
            anime: "One Piece",
            hp: 100000,
            max_hp: 100000,
            active: true,
            attackers: {}
        });
        return res.status(200).json({ success: true, message: "Raid Mundial de Kaido acionada com 100.000 HP!" });
    }

    if (action === "restart") {
        if (botChildProcess) {
            botChildProcess.kill("SIGTERM");
        }
        return res.status(200).json({ success: true, message: "Processo do WhatsApp Bot reiniciado!" });
    }

    res.status(400).json({ success: false, error: "Ação inválida" });
});

// === ENDPOINTS PÚBLICOS DE MONITORAMENTO ===
app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/ping', (req, res) => {
    res.status(200).json({
        status: "online",
        bot: "System Dark",
        author: "KRAD",
        bot_number: "244949926074",
        uptime: process.uptime(),
        timestamp: Date.now()
    });
});

app.get('/api/list', (req, res) => {
    res.status(200).json(SYSTEM_APIS);
});

// Inicialização do Servidor Web
app.listen(PORT, async () => {
    console.log(`🌐 [RENDER FREE / DAHBOARD] Servidor Web de System Dark ativo na porta ${PORT}!`);
    console.log(`🔐 Acesse o painel de administração em http://0.0.0.0:${PORT}/login (User: darknet | Senha: DarkNet@2026)`);

    await restoreFromMongoDB();

    setInterval(async () => {
        await syncToMongoDB();
    }, 15 * 60 * 1000);

    function launchWhatsAppBot() {
        console.log("⚡ [SYSTEM DARK] Iniciando o processo do WhatsApp Bot (ARQUIVES/connect.js)...");
        const child = spawn("node", [path.join(__dirname, "ARQUIVES/connect.js")], {
            stdio: ["inherit", "inherit", "inherit", "ipc"],
            env: { ...process.env, NODE_ENV: "production" }
        });

        child.on("message", (msg) => {
            if (msg && msg.type === "STATUS_UPDATE") {
                currentBotStatus.connected = !!msg.connected;
            }
            if (msg && msg.type === "PAIR_CODE_RESULT") {
                currentBotStatus.pairCode = msg.code;
            }
        });

        child.on("close", (code) => {
            console.warn(`⚠️ [SYSTEM DARK] Processo do WhatsApp finalizou com código ${code}. Reiniciando em 5 segundos...`);
            setTimeout(launchWhatsAppBot, 5000);
        });

        botChildProcess = child;
    }

    launchWhatsAppBot();
});
