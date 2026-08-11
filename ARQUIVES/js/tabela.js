const { menu } = require('../../DADOS_SYSTEM/INFO_SYSTEM/lib/menus.js');

const tabela = (prefix, NomeDoBot, pushname = "Caçador") => {
    return menu(prefix, "krad@s.whatsapp.net", pushname, false, "Membro");
};

module.exports = {
    tabela
};
