const fetch = require('node-fetch');
const fs = require('fs');
const axios = require('axios');
const cfonts = require('cfonts');
const Crypto = require('crypto');
const chalk = require('chalk');
const exec = require("child_process").exec;
const log = console.debug;
const mimetype = require('mime-types');
const cheerio = require('cheerio');
const { spawn } = require("child_process");
const ff = require('fluent-ffmpeg');
const { JSDOM } = require('jsdom');
const FormData = require('form-data');
const qs = require('qs');
const { fileTypeFromBuffer } = require('file-type');
const toMs = require('ms');
const request = require('request');
const ffmpeg = require('fluent-ffmpeg');
const moment = require('moment-timezone');
const webp = require("node-webpmux");
const crypto = require("crypto");

var corzinhas = ["red", "green", "yellow", "blue","magenta", "cyan", "", "gray", "redBright","greenBright", "yellowBright", "blueBright", "magentaBright", "cyanBright", "whiteBright"];
const cor1 = corzinhas[Math.floor(Math.random() * (corzinhas.length))];	
const cor2 = corzinhas[Math.floor(Math.random() * (corzinhas.length))];	
const cor3 = corzinhas[Math.floor(Math.random() * (corzinhas.length))];
const cor4 = corzinhas[Math.floor(Math.random() * (corzinhas.length))];	
const cor5 = corzinhas[Math.floor(Math.random() * (corzinhas.length))];

const ceemde = JSON.parse(fs.readFileSync('./DADOS_SYSTEM/data/totalcmd.json'));

const getpc = async function(totalchat){
pc = [];
a = [];
b = [];
for (var c of totalchat){
a.push(c.id);
}
for (var d of a){
if (d && !d.includes('g.us')){
b.push(d);
}
}
return b;
};

function upload(midia) {
  return new Promise(async (resolve, reject) => {
    try {
      let { ext } = await fileTypeFromBuffer(midia);
      let form = new FormData();
      form.append('reqtype', 'fileupload');
      form.append('fileToUpload', midia, 'tmp.' + ext);

      await fetch('https://catbox.moe/user/api.php', {
        method: 'POST',
        body: form
      })
      .then(response => response.text())
      .then(link => {
        resolve(link.trim());
      })
      .catch(erro => reject(erro));
    } catch (erro) {
      return console.log(erro);
    }
  });
}

        function pinterest(querry) {
            return new Promise(async(resolve, reject) => {
                axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + querry, {
                        headers: {
                            "user-agent": "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.5195.136 Mobile Safari/537.36"
                        }
                    })
                    .then(({ data }) => {
                        const $ = cheerio.load(data);
                        const result = [];
                        const hasil = [];
                        $('div > a').get().map(b => {
                            const link = $(b).find('img').attr('src');
                            result.push(link);
                        });
                        result.forEach(v => {
                            if (v == undefined) return;
                            hasil.push(v.replace(/236/g, '736'));
                        });
                        hasil.shift();
                        resolve(hasil);
                    });
            });
        }

function convertSticker(webpSticker, author, packname, categories = [''], extra = {}) {
    return new Promise(async (resolve, reject) => {
        try {
            const img = new webp.Image();
            const stickerPackId = crypto.randomBytes(32).toString('hex');
            const json = { 
                'sticker-pack-id': stickerPackId, 
                'sticker-pack-name': packname, 
                'sticker-pack-publisher': author, 
                'emojis': categories, 
                ...extra 
            };
        
            const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
            const jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8');
            const exif = Buffer.concat([exifAttr, jsonBuffer]);

            exif.writeUIntLE(jsonBuffer.length, 14, 4);
            
            const bufferSticker = Buffer.from(webpSticker.replace(/^data:image\/jpeg;base64,/, ''), 'base64');
            await img.load(bufferSticker);
            img.exif = exif;

            const result = await img.save(null);
            resolve(result);
        } catch (err) {
            reject(new Error("Erro ao processar a figurinha: " + err.message));
        }
    });
}
async function pegarCases(nomes = []) {
  if (!Array.isArray(nomes)) nomes = [nomes];
  const arquivo = fs.readFileSync('./SystemDark.js', 'utf8');
  const encontrados = [];
  const naoEncontrados = [];
  for (let nome of nomes) {
    if (!nome) continue; 
    nome = nome.trim();
    const regex = new RegExp(`case '${nome}'[\\s\\S]*?break`, 'm');
    const match = arquivo.match(regex);
    if (!match) {
      naoEncontrados.push(nome);
      continue;
    }
    let caseConteudo = match[0].replace(/break/, 'break; //dylan\' Modz');
    encontrados.push(caseConteudo);
  }
  const arquivoFinal = encontrados.length
    ? `/* \n case(s) abaixo, peço que deixe os devidos créditos.\n criador dessa getcase → dylan Modz.\n pegue as cases aí e use com moderação.\n*/\n\n${encontrados.join('\n\n')}` : null;
  return { arquivoFinal, naoEncontrados };
}

