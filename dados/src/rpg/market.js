import * as db from './database.js';

export function listMarket() {
    const listings = db.getMarketListings().sort((a, b) => a.price - b.price).slice(0, 10);

    if (listings.length === 0) {
        return `━━━ 🏪 *MERCADO LIVRE DE CARDS DO MULTIVERSO* ━━━\n\n` +
               `_Nenhum card em leilão no momento._\n\n` +
               `💡 Coloque suas cartas repetidas à venda usando: \`/mercado vender [id_card] [preço]\``;
    }

    const txt = listings.map((l) => {
        const seller = db.getUser(l.seller_id);
        const allCatalog = db.getAllCatalogCards();
        const catalogCard = allCatalog.find(c => c.id === l.item_id) || { name: 'Carta Lendária', rarity: 'Épico', anime: 'Multiverso' };

        return `🏷️ **Oferta #${l.id}:** [${catalogCard.rarity}] *${catalogCard.name}* (${catalogCard.anime})\n` +
               `   └ Vendedor: @${seller ? seller.name : 'Caçador'}  |  💰 Preço: **$ ${l.price.toLocaleString()} Berries**`;
    }).join('\n\n');

    return `━━━ 🏪 *MERCADO LIVRE DE CARDS (TOP OFERTAS)* ━━━\n\n${txt}\n\n💡 _Compre uma carta usando: /mercado comprar [id_oferta]_`;
}

export function sellCard(userId, userCardId, price) {
    const user = db.getUser(userId);
    if (!user) return "⚠️ *Cadastre-se com /despertar primeiro!*";

    const cards = db.getUserCards(userId);
    const card = cards.find(c => c.user_card_id === Number(userCardId));
    if (!card) return "❌ *Você não possui essa carta no seu álbum!* Use `/cartas` para ver os IDs numerados.";
    if (card.equipped) return "❌ *Não é possível vender uma carta equipada!* Desequipe primeiro.";

    const val = parseInt(price, 10);
    if (isNaN(val) || val <= 50) return "⚠️ *O preço mínimo no mercado é de $ 50 Berries!*";

    db.addMarketListing(userId, 'CARD', card.id, val);

    return `━━━ 🏪 *CARTA ANUNCIADA NO MERCADO!* ━━━\n\n` +
           `🎴 Item: **${card.name}** [${card.rarity}]\n` +
           `💰 Preço de Venda: **$ ${val.toLocaleString()} Berries**\n\n` +
           `💡 Qualquer caçador do servidor poderá comprar com \`/mercado comprar <id_oferta>\``;
}

export function buyListing(userId, offerId) {
    const user = db.getUser(userId);
    if (!user) return "⚠️ *Cadastre-se com /despertar primeiro!*";

    const listings = db.getMarketListings();
    const offer = listings.find(l => l.id === Number(offerId));
    if (!offer) return "❌ *Essa oferta não existe ou já foi comprada!*";

    if (offer.seller_id === userId) {
        return "❌ *Você não pode comprar sua própria oferta no mercado!*";
    }

    if (user.berries < offer.price) {
        return `❌ *Berries Insuficientes!* Você precisa de $ ${offer.price.toLocaleString()} e possui apenas $ ${user.berries.toLocaleString()}.`;
    }

    db.updateUserStats(userId, { berries: user.berries - offer.price });
    const seller = db.getUser(offer.seller_id);
    if (seller) {
        db.updateUserStats(seller.id, { berries: seller.berries + offer.price });
    }

    db.addCardToUser(userId, offer.item_id);
    db.removeMarketListing(offer.id);

    return `━━━ 🎉 *COMPRA NO MERCADO REALIZADA COM SUCESSO!* ━━━\n\n` +
           `🎴 A oferta #${offer.id} agora pertence ao caçador **${user.name}**!\n` +
           `💰 Valor Pago: *$ ${offer.price.toLocaleString()} Berries*\n` +
           `💡 _Verifique seu novo card com /cartas!_`;
}
