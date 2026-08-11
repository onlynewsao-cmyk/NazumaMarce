// ============================================================================
// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ ⚡ ⛧ ⸸ 【  𝐒 𝐘 𝐒 𝐓 𝐄 𝐌  •  𝐃 𝐀 𝐑 𝐊  •  𝐊 𝐑 𝐀 𝐃  】 ⸸ ⛧ ⚡                    ║
// ╚══════════════════════════════════════════════════════════════════════════╝
// ============================================================================

const HEADER_BOX = (pushname = "Caçador") => `
╔══════════════════════════════════════════════════════════╗
║ ⚡ ⛧ ⸸ 【  𝐒 𝐘 𝐒 𝐓 𝐄 𝐌  •  𝐃 𝐀 𝐑 𝐊  •  𝐊 𝐑 𝐀 𝐃  】 ⸸ ⛧ ⚡  ║
╚══════════════════════════════════════════════════════════╝
 ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
 ▓▒░  ⚡ 𝐔𝐒𝐔𝐀́𝐑𝐈𝐎 : ${pushname}
 ▓▒░  🎖️ 𝐒𝐓𝐀𝐓𝐔𝐒  : 100% 𝐎𝐍𝐋𝐈𝐍𝐄 [𝟐𝟒/𝟕 - 𝐍𝐔𝐕𝐄𝐌]
 ▓▒░  👑 𝐒𝐔𝐏𝐑𝐄𝐌𝐎 : 𝐊𝐑𝐀𝐃 (+𝟐𝟒𝟒 𝟗𝟒𝟓 𝟐𝟖𝟎 𝟑𝟖𝟎)
 ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀`;

exports.menu = (prefix, sender, pushname, isVip, isCargo) => {
    return `${HEADER_BOX(pushname)}
 ┏━━━ ◈ • • • ━━━ 「 ⚡ 𝐌 𝐄 𝐍 𝐔  •  𝐏 𝐑 𝐈 𝐍 𝐂 𝐈 𝐏 𝐀 𝐋 」 ━━━ • • • ◈ ━━━┓
 ┃  ⟡ ꦿ ⸸ ${prefix}rpg         »  Abre o Menu Multiverso Anime RPG
 ┃  ⟡ ꦿ ⸸ ${prefix}menuadm     »  Controle de Administradores de Grupo
 ┃  ⟡ ꦿ ⸸ ${prefix}menudono    »  Acesso Exclusivo do Dono (KRAD)
 ┃  ⟡ ꦿ ⸸ ${prefix}menulogos   »  Gerador de Logos, Canvas e Designs
 ┃  ⟡ ꦿ ⸸ ${prefix}brincadeiras»  Minigames, Quiz, Forca e Interação
 ┃  ⟡ ꦿ ⸸ ${prefix}efeitos     »  Filtros de Voz, Áudio, Bass e Imagem
 ┃  ⟡ ꦿ ⸸ ${prefix}coins       »  Economia, Trabalho, Mineração e N-Coins
 ┃  ⟡ ꦿ ⸸ ${prefix}status      »  Painel de Proteções e Antispam
 ┃  ⟡ ꦿ ⸸ ${prefix}ping        »  Latência em tempo real do Servidor
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 ⚡ ⛧ ⸸ _System Dark by KRAD (244949926074)_ ⸸ ⛧ ⚡`;
};

exports.adms = (prefix, sender, pushname, isVip, isCargo) => {
    return `${HEADER_BOX(pushname)}
 ┏━━━ ◈ • • • ━━━ 「 ⚡ 𝐌 𝐄 𝐍 𝐔  •  𝐀 𝐃 𝐌 𝐈 𝐍 𝐒 」 ━━━ • • • ◈ ━━━┓
 ┃  ⟡ ꦿ ⸸ ${prefix}ban @user   »  Banir membro do grupo
 ┃  ⟡ ꦿ ⸸ ${prefix}add [num]   »  Adicionar membro ao grupo
 ┃  ⟡ ꦿ ⸸ ${prefix}promover    »  Dar cargo de Administrador
 ┃  ⟡ ꦿ ⸸ ${prefix}rebaixar    »  Remover cargo de Administrador
 ┃  ⟡ ꦿ ⸸ ${prefix}grupo [a/f] »  Abrir ou fechar o grupo
 ┃  ⟡ ꦿ ⸸ ${prefix}hidetag     »  Marcar todos os membros
 ┃  ⟡ ꦿ ⸸ ${prefix}marcar      »  Listar membros com mensagem
 ┃  ⟡ ꦿ ⸸ ${prefix}limpar      »  Apagar mensagens do bot
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 ⚡ ⛧ ⸸ _System Dark by KRAD (244949926074)_ ⸸ ⛧ ⚡`;
};

