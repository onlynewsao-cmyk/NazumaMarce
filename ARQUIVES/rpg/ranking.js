const db = require('./database.js');

function getLeaderboard(category = 'level') {
    let title = "🏅 TOP 5 CAÇADORES — MAIOR NÍVEL (XP)";
    const allUsers = db.getAllUsers();

    if (allUsers.length === 0) return "❌ _Nenhum caçador cadastrado ainda. Use /despertar!_";

    let sorted = [];
    let formatFn = (u, i) => `${i + 1}. **${u.name}** [Rank ${u.rank}] - Nível ${u.level} (${u.origin})`;

    if (category === 'bounty' || category === 'procurados') {
        title = "🏴‍☠️ TOP 5 CAÇADORES — MAIOR RECOMPENSA ($ BOUNTY)";
        sorted = allUsers.sort((a, b) => (b.bounty || 0) - (a.bounty || 0)).slice(0, 5);
        formatFn = (u, i) => `${i + 1}. **${u.name}** [Rank ${u.rank}] - $ ${(u.bounty || 0).toLocaleString()} Berries`;
    } else if (category === 'berries' || category === 'ouro') {
        title = "💰 TOP 5 CAÇADORES — MAIS RICOS DO MULTIVERSO";
        sorted = allUsers.sort((a, b) => (b.berries || 0) - (a.berries || 0)).slice(0, 5);
        formatFn = (u, i) => `${i + 1}. **${u.name}** - $ ${(u.berries || 0).toLocaleString()} Berries`;
    } else {
        sorted = allUsers.sort((a, b) => (b.level - a.level) || (b.xp - a.xp)).slice(0, 5);
    }

    const txt = sorted.map(formatFn).join('\n\n');

    return `━━━ ${title} ━━━\n\n${txt}\n\n💡 _Veja outros rankings com: /top level | /top bounty | /top ouro_`;
}

module.exports = {
    getLeaderboard
};
