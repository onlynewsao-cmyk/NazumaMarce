const db = require('./database.js');

const activeBattles = new Map();

const BOSSES = {
    'S': {
        name: 'Ryomen Sukuna (Rei das Maldições)',
        origin: 'Jujutsu Kaisen',
        hp: 1200,
        atk: 85,
        def: 30,
        xp: 1500,
        berries: 50000,
        shadowRank: 'S'
    },
    'A': {
        name: 'Kaido das Feras',
        origin: 'One Piece',
        hp: 900,
        atk: 70,
        def: 45,
        xp: 900,
        berries: 30000,
        shadowRank: 'A'
    },
    'B': {
        name: 'Pain / Nagato (Akatsuki)',
        origin: 'Naruto',
        hp: 600,
        atk: 55,
        def: 20,
        xp: 500,
        berries: 15000,
        shadowRank: 'B'
    }
};

function createHealthBar(current, max) {
    const totalBlocks = 10;
    const filled = Math.max(0, Math.min(totalBlocks, Math.round((current / max) * totalBlocks)));
    return '█'.repeat(filled) + '░'.repeat(totalBlocks - filled);
}

function startDungeon(userId, rank = 'S') {
    const user = db.getUser(userId);
    if (!user) return "⚠️ *Você precisa usar /despertar antes de entrar nas Dungeons!*";

    const bossTemplate = BOSSES[rank] || BOSSES['B'];
    const battle = {
        userId,
        isPvE: true,
        boss: { ...bossTemplate, maxHp: bossTemplate.hp },
        turn: 1,
        domainActive: 0,
        log: []
    };

    activeBattles.set(userId, battle);

    return `━━━ ⛩️ *PORTAL RANK ${rank} DETECTADO!* ⛩️ ━━━\n\n` +
           `O chefe *${battle.boss.name}* (${battle.boss.origin}) surgiu no domínio!\n\n` +
           `😈 *Boss HP:* ${createHealthBar(battle.boss.hp, battle.boss.maxHp)} ${battle.boss.hp}/${battle.boss.maxHp}\n` +
           `👤 *${user.name}:* ${createHealthBar(user.hp, user.max_hp)} ${user.hp}/${user.max_hp}\n\n` +
           `*Escolha sua ação rápida:*\n` +
           `[1] ⚔️ Atacar com Arma Física\n` +
           `[2] 🌀 Usar Habilidade / Jutsu\n` +
           `[3] 🌑 Expansão de Domínio\n` +
           `[4] 👤 Extração de Sombra (Arise)\n` +
           `[0] 🏃 Fugir da Dungeon\n\n` +
           `_Responda apenas com o número da ação (0 a 4)!_`;
}

async function handleTurn(userId, actionIndex) {
    const battle = activeBattles.get(userId);
    if (!battle) return "⚠️ *Você não está em nenhuma batalha ativa! Use /portal para começar.*";

    const user = db.getUser(userId);
    let logText = "";

    if (actionIndex === 0) {
        activeBattles.delete(userId);
        return "🏃 *Você recuou da Dungeon com segurança!*";
    }

    if (actionIndex === 1 || actionIndex === 2) {
        let dmg = Math.round((user.stat_str * 2.5) - (battle.boss.def * 0.5));
        let critChance = Math.min(50, 5 + (user.stat_lck * 0.3));
        let isCrit = (Math.random() * 100) < critChance;

        if (battle.domainActive > 0) dmg = Math.round(dmg * 1.4);

        if (isCrit) {
            dmg = Math.round(dmg * 2.5);
            logText += `💥 *FULGOR NEGRO (BLACK FLASH)!* Raios negros envolvem seu golpe!\n`;
        }

        battle.boss.hp = Math.max(0, battle.boss.hp - dmg);
        logText += `⚔️ Você atacou *${battle.boss.name}* causando *${dmg} de dano*!\n\n`;
    }
    else if (actionIndex === 3) {
        if (battle.domainActive > 0) {
            return "⚠️ *Seu domínio já está ativo em combate! Escolha outra ação.*";
        }
        battle.domainActive = 3;
        logText += `🤞 *EXPANSÃO DE DOMÍNIO ATIVADA!*\n` +
                   `🏛️ O céu escurece! Por 3 turnos, seus golpes têm *100% de precisão* e *+40% de dano*!\n\n`;
    }
    else if (actionIndex === 4) {
        if (battle.boss.hp > battle.boss.maxHp * 0.35) {
            return "⚠️ *Você só pode tentar Extrair a Sombra (Arise) quando o Boss estiver com 35% ou menos de HP!*";
        }
        const successChance = 35 + (user.stat_lck * 2);
        if ((Math.random() * 100) < successChance) {
            db.addShadow(userId, battle.boss.name, battle.boss.shadowRank, 35, 120);
            activeBattles.delete(userId);
            return `🌑 *ARISE... ("ERGA-SE")*\n\n` +
                   `👑 A sombra negra de *${battle.boss.name}* se curva diante de você!\n` +
                   `✨ *Nova Sombra [Rank ${battle.boss.shadowRank}] adicionada à sua coleção!*\n` +
                   `💰 Você recebeu *$ ${battle.boss.berries} Berries* e *+${battle.boss.xp} XP*!`;
        } else {
            logText += `❌ *A tentativa de Extração de Sombra falhou!* O chefe resistiu ao seu comando.\n\n`;
        }
    }

    if (battle.boss.hp <= 0) {
        db.updateUserStats(userId, {
            xp: user.xp + battle.boss.xp,
            berries: user.berries + battle.boss.berries
        });
        activeBattles.delete(userId);
        return logText +
               `🏆 *VITÓRIA NA DUNGEON!*\n` +
               `Você derrotou *${battle.boss.name}*!\n` +
               `💰 *+${battle.boss.berries} Berries*  |  🌟 *+${battle.boss.xp} XP*`;
    }

    let bossDmg = Math.max(5, Math.round(battle.boss.atk - (user.stat_vit * 0.8)));
    let newHp = Math.max(0, user.hp - bossDmg);
    db.updateUserStats(userId, { hp: newHp });

    if (battle.domainActive > 0) battle.domainActive--;
    battle.turn++;

    if (newHp <= 0) {
        activeBattles.delete(userId);
        db.updateUserStats(userId, { hp: user.max_hp });
        return logText + `☠️ *VOCÊ FOI DERROTADO POR ${battle.boss.name}!* Sua vida foi restaurada na enfermaria.`;
    }

    return logText +
           `😈 *${battle.boss.name}* contra-ataca e causa *${bossDmg} de dano*!\n\n` +
           `😈 *Boss HP:* ${createHealthBar(battle.boss.hp, battle.boss.maxHp)} ${battle.boss.hp}/${battle.boss.maxHp}\n` +
           `👤 *Seu HP:* ${createHealthBar(newHp, user.max_hp)} ${newHp}/${user.max_hp}\n\n` +
           `*Escolha sua ação (Turno ${battle.turn}):*\n` +
           `[1] ⚔️ Atacar  |  [3] 🌑 Domínio  |  [4] 👤 Arise (Erga-se)  |  [0] 🏃 Fugir`;
}

function isUserInBattle(userId) {
    return activeBattles.has(userId);
}

module.exports = {
    startDungeon,
    handleTurn,
    isUserInBattle
};
