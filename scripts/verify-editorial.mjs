import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { parse } from 'parse5';
import { walk } from './approved-editorial.mjs';
const attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
const cls=(n,c)=>(attr(n,'class')??'').split(/\s+/).includes(c);
const txt=n=>n.tagName==='script'?'':n.value??(n.childNodes??[]).map(txt).join('');
const page=f=>parse(fs.readFileSync(f==='index.html'?'out/index.html':f==='404.html'?'out/404.html':`out/${f}/index.html`,'utf8'));
const manifest=JSON.parse(fs.readFileSync('evidence/html-baseline-20261018/manifest.json'));
const integrity=manifest.files.map(f=>{const b=fs.readFileSync('reference-html/'+f.path);const hash=b=>crypto.createHash('sha256').update(b).digest('hex');return{path:f.path,status:hash(b)===f.sha256?'exact':hash(b.toString().replace(/\r?\n/g,'\r\n'))===f.sha256?'git-lf-normalization':'MISMATCH'};});
assert(!integrity.some(x=>x.status==='MISMATCH'));
const files=manifest.files.filter(f=>f.path.endsWith('.html')).map(f=>f.path);
for(const f of files){const d=page(f);for(const nav of walk(d,n=>n.tagName==='nav'||n.tagName==='footer'))assert(!walk(nav,n=>n.tagName==='a'&&attr(n,'href')==='blog.html').length,`${f}: blog navigation`);assert(!/444 2525|0665 Broadway|info@denartclinic|123 456 7890|123 567 8910/.test(txt(d)),`${f}: stale contact`);for(const foot of walk(d,n=>n.tagName==='footer')){assert(txt(foot).includes('frontdesk@wcaldwelldentalarts.com'));for(const s of ['Tuesday','Every other Wednesday','Thursday','One Friday per month','Second Saturday'])assert(txt(foot).includes(s));}}
const h=page('index.html'),a=page('about.html');
const ht=txt(h).replace(/\s+/g,' '),at=txt(a).replace(/\s+/g,' ');
for(const s of ['Modern, compassionate care - building on a foundation of trust with advanced treatments and personalized attention.','In House Plans','Insurances','We participate with most major PPO insurances.',"If you don't have insurance, we offer in-house financing.",'Dr. Jonnathan Matute','Dr. Katherine Vega','Jennifer Oliveira, RDH','Hygienist','Oral Surgery'])assert(ht.includes(s),s);
assert(!ht.includes('A Trusted Dental You Can Trust'));assert(!at.includes('A Trusted Dental You Can Trust'));assert(!at.includes('Popular Questions'));assert(at.includes('Biography pending approval.'));
for(const d of [h,a]){const team=walk(d,n=>cls(n,'team'))[0];assert.equal(walk(team,n=>cls(n,'item')).length,3);}
for(const s of ['Jessica Matute','Office Manager','Caren Pino','Front Desk','Katie Calandriello','Dental Assistant'])assert(at.includes(s),s);
const sections=walk(h,n=>cls(n,'section-title')).map(txt);assert(sections.indexOf('In House Plans')<sections.indexOf('Insurances'));assert(sections.indexOf('Insurances')<sections.findIndex(t=>t.includes('The core values')));
const report={baseline:'8ce1f2ae6f5105cfa34b9178c0f82288be0268e5',pages:files.length,assertions:'PASS',original:{exact:integrity.filter(x=>x.status==='exact').length,gitLineEndingsOnly:integrity.filter(x=>x.status==='git-lf-normalization').length,mismatch:0},pending:['H03 central supplied chair asset; text changed, original icon retained pending faithful asset','A01 Vega biography approval','Browser visual and interaction verification'],integrity};
fs.mkdirSync('evidence/editorial-20261021',{recursive:true});fs.writeFileSync('evidence/editorial-20261021/static-checks.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({...report,integrity:undefined},null,2));