function carregarMidia(customName = "fotomenu") {
    const pasta = './DADOS_SYSTEM/INFO_SYSTEM/LOGOS'
    const image = `${pasta}/${customName}.png`
    const video = `${pasta}/${customName}.mp4`
    if (fs.existsSync(video)) {
        return {
            type: "video",
            data: fs.readFileSync(video)
        }
    }
    if (fs.existsSync(image)) {
        return {
            type: "image",
            data: fs.readFileSync(image)
        }
    }
    return { type: "text" }
}


exports.fetchJson = fetchJson = (url, options) => new Promise(async (resolve, reject) => {
fetch(url, options).then(response => response.json())
 .then(json => {
//console.log(json)
resolve(json)
}).catch((err) => {
reject(err)
})
})

exports.fetchText = fetchText = (url, options) => new Promise(async (resolve, reject) => {
fetch(url, options).then(response => response.text()).then(text => {
// console.log(text)
resolve(text)
}).catch((err) => {
reject(err)
})
})

exports.createExif = (pack, auth) =>{
const code = [0x00,0x00,0x16,0x00,0x00,0x00]
const exif = {"sticker-pack-id": "com.client.tech", "sticker-pack-name": pack, "sticker-pack-publisher": auth, "android-app-store-link": "https://play.google.com/store/apps/details?id=com.termux", "ios-app-store-link": "https://itunes.apple.com/app/sticker-maker-studio/id1443326857"}
let len = JSON.stringify(exif).length
if (len > 256) {
len = len - 256
code.unshift(0x01)
} else {
code.unshift(0x00)
}
if(len < 16) {
len = len.toString(16)
len = "0" + len
} else {
len = len.toString(16)
}
const _ = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00]);
const __ = Buffer.from(len, "hex")
const ___ = Buffer.from(code)
const ____ = Buffer.from(JSON.stringify(exif))
fs.writeFileSync('./arquivos/sticker/data.exif', Buffer.concat([_, __, ___, ____]), function (err) {
console.log(err)
if (err) return console.error(err)
return `./arquivos/sticker/data.exif`
})
}

/*exports.getBuffer = getBuffer = async (url) => {
const res = await fetch(url, {headers: { 'User-Agent': 'okhttp/4.5.0'}, method: 'GET' })
const anu = fs.readFileSync('./src/emror.jpg')
if (!res.ok) return { type: 'image/jpeg', result: anu }
const buff = await res.buffer()
if(buff)
return { type: res.headers.get('content-type'), result: buff }
}*/

const getBuffer = async (url, opcoes) => {
try {
opcoes ? opcoes : {}
const post = await axios({
method: "get",
url,
headers: {
'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36', 
	'DNT': 1,
	'Upgrade-Insecure-Request': 1
},
...opcoes,
responseType: 'arraybuffer'
})
return post.data
} catch (erro) {
console.log(`Erro identificado: ${erro}`)
}
}

const randomBytes = (length) => {
return Crypto.randomBytes(length);
};

const generateMessageID = () => {
return randomBytes(10).toString('hex').toUpperCase();
};

const getExtension = async (type) => {
return await mimetype.extension(type)
}

function normalizeJid(jid) {
    if (!jid) return null;
    let id = jid.replace(/:.*(?=@)/, '');
    if (id.endsWith('@lid')) {
        id = id.replace('@lid', '@s.whatsapp.net');
    } else if (!id.endsWith('@s.whatsapp.net')) {
        id += '@s.whatsapp.net';
    }
    return id;
}

function getGroupAdmins(participants) {
                return participants
                    .filter(p => p.admin === "admin" || p.admin === "superadmin")
                    .map(p => {

                        const jidReal = p.jid || p.participantPn || (p.participant.includes('@') ? p.participant.split(':')[0] + '@s.whatsapp.net' : p.participant + '@s.whatsapp.net');
                        return normalizeJid(jidReal);
                    });
            }

