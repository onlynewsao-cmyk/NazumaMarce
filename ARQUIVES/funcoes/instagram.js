/* Instagram KKKKK, saporra foi difícil de achar tmncc
/* Deus abençoe a todos e não se esqueçam, desistir nunca foi uma opção.
*/
const { igdl } = require('btch-downloader');

async function baixarInstagram(q) {
    const resultado = await igdl(q);

    let candidate = null;
    for (const midia of resultado.result) {
        if (!midia || !midia.url) continue;
        const u = midia.url;
        if (u.match(/\.mp4(\?|$)/i) || u.match(/\.mov(\?|$)/i) || u.includes('video')) {
            candidate = u;
            break;
        }
        if (!candidate) candidate = u;
    }

    return candidate; 
}

module.exports = { baixarInstagram };

