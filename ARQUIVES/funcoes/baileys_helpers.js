// ============================================================================
// SYSTEM DARK • BAILEYS HELPERS (KRAD)
// ============================================================================
async function sendInteractiveMessage(sock, jid, content, opts = {}) {
    const text = content.text || content.caption || "";
    return await sock.sendMessage(jid, { text }, opts);
}

async function sendButtons(sock, jid, text, footer, buttons, opts = {}) {
    return await sock.sendMessage(jid, { text: `${text}\n\n${footer || ""}` }, opts);
}

async function hydratedTemplate(sock, jid, content, opts = {}) {
    const text = content.text || content.caption || "";
    return await sock.sendMessage(jid, { text }, opts);
}

async function sendAlbumMessage(sock, jid, album, opts = {}) {
    return await sock.sendMessage(jid, { text: "Álbum de fotos" }, opts);
}

module.exports = {
    sendInteractiveMessage,
    sendButtons,
    hydratedTemplate,
    sendAlbumMessage
};
