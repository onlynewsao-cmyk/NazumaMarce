import * as db from './database.js';

export function createGuildCommand(userId, name) {
    if (!name || name.trim().length < 3) {
        return "⚠️ *O nome da Guilda/Clã deve ter pelo menos 3 caracteres!*\nExemplo: `/guilda criar Akatsuki`";
    }
    const user = db.getUser(userId);
    if (!user) return "⚠️ *Cadastre-se com /despertar primeiro!*";

    if (user.guild_id) {
        return "❌ *Você já pertence a uma Guilda!*";
    }

    const COST_CREATE = 5000;
    if (user.berries < COST_CREATE) {
        return `❌ *Berries Insuficientes!*\nCriar uma guilda oficial exige *$ ${COST_CREATE} Berries*. Você tem *$ ${user.berries}*.`;
    }

    try {
        const guild = db.createGuild(name.trim(), userId);
        db.updateUserStats(userId, {
            berries: user.berries - COST_CREATE,
            guild_id: guild.id
        });
        return `━━━ 🏰 *GUILDA CRIADA COM SUCESSO!* ━━━\n\n` +
               `⚔️ Nome: **${guild.name}** [Nível 1]\n` +
               `👑 Mestre da Guilda: *${user.name}*\n` +
               `💰 Saldo no Banco da Guilda: *$ 0 Berries*\n\n` +
               `💡 Outros caçadores podem entrar usando: \`/guilda entrar ${guild.id}\``;
    } catch (err) {
        return `❌ *Já existe uma Guilda chamada "${name.trim()}"!* Escolha outro nome.`;
    }
}

export function guildStatus(userId) {
    const user = db.getUser(userId);
    if (!user || !user.guild_id) {
        return `━━━ 🏰 *SISTEMA DE GUILDAS / CLÃS* ━━━\n\n` +
               `_Você não está em nenhuma guilda no momento._\n\n` +
               `• */guilda criar [nome]* - Cria seu próprio Clã ($ 5.000)\n` +
               `• */guilda lista* - Exibe os clãs de caçadores do servidor\n` +
               `• */guilda doar [valor]* - Contribua com Berries para evoluir o clã`;
    }

    const g = db.getGuild(user.guild_id);
    if (!g) return "❌ *Sua guilda não foi encontrada!*";
    const allUsers = db.getAllUsers();
    const membersCount = allUsers.filter(u => u.guild_id === g.id).length;

    return `━━━ 🏰 *GUILDA: ${g.name.toUpperCase()}* ━━━\n` +
           `🎖️ **Nível:** ${g.level}  |  👥 **Membros:** ${membersCount}\n` +
           `💰 **Banco do Clã:** $ ${g.bank_berries.toLocaleString()} Berries\n` +
           `⛩️ **Território Conquistado:** ${g.territory}\n` +
           `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
           `💡 _Use /guilda doar <qnt> para evoluir o nível e liberar buffs coletivos!_`;
}

export function donateGuildCommand(userId, amount) {
    const user = db.getUser(userId);
    if (!user || !user.guild_id) return "❌ *Você precisa estar em uma guilda para doar!*";

    const val = parseInt(amount, 10);
    if (isNaN(val) || val <= 0) return "⚠️ *Digite um valor numérico válido para doar!*";
    if (user.berries < val) return `❌ *Você não tem $ ${val} Berries suficientes!*`;

    const g = db.getGuild(user.guild_id);
    if (!g) return "❌ *Guilda não encontrada!*";

    const newBank = g.bank_berries + val;
    const newLevel = Math.floor(newBank / 10000) + 1;

    db.updateGuild(g.id, { bank_berries: newBank, level: newLevel });
    db.updateUserStats(userId, { berries: user.berries - val });

    return `━━━ 🤝 *DOAÇÃO PARA A GUILDA ${g.name}!* ━━━\n\n` +
           `👤 Doador: *${user.name}*\n` +
           `💰 Valor Doado: *$ ${val.toLocaleString()} Berries*\n` +
           `🏦 Novo Saldo da Guilda: *$ ${newBank.toLocaleString()}* [Nível ${newLevel}]`;
}

export function listGuilds() {
    const list = db.getAllGuilds().sort((a, b) => (b.level - a.level) || (b.bank_berries - a.bank_berries)).slice(0, 10);
    if (list.length === 0) return "❌ _Nenhuma guilda criada ainda. Use /guilda criar [nome]!_";

    const txt = list.map((g, i) => `${i + 1}. **${g.name}** [Nível ${g.level}] - ID: #${g.id}\n   └ Banco: $ ${g.bank_berries.toLocaleString()} | Território: ${g.territory}`).join('\n\n');
    return `━━━ 🏰 *RANKING DAS GUILDAS DO SERVIDOR* ━━━\n\n${txt}`;
}
