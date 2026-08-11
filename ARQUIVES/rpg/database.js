const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'rpg_data.json');

const initialCatalogCards = [
    { id: 'sl-sung', name: 'Sung Jin-Woo (Monarca das Sombras)', anime: 'Solo Leveling', rarity: 'Mítico', atk_bonus: 150, hp_bonus: 400, special_trait: 'Arise: +50% de chance de extrair sombra' },
    { id: 'sl-cha', name: 'Cha Hae-In (Dançarina da Espada)', anime: 'Solo Leveling', rarity: 'Lendário', atk_bonus: 90, hp_bonus: 220, special_trait: 'Crítico +15%' },
    { id: 'na-naruto', name: 'Naruto Uzumaki (Modo Barion)', anime: 'Naruto', rarity: 'Mítico', atk_bonus: 140, hp_bonus: 450, special_trait: 'Regeneração de CK +10/turno' },
    { id: 'na-sasuke', name: 'Sasuke Uchiha (Rinnegan Supremo)', anime: 'Naruto', rarity: 'Lendário', atk_bonus: 110, hp_bonus: 240, special_trait: 'Esquiva +25%' },
    { id: 'op-luffy', name: 'Monkey D. Luffy (Gear 5 - Nika)', anime: 'One Piece', rarity: 'Mítico', atk_bonus: 160, hp_bonus: 380, special_trait: 'Imunidade a Atordoamento' },
    { id: 'op-zoro', name: 'Roronoa Zoro (Rei do Inferno)', anime: 'One Piece', rarity: 'Lendário', atk_bonus: 115, hp_bonus: 230, special_trait: 'Dano cortante +30%' },
    { id: 'jjk-gojo', name: 'Satoru Gojo (O Mais Forte)', anime: 'Jujutsu Kaisen', rarity: 'Mítico', atk_bonus: 170, hp_bonus: 420, special_trait: 'Infinito: 50% menos dano recebido' },
    { id: 'jjk-sukuna', name: 'Ryomen Sukuna (20 Dedos)', anime: 'Jujutsu Kaisen', rarity: 'Lendário', atk_bonus: 125, hp_bonus: 260, special_trait: 'Fukuma Mizushi automático no turno 1' },
    { id: 'jjk-yuji', name: 'Yuji Itadori (Punho Divergente)', anime: 'Jujutsu Kaisen', rarity: 'Épico', atk_bonus: 75, hp_bonus: 180, special_trait: 'Black Flash +20% chance' },
    { id: 'sl-jinho', name: 'Yoo Jin-Ho', anime: 'Solo Leveling', rarity: 'Raro', atk_bonus: 30, hp_bonus: 100, special_trait: 'Berries drop +20%' }
];

const initialCatalogWeapons = [
    { id: 'sl-kasaka', name: 'Espada de Presa de Kasaka', anime: 'Solo Leveling', base_atk: 35, special_effect: 'Sangramento: +15% Dano Contínuo' },
    { id: 'op-enma', name: 'Espada Enma', anime: 'One Piece', base_atk: 55, special_effect: 'Consome Haki: Dano Cortante +40%' },
    { id: 'na-samehada', name: 'Samehada (Espada Tubarão)', anime: 'Naruto', base_atk: 40, special_effect: 'Rouba 15 de CK do adversário ao golpear' },
    { id: 'jjk-lanca', name: 'Lança Invertida do Céu', anime: 'Jujutsu Kaisen', base_atk: 50, special_effect: 'Anula defesas e barreiras mágicas' }
];

let dbData = {
    users: {},
    shadows: {},
    userCards: {},
    userWeapons: {},
    guilds: {},
    marketListings: [],
    userItems: {},
    worldRaid: {
        id: 1,
        boss_name: 'Kaido Forma Dragão Colossal',
        anime: 'One Piece',
        hp: 100000,
        max_hp: 100000,
        active: true,
        attackers: {}
    },
    pvpHistory: []
};

if (fs.existsSync(dbPath)) {
    try {
        const raw = fs.readFileSync(dbPath, 'utf8');
        dbData = { ...dbData, ...JSON.parse(raw) };
    } catch (err) {
        console.error('Erro ao ler rpg_data.json, utilizando estado inicial:', err);
    }
}

let saveTimeout = null;
function saveDB() {
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        try {
            const tempPath = `${dbPath}.tmp`;
            fs.writeFileSync(tempPath, JSON.stringify(dbData, null, 2), 'utf8');
            fs.renameSync(tempPath, dbPath);
        } catch (e) {
            console.error('Erro ao salvar rpg_data.json:', e);
        }
    }, 150);
}

