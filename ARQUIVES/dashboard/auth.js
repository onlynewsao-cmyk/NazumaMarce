const crypto = require('crypto');

// Credenciais de Administração (Configuráveis via .env com fallback seguro)
const ADMIN_USERNAME = process.env.OWNER_USERNAME || "darknet";
const ADMIN_PASSWORD = process.env.OWNER_PASSWORD || "DarkNet@2026";
const SESSION_SECRET = process.env.SESSION_SECRET || "DarkBot_S3cr3t_K3y_DarkNet_2026_xyz789";

// Gerenciador de sessões autenticadas em memória (token -> timestamp)
const activeSessions = new Map();

function createToken(username) {
    const hash = crypto.createHmac('sha256', SESSION_SECRET)
                       .update(username + "-" + Date.now())
                       .digest('hex');
    const token = `${username}:${hash}`;
    activeSessions.set(token, Date.now() + (24 * 60 * 60 * 1000)); // 24 horas
    return token;
}

function verifyToken(token) {
    if (!token || !activeSessions.has(token)) return false;
    const expiry = activeSessions.get(token);
    if (Date.now() > expiry) {
        activeSessions.delete(token);
        return false;
    }
    return true;
}

function login(username, password) {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        return { success: true, token: createToken(username), username };
    }
    return { success: false, reason: "Usuário ou Senha incorretos!" };
}

function logout(token) {
    activeSessions.delete(token);
}

module.exports = {
    ADMIN_USERNAME,
    login,
    logout,
    verifyToken
};
