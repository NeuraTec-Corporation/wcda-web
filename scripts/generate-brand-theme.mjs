// B01: exact designer colors; preserve original selectors, geometry and effects.
import fs from 'node:fs';
const colors={
 '#031b4e':'#002774','#00bde0':'#002774','#6e778c':'#002774','#0e1323':'#002774',
 '#fff':'#ebe1d8','#ffffff':'#ebe1d8','#eff9ff':'#ebe1d8',
 '#f0f9ff':'#ebe1d8','#f2faff':'#ebe1d8','#f3faff':'#ebe1d8','#f5fbff':'#ebe1d8',
 '#f7fcff':'#ebe1d8','#f8fcff':'#ebe1d8','#fafdff':'#ebe1d8','#fbfdff':'#ebe1d8','#fdfeff':'#ebe1d8',
 '#b2daf2':'#b28e6e','#ffd27d':'#b28e6e','#fd961e':'#b28e6e',
 '#f4f4f4':'#ebe1d8','#f8f5f0':'#ebe1d8','#efeef6':'#ebe1d8','#e4e2f3':'#ebe1d8','#e8e8d4':'#b28e6e',
 '#00bde01f':'#b28e6e1f','#00bde012':'#b28e6e12'
};
let css=fs.readFileSync('reference-html/css/style.css','utf8')
 .replace(/#[a-f\d]{3,8}\b/gi,c=>colors[c.toLowerCase()]??c)
 .replace(/"Jost"/g,'"Montserrat"')
 .replace(/rgba\(0, 189, 224,/g,'rgba(178, 142, 110,')
 .replace(/rgba\(255, 255, 255,/g,'rgba(235, 225, 216,')
 .replace(/rgb\(255 255 255/g,'rgb(235 225 216')
 .replace(/rgba\(14, 19, 35,/g,'rgba(0, 39, 116,')
 .replace('url("../img/slider/1.jpg")','url("/wcda-assets/img/slider/1.jpg")')
 .replace('%23757086','%23002774');
css+='\n'+fs.readFileSync('src/content/brand-overrides.css','utf8');
fs.mkdirSync('public/brand',{recursive:true});
fs.writeFileSync('public/brand/theme.css','/* Generated from immutable original by scripts/generate-brand-theme.mjs. */\n'+css);
console.log('Generated official brand theme without changing source CSS.');
