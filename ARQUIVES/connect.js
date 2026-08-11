/*
“Agradeço geral que fortaleceu e usou a bomba 💣❤️
Canal crescendo cada vez mais graças a vocês. Quem quiser acompanhar os próximos projetos:

🔗: https://whatsapp.com/channel/0029VbBCEri6xCSQ0AI1ok1L

*/
const { default: makeWASocket, Browsers, useMultiFileAuthState, makeInMemoryStore, makeCacheableSignalKeyStore, PHONENUMBER_MCC, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
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

// Variável global para solicitação pendente de pareamento no timing perfeito
let pendingPairingNumber = null;
let currentSocketInstance = null;

process.on("message", async (msg) => {
    if (msg && msg.type === "REQUEST_PAIR_CODE" && msg.phoneNumber) {
        const num = String(msg.phoneNumber).replace(/\D/g, "");
        console.log(colors.cyan(`⚡ [DASHBOARD] Recebida solicitação de Pair Code para: ${num}`));
        
        if (currentSocketInstance?.authState?.creds?.registered) {
            console.warn(colors.yellow("⚠️ [DASHBOARD] O bot já está conectado ao WhatsApp! Para parear outro número, clique em Limpar Sessão no painel."));
            if (process.send) {
                process.send({ type: "PAIR_CODE_ERROR", error: "O bot já está conectado! Use Limpar Sessão no painel." });
            }
            return;
        }

        async function tryRequest(attempt = 1) {
            try {
                if (!currentSocketInstance) {
                    startConnect();
                    setTimeout(() => tryRequest(attempt + 1), 2000);
                    return;
                }
                console.log(colors.cyan(`⚡ [SYSTEM DARK] Solicitando Pair Code REAL à Baileys para: ${num} (Tentativa ${attempt})...`));
                const code = await currentSocketInstance.requestPairingCode(num);
                console.log(colors.green(`⚡ [SYSTEM DARK] PAIR CODE REAL GERADO PELO WHATSAPP: ${code}`));
                console.log(colors.yellow(`📱 Verifique agora a notificação no seu celular (${num})!`));
                
                if (process.send) {
                    process.send({ type: "PAIR_CODE_RESULT", code, phoneNumber: num });
                }
                fs.writeFileSync("./ARQUIVES/pair_status.json", JSON.stringify({ code, phoneNumber: num, timestamp: Date.now() }), "utf8");
            } catch (err) {
                console.warn(colors.yellow(`⚠️ [SYSTEM DARK] Tentativa ${attempt} falhou: ${err.message}`));
                if (attempt < 4) {
                    setTimeout(() => tryRequest(attempt + 1), 2000);
                } else {
                    console.log(colors.cyan("🔄 Reiniciando socket para tentar o pareamento com canal limpo..."));
                    try { currentSocketInstance.ws.close(); } catch(e) {}
                    pendingPairingNumber = num;
                }
            }
        }

        tryRequest(1);
    }
});

async function startConnect() {
const { state, saveCreds } = await useMultiFileAuthState(qrcode);
const { version, isLatest } = await fetchLatestBaileysVersion();

const SystemDark = makeWASocket({
    version,
    logger,        
    printQRInTerminal: false,
    browser: ["System Dark", "Chrome", "20.0.04"],
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
        const { connection, lastDisconnect, qr } = update;
        const shouldReconnect = new Boom(lastDisconnect?.error)?.output.statusCode;

        // GATILHO PERFEITO PARA PAIR CODE: qr ou connecting quando não registrado
        if ((qr || connection === "connecting") && !SystemDark.authState.creds.registered && pendingPairingNumber) {
            const num = pendingPairingNumber;
            pendingPairingNumber = null;
            console.log(colors.cyan(`⚡ [SYSTEM DARK] Canal TLS pronto! Solicitando Pair Code para ${num}...`));
            setTimeout(async () => {
                try {
                    const code = await SystemDark.requestPairingCode(num);
                    console.log(colors.green(`⚡ [SYSTEM DARK] Pair Code REAL do WhatsApp: ${code}`));
                    if (process.send) {
                        process.send({ type: "PAIR_CODE_RESULT", code, phoneNumber: num });
                    }
                    fs.writeFileSync("./ARQUIVES/pair_status.json", JSON.stringify({ code, phoneNumber: num, timestamp: Date.now() }), "utf8");
                } catch (err) {
                    console.error(colors.red(`❌ [SYSTEM DARK] Erro no requestPairingCode: ${err.message}`));
                    if (process.send) {
                        process.send({ type: "PAIR_CODE_ERROR", error: err.message });
                    }
                }
            }, 2500); // 2.5s após connecting/qr para estabilidade do túnel Noise
        }

        switch (connection) {
            case "close":
                if (shouldReconnect) {
                    console.log(`${colors.red("[CONNECTION CLOSED]")} Conexão fechada por motivo: ${lastDisconnect?.error}`);
                    setTimeout(startConnect, 3000);
                }
                break;

            case "connecting":
                console.log(`${colors.white("×")} [${colors.red(date,time)}] - ${colors.yellow(mess.connecting())}`);
                break;

            case "open":
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
        const startSystemDark = require('../SystemDark.js');
        startSystemDark(upsert, SystemDark, qrcode).catch(console.log);
    });

    SystemDark.ev.process(async (events) => {
        if (!events["group-participants.update"]) return;
        try {
            const naga2 = events["group-participants.update"];
            if (!fs.existsSync(`./DADOS_SYSTEM/grupos/ATIVAÇÕES-SystemDark/${naga2.id}.json`)) return;

            const jsonGp = JSON.parse(fs.readFileSync(`./DADOS_SYSTEM/grupos/ATIVAÇÕES-SystemDark/${naga2.id}.json`));
            let grpmdt;
            try { grpmdt = await SystemDark.groupMetadata(naga2.id) } catch { return }
            if (!grpmdt?.id.endsWith('@g.us')) return;

            const membros_ = grpmdt.participants;
            const groupAdmins_ = getGroupAdmins(membros_);

            const normalizar = alvo => {
                if (alvo?.includes('@lid') && membros_) {
                    return membros_.find(v => v.lid === alvo)?.jid || alvo;
                }
                return alvo;
            };

            const participante = normalizar(naga2.participants[0]);
            const numero = participante.split('@')[0];
            const NumeroDoBot = SystemDark.user.id.split(':')[0];
            if (participante.startsWith(SystemDark.user.id.split(':')[0])) return;
 function gerarContextNewsletter() {
    if (setting.channelnk === "0@newsletter") {
        return {}; 
    }
    return {
        isForwarded: true,
        forwardingScore: 1,
        forwardedNewsletterMessageInfo: {
            newsletterJid: setting.channelnk,
            newsletterName: NomeDoBot,
            serverMessageId: ''
        }
    };
}
const DLChanneldl = gerarContextNewsletter();

            if (naga2.action === 'add' && nescessario.listanegraG.includes(participante)) {
                await SystemDark.sendMessage(grpmdt.id, { text: mess.blackList(grpmdt, naga2), mentions: [participante] });
                return SystemDark.groupParticipantsUpdate(grpmdt.id, [participante], 'remove');
            }
            if (naga2.action === 'add' && jsonGp[0].listanegra.includes(participante)) {
                await SystemDark.sendMessage(grpmdt.id, { text: mess.blackList(grpmdt, naga2), mentions: [participante] });
                return SystemDark.groupParticipantsUpdate(grpmdt.id, [participante], 'remove');
            }
            if (jsonGp[0].antifake && naga2.action === 'add' && !numero.startsWith('55')) {
                if (jsonGp[0].legenda_estrangeiro != "0") {
                    await SystemDark.sendMessage(grpmdt.id, { text: jsonGp[0].legenda_estrangeiro });
                }
                return setTimeout(() => SystemDark.groupParticipantsUpdate(grpmdt.id, [participante], 'remove'), 1000);
            }
            if (jsonGp[0].ANTI_DDD.active && naga2.action === 'add' && jsonGp[0].ANTI_DDD.listaProibidos.includes(extractDDD(numero))) {
                await SystemDark.sendMessage(grpmdt.id, { text: mess.forbiddenStateFromDDD(participante, extractStateFromDDD, extractDDD), mentions: [participante] });
                return setTimeout(() => SystemDark.groupParticipantsUpdate(grpmdt.id, [participante], 'remove'), 1000);
            }

            const tipoMidia = url => {
                if (!url) return null;
                const ext = url.slice(url.lastIndexOf('.') + 1).toLowerCase();
                return ext.match(/jpe?g|png|gif|webp/) ? 'image' :
                       ext.match(/mp4|mov|mkv|avi|webm/) ? 'video' : null;
            };

            const fotoPerfil = async jid => {
                try {
                    return await SystemDark.profilePictureUrl(jid, 'image');
                } catch {
                    return 'https://telegra.ph/file/b5427ea4b8701bc47e751.jpg';
                }
            };

            const mdata_2 = grpmdt || await SystemDark.groupMetadata(naga2.id);
            if (jsonGp[0].antifake && !numero.startsWith('55')) return;
        const gp = jsonGp[0];
        const wl = gp.wellcome?.[0];
        const wl2 = gp.wellcome?.[1];
        const subject = mdata_2.subject || '';
        const prefixo = gp.multiprefix ? gp.prefixos?.[0] : setting.prefix;
        const desc = mdata_2.desc || '';
        const [ppimg] = await Promise.all([fotoPerfil(participante)]);
        const fundo = wl?.fundobv || ppimg;
        const acao = naga2.action;

        const legendaBase = (txt) => txt
            .replace('#hora#', time)
            .replace('#nomedogp#', subject)
            .replace('#numerodele#', '@' + numero)
            .replace('#numerobot#', NumeroDoBot)
            .replace('#prefixo#', prefixo)
            .replace('#descrição#', desc)
            .replace('#estado#', extractStateFromNumber(numero));
        if (wl?.bemvindo1) {
            const legenda = acao === 'add' ? (wl.legendabv ? legendaBase(wl.legendabv) : welcome(numero, subject)) : (wl.legendasaiu ? legendaBase(wl.legendasaiu) : bye(numero));

            const tipo = tipoMidia(fundo);
            const msg = {
                caption: legenda,
                contextInfo: { ...DLChanneldl, mentionedJid: [participante] }
            };

            if (tipo === 'image') {
                msg.image = { url: fundo };
            } else if (tipo === 'video') {
                msg.video = { url: fundo };
                msg.gifPlayback = true;
            } else {
                msg.image = { url: ppimg };
            }

            await SystemDark.sendMessage(mdata_2.id, msg).catch(async () => {
                msg.image = { url: ppimg };
                await SystemDark.sendMessage(mdata_2.id, msg);
            });
        }
        if (wl2?.bemvindo2) {
            if (acao === 'add') {
                const teks = acao === 'add' ? (wl2.legendabv2 ? legendaBase(wl2.legendabv2) : welcome2(numero, subject)) : (wl2.legendasaiu2 ? legendaBase(wl2.legendasaiu2) : bye2(numero));
                await SystemDark.sendMessage(mdata_2.id, {
                    text: teks,
                    contextInfo: { ...DLChanneldl, mentionedJid: [participante] }
                });
            } else if (acao === 'remove') {
                const teks = wl2.legendasaiu2
                    ? legendaBase(wl2.legendasaiu2)
                    : bye2(numero);
                await SystemDark.sendMessage(mdata_2.id, {
                    text: teks,
                    contextInfo: { ...DLChanneldl, mentionedJid: [participante] }
                });
            }
        }

    } catch (e) {
        console.log(e);
    }
});
}

startConnect().catch(error => console.log(colors.red("Ocorreu um erro ao inicializar o bot: " + error)));