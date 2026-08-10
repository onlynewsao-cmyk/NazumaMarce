import * as db from './database.js';

const SHOP_CATALOG = {
    'pocao': {
        id: 'pocao_hp',
        name: 'Poção de Vida Sênzu / Elixir de Cura',
        price: 300,
        desc: 'Restaura 100% dos seus pontos de HP instantaneamente.',
        type: 'HEAL_HP'
    },
    'chakra': {
        id: 'pocao_ck',
        name: 'Elixir de Chakra / Energia Amaldiçoada',
        price: 250,
        desc: 'Restaura toda a sua barra de Energia/Chakra.',
        type: 'HEAL_ENERGY'
    },
    'pedra': {
        id: 'pedra_protecao',
        name: 'Pedra de Proteção de Forja',
        price: 1500,
        desc: 'Protege a arma de perder nível em caso de falha na Bigorna.',
        type: 'PROTECTION_STONE'
    }
};

export function listShop() {
    const txt = Object.entries(SHOP_CATALOG).map(([key, item]) => {
        return `🛍️ **[${key.toUpperCase()}]** - *${item.name}*\n` +
               `   └ 💰 Preço: **$ ${item.price.toLocaleString()} Berries**\n` +
               `   └ 💡 _${item.desc}_`;
    }).join('\n\n');

    return `━━━ 🧪 *LOJA DO SISTEMA & ELIXIRES* ━━━\n\n` +
           `${txt}\n\n` +
           `💡 Para comprar, digite: \`/loja comprar [item] [quantidade]\`\n` +
           `Exemplo: \`/loja comprar pocao 2\``;
}

export function buyItem(userId, itemKey, quantity = 1) {
    const user = db.getUser(userId);
    if (!user) return "⚠️ *Cadastre-se com /despertar primeiro!*";

    const key = (itemKey || '').toLowerCase();
    const item = SHOP_CATALOG[key];
    if (!item) {
        return `❌ *Item não encontrado na Loja!*\nItens disponíveis: \`pocao\`, \`chakra\`, \`pedra\`.`;
    }

    const qty = Math.max(1, parseInt(quantity, 10) || 1);
    const totalCost = item.price * qty;

    if (user.berries < totalCost) {
        return `❌ *Berries Insuficientes!* Custo Total: $ ${totalCost.toLocaleString()} Berries. Você tem $ ${user.berries.toLocaleString()}.`;
    }

    db.updateUserStats(userId, { berries: user.berries - totalCost });
    const newQty = db.modifyItemQuantity(userId, item.id, qty);

    return `━━━ 🧪 *COMPRA REALIZADA COM SUCESSO!* ━━━\n\n` +
           `🛍️ Item: **${item.name}**\n` +
           `📦 Quantidade Comprada: **${qty}x**\n` +
           `💰 Custo Total: **$ ${totalCost.toLocaleString()} Berries**\n` +
           `🎒 Em Estoque na sua Bolsa: **${newQty}x**`;
}

export function usePotion(userId, itemKey) {
    const user = db.getUser(userId);
    if (!user) return "⚠️ *Cadastre-se com /despertar primeiro!*";

    const key = (itemKey || '').toLowerCase();
    const item = SHOP_CATALOG[key];
    if (!item || (item.type !== 'HEAL_HP' && item.type !== 'HEAL_ENERGY')) {
        return "⚠️ *Você só pode usar itens consumíveis de cura como `pocao` ou `chakra`!*";
    }

    const currentQty = db.getItemQuantity(userId, item.id);
    if (currentQty <= 0) {
        return `❌ *Você não possui nenhuma unidade de ${item.name}!* Compre em \`/loja\`.`;
    }

    db.modifyItemQuantity(userId, item.id, -1);

    if (item.type === 'HEAL_HP') {
        db.updateUserStats(userId, { hp: user.max_hp });
        return `━━━ 🧪 **POÇÃO DE VIDA UTILIZADA!** ━━━\n❤️ Seu HP foi restaurado para **${user.max_hp}/${user.max_hp}**! (Restam: ${currentQty - 1}x na bolsa)`;
    } else {
        db.updateUserStats(userId, { energy: user.max_energy });
        return `━━━ 🧪 **ELIXIR DE CHAKRA UTILIZADO!** ━━━\n⚡ Sua Energia foi restaurada para **${user.max_energy}/${user.max_energy}**! (Restam: ${currentQty - 1}x na bolsa)`;
    }
}