function ensureUserExists(userId, userName = 'Caçador Novato') {
    if (!dbData.users[userId]) {
        const origins = ['Shinobi', 'Feiticeiro Jujutsu', 'Pirata do Mar', 'Caçador das Sombras'];
        const chosenOrigin = origins[Math.floor(Math.random() * origins.length)];
        dbData.users[userId] = {
            id: userId,
            name: userName || 'Caçador Novato',
            level: 1,
            xp: 0,
            hp: 100,
            max_hp: 100,
            energy: 50,
            max_energy: 50,
            rank: 'E',
            origin: chosenOrigin,
            berries: 3500,
            crystals: 100,
            bounty: 0,
            stat_str: 15,
            stat_agi: 15,
            stat_int: 15,
            stat_vit: 15,
            stat_lck: 10,
            stat_points: 0,
            guild_id: null
        };
        dbData.userWeapons[userId] = [{
            id: 1,
            weapon_id: 'sl-kasaka',
            refinement: 0,
            equipped: true
        }];
        dbData.userItems[userId] = {
            'pocao_hp': 3
        };
        saveDB();
    }
    return dbData.users[userId];
}

function getUser(userId) {
    return dbData.users[userId] || null;
}

function updateUserStats(userId, updates) {
    if (!dbData.users[userId]) return null;
    dbData.users[userId] = { ...dbData.users[userId], ...updates };
    saveDB();
    return dbData.users[userId];
}

function getUserWeapons(userId) {
    const list = dbData.userWeapons[userId] || [];
    return list.map(uw => {
        const cat = initialCatalogWeapons.find(c => c.id === uw.weapon_id) || initialCatalogWeapons[0];
        return { ...cat, ...uw, user_weapon_id: uw.id };
    });
}

function getEquippedWeapon(userId) {
    const weapons = getUserWeapons(userId);
    return weapons.find(w => w.equipped) || weapons[0] || null;
}

function getUserCards(userId) {
    const list = dbData.userCards[userId] || [];
    return list.map(uc => {
        const cat = initialCatalogCards.find(c => c.id === uc.card_id) || initialCatalogCards[0];
        return { ...cat, ...uc, user_card_id: uc.id };
    });
}

function addCardToUser(userId, cardId) {
    if (!dbData.userCards[userId]) dbData.userCards[userId] = [];
    const nextId = (dbData.userCards[userId].length + 1) + Date.now();
    dbData.userCards[userId].push({
        id: nextId,
        card_id: cardId,
        stars: 1,
        equipped: false
    });
    saveDB();
    return nextId;
}

function getAllCatalogCards() {
    return initialCatalogCards;
}

function getActiveRaid() {
    if (!dbData.worldRaid || !dbData.worldRaid.active) return null;
    return dbData.worldRaid;
}

function saveActiveRaid(newRaid) {
    dbData.worldRaid = newRaid;
    saveDB();
}

function getItemQuantity(userId, itemId) {
    const userItems = dbData.userItems[userId] || {};
    return userItems[itemId] || 0;
}

function modifyItemQuantity(userId, itemId, delta) {
    if (!dbData.userItems[userId]) dbData.userItems[userId] = {};
    const current = dbData.userItems[userId][itemId] || 0;
    const next = Math.max(0, current + delta);
    dbData.userItems[userId][itemId] = next;
    saveDB();
    return next;
}

function getGuild(guildId) {
    return dbData.guilds[guildId] || null;
}

function getAllGuilds() {
    return Object.values(dbData.guilds);
}

function createGuild(name, leaderId) {
    const exists = Object.values(dbData.guilds).some(g => g.name.toLowerCase() === name.toLowerCase());
    if (exists) throw new Error('Guild already exists');
    const id = Date.now();
    dbData.guilds[id] = {
        id,
        name,
        leader_id: leaderId,
        level: 1,
        bank_berries: 0,
        territory: 'Nenhum'
    };
    saveDB();
    return dbData.guilds[id];
}

function updateGuild(guildId, updates) {
    if (!dbData.guilds[guildId]) return null;
    dbData.guilds[guildId] = { ...dbData.guilds[guildId], ...updates };
    saveDB();
    return dbData.guilds[guildId];
}

function getMarketListings() {
    return dbData.marketListings || [];
}

function addMarketListing(sellerId, itemType, itemId, price) {
    const id = Date.now();
    dbData.marketListings.push({
        id,
        seller_id: sellerId,
        item_type: itemType,
        item_id: itemId,
        price
    });
    saveDB();
    return id;
}

function removeMarketListing(offerId) {
    dbData.marketListings = dbData.marketListings.filter(m => m.id !== Number(offerId));
    saveDB();
}

function addShadow(userId, name, rank, atk, hp) {
    if (!dbData.shadows[userId]) dbData.shadows[userId] = [];
    dbData.shadows[userId].push({
        id: Date.now(),
        shadow_name: name,
        rank,
        level: 1,
        atk_bonus: atk,
        hp_bonus: hp
    });
    saveDB();
}

function getUserShadows(userId) {
    return dbData.shadows[userId] || [];
}

function getAllUsers() {
    return Object.values(dbData.users);
}

module.exports = {
    saveDB,
    ensureUserExists,
    getUser,
    updateUserStats,
    getUserWeapons,
    getEquippedWeapon,
    getUserCards,
    addCardToUser,
    getAllCatalogCards,
    getActiveRaid,
    saveActiveRaid,
    getItemQuantity,
    modifyItemQuantity,
    getGuild,
    getAllGuilds,
    createGuild,
    updateGuild,
    getMarketListings,
    addMarketListing,
    removeMarketListing,
    addShadow,
    getUserShadows,
    getAllUsers
};
