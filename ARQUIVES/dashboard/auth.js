const crypto = require('crypto');

const ADMIN_USERNAME = process.env.OWNER_USERNAME || "darknet";
const ADMIN_PASSWORD = process.env.OWNER_PASSWORD || "DarkNet@2026";
const SESSION_SECRET = process.env.SESSION_SECRET || "DarkBot_S3cr3t_K3y_DarkNet_2026_xyz789";

function createToken(username) {
    const timestamp = Date.now() + (48 * 60 * 60 * 1000); // 48 horas de sessão válida
    const payload = `${username}.${timestamp}`;
    const sig = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
    return `${payload}.${sig}`;
}

function verifyToken(token) {
    if (!token || typeof token !== "string") return false;
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    const [username, timestamp, sig] = parts;
    if (Date.now() > Number(timestamp)) return false;
    const expectedSig = crypto.createHmac('sha256', SESSION_SECRET).update(`${username}.${timestamp}`).digest('hex');
    return sig === expectedSig;
}

function login(username, password) {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        return { success: true, token: createToken(username), username };
    }
    return { success: false, reason: "Usuário ou Senha incorretos!" };
}

function logout(token) {
    // Stateless token: logout limpa no cookie do navegador
}

module.exports = {
    ADMIN_USERNAME,
    login,
    logout,
    verifyToken
};
