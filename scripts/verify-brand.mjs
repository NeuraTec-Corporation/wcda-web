import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {parse} from 'parse5';
import {walk} from './approved-editorial.mjs';
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
const manifest=JSON.parse(fs.readFileSync('evidence/html-baseline-20261018/manifest.json'));
const pages=manifest.files.filter(f=>f.path.endsWith('.html')).map(f=>f.path);
for(const f of pages){
 const file=f==='index.html'?'out/index.html':f==='404.html'?'out/404.html':`out/${f}/index.html`;
 const doc=parse(fs.readFileSync(file,'utf8'));
 assert.equal(walk(doc,n=>n.tagName==='img'&&attr(n,'src')==='/brand/logo-official.png').length,1,`${f}: official logo`);
 assert.equal(walk(doc,n=>n.tagName==='link'&&attr(n,'rel')==='stylesheet'&&attr(n,'href')==='/brand/theme.css').length,1,`${f}: brand stylesheet`);
 assert(walk(doc,n=>n.tagName==='link'&&(attr(n,'href')??'').includes('family=Montserrat:')).length,`${f}: Montserrat`);
}
const css=fs.readFileSync('out/brand/theme.css','utf8');
assert(!/#00bde0|#031b4e|#6e778c|"Jost"/.test(css));
for(const s of ['#002774','#ebe1d8','#b28e6e','rotateCircle'])assert(css.includes(s));
const assets=['background.jpeg','logo-official.jpeg','logo-official.png','designer-palette.jpeg'].map(file=>{
 const src=fs.readFileSync('public/brand/'+file),out=fs.readFileSync('out/brand/'+file);assert(src.equals(out));return {file,sha256:sha(src),bytes:src.length};
});
const result={batch:'B02',pages:pages.length,assertions:'PASS',assets,preserved:'Original reference files, section order, content, imagery and runtime; font metrics may change line breaks',pending:['User visual approval','Full tablet/mobile review']};
fs.mkdirSync('evidence/brand-20261022',{recursive:true});fs.writeFileSync('evidence/brand-20261022/static-checks.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
