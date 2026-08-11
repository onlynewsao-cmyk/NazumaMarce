const fs = require('fs');
const path = require('path');

let MongoClient = null;
try {
    MongoClient = require('mongodb').MongoClient;
} catch (e) {
    // mongodb não instalado ainda ou opcional
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://darkbot:Ik9499mVyRvpgRWt@cluster0.yzpwymq.mongodb.net/?appName=Cluster0";
const dbPath = path.join(__dirname, 'rpg_data.json');

async function syncToMongoDB() {
    if (!MongoClient || !MONGODB_URI) return;
    try {
        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        const db = client.db('system_dark_rpg');
        const col = db.collection('rpg_snapshot');

        if (fs.existsSync(dbPath)) {
            const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
            await col.updateOne({ _id: 'snapshot' }, { $set: { ...data, updatedAt: Date.now() } }, { upsert: true });
            console.log('☁️ [MONGODB CLOUD] Snapshot do RPG salvo no MongoDB com sucesso!');
        }
        await client.close();
    } catch (err) {
        console.error('❌ Erro na sincronização com MongoDB:', err.message);
    }
}

async function restoreFromMongoDB() {
    if (!MongoClient || !MONGODB_URI) return;
    try {
        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        const db = client.db('system_dark_rpg');
        const col = db.collection('rpg_snapshot');

        const doc = await col.findOne({ _id: 'snapshot' });
        if (doc) {
            delete doc._id;
            fs.writeFileSync(dbPath, JSON.stringify(doc, null, 2), 'utf8');
            console.log('☁️ [MONGODB CLOUD] Dados do RPG restaurados da nuvem MongoDB!');
        }
        await client.close();
    } catch (err) {
        console.error('❌ Erro na restauração com MongoDB:', err.message);
    }
}

module.exports = {
    syncToMongoDB,
    restoreFromMongoDB
};