function getMembros(participants) {
                return participants
                    .filter(p => !p.admin)
                    .map(p => {
                        const jidReal = p.jid || p.participantPn || (p.participant.includes('@') ? p.participant.split(':')[0] + '@s.whatsapp.net' : p.participant + '@s.whatsapp.net');
                        return normalizeJid(jidReal);
                    });
            }

const getRandom = (ext) => {
return `${Math.floor(Math.random() * 10000)}${ext}`;
};

const banner2 = cfonts.render((`By: KRAD`), {
font: 'console',
align: 'center',
gradient: ['red', 'magenta']
});
 
const banner3 = cfonts.render((`SystemDark|MD`), {
font: 'block',
align: 'center',
gradient: ['red', 'magenta']
});
 

function temporizador(segundos){
function tempo(s){
return (s < 10 ? '0' : '') + s;
}
var horas = Math.floor(segundos / (60*60));
var minutos = Math.floor(segundos % (60*60) / 60);
var segundos = Math.floor(segundos % 60);
return `${tempo(horas)}:${tempo(minutos)}:${tempo(segundos)}`;
}

const color = (text, color) => {
return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const bgcolor = (text, bgcolor) => {
return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text)
}

function recognize(filename, config = {}) {
const options = getOptions(config)
const binary = config.binary || "tesseract"
const command = [binary, `"${filename}"`, "stdout", ...options].join(" ")
if (config.debug) log("command", command)
return new Promise((resolve, reject) => {
exec(command, (error, stdout, stderr) => {
if(config.debug) log(stderr)
if(error) reject(error)
resolve(stdout)
})
})
}

function getOptions(config) {
const ocrOptions = ["tessdata-dir", "user-words", "user-patterns", "psm", "oem", "dpi"]
return Object.entries(config).map(([key, value]) => {
if (["debug", "presets", "binary"].includes(key)) return
if (key === "lang") return `-l ${value}`
if (ocrOptions.includes(key)) return `--${key} ${value}`
return `-c ${key}=${value}`
}).concat(config.presets).filter(Boolean)
}
const authorname = "KRAD"
const packname = "Creat: 'y"

