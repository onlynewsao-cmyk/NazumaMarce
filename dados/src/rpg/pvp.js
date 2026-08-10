import * as db from './database.js';

const activeDuels = new Map();

function createHealthBar(current, max) {
    const totalBlocks = 10;
    const filled = Math.max(0, Math.min(totalBlocks, Math.round((current / max) * totalBlocks)));
    return '█'.repeat(filled) + '░'.repeat(totalBlocks - filled);
}

export function challengeUser(challengerId, targetId, betAmount = 0) {
    if (challengerId === targetId) return "❌ *Você não pode desafiar a si mesmo para um duelo!*";

    const c = db.getUser(challengerId);
    const t = db.getUser(targetId);

    if (!t) return "❌ *O caçador desafiado ainda não iniciou sua jornada (/despertar)!*";
    if (activeDuels.has(challengerId) || activeDuels.has(targetId)) {
        return "⚠️ *Um dos caçadores já está engajado em outro combate ou duelo!*";
    }

    const bet = Math.max(0, parseInt(betAmount, 10) || 0);
    if (bet > 0 && (c.berries < bet || t.berries < bet)) {
        return `❌ *Berries Insuficientes para Aposta!*\nAmbos os caçadores precisam ter pelo menos *$ ${bet.toLocaleString()}*!`;
    }

    activeDuels.set(targetId, {
        challengerId,
        targetId,
        bet,
        accepted: false,
        turn: 1,
        attackerId: challengerId,
        defenderId: targetId
    });

    return `━━━ ⚔️ *DESAFIO DE DUELO 1x1 (PVP)* ━━━\n\n` +
           `👤 Desafiante: **${c.name}** [Rank ${c.rank}]\n` +
           `🎯 Alvo: **${t.name}** [Rank ${t.rank}]\n` +
           `💰 Aposta do Duelo: **$ ${bet.toLocaleString()} Berries**\n\n` +
           `💡 Para **${t.name}** aceitar a batalha e entrar na Arena, responda:\n` +
           `👉 \`/x1 aceitar\``;
}

export function acceptChallenge(targetId) {
    const duel = activeDuels.get(targetId);
    if (!duel || duel.accepted) return "❌ *Você não tem nenhum desafio de duelo pendente no momento!*";

    duel.accepted = true;
    const c = db.getUser(duel.challengerId);
    const t = db.getUser(duel.targetId);

    return `━━━ ⚔️ **ARENA PVP DO MULTIVERSO ABERTA!** ⚔️ ━━━\n\n` +
           `🔥 **${c.name}** vs **${t.name}**\n` +
           `💰 Aposta em Jogo: *$ ${duel.bet.toLocaleString()}*\n\n` +
           `❤️ **${c.name}:** ${createHealthBar(c.hp, c.max_hp)} ${c.hp}/${c.max_hp}\n` +
           `❤️ **${t.name}:** ${createHealthBar(t.hp, t.max_hp)} ${t.hp}/${t.max_hp}\n\n` +
           `🎮 *É o turno de ${c.name}! Escolha o ataque:*\n` +
           `[1] ⚔️ Golpe com Arma Lendária\n` +
           `[2] 💥 Golpe Crítico (Fulgor Negro)\n` +
           `[0] 🏃 Desistir do Duelo`;
}

export async function handlePvPTurn(userId, action) {
    let duel = null;
    let duelKey = null;

    for (const [key, d] of activeDuels.entries()) {
        if (d.accepted && (d.attackerId === userId || d.defenderId === userId)) {
            duel = d;
            duelKey = key;
            break;
        }
    }

    if (!duel) return "❌ *Você não está em nenhum duelo PvP ativo no momento!*";
    if (duel.attackerId !== userId) {
        const currentAttacker = db.getUser(duel.attackerId);
        return `⏳ *Aguarde a vez de ${currentAttacker ? currentAttacker.name : 'seu oponente'} jogar!*`;
    }

    const attacker = db.getUser(duel.attackerId);
    const defender = db.getUser(duel.defenderId);

    if (action === 0) {
        activeDuels.delete(duelKey);
        if (duel.bet > 0) {
            db.updateUserStats(defender.id, { berries: defender.berries + duel.bet });
            db.updateUserStats(attacker.id, { berries: Math.max(0, attacker.berries - duel.bet) });
        }
        return `━━━ 🏳️ **DUELO ENCERRADO** ━━━\n\n` +
               `**${attacker.name}** recuou da Arena!\n` +
               `🏆 Vencedor do Duelo: **${defender.name}** (+$ ${duel.bet.toLocaleString()})`;
    }

    const w = db.getEquippedWeapon(attacker.id);
    const wAtk = w ? w.base_atk + (w.refinement * 12) : 20;

    let dmg = Math.round((attacker.stat_str * 2.2) + wAtk - (defender.stat_vit * 0.8));
    let isCrit = action === 2 && (Math.random() * 100) < (15 + attacker.stat_lck);
    let critTxt = "";

    if (isCrit) {
        dmg = Math.round(dmg * 2.5);
        critTxt = "\n💥 **ACERTO CRÍTICO — FULGOR NEGRO!**";
    }

    const newHp = Math.max(0, defender.hp - dmg);
    db.updateUserStats(defender.id, { hp: newHp });

    if (newHp === 0) {
        activeDuels.delete(duelKey);
        const bountyGain = Math.round(15000 + (duel.bet * 2));
        db.updateUserStats(attacker.id, {
            berries: attacker.berries + duel.bet,
            bounty: attacker.bounty + bountyGain
        });
        db.updateUserStats(defender.id, {
            hp: defender.max_hp,
            berries: Math.max(0, defender.berries - duel.bet)
        });

        return `━━━ 🏆 **VITÓRIA NO DUELO 1x1!** ━━━\n\n` +
               `⚔️ **${attacker.name}** venceu **${defender.name}** na Arena!${critTxt}\n\n` +
               `💰 **Prêmio em Berries:** +$ ${duel.bet.toLocaleString()}\n` +
               `🏴‍☠️ **Recompensa de Procurado:** +${bountyGain.toLocaleString()} Berries!\n` +
               `✨ _A ficha de ${defender.name} foi restaurada no hospital._`;
    }

    const nextAttacker = defender.id;
    const nextDefender = attacker.id;
    duel.attackerId = nextAttacker;
    duel.defenderId = nextDefender;
    duel.turn++;

    return `⚔️ **${attacker.name}** golpeia **${defender.name}** causing **${dmg} de dano**!${critTxt}\n\n` +
           `❤️ **${attacker.name}:** ${createHealthBar(attacker.hp, attacker.max_hp)} ${attacker.hp}/${attacker.max_hp}\n` +
           `❤️ **${defender.name}:** ${createHealthBar(newHp, defender.max_hp)} ${newHp}/${defender.max_hp}\n\n` +
           `🎮 *É o turno de ${defender.name}! Escolha:* [1] Atacar | [2] Crítico | [0] Fugir`;
}

export function isUserInDuel(userId) {
    for (const d of activeDuels.values()) {
        if (d.accepted && (d.attackerId === userId || d.defenderId === userId)) return true;
    }
    return false;
}