exports.menudono = (prefix, sender, pushname, isVip, isCargo) => {
    return `${HEADER_BOX(pushname)}
 ┏━━━ ◈ • • • ━━━ 「 👑 𝐌 𝐄 𝐍 𝐔  •  𝐒 𝐔 𝐏 𝐑 𝐄 𝐌 𝐎 」 ━━━ • • • ◈ ━━━┓
 ┃  ⟡ ꦿ ⸸ ${prefix}reiniciar   »  Reiniciar o motor de System Dark
 ┃  ⟡ ꦿ ⸸ ${prefix}bcast       »  Transmissão global em todos os grupos
 ┃  ⟡ ꦿ ⸸ ${prefix}addvip      »  Adicionar membro VIP no banco
 ┃  ⟡ ꦿ ⸸ ${prefix}delvip      »  Remover membro VIP
 ┃  ⟡ ꦿ ⸸ ${prefix}block       »  Bloquear contato no WhatsApp
 ┃  ⟡ ꦿ ⸸ ${prefix}unblock     »  Desbloquear contato
 ┃  ⟡ ꦿ ⸸ ${prefix}exec        »  Executar script Terminal Linux
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 ⚡ ⛧ ⸸ _System Dark by KRAD (244949926074)_ ⸸ ⛧ ⚡`;
};

exports.menulogos = (prefix, sender, pushname, isVip, isCargo) => {
    return `${HEADER_BOX(pushname)}
 ┏━━━ ◈ • • • ━━━ 「 🎨 𝐌 𝐄 𝐍 𝐔  •  𝐋 𝐎 𝐆 𝐎 𝐒 」 ━━━ • • • ◈ ━━━┓
 ┃  ⟡ ꦿ ⸸ ${prefix}logo1       »  Gerar Logo Estilo Cyberpunk
 ┃  ⟡ ꦿ ⸸ ${prefix}logo2       »  Gerar Logo Neon Glitch
 ┃  ⟡ ꦿ ⸸ ${prefix}logo3       »  Gerar Logo Dark Grimoire
 ┃  ⟡ ꦿ ⸸ ${prefix}canvas      »  Criar card personalizado
 ┃  ⟡ ꦿ ⸸ ${prefix}upscale     »  Melhorar resolução da imagem em HD
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 ⚡ ⛧ ⸸ _System Dark by KRAD (244949926074)_ ⸸ ⛧ ⚡`;
};

exports.alteradores = (prefix, sender, pushname, isVip, isCargo) => {
    return `${HEADER_BOX(pushname)}
 ┏━━━ ◈ • • • ━━━ 「 🎙️ 𝐀 𝐋 𝐓 𝐄 𝐑 𝐀 𝐃 𝐎 𝐑 𝐄 𝐒 」 ━━━ • • • ◈ ━━━┓
 ┃  ⟡ ꦿ ⸸ ${prefix}bass        »  Aumentar graves do áudio (Bass Boost)
 ┃  ⟡ ꦿ ⸸ ${prefix}reverb      »  Aplicar efeito eco/estúdio no áudio
 ┃  ⟡ ꦿ ⸸ ${prefix}speedup     »  Acelerar velocidade de reprodução
 ┃  ⟡ ꦿ ⸸ ${prefix}slowvoice   »  Deixar áudio lento / grave
 ┃  ⟡ ꦿ ⸸ ${prefix}vozcrianca  »  Filtro de voz aguda infantil
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 ⚡ ⛧ ⸸ _System Dark by KRAD (244949926074)_ ⸸ ⛧ ⚡`;
};

exports.brincadeiras = (prefix, sender, pushname, isVip, isCargo) => {
    return `${HEADER_BOX(pushname)}
 ┏━━━ ◈ • • • ━━━ 「 🎮 𝐌 𝐈 𝐍 𝐈 𝐆 𝐀 𝐌 𝐄 𝐒 」 ━━━ • • • ◈ ━━━┓
 ┃  ⟡ ꦿ ⸸ ${prefix}forca       »  Jogo da Forca interativo no grupo
 ┃  ⟡ ꦿ ⸸ ${prefix}velha       »  Jogo da Velha (Tic-Tac-Toe)
 ┃  ⟡ ꦿ ⸸ ${prefix}quiz        »  Quiz de perguntas e respostas
 ┃  ⟡ ꦿ ⸸ ${prefix}slots       »  Caça-níqueis do cassino System Dark
 ┃  ⟡ ꦿ ⸸ ${prefix}dado        »  Jogar dado da sorte de 6 faces
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 ⚡ ⛧ ⸸ _System Dark by KRAD (244949926074)_ ⸸ ⛧ ⚡`;
};

exports.efeitos = (prefix, sender, pushname, isVip, isCargo) => {
    return `${HEADER_BOX(pushname)}
 ┏━━━ ◈ • • • ━━━ 「 ✨ 𝐄 𝐅 𝐄 𝐈 𝐓 𝐎 𝐒  •  𝐌 𝐈́ 𝐃 𝐈 𝐀 」 ━━━ • • • ◈ ━━━┓
 ┃  ⟡ ꦿ ⸸ ${prefix}s [img/vid] »  Criar figurinha de imagem ou vídeo
 ┃  ⟡ ꦿ ⸸ ${prefix}toimg       »  Converter figurinha em imagem PNG
 ┃  ⟡ ꦿ ⸸ ${prefix}tomp3       »  Extrair áudio MP3 de um vídeo
 ┃  ⟡ ꦿ ⸸ ${prefix}removebg    »  Remover fundo da imagem com IA
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 ⚡ ⛧ ⸸ _System Dark by KRAD (244949926074)_ ⸸ ⛧ ⚡`;
};