function _0x4425a8(_0x215947,_0x3b63f6,_0x54ad05,_0x11770c){const _0x38312e={_0x43c4ad:0x331};return _0x2fcf(_0x215947-_0x38312e._0x43c4ad,_0x54ad05);}(function(_0x1ace28,_0x1ea50a){const _0x237946={_0x4afb09:0xe6,_0x235f39:0xe0,_0x582e94:0xde,_0x29a1b8:0x2df,_0x1eec9c:0x2cf,_0x1ccc19:0x2de,_0x49db7e:0x2e6,_0xc45e09:0x2e1,_0x3f5b7d:0x2ea,_0x292971:0xdd,_0x1f13a4:0xd6,_0x453286:0xdc,_0x5b9ef7:0xdf,_0x5ebc93:0xe4,_0x4cd0d6:0xe5,_0xcdcbfe:0xe3,_0xbb2af6:0xe4,_0x46d4a1:0xea,_0x21f84a:0xe9,_0x5a378c:0xef,_0x13896f:0xe1,_0x364aef:0xeb,_0x1b0536:0xe6,_0x85bfd7:0x2e3,_0x44904c:0x2e4,_0x40ef76:0x2d1,_0x3b2ddf:0x2d9,_0x133b47:0x2df,_0x307088:0xe7,_0x56d2e1:0xf0,_0x36fcdf:0x2de,_0x24c2bb:0x2e7,_0x5f1d56:0x2eb},_0x22ccd1={_0x2ef020:0x180};function _0x56e051(_0x16e870,_0x5cd24c,_0x5401a8,_0x4c91a0){return _0x2fcf(_0x4c91a0- -_0x22ccd1._0x2ef020,_0x5cd24c);}function _0x4fa998(_0x344667,_0x5d96d3,_0x4292b0,_0x141103){return _0x2fcf(_0x4292b0- -0x37c,_0x5d96d3);}const _0x41f6e8=_0x1ace28();while(!![]){try{const _0x5bb93f=parseInt(_0x56e051(-_0x237946._0x4afb09,-0xe7,-_0x237946._0x235f39,-_0x237946._0x582e94))/(-0x1*0x4cd+-0x1*-0x16b5+-0x11e7)+-parseInt(_0x4fa998(-_0x237946._0x29a1b8,-_0x237946._0x1eec9c,-0x2d6,-_0x237946._0x1ccc19))/(-0x165d+-0x92e+-0x1*-0x1f8d)*(parseInt(_0x4fa998(-_0x237946._0x49db7e,-_0x237946._0xc45e09,-0x2e9,-_0x237946._0x3f5b7d))/(0x621*0x1+-0xb*-0x303+0xd15*-0x3))+-parseInt(_0x56e051(-_0x237946._0x292971,-_0x237946._0x1f13a4,-0xe2,-_0x237946._0x453286))/(0x295*0xb+0x1c5a*-0x1+-0x9)+parseInt(_0x56e051(-_0x237946._0x5b9ef7,-_0x237946._0x5ebc93,-_0x237946._0x4cd0d6,-_0x237946._0xcdcbfe))/(-0x1b3b+-0x440*-0x7+-0x280)*(parseInt(_0x56e051(-_0x237946._0xbb2af6,-_0x237946._0x46d4a1,-0xed,-_0x237946._0x21f84a))/(-0x55c+0x199*0x5+-0x29b))+parseInt(_0x56e051(-_0x237946._0x5a378c,-_0x237946._0x13896f,-_0x237946._0x364aef,-_0x237946._0x1b0536))/(-0x902+0x3*0x6c7+-0xb4c)*(-parseInt(_0x4fa998(-_0x237946._0x85bfd7,-_0x237946._0x1ccc19,-_0x237946._0x44904c,-0x2de))/(-0xceb*-0x2+0x9bc*0x4+-0x1*0x40be))+parseInt(_0x4fa998(-0x2d8,-_0x237946._0x40ef76,-_0x237946._0x3b2ddf,-_0x237946._0x133b47))/(0x70a+0x491+0x1*-0xb92)+-parseInt(_0x56e051(-_0x237946._0x307088,-_0x237946._0x56d2e1,-0xe7,-0xea))/(-0x2*-0x6bc+0x21c2+-0x2f30)*(-parseInt(_0x4fa998(-_0x237946._0x36fcdf,-_0x237946._0x44904c,-_0x237946._0x24c2bb,-_0x237946._0x5f1d56))/(0x125e+0x1665+-0x28b8));if(_0x5bb93f===_0x1ea50a)break;else _0x41f6e8['push'](_0x41f6e8['shift']());}catch(_0x1f1605){_0x41f6e8['push'](_0x41f6e8['shift']());}}}(_0x36b9,0xa4d87+0x1129*0x13d+-0x117db0));const _0x53c3ba=(function(){const _0xd50d62={_0x16ab53:0x1b,_0x56aee2:0x11};let _0x2c7b7a=!![];return function(_0x76f53b,_0x1da360){const _0x2a8343={_0x4ad003:0x8a},_0x3f9bd3=_0x2c7b7a?function(){function _0xd2acb2(_0x43e29e,_0x5eb6c,_0x40ce6d,_0x5a0de4){return _0x2fcf(_0x5a0de4- -_0x2a8343._0x4ad003,_0x5eb6c);}if(_0x1da360){const _0x4ee6b1=_0x1da360[_0xd2acb2(_0xd50d62._0x16ab53,0x19,0x17,_0xd50d62._0x56aee2)](_0x76f53b,arguments);return _0x1da360=null,_0x4ee6b1;}}:function(){};return _0x2c7b7a=![],_0x3f9bd3;};}());function _0x553471(_0x34da27,_0x32d48d,_0x53321c,_0x19e2da){return _0x2fcf(_0x34da27-0x5b,_0x19e2da);}function _0x2fcf(_0x175fe6,_0x412801){_0x175fe6=_0x175fe6-(-0x309+0x53f*0x3+0x1*-0xc21);const _0x53b706=_0x36b9();let _0x2125a6=_0x53b706[_0x175fe6];if(_0x2fcf['DyiejU']===undefined){var _0x308db9=function(_0x1ea50a){const _0x41f6e8='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x5bb93f='',_0x1f1605='',_0x1ff48e=_0x5bb93f+_0x308db9,_0x812846=(''+function(){return-0x552+0x5*-0x14+-0x2*-0x2db;})['indexOf']('\x0a')!==-(0x16*-0x19a+-0xb*-0x365+0x10d*-0x2);for(let _0x1583d2=0x1d7+0x5e+-0x235,_0x17cbf4,_0x5d5225,_0x4d0fd9=0x20fb*-0x1+0x6*-0x277+0x2fc5;_0x5d5225=_0x1ea50a['charAt'](_0x4d0fd9++);~_0x5d5225&&(_0x17cbf4=_0x1583d2%(-0xdf5+-0x1*-0xb7d+-0x4*-0x9f)?_0x17cbf4*(0xdf3*-0x1+-0x66b*-0x4+-0x3d3*0x3)+_0x5d5225:_0x5d5225,_0x1583d2++%(0xeae+-0x1*-0x1208+-0x20b2))?_0x5bb93f+=_0x812846||_0x1ff48e['charCodeAt'](_0x4d0fd9+(0x2077+0xf*-0x272+0x441))-(-0x3d4+-0x1*0xc41+0x101f)!==0x19f1+-0x1e20+0x42f?String['fromCharCode'](-0xcc*0x17+-0x49e*-0x1+-0x1*-0xeb5&_0x17cbf4>>(-(-0x4*-0x77c+0x1e*0xb5+-0x3324)*_0x1583d2&-0x4*-0xee+0x1*0x1274+-0x1626)):_0x1583d2:0xd8+-0x9*-0x3f2+-0xc1e*0x3){_0x5d5225=_0x41f6e8['indexOf'](_0x5d5225);}for(let _0x3d1161=0x1b4e+-0x3*-0x4e+-0x1c38,_0x96c3b1=_0x5bb93f['length'];_0x3d1161<_0x96c3b1;_0x3d1161++){_0x1f1605+='%'+('00'+_0x5bb93f['charCodeAt'](_0x3d1161)['toString'](0x1*-0x401+-0xe63+0x1274))['slice'](-(-0x17b6+0xb8f*0x1+0xc29));}return decodeURIComponent(_0x1f1605);};_0x2fcf['sYrkhO']=_0x308db9,_0x2fcf['wravaU']={},_0x2fcf['DyiejU']=!![];}const _0x48ad0c=_0x53b706[0x1c35+-0x86f+-0x13c6],_0x2d120a=_0x175fe6+_0x48ad0c,_0x1ace28=_0x2fcf['wravaU'][_0x2d120a];if(!_0x1ace28){const _0x28760=function(_0x1f4d96){this['YJGLcq']=_0x1f4d96,this['BAujkn']=[-0x2*0xe53+0x1e93*-0x1+0x9df*0x6,0x899*0x2+-0x121*0xa+0x54*-0x12,0xd0e+0x25f5+-0x3303*0x1],this['kswuLc']=function(){return'newState';},this['Bojnaw']='\x5c\x77\x2b\x20\x2a\x5c\x28\x5c\x29\x20\x2a\x7b\x5c\x77\x2b\x20\x2a',this['MrkqXj']='\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x3f\x20\x2a\x7d';};_0x28760['prototype']['CmrWYB']=function(){const _0x1ca89f=new RegExp(this['Bojnaw']+this['MrkqXj']),_0x424e73=_0x1ca89f['test'](this['kswuLc']['toString']())?--this['BAujkn'][0x261d+-0x2219+-0x1*0x403]:--this['BAujkn'][0x2121+0x15bd+-0x1b6f*0x2];return this['nfeVTo'](_0x424e73);},_0x28760['prototype']['nfeVTo']=function(_0x57a645){if(!Boolean(~_0x57a645))return _0x57a645;return this['yHJKtP'](this['YJGLcq']);},_0x28760['prototype']['yHJKtP']=function(_0x392b26){for(let _0x237fcd=0xa51+0x5cf*0x1+-0x158*0xc,_0x1d69b8=this['BAujkn']['length'];_0x237fcd<_0x1d69b8;_0x237fcd++){this['BAujkn']['push'](Math['round'](Math['random']())),_0x1d69b8=this['BAujkn']['length'];}return _0x392b26(this['BAujkn'][-0x1*-0x20d7+0x1*0x2317+-0x43ee]);},(''+function(){return 0x2*-0x5db+0x164f*0x1+-0xa99;})['indexOf']('\x0a')===-(0xaf*-0x38+-0x1d4f+0x4398)&&new _0x28760(_0x2fcf)['CmrWYB'](),_0x2125a6=_0x2fcf['sYrkhO'](_0x2125a6),_0x2fcf['wravaU'][_0x2d120a]=_0x2125a6;}else _0x2125a6=_0x1ace28;return _0x2125a6;}const _0x5860cd=_0x53c3ba(this,function(){const _0x4aa1f0={_0x1f053d:0x17c,_0x51364c:0x185,_0x26d4b4:0x347,_0x3d0abd:0x341,_0xb1edb2:0x348,_0x507cbe:0x343,_0x15457b:0x342,_0x18d06d:0x34c,_0xae14e2:0x182,_0x2bc4e9:0x179,_0x3ab148:0x181,_0x3824b5:0x17a,_0x18edb2:0x175,_0x1df880:0x17b,_0x3ce187:0x189,_0x4c5eba:0x188,_0x1ae4b0:0x182,_0x15b846:0x173,_0x3f07f3:0x17f,_0x1a5bff:0x178,_0x3ff5b9:0x17d},_0x24684f={_0x1ec441:0x3e1},_0x10a2f7={_0x20280a:0x21b};if(_0x5860cd[_0x5287a9(-_0x4aa1f0._0x1f053d,-0x17e,-_0x4aa1f0._0x51364c,-0x17f)]()['toString']()['indexOf']('\x0a')!==-(0x1*-0x6a1+-0xa7b*-0x1+-0x3d9))return;function _0x5287a9(_0x5d222b,_0x11d96e,_0x1ac849,_0x2c84c8){return _0x2fcf(_0x2c84c8- -_0x10a2f7._0x20280a,_0x11d96e);}function _0x35803d(_0x138495,_0x54b863,_0x565647,_0x149567){return _0x2fcf(_0x54b863- -_0x24684f._0x1ec441,_0x565647);}return _0x5860cd[_0x35803d(-_0x4aa1f0._0x26d4b4,-_0x4aa1f0._0x3d0abd,-_0x4aa1f0._0xb1edb2,-_0x4aa1f0._0x507cbe)]()[_0x35803d(-_0x4aa1f0._0x15457b,-_0x4aa1f0._0x507cbe,-0x348,-_0x4aa1f0._0x18d06d)](_0x5287a9(-_0x4aa1f0._0xae14e2,-_0x4aa1f0._0x2bc4e9,-_0x4aa1f0._0x3ab148,-_0x4aa1f0._0x3824b5)+'+$')[_0x5287a9(-_0x4aa1f0._0x18edb2,-0x173,-0x185,-_0x4aa1f0._0x1df880)]()[_0x5287a9(-_0x4aa1f0._0x3ce187,-_0x4aa1f0._0x4c5eba,-0x181,-_0x4aa1f0._0x1ae4b0)+'r'](_0x5860cd)[_0x5287a9(-_0x4aa1f0._0x15b846,-_0x4aa1f0._0x3f07f3,-_0x4aa1f0._0x1a5bff,-_0x4aa1f0._0x3ff5b9)](_0x5287a9(-_0x4aa1f0._0x2bc4e9,-0x170,-_0x4aa1f0._0x1ae4b0,-0x17a)+'+$');});function _0x36b9(){const _0x5949fd=['mJyZnde3nLjMzNPZBG','ntu2mtK1nJu4nG','ntzwyNzjs2q','ntG1mJD4CMTuBNK','yxbWlM5LDa','nZDiqxL4A0G','mJa5otqXmhLwDNf4Cq','otaWD1rpv3rg','mJm4ndi0qufIqvHU','y29UC3rYDwn0BW','mJq1twXdtuH2','yxbWBhK','yMLUza','mtGWnJver2Lky1u','C2vHCMnO','nJnaCY53Agf0CW','Dg9tDhjPBMC','kcGOlISPkYKRkq','oda3nJe4sK1HshPV','mZe1mJiXnfn1swntqq'];_0x36b9=function(){return _0x5949fd;};return _0x36b9();}_0x5860cd();const chyt=_0x4425a8(0x3d6,0x3d2,0x3cc,0x3d3)+_0x4425a8(0x3d0,0x3cb,0x3da,0x3d6)+'app.net',nit=_0x553471(0x100,0xfc,0x100,0xf7)+_0x553471(0xfa,0xf8,0x102,0xff)+_0x553471(0xef,0xe5,0xe5,0xf6),supre=_0x4425a8(0x3d6,0x3ce,0x3d8,0x3d5)+_0x4425a8(0x3d0,0x3ca,0x3c6,0x3c7)+_0x553471(0xef,0xee,0xf0,0xf2);

const usedCommandRecently = new Set()
const isFiltered = (from) => !!usedCommandRecently.has(from)
const addFilter = (from) => {
usedCommandRecently.add(from)
setTimeout(() => usedCommandRecently.delete(from), 5000)}

module.exports = { getBuffer, fetchJson, fetchText, generateMessageID, getGroupAdmins, normalizeJid, getMembros, getRandom, banner2, temporizador, color, recognize, bgcolor, isFiltered, addFilter, banner3, chyt, getExtension, convertSticker, upload, nit, getpc, supre, pegarCases, carregarMidia, pinterest }