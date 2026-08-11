/*
“Agradeço geral que fortaleceu e usou a bomba 💣❤️
Canal crescendo cada vez mais graças a vocês. Quem quiser acompanhar os próximos projetos:

🔗: https://whatsapp.com/channel/0029VbBCEri6xCSQ0AI1ok1L

*/
const baileysLib = require('@systemzero/baileys');
const makeWASocket = baileysLib.default || baileysLib.makeWASocket || baileysLib;
const { Browsers, useMultiFileAuthState, makeInMemoryStore, makeCacheableSignalKeyStore, PHONENUMBER_MCC, fetchLatestBaileysVersion } = baileysLib;
const qrcodeTerminal = require('qrcode-terminal'); 

const { fs, readline, LoggerB, Boom, axios, util, moment, time, date, getBuffer, banner2, banner3, colors, getGroupAdmins, mess, getRandom, NodeCache, nescessario, setting, extractDDD, extractStateFromNumber, extractStateFromDDD } = require('../ARQUIVES/funcoes/exports.js');
const qrcode = "./DADOS_SYSTEM/qr-code";
const { NomeDoBot, channelnk } = require('../DADOS_SYSTEM/INFO_SYSTEM/media/INFO_SYSTEM.json');

const logger = LoggerB.child({});
logger.level = 'silent';
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise(resolve => rl.question(text, resolve));
const msgRetryCounterCache = new NodeCache();

const SUPORTE_NUMBER = "+556195658663"; 

function collectNumbers(inputString) {
    return inputString.replace(/\D/g, '');
}

async function startPairing(SystemDark) {
    const phoneNumber = await question(colors.cyan("Digite o número do WhatsApp que deseja conectar ↴\n--> "));
    const numerosColetados = collectNumbers(phoneNumber);
    if (!numerosColetados || numerosColetados.length < 11) {
        console.log(colors.red("Número inválido. Insira corretamente, por exemplo: 55 11 9999-9999"));
        return; 
    }
    const code = await SystemDark.requestPairingCode(numerosColetados);
    console.log(colors.black(colors.bgGreen(`Seu código de emparelhamento: `)), colors.black(colors.white(code)));
    console.log(colors.gray('Vá no whatsapp > dispositivos conectados > conectar um aparelho > conectar com número de telefone'));
}


async function openWhatsappSupport() {
    console.log(colors.cyan(`https://wa.me/${SUPORTE_NUMBER.replace(/\D/g,'')}\n`));
}

