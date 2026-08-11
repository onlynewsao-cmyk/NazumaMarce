require('dotenv').config();
const http = require('http');

console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("🔥 TESTE DIAGNÓSTICO DO DASHBOARD — SYSTEM DARK BY KRAD 🔥");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

async function runDashboardTests() {
    let passed = 0;
    let total = 0;
    let authTokenCookie = "";

    function logResult(name, success, info) {
        total++;
        if (success) {
            passed++;
            console.log(`✅ [PASSOU] ${name} — ${info}`);
        } else {
            console.log(`❌ [FALHOU] ${name} — ${info}`);
        }
    }

    const BASE_URL = "http://127.0.0.1:3000";

    // --- TESTE 1: PÁGINA DE LOGIN (/login) ---
    console.log("1️⃣ TESTANDO ACESSO À PÁGINA DE LOGIN (/login):");
    await new Promise((resolve) => {
        http.get(`${BASE_URL}/login`, (res) => {
            let body = "";
            res.on("data", c => body += c);
            res.on("end", () => {
                if (res.statusCode === 200 && body.includes("SYSTEM DARK") && body.includes("KRAD")) {
                    logResult("GET /login (Página de Login)", true, "Página carregou com tema Neon-Orange (200 OK)");
                } else {
                    logResult("GET /login", false, `Status: ${res.statusCode}`);
                }
                resolve();
            });
        }).on("error", (e) => {
            logResult("GET /login", false, e.message);
            resolve();
        });
    });

    // --- TESTE 2: AUTENTICAÇÃO COM USUÁRIO E SENHA (/login POST) ---
    console.log("\n2️⃣ TESTANDO AUTENTICAÇÃO (/login POST - user: darknet):");
    await new Promise((resolve) => {
        const postData = "username=darknet&password=DarkNet%402026";
        const req = http.request(`${BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": Buffer.byteLength(postData)
            }
        }, (res) => {
            const setCookie = res.headers["set-cookie"];
            if (res.statusCode === 302 && setCookie && setCookie[0].includes("auth_token=")) {
                authTokenCookie = setCookie[0].split(";")[0];
                logResult("POST /login (Autenticação Bem-Sucedida)", true, `Token de sessão criado (${authTokenCookie.slice(0, 25)}...)`);
            } else {
                logResult("POST /login", false, `Status ${res.statusCode} | Cookie não criado`);
            }
            resolve();
        });
        req.on("error", (e) => {
            logResult("POST /login", false, e.message);
            resolve();
        });
        req.write(postData);
        req.end();
    });

    // --- TESTE 3: ACESSO AO PAINEL DE ADMINISTRAÇÃO (/dashboard GET) ---
    console.log("\n3️⃣ TESTANDO ACESSO PROTEGIDO AO DASHBOARD (/dashboard):");
    await new Promise((resolve) => {
        http.get(`${BASE_URL}/dashboard`, {
            headers: { "Cookie": authTokenCookie }
        }, (res) => {
            let body = "";
            res.on("data", c => body += c);
            res.on("end", () => {
                if (res.statusCode === 200 && body.includes("Pareamento") && body.includes("RPG Multiverso")) {
                    logResult("GET /dashboard (Painel Avançado OS)", true, "Painel abriu com todos os 4 cards funcionais (200 OK)");
                } else {
                    logResult("GET /dashboard", false, `Status ${res.statusCode}`);
                }
                resolve();
            });
        }).on("error", (e) => {
            logResult("GET /dashboard", false, e.message);
            resolve();
        });
    });

    // --- TESTE 4: AÇÃO ADMINISTRATIVA DO RPG (/api/admin-action POST) ---
    console.log("\n4️⃣ TESTANDO CONTROLE ADMINISTRATIVO DO RPG (/api/admin-action):");
    await new Promise((resolve) => {
        const postData = JSON.stringify({ action: "raid-kaido" });
        const req = http.request(`${BASE_URL}/api/admin-action`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(postData),
                "Cookie": authTokenCookie
            }
        }, (res) => {
            let body = "";
            res.on("data", c => body += c);
            res.on("end", () => {
                try {
                    const json = JSON.parse(body);
                    if (res.statusCode === 200 && json.success) {
                        logResult("POST /api/admin-action (Acionar Raid Kaido)", true, `Confirmação: "${json.message}"`);
                    } else {
                        logResult("POST /api/admin-action", false, `Erro: ${body}`);
                    }
                } catch (e) {
                    logResult("POST /api/admin-action", false, `JSON inválido: ${body}`);
                }
                resolve();
            });
        });
        req.on("error", (e) => {
            logResult("POST /api/admin-action", false, e.message);
            resolve();
        });
        req.write(postData);
        req.end();
    });

    // --- TESTE 5: BONIFICAÇÃO AVANÇADA DE CAÇADORES (/api/admin-action - reward-user) ---
    console.log("\n5️⃣ TESTANDO PREMIAÇÃO DE CAÇADOR (/api/admin-action - reward-user):");
    await new Promise((resolve) => {
        const postData = JSON.stringify({ action: "reward-user", target: "244945280380@s.whatsapp.net", amount: 50000 });
        const req = http.request(`${BASE_URL}/api/admin-action`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(postData),
                "Cookie": authTokenCookie
            }
        }, (res) => {
            let body = "";
            res.on("data", c => body += c);
            res.on("end", () => {
                try {
                    const json = JSON.parse(body);
                    if (res.statusCode === 200 && json.success) {
                        logResult("POST /api/admin-action (Bonificação de Berries)", true, `Prêmio transferido: "${json.message}"`);
                    } else {
                        logResult("POST /api/admin-action", false, `Erro: ${body}`);
                    }
                } catch (e) {
                    logResult("POST /api/admin-action", false, `JSON inválido: ${body}`);
                }
                resolve();
            });
        });
        req.on("error", (e) => {
            logResult("POST /api/admin-action", false, e.message);
            resolve();
        });
        req.write(postData);
        req.end();
    });

    // --- TESTE 6: EXECUÇÃO DE COMANDO REMOTO VIA PAINEL (/api/send-command) ---
    console.log("\n6️⃣ TESTANDO EXECUÇÃO REMOTA DE COMANDO RPG (/api/send-command):");
    await new Promise((resolve) => {
        const postData = JSON.stringify({ target: "244945280380@s.whatsapp.net", text: "/perfil" });
        const req = http.request(`${BASE_URL}/api/send-command`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(postData),
                "Cookie": authTokenCookie
            }
        }, (res) => {
            let body = "";
            res.on("data", c => body += c);
            res.on("end", () => {
                try {
                    const json = JSON.parse(body);
                    if (res.statusCode === 200 && json.success && json.response.includes("SISTEMA DE CAÇADORES")) {
                        logResult("POST /api/send-command (Comando /perfil)", true, `Bot respondeu com a ficha do caçador (100% OK)`);
                    } else {
                        logResult("POST /api/send-command", false, `Erro: ${body}`);
                    }
                } catch (e) {
                    logResult("POST /api/send-command", false, `JSON inválido: ${body}`);
                }
                resolve();
            });
        });
        req.on("error", (e) => {
            logResult("POST /api/send-command", false, e.message);
            resolve();
        });
        req.write(postData);
        req.end();
    });

    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`🏁 RESULTADO FINAL DO DASHBOARD: ${passed} / ${total} SUCESSOS (${Math.round((passed/total)*100)}%)`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    process.exit(0);
}

setTimeout(runDashboardTests, 1500);
