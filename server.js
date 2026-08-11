require('dotenv').config();
const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const { syncToMongoDB, restoreFromMongoDB } = require('./ARQUIVES/rpg/mongodb.js');

const app = express();
const PORT = process.env.PORT || 3000;

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

app.get('/', (req, res) => {
    res.status(200).send(`
        <html>
            <head><title>System Dark - Online 24/7</title></head>
            <body style="background:#0f172a; color:#f8fafc; font-family:sans-serif; text-align:center; padding:50px;">
                <h1 style="color:#f97316;">🔥 SYSTEM DARK BY KRAD (ONLINE 24/7) 🔥</h1>
                <p>Número do Bot: <strong>+244 949 926 074</strong> | Dono: KRAD (+244 945 280 380)</p>
                <p>Servidor Web ativo para <strong>UptimeRobot / Render Free Tier</strong>.</p>
                <hr style="border-color:#334155; max-width:600px;">
                <h3>🛡️ Todos os 17+ Módulos RPG Multiverso Anime estão Integrados!</h3>
                <p><a href="/api/list" style="color:#38bdf8;">Ver Lista Completa de APIs Integradas</a></p>
            </body>
        </html>
    `);
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

app.listen(PORT, async () => {
    console.log(`🌐 [RENDER FREE / UPTIMEROBOT] Servidor Web de System Dark ativo na porta ${PORT}!`);

    await restoreFromMongoDB();

    setInterval(async () => {
        await syncToMongoDB();
    }, 15 * 60 * 1000);

    function launchWhatsAppBot() {
        console.log("⚡ [SYSTEM DARK] Iniciando o processo do WhatsApp Bot (ARQUIVES/connect.js)...");
        const child = spawn("node", [path.join(__dirname, "ARQUIVES/connect.js")], {
            stdio: "inherit",
            env: { ...process.env, NODE_ENV: "production" }
        });

        child.on("close", (code) => {
            console.warn(`⚠️ [SYSTEM DARK] Processo do WhatsApp finalizou com código ${code}. Reiniciando em 5 segundos...`);
            setTimeout(launchWhatsAppBot, 5000);
        });
    }

    launchWhatsAppBot();
});