async function showMenu(SystemDark) {
    if (!process.stdin.isTTY || process.env.NODE_ENV === "production" || process.send) {
        console.log(colors.cyan("🌐 [SYSTEM DARK 24/7] Modo Nuvem / Web Dashboard Ativo!"));
        console.log(colors.green("💡 QR Code nos logs E Pair Code sob demanda pelo Painel Web!"));

        SystemDark.ev.on("connection.update", (update) => {
            if (update.qr) {
                console.log(colors.cyan("\n📱 ESCANEIE O QR PARA CONECTAR-SE AO BOT:\n"));
                qrcodeTerminal.generate(update.qr, { small: true }); 
                console.log(colors.yellow("\n• ABRA O WHATSAPP > DISPOSITIVOS CONECTADOS > CONECTAR NOVO APARELHO\n"));
            }
        });

        process.on("message", async (msg) => {
            if (msg && msg.type === "REQUEST_PAIR_CODE" && msg.phoneNumber) {
                try {
                    console.log(colors.cyan(`⚡ [DASHBOARD] Solicitando Pair Code para: ${msg.phoneNumber}...`));
                    const code = await SystemDark.requestPairingCode(msg.phoneNumber);
                    console.log(colors.green(`⚡ [DASHBOARD] Pair Code Gerado: ${code}`));
                    if (process.send) {
                        process.send({ type: "PAIR_CODE_RESULT", code, phoneNumber: msg.phoneNumber });
                    }
                    fs.writeFileSync("./ARQUIVES/pair_status.json", JSON.stringify({ code, phoneNumber: msg.phoneNumber, timestamp: Date.now() }), "utf8");
                } catch (err) {
                    console.error(colors.red(`❌ [DASHBOARD] Erro ao gerar Pair Code: ${err.message}`));
                    if (process.send) {
                        process.send({ type: "PAIR_CODE_ERROR", error: err.message });
                    }
                }
            }
        });

        return;
    }


    console.log(colors.cyan("╔════════════════════════════════════╗"));
    console.log(colors.cyan("║ ݁ ⛧ ₊ ⊹  ⊹ ₊ ⛧ ݁  ݁ ⛧ ₊ ⊹  ⊹ ₊ ⛧ ݁     ║"));
    console.log(
       colors.cyan("║ ❆ິ̸ ") +
        colors.white.bold("ESCOLHA UMA OPÇÃO ABAIXO ↴") +
        colors.cyan("       ║")
    );
    console.log(colors.cyan("║ ݁ ⛧ ₊ ⊹ ♱ ⊹ ₊ ⛧ ݁ ݁ ⛧ ₊ ⊹  ⊹ ₊ ⛧ ݁     ║"));
    console.log(colors.cyan("╚════════════════════════════════════╝"));

    console.log(colors.cyan("╔═══════════════ MENU ═══════════════╗"));

    console.log(
        colors.cyan("║ ❆ິ̸ 📱 ") +
        colors.white("〔 1 〕") +
        colors.red(" ➢ ") +
        colors.white("Código de conexão") +
        colors.cyan("   ║")
    );

    console.log(
        colors.cyan("║ ❆ິ̸ 🪷 ") +
        colors.white("〔 2 〕") +
        colors.red(" ➢ ") +
        colors.white("QR-Code WhatsApp") +
        colors.cyan("    ║")
    );

    console.log(
        colors.cyan("║ ❆ິ̸ 🌊 ") +
        colors.white("〔 3 〕") +
        colors.red(" ➢ ") +
        colors.white("Suporte / Ajuda") +
        colors.cyan("     ║")
    );

    console.log(colors.cyan("╠════════════════════════════════════╣"));
    console.log(
        colors.cyan("║ ❆ິ̸ ") +
        colors.gray("Digite o número da opção desejada") +
        colors.cyan("║")
    );
    console.log(colors.cyan("╚════════════════════════════════════╝"));

    let option = await question(colors.white.bold("╰━━➤ "));
    option = option.trim();


    switch(option) {
        case '1':
            await startPairing(SystemDark);
            break;
        case '2':            
            SystemDark.ev.on('connection.update', (update) => {
                if (update.qr) {
                    console.log(colors.cyan("\n📱 ESCANEIE O QR PARA CONECTAR-SE AO BOT:\n"));
                    qrcodeTerminal.generate(update.qr, { small: true }); 
                    console.log(colors.yellow("\n• ABRA O WHATSAPP > DISPOSITIVOS CONECTADOS > CONECTAR NOVO APARELHO\n"));
                }
            });
            break;
        case '3':
            await openWhatsappSupport();
            break;
        default:
            console.log(colors.red("\n𝐎𝐏𝐒.. 𝐕𝐎𝐂𝐄 𝐄𝐑𝐑𝐎𝐔 𝐀𝐋𝐆𝐎 𝐀𝐈\n"));
            await showMenu(SystemDark);
    }
}

// ============================================================================
// SISTEMA DARK OS • MODO STANDBY SILENCIOSO E PAREAMENTO SOB DEMANDA (KRAD)
// ============================================================================
let currentSocketInstance = null;
let isPairingNow = false;
let isConnected = false;

// OUVINTE IPC GERAL DE PAREAMENTO DO DASHBOARD WEB (MÉTODO DARK-BOT)
process.on("message", async (msg) => {
    if (msg && msg.type === "REQUEST_PAIR_CODE" && msg.phoneNumber) {
        if (isPairingNow) return;
        isPairingNow = true;
        const num = String(msg.phoneNumber).replace(/\D/g, "");
        console.log(colors.cyan(`⚡ [DASHBOARD] Solicitação de Pair Code recebida para: ${num}`));

        try {
            if (isConnected || currentSocketInstance?.authState?.creds?.registered) {
                console.warn(colors.yellow("⚠️ [DASHBOARD] O bot já está conectado! Para conectar outro número, clique em Limpar Sessão no painel."));
                if (process.send) {
                    process.send({ type: "PAIR_CODE_ERROR", error: "O bot já está conectado! Use Limpar Sessão no painel." });
                }
                isPairingNow = false;
                return;
            }

            // Se ainda não estava inicializado, chamamos startConnect antes
            if (!currentSocketInstance) {
                await startConnect();
            }

            // Pausa de 2000ms para a Baileys [2, 3000, 1035194821] estabilizar (método oficial dark-bot)
            console.log(colors.cyan("⏳ [SYSTEM DARK] Aguardando inicialização da Baileys (2000ms)..."));
            await new Promise(r => setTimeout(r, 3500)); // 3.5s para garantir que a Baileys v2026 abriu o socket com a Meta

            console.log(colors.cyan(`⚡ [SYSTEM DARK] Solicitando código ao servidor do WhatsApp para ${num}...`));
            const rawCode = await Promise.race([
                currentSocketInstance.requestPairingCode(num),
                new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout (30s) aguardando servidor do WhatsApp")), 30000))
            ]);

            const code = rawCode?.match(/.{1,4}/g)?.join("-") || rawCode;
            console.log(colors.green(`🔐 [SYSTEM DARK] PAIR CODE OFICIAL GERADO: ${code}`));
            console.log(colors.yellow(`📱 Verifique agora a notificação no celular ${num} e digite o código!`));

            if (process.send) {
                process.send({ type: "PAIR_CODE_RESULT", code, phoneNumber: num });
            }
            fs.writeFileSync("./ARQUIVES/pair_status.json", JSON.stringify({ code, phoneNumber: num, timestamp: Date.now() }), "utf8");
        } catch (err) {
            console.error(colors.red(`❌ [SYSTEM DARK] Falha ao gerar Pair Code: ${err.message}`));
            if (process.send) {
                process.send({ type: "PAIR_CODE_ERROR", error: err.message });
            }
            fs.writeFileSync("./ARQUIVES/pair_status.json", JSON.stringify({ error: err.message, timestamp: Date.now() }), "utf8");
        } finally {
            isPairingNow = false;
        }
    }
});

async function startConnect() {
    const { state, saveCreds } = await useMultiFileAuthState(qrcode);
    const { version, isLatest } = await fetchLatestBaileysVersion();

    const SystemDark = makeWASocket({
        version: [2, 3000, 1035194821], // VERSÃO CORRIGIDA PARA WA WEB / PAIR CODE (2026)
        logger,        
        printQRInTerminal: false,
        browser: Browsers.ubuntu("Chrome"),
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, logger),
        },
        msgRetryCounterCache,
        generateHighQualityLinkPreview: true,
        syncFullHistory: false,
        keepAliveIntervalMs: 30000,
        markOnlineOnConnect: true,
        connectTimeoutMs: 60000,
    });

    currentSocketInstance = SystemDark;

    SystemDark.ev.on("creds.update", saveCreds);

    SystemDark.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;
        const shouldReconnect = new Boom(lastDisconnect?.error)?.output.statusCode;

        switch (connection) {
            case "close":
                isConnected = false;
                if (process.send) {
                    process.send({ type: "STATUS_UPDATE", connected: false });
                }
                // Só reconectamos automaticamente se JÁ possuíamos credenciais cadastradas!
                // Se NÃO existirem credenciais, voltamos ao STANDBY SILENCIOSO sem loop de QR!
                if (SystemDark.authState?.creds?.registered) {
                    console.log(`${colors.red("[CONNECTION CLOSED]")} Conexão fechada. Reconectando sessão existente...`);
                    setTimeout(() => startConnect(), 5000);
                } else {
                    console.log(colors.yellow("🟡 [SYSTEM DARK] Sessão inativa. Bot aguardando clique em OBTER CÓDIGO no painel web!"));
                }
                break;

            case "connecting":
                console.log(`${colors.white("×")} [${colors.red(date,time)}] - ${colors.yellow(mess.connecting())}`);
                break;

            case "open":
                isConnected = true;
                console.log(banner3.string);
                console.log(banner2.string);
                console.log(colors.green(mess.open()));
                if (process.send) {
                    process.send({ type: "STATUS_UPDATE", connected: true });
                }
                break;
        }
    });

    SystemDark.ev.on("messages.upsert", (upsert) => {
        const startSystemDark = require("../lauma.js");
        startSystemDark(upsert, SystemDark, qrcode).catch(console.log);
    });
}

// INICIALIZAÇÃO DO BOOT:
// Se já existir sessão em DADOS_SYSTEM/qr-code/creds.json, inicia e conecta imediatamente.
// Se NÃO existir, fica em STANDBY SILENCIOSO aguardando solicitação de Pair Code pelo Dashboard!
if (fs.existsSync(`${qrcode}/creds.json`)) {
    console.log(colors.green("🟢 [SYSTEM DARK] Sessão salva detectada! Conectando automaticamente..."));
    startConnect().catch(err => console.error("Erro no startConnect:", err.message));
} else {
    console.log(colors.yellow("🟡 [SYSTEM DARK] Nenhuma sessão detectada. Bot em STANDBY SILENCIOSO sem gerar QR na tela!"));
    console.log(colors.green("💡 Abra http://0.0.0.0:3000/login (darknet | DarkNet@2026), digite seu número e clique em OBTER CÓDIGO!"));
}
