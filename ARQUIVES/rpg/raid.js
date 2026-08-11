const db = require('./database.js');

function createHealthBar(current, max) {
    const totalBlocks = 10;
    const filled = Math.max(0, Math.min(totalBlocks, Math.round((current / max) * totalBlocks)));
    return '█'.repeat(filled) + '░'.repeat(totalBlocks - filled);
}

function raidStatus() {
    const raid = db.getActiveRaid();
    if (!raid) {
        return `━━━ 🐲 *NENHUMA RAID MUNDIAL ATIVA NO MOMENTO!* ━━━\n_Os portais colossais estão silenciosos. Fique atento às notificações!_`;
    }

    const attackers = Object.entries(raid.attackers || {}).map(([uid, dmg]) => {
        const u = db.getUser(uid);
        return { name: u ? u.name : uid, dmg };
    }).sort((a, b) => b.dmg - a.dmg).slice(0, 5);

    const rankTxt = attackers.length > 0
        ? attackers.map((a, i) => `${i + 1}. *${a.name}*: ${a.dmg.toLocaleString()} dano`).join('\n')
        : "_Nenhum caçador atacou o chefe ainda!_";

    return `━━━ 🐲 *RAID MUNDIAL COLOSSAL (ATACA EM GRUPO)* ━━━\n\n` +
           `⛩️ Chefe Invadindo: **${raid.boss_name}** (${raid.anime})\n` +
           `❤️ HP do Boss: ${createHealthBar(raid.hp, raid.max_hp)} ${raid.hp.toLocaleString()} / ${raid.max_hp.toLocaleString()}\n\n` +
           `🏆 *TOP 5 CAÇADORES DA RAID:*\n` +
           `${rankTxt}\n` +
           `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
           `💡 _Digite /raid atacar para desferir um golpe em grupo!_`;
}

function attackRaid(userId) {
    const user = db.getUser(userId);
    if (!user) return "⚠️ *Cadastre-se com /despertar primeiro!*";

    const raid = db.getActiveRaid();
    if (!raid) return "❌ *Nenhuma Raid Mundial ativa no momento!*";

    const weapon = db.getEquippedWeapon(userId);
    const wAtk = weapon ? weapon.base_atk + (weapon.refinement * 12) : 20;

    let dmg = Math.round((user.stat_str * 3) + wAtk);
    const isCrit = (Math.random() * 100) < (10 + user.stat_lck);
    let critMsg = "";

    if (isCrit) {
        dmg = Math.round(dmg * 2.5);
        critMsg = "\n💥 **ACERTO CRÍTICO — FULGOR NEGRO!**";
    }

    const newHp = Math.max(0, raid.hp - dmg);
    raid.hp = newHp;
    if (!raid.attackers) raid.attackers = {};
    raid.attackers[userId] = (raid.attackers[userId] || 0) + dmg;

    const rewardBerries = Math.round(dmg * 2);
    const rewardXp = Math.round(dmg * 0.5);
    db.updateUserStats(userId, {
        berries: user.berries + rewardBerries,
        xp: user.xp + rewardXp
    });

    if (newHp === 0) {
        raid.active = false;
        db.saveActiveRaid(raid);
        return `━━━ 🏆 **RAID MUNDIAL DERROTADA!** ━━━\n\n` +
               `⚔️ **${user.name}** desferiu o Golpe Final em **${raid.boss_name}** causando **${dmg} de dano**!${critMsg}\n\n` +
               `🎁 *Recompensa Pessoal:* +$ ${rewardBerries} Berries | +${rewardXp} XP\n` +
               `✨ *O mundo do WhatsApp foi salvo do colapso!*`;
    }

    db.saveActiveRaid(raid);

    return `━━━ ⚔️ Você atacou **${raid.boss_name}** na Raid Mundial! ━━━${critMsg}\n` +
           `💥 **Dano Causado:** ${dmg.toLocaleString()}\n` +
           `🎁 **Recompensa Imediata:** +$ ${rewardBerries} Berries | +${rewardXp} XP\n\n` +
           `❤️ HP Restante do Chefe: ${newHp.toLocaleString()} / ${raid.max_hp.toLocaleString()}`;
}

module.exports = {
    raidStatus,
    attackRaid
};
