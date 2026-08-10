import * as db from './database.js';

const RARITY_WEIGHTS = [
    { rarity: 'Mítico', chance: 3, emoji: '🔴' },
    { rarity: 'Lendário', chance: 12, emoji: '🟡' },
    { rarity: 'Épico', chance: 35, emoji: '🟣' },
    { rarity: 'Raro', chance: 100, emoji: '🔵' }
];

export function pullGacha(userId) {
    const user = db.getUser(userId);
    if (!user) return "⚠️ *Você precisa registrar o seu personagem com /despertar primeiro!*";

    const COST_BERRIES = 300;
    if (user.berries < COST_BERRIES) {
        return `❌ *Berries Insuficientes!*\nVocê possui apenas *$ ${user.berries}*. Você precisa de *$ ${COST_BERRIES}* para invocar um Card no Gacha!`;
    }

    db.updateUserStats(userId, { berries: user.berries - COST_BERRIES });

    const roll = Math.random() * 100;
    let chosenRarity = 'Raro';
    let rarityEmoji = '🔵';

    for (const w of RARITY_WEIGHTS) {
        if (roll <= w.chance) {
            chosenRarity = w.rarity;
            rarityEmoji = w.emoji;
            break;
        }
    }

    const allCards = db.getAllCatalogCards();
    const pool = allCards.filter(c => c.rarity === chosenRarity);
    const card = pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : allCards[0];

    db.addCardToUser(userId, card.id);

    return `━━━ 🎰 *ROLETANDO O GACHA DO MULTIVERSO...* ━━━\n\n` +
           `✨ Um feixe de luz corta os portais dimensionais!\n\n` +
           `${rarityEmoji} **CARTA [ ${card.rarity.toUpperCase()} ] DESBLOQUEADA!**\n` +
           `━━━ 🎴 *${card.name}* ━━━\n` +
           `⛩️ *Universo:* ${card.anime}\n` +
           `⚔️ *Bônus de ATK:* +${card.atk_bonus}  |  ❤️ *HP:* +${card.hp_bonus}\n` +
           `🌟 *Poder Passivo:* _${card.special_trait}_\n` +
           `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
           `💰 Saldo Restante: *$ ${user.berries - COST_BERRIES} Berries*\n` +
           `💡 _Use /cartas para ver sua coleção de cards!_`;
}

export function listUserCards(userId) {
    const user = db.getUser(userId);
    if (!user) return "⚠️ *Você precisa se registrar com /despertar!*";

    const cards = db.getUserCards(userId);
    if (cards.length === 0) {
        return `━━━ 🎴 *ÁLBUM DE CARDS DE ${user.name.toUpperCase()}* ━━━\n\n` +
               `_Você ainda não possui nenhum Card do Multiverso!_\n` +
               `👉 Use */gacha* para roletar cartas por 300 Berries!`;
    }

    const formatted = cards.slice(0, 10).map((c, idx) => {
        const eqIcon = c.equipped ? "✅ [EQUIPADO]" : "";
        return `${idx + 1}. [${c.rarity}] *${c.name}* ⭐${c.stars} ${eqIcon}\n   └ _ATK: +${c.atk_bonus} | HP: +${c.hp_bonus} (${c.special_trait})_`;
    }).join('\n\n');

    return `━━━ 🎴 *ÁLBUM DE CARDS (${cards.length} no Total)* ━━━\n` +
           `👤 Colecionador: *${user.name}*\n\n` +
           `${formatted}\n\n` +
           `💡 _Use /equipar <numero> para ativar o poder de uma carta em combate!_`;
}
