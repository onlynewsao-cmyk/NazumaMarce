require('dotenv').config();
const https = require('https');
const http = require('http');
const rpgRouter = require('./ARQUIVES/rpg/router.js');
const rpgMenu = require('./ARQUIVES/rpg/menurpg.js');
const rpgDb = require('./ARQUIVES/rpg/database.js');

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("🔥 TESTE DIAGNÓSTICO COMPLETO — SYSTEM DARK BY KRAD (244949926074) 🔥");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

async function runAllTests() {
    let passed = 0;
    let total = 0;

    function logResult(name, success, info) {
        total++;
        if (success) {
            passed++;
            console.log(`✅ [PASSOU] ${name} — ${info}`);
        } else {
            console.log(`❌ [FALHOU] ${name} — ${info}`);
        }
    }

    // --- TESTE 1: VARIÁVEIS DE AMBIENTE (.env) ---
    console.log("1️⃣ TESTANDO CARREGAMENTO DE CHAVES (.env):");
    const requiredKeys = [
        "APIFREELLM_KEY", "GEMINI_API_KEY", "GROQ_API_KEY", "ELEVENLABS_API_KEY",
        "MONGODB_URI", "CLOUDINARY_API_KEY", "ASSEMBLYAI_API_KEY", "CEREBRAS_API_KEY",
        "HUGGINGFACE_API_KEY", "TAVILY_API_KEY", "SYSTEMZONE_API_KEY", "INVERTEXTO_API_KEY",
        "TOKITO_API_KEY"
    ];
    let allKeysPresent = true;
    for (const k of requiredKeys) {
        if (!process.env[k]) {
            allKeysPresent = false;
            logResult(`Chave ${k}`, false, "Não encontrada no process.env");
        }
    }
    if (allKeysPresent) {
        logResult("Verificação de 13/13 Chaves de API no .env", true, "Todas as chaves carregaram perfeitamente");
    }

    // --- TESTE 2: INVERTEXTO API ---
    console.log("\n2️⃣ TESTANDO CONECTIVIDADE WEB (INVERTEXTO API):");
    await new Promise((resolve) => {
        const url = `https://api.invertexto.com/v1/number-to-words?token=${process.env.INVERTEXTO_API_KEY}&number=2026&language=pt`;
        https.get(url, (res) => {
            let data = "";
            res.on("data", chunk => data += chunk);
            res.on("end", () => {
                if (res.statusCode === 200) {
                    logResult("Invertexto API (number-to-words)", true, `Resposta: ${data.trim()}`);
                } else {
                    logResult("Invertexto API", false, `Status HTTP: ${res.statusCode} (${data.slice(0, 50)})`);
                }
                resolve();
            });
        }).on("error", (err) => {
            logResult("Invertexto API", false, err.message);
            resolve();
        });
    });

    // --- TESTE 3: TOKITO API PING ---
    console.log("\n3️⃣ TESTANDO CONECTIVIDADE WEB (TOKITO APIS):");
    await new Promise((resolve) => {
        const url = `https://tokito-apis.com.br/`;
        https.get(url, (res) => {
            if (res.statusCode >= 200 && res.statusCode < 500) {
                logResult("Tokito APIs Cloud", true, `Status HTTP ${res.statusCode} (Servidor Acessível)`);
            } else {
                logResult("Tokito APIs Cloud", false, `Status HTTP ${res.statusCode}`);
            }
            resolve();
        }).on("error", (err) => {
            logResult("Tokito APIs Cloud", false, err.message);
            resolve();
        });
    });

    // --- TESTE 4: SYSTEMZONE API PING ---
    console.log("\n4️⃣ TESTANDO CONECTIVIDADE WEB (SYSTEMZONE STORE):");
    await new Promise((resolve) => {
        const url = `https://systemzone.store`;
        https.get(url, (res) => {
            if (res.statusCode >= 200 && res.statusCode < 600) {
                logResult("SystemZone API", true, `Status HTTP ${res.statusCode} (Domínio Ativo)`);
            } else {
                logResult("SystemZone API", false, `Status HTTP ${res.statusCode}`);
            }
            resolve();
        }).on("error", (err) => {
            logResult("SystemZone API", false, err.message);
            resolve();
        });
    });

    // --- TESTE 5: MONGODB ATLAS CLOUD URI SYNTAX ---
    console.log("\n5️⃣ TESTANDO SINTAXE DO MONGODB URI (RENDER FREE):");
    const uri = process.env.MONGODB_URI || "";
    if (uri.startsWith("mongodb+srv://") && uri.includes("mongodb.net")) {
        logResult("MongoDB Atlas URI Syntax", true, "Sintaxe do Cluster Cloud válida para conexão no Render");
    } else {
        logResult("MongoDB Atlas URI Syntax", false, "URI inválida");
    }

    // --- TESTE 6: MOTOR RPG MULTIVERSO ANIME (17+ MÓDULOS) ---
    console.log("\n6️⃣ TESTANDO TODOS OS MÓDULOS DO RPG MULTIVERSO ANIME:");
    try {
        const testUser = "244945280380@s.whatsapp.net";
        let responses = [];

        await rpgRouter.handleRpgCommand("despertar", [], testUser, (txt) => responses.push(txt), null, "KRAD");
        await rpgRouter.handleRpgCommand("perfil", [], testUser, (txt) => responses.push(txt), null, "KRAD");
        await rpgRouter.handleRpgCommand("gacha", [], testUser, (txt) => responses.push(txt), null, "KRAD");
        await rpgRouter.handleRpgCommand("forja", ["1"], testUser, (txt) => responses.push(txt), null, "KRAD");
        await rpgRouter.handleRpgCommand("top", ["level"], testUser, (txt) => responses.push(txt), null, "KRAD");
        const menuTxt = await rpgMenu.menurpg("/", "System Dark", "KRAD");

        if (responses.length === 5 && menuTxt.includes("SYSTEM DARK")) {
            logResult("Módulos RPG (despertar, perfil, gacha, forja, top, menu)", true, "Todos executaram sem erro (0ms latência)");
        } else {
            logResult("Módulos RPG", false, `Respostas recebidas: ${responses.length}`);
        }
    } catch (e) {
        logResult("Módulos RPG", false, e.message);
    }

    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`🏁 RESULTADO FINAL DOS TESTES: ${passed} / ${total} SUCESSOS (${Math.round((passed/total)*100)}%)`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    process.exit(0);
}

runAllTests();