exports.dono = (prefix, NomeDoBot, NumeroDoBot, ownerNumber, isBotoff, ownerName, botNumber) => {
    return `${HEADER_BOX("KRAD")}
 ┏━━━ ◈ • • • ━━━ 「 👑 𝐈 𝐍 𝐅 𝐎  •  𝐒 𝐔 𝐏 𝐑 𝐄 𝐌 𝐎 」 ━━━ • • • ◈ ━━━┓
 ┃  ⟡ ꦿ ⸸ 👑 Criador : KRAD (Evander Pedro do Nascimento)
 ┃  ⟡ ꦿ ⸸ 📱 Número  : +244 945 280 380
 ┃  ⟡ ꦿ ⸸ 🤖 Bot     : System Dark (+244 949 926 074)
 ┃  ⟡ ꦿ ⸸ 🌐 Loja    : https://systemzone.store
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 ⚡ ⛧ ⸸ _System Dark by KRAD (244949926074)_ ⸸ ⛧ ⚡`;
};

exports.ativic = (prefix) => {
    return `${HEADER_BOX("Caçador")}
 ┏━━━ ◈ • • • ━━━ 「 📊 𝐀 𝐓 𝐈 𝐕 𝐈 𝐃 𝐀 𝐃 𝐄 𝐒 」 ━━━ • • • ◈ ━━━┓
 ┃  ⟡ ꦿ ⸸ ${prefix}atividade   »  Relatório de mensagens do grupo
 ┃  ⟡ ꦿ ⸸ ${prefix}inativos    »  Listar membros que não interagem
 ┃  ⟡ ꦿ ⸸ ${prefix}rankativo   »  Top 10 membros mais participativos
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 ⚡ ⛧ ⸸ _System Dark by KRAD (244949926074)_ ⸸ ⛧ ⚡`;
};

exports.consultas = (prefix) => {
    return `${HEADER_BOX("Caçador")}
 ┏━━━ ◈ • • • ━━━ 「 🔍 𝐂 𝐎 𝐍 𝐒 𝐔 𝐋 𝐓 𝐀 𝐒 」 ━━━ • • • ◈ ━━━┓
 ┃  ⟡ ꦿ ⸸ ${prefix}cep         »  Consultar endereço pelo CEP
 ┃  ⟡ ꦿ ⸸ ${prefix}ip          »  Consultar geolocalização por IP
 ┃  ⟡ ꦿ ⸸ ${prefix}ia [prompt] »  Perguntar à Inteligência Artificial
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 ⚡ ⛧ ⸸ _System Dark by KRAD (244949926074)_ ⸸ ⛧ ⚡`;
};

exports.menu18 = (prefix) => {
    return `${HEADER_BOX("Caçador")}
 ┏━━━ ◈ • • • ━━━ 「 🔞 𝐌 𝐄 𝐍 𝐔  •  𝐍 𝐒 𝐅 𝐖 」 ━━━ • • • ◈ ━━━┓
 ┃  ⟡ ꦿ ⸸ _Acesso restrito ou desativado neste grupo._
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 ⚡ ⛧ ⸸ _System Dark by KRAD (244949926074)_ ⸸ ⛧ ⚡`;
};

exports.status = () => {
    return `${HEADER_BOX("Caçador")}
 ┏━━━ ◈ • • • ━━━ 「 🛡️ 𝐏 𝐑 𝐎 𝐓 𝐄 𝐂̧ 𝐎̃ 𝐄 𝐒 」 ━━━ • • • ◈ ━━━┓
 ┃  ⟡ ꦿ ⸸ Anti-Link  : Ativado 🛡️
 ┃  ⟡ ꦿ ⸸ Anti-Spam  : Ativado 🛡️
 ┃  ⟡ ꦿ ⸸ Anti-Flood : Ativado 🛡️
 ┃  ⟡ ꦿ ⸸ Anti-Call  : Ativado 🛡️
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 ⚡ ⛧ ⸸ _System Dark by KRAD (244949926074)_ ⸸ ⛧ ⚡`;
};

exports.coins = (prefix, sender, pushname) => {
    return `${HEADER_BOX(pushname)}
 ┏━━━ ◈ • • • ━━━ 「 💰 𝐄 𝐂 𝐎 𝐍 𝐎 𝐌 𝐈 𝐀 」 ━━━ • • • ◈ ━━━┓
 ┃  ⟡ ꦿ ⸸ ${prefix}carteira    »  Consultar seu saldo de N-Coins
 ┃  ⟡ ꦿ ⸸ ${prefix}trabalhar   »  Trabalhar para ganhar moedas
 ┃  ⟡ ꦿ ⸸ ${prefix}minerar     »  Minerar ouro e recursos nas cavernas
 ┃  ⟡ ꦿ ⸸ ${prefix}depositar   »  Guardar N-Coins no banco System Dark
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 ⚡ ⛧ ⸸ _System Dark by KRAD (244949926074)_ ⸸ ⛧ ⚡`;
};
