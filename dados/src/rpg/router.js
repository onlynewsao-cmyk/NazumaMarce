import * as db from './database.js';
import * as combat from './combat.js';
import * as gacha from './gacha.js';
import * as forge from './forge.js';
import * as pvp from './pvp.js';
import * as guilds from './guilds.js';
import * as raid from './raid.js';
import * as shop from './shop.js';
import * as ranking from './ranking.js';
import * as market from './market.js';

function createHealthBar(current, max) {
    const totalBlocks = 10;
    const filled = Math.max(0, Math.min(totalBlocks, Math.round((current / max) * totalBlocks)));
    return '█'.repeat(filled) + '░'.repeat(totalBlocks - filled);
}

export async function handleRpgCommand(cmd, args, sender, reply, mentionJid, userName = 'Caçador Novato') {
    db.ensureUserExists(sender, userName);

    // 1. Ações em Duelos PvP ativos (respostas numéricas 0, 1, 2)
    if (pvp.isUserInDuel(sender) && /^[0-2]$/.test(cmd)) {
        const res = await pvp.handlePvPTurn(sender, parseInt(cmd, 10));
        return reply(res);
    }

    // 2. Ações em Dungeons PvE (respostas numéricas 0, 1, 2, 3, 4)
    if (combat.isUserInBattle(sender) && /^[0-4]$/.test(cmd)) {
        const res = await combat.handleTurn(sender, parseInt(cmd, 10));
        return reply(res);
    }

    switch (cmd) {
        case 'despertar':
        case 'rpgstart': {
            const user = db.getUser(sender);
            return reply(
                `━━━ ⛩️ *O SISTEMA RESPONDEU AO SEU CHAMADO!* ⛩️ ━━━\n\n` +
                `✨ Parabéns, **${user.name}**! Você foi avaliado pelo Sistema Multiverso.\n` +
                `🎖️ **Rank Inicial:** [ ${user.rank} ]\n` +
                `🧬 **Sua Linhagem Despertada:** *${user.origin}*\n\n` +
                `*Como começar sua jornada:*\n` +
                `• Digite */perfil* para ver seus status completos.\n` +
                `• Digite */portal entrar* para abrir uma Dungeon e batalhar contra chefes lendários!\n` +
                `• Use */gacha* para invocar cartas colecionáveis dos animes.`
            );
        }

        case 'perfil':
        case 'perfilrpg':
        case 'status':
        case 'statusrpg': {
            const u = db.getUser(sender);
            const shadows = db.getUserShadows(sender);
            const shadowList = shadows.length > 0
                ? shadows.map((s) => `└ 👑 [${s.rank}] *${s.shadow_name}*`).join('\n')
                : "└ _Nenhuma sombra extraída até o momento._";

            return reply(
                `━━━ ⚔️ *SISTEMA DE CAÇADORES DO MULTIVERSO* ⚔️ ━━━\n` +
                `👤 *Caçador:* ${u.name}\n` +
                `🎖️ *Rank:* ${u.rank}  |  🌟 *Nível:* ${u.level}\n` +
                `🧬 *Origem:* ${u.origin}\n\n` +
                `📊 *STATUS DE BATALHA*\n` +
                `❤️ *HP:* ${createHealthBar(u.hp, u.max_hp)} ${u.hp}/${u.max_hp}\n` +
                `⚡ *EA/CK:* ${createHealthBar(u.energy, u.max_energy)} ${u.energy}/${u.max_energy}\n` +
                `💰 *Berries:* $ ${u.berries.toLocaleString()}\n` +
                `💎 *Cristais de Sombra:* ${u.crystals}\n` +
                `🏴‍☠️ *Recompensa:* ${u.bounty.toLocaleString()} Berries\n\n` +
                `💪 *Atributos:*\n` +
                `• FOR: ${u.stat_str} | AGI: ${u.stat_agi} | INT: ${u.stat_int}\n` +
                `• VIT: ${u.stat_vit} | SOR: ${u.stat_lck} (+${u.stat_points} pts livres)\n\n` +
                `👥 *Sombras Ativas (${shadows.length}):*\n` +
                `${shadowList}\n` +
                `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
                `💡 _Use /portal entrar para desafiar chefes!_`
            );
        }

        case 'portal':
        case 'dungeon': {
            const sub = (args[0] || '').toLowerCase();
            if (sub === 'entrar') {
                return reply(combat.startDungeon(sender, 'S'));
            }
            return reply(
                `━━━ ⛩️ *PORTAIS DE DUNGEONS DISPONÍVEIS* ⛩️ ━━━\n\n` +
                `Os Portais dimensionais conectam nosso mundo aos chefes mais perigosos do Multiverso Anime!\n\n` +
                `• *Portal Rank S:* Ryomen Sukuna [Jujutsu Kaisen]\n` +
                `• *Portal Rank A:* Kaido das Feras [One Piece]\n` +
                `• *Portal Rank B:* Nagato / Pain [Naruto]\n\n` +
                `🔥 Para desafiar uma Dungeon agora, digite: \`/portal entrar\``
            );
        }

        case 'gacha':
        case 'invocar': {
            return reply(gacha.pullGacha(sender));
        }

        case 'cartas':
        case 'album': {
            return reply(gacha.listUserCards(sender));
        }

        case 'forja':
        case 'forjar': {
            const num = parseInt(args[0], 10);
            if (isNaN(num)) return reply(forge.listWeapons(sender));
            return reply(forge.refineWeapon(sender, num));
        }

        case 'x1':
        case 'duelo': {
            const sub = (args[0] || '').toLowerCase();
            if (sub === 'aceitar') return reply(pvp.acceptChallenge(sender));
            if (!mentionJid) {
                return reply(
                    `━━━ ⚔️ *SISTEMA DE DUELOS PVP (1x1)* ━━━\n\n` +
                    `• \`/x1 @usuario [aposta]\` - Desafia outro caçador apostando Berries\n` +
                    `• \`/x1 aceitar\` - Aceita um desafio de duelo pendente\n\n` +
                    `💡 Exemplo: \`/x1 @SungJinWoo 1000\``
                );
            }
            const bet = parseInt(args[1], 10) || 0;
            return reply(pvp.challengeUser(sender, mentionJid, bet));
        }

        case 'guilda':
        case 'cla': {
            const sub = (args[0] || '').toLowerCase();
            if (sub === 'criar') return reply(guilds.createGuildCommand(sender, args.slice(1).join(' ')));
            if (sub === 'doar') return reply(guilds.donateGuildCommand(sender, args[1]));
            if (sub === 'lista' || sub === 'rank') return reply(guilds.listGuilds());
            return reply(guilds.guildStatus(sender));
        }

        case 'raid':
        case 'colossal': {
            const sub = (args[0] || '').toLowerCase();
            if (sub === 'atacar' || sub === 'lutar') return reply(raid.attackRaid(sender));
            return reply(raid.raidStatus());
        }

        case 'loja':
        case 'shop':
        case 'elixir': {
            const sub = (args[0] || '').toLowerCase();
            if (sub === 'comprar') return reply(shop.buyItem(sender, args[1], args[2]));
            if (sub === 'usar') return reply(shop.usePotion(sender, args[1]));
            return reply(shop.listShop());
        }

        case 'top':
        case 'toprpg':
        case 'ranking':
        case 'procurados': {
            const cat = (args[0] || 'level').toLowerCase();
            return reply(ranking.getLeaderboard(cat));
        }

        case 'mercado': {
            const sub = (args[0] || '').toLowerCase();
            if (sub === 'vender') return reply(market.sellCard(sender, args[1], args[2]));
            if (sub === 'comprar') return reply(market.buyListing(sender, args[1]));
            return reply(market.listMarket());
        }

        default:
            return null;
    }
}
