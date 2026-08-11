const db = require('./database.js');

const REFINEMENT_RATES = [
    { target: 1, costBerries: 300, costCrystals: 5, chance: 95 },
    { target: 2, costBerries: 500, costCrystals: 10, chance: 85 },
    { target: 3, costBerries: 800, costCrystals: 15, chance: 75 },
    { target: 4, costBerries: 1200, costCrystals: 20, chance: 65 },
    { target: 5, costBerries: 2000, costCrystals: 30, chance: 50 },
    { target: 6, costBerries: 3500, costCrystals: 45, chance: 40 },
    { target: 7, costBerries: 5000, costCrystals: 60, chance: 30 },
    { target: 8, costBerries: 8000, costCrystals: 80, chance: 20 },
    { target: 9, costBerries: 12000, costCrystals: 100, chance: 15 },
    { target: 10, costBerries: 20000, costCrystals: 150, chance: 10 }
];

function refineWeapon(userId, weaponIndex = 1) {
    const user = db.getUser(userId);
    if (!user) return "⚠️ *Cadastre-se com /despertar primeiro!*";

    const weapons = db.getUserWeapons(userId);
    if (weapons.length === 0) {
        return "❌ *Você não possui nenhuma arma no inventário para forjar!*";
    }

    const idx = Math.max(0, Math.min(weapons.length - 1, weaponIndex - 1));
    const w = weapons[idx];

    if (w.refinement >= 10) {
        return `🔥 A arma *${w.name} (+10)* já atingiu o grau máximo divino da Forja!`;
    }

    const tier = REFINEMENT_RATES[w.refinement];
    if (user.berries < tier.costBerries || user.crystals < tier.costCrystals) {
        return `❌ *Recursos Insuficientes para Refinar (+${w.refinement} ➔ +${w.refinement + 1})*\n\n` +
               `• Custo em Berries: *$ ${tier.costBerries}* (Você tem: $ ${user.berries})\n` +
               `• Custo em Cristais: *💎 ${tier.costCrystals}* (Você tem: 💎 ${user.crystals})`;
    }

    db.updateUserStats(userId, {
        berries: user.berries - tier.costBerries,
        crystals: user.crystals - tier.costCrystals
    });

    const roll = Math.random() * 100;
    const isSuccess = roll <= tier.chance;

    if (isSuccess) {
        const nextLvl = w.refinement + 1;
        w.refinement = nextLvl;
        db.saveDB();
        const extraAtk = nextLvl * 12;

        return `━━━ ⚒️ *A BIGORNA DAS SOMBRAS RESSOA!* ⚒️ ━━━\n\n` +
               `✨ **SUCESSO NA FORJA (+${w.refinement - 1} ➔ +${nextLvl})!**\n` +
               `⚔️ Arma: *${w.name} +${nextLvl}*\n` +
               `💥 Poder de Ataque Total: *+${w.base_atk + extraAtk} ATK*\n` +
               `⚡ Efeito Especial: _${w.special_effect}_\n` +
               `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
               `💰 Saldo: *$ ${user.berries - tier.costBerries}* | 💎 *${user.crystals - tier.costCrystals}*`;
    } else {
        let newLvl = w.refinement;
        let penalidadeTxt = "A arma resistiu e manteve seu nível.";
        if (w.refinement >= 5) {
            newLvl = w.refinement - 1;
            w.refinement = newLvl;
            db.saveDB();
            penalidadeTxt = `⚠️ O calor excessivo trincou a lâmina! Regrediu para *+${newLvl}*.`;
        }

        return `━━━ 💥 *FALHA NA FORJA (+${w.refinement})!* 💥 ━━━\n\n` +
               `As chamas se dissiparam antes da infusão de energia!\n` +
               `${penalidadeTxt}\n` +
               `💡 _Tente novamente! Sua chance era de ${tier.chance}%._`;
    }
}

function listWeapons(userId) {
    const weapons = db.getUserWeapons(userId);
    if (weapons.length === 0) return "❌ _Nenhuma arma encontrada no seu inventário._";

    const text = weapons.map((w, i) => {
        const eq = w.equipped ? " ✅ [EQUIPADO]" : "";
        const totalAtk = w.base_atk + (w.refinement * 12);
        return `${i + 1}. *${w.name} +${w.refinement}* (${w.anime})${eq}\n   └ ATK: +${totalAtk} | _${w.special_effect}_`;
    }).join('\n\n');

    return `━━━ ⚔️ *ARSENAL DE ARMAS DO CAÇADOR* ━━━\n\n${text}\n\n💡 _Use /forja <numero> para refinar a arma!_`;
}

module.exports = {
    refineWeapon,
    listWeapons
};
