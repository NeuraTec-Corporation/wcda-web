// Approved batch H01-H12, A01-A05, G01-G02. Original files remain immutable.
import { parseFragment, serializeOuter } from 'parse5';
export const walk = (n, p) => [...(p(n) ? [n] : []), ...(n.childNodes ?? []).flatMap(c => walk(c,p))];
const attr = (n,k) => n.attrs?.find(a=>a.name===k)?.value;
const cls = (n,c) => (attr(n,'class')??'').split(/\s+/).includes(c);
const text = n => n.value ?? (n.childNodes??[]).map(text).join('');
const one = (n,p) => {const a=walk(n,p);if(a.length!==1)throw Error(`Expected one node, got ${a.length}`);return a[0]};
const html = (n,s) => {n.childNodes=parseFragment(s).childNodes;for(const c of n.childNodes)c.parentNode=n;};
const set = (n,k,v) => {const a=n.attrs.find(a=>a.name===k);if(a)a.value=v;else n.attrs.push({name:k,value:v});};
const clone = n => parseFragment(serializeOuter(n)).childNodes[0];
const disable = (n,key) => {n.editorialFlag=key;};
const insertBefore = (target,n) => {let p=target.parentNode;n.parentNode=p;p.childNodes.splice(p.childNodes.indexOf(target),0,n)};
const insertAfter = (target,n) => {let p=target.parentNode;n.parentNode=p;p.childNodes.splice(p.childNodes.indexOf(target)+1,0,n)};
const remove = n => {let p=n.parentNode;p.childNodes.splice(p.childNodes.indexOf(n),1)};
const section = (b,needle) => one(b,n=>n.parentNode===b && text(n).includes(needle));
const title = n => one(n,x=>cls(x,'section-title'));
const schedule=[['Tuesday','8:00 AM – 5:00 PM'],['Every other Wednesday','10:00 AM – 3:00 PM'],['Thursday','9:00 AM – 6:00 PM'],['One Friday per month','9:00 AM – 2:00 PM'],['Second Saturday','8:00 AM – 1:00 PM']];
const hours='<ul>'+schedule.map(([d,t])=>`<li style="display:block;margin-bottom:10px"><div class="tit" style="display:block">${d}</div><span style="display:block">${t}</span></li>`).join('')+'</ul>';
const email='<a href="mailto:frontdesk@wcaldwelldentalarts.com">frontdesk@wcaldwelldentalarts.com</a>';
const phone='<a href="tel:+19035751507">(903) 575-1507</a>';
const address='555 Passaic Ave. Suite 203<br>West Caldwell NJ 07068';
function team(b,names,home){
 const s=one(b,n=>cls(n,'team'));
 set(s,'data-approved-team','three');
 if(home)disable(one(s,n=>cls(n,'section-subtitle')),'homeSpecialistLabel');
 else html(title(s),'Our <span>Team</span>');
 const cards=walk(one(s,n=>cls(n,'owl-carousel')),n=>cls(n,'item'));
 if(cards.length!==6)throw Error('Unexpected team inventory');
 cards.forEach((c,i)=>{if(i>=3)disable(c,home?'homeAdditionalTeam':'aboutAdditionalTeam');else{html(one(c,n=>cls(n,'name')),names[i][0]);html(one(c,n=>cls(n,'position')),names[i][1]);}});
}
export function applyEditorial(b,file){
 // B01: preserve the navigation slot; display the supplied official artwork.
 for(const a of walk(b,n=>n.tagName==='a'&&cls(n,'logo'))){
  html(a,'<span class="brand-logo-frame"><img src="/brand/logo-official.png" class="logo-img" alt="West Caldwell Dental Arts"></span>');
 }

 // Navigation only; retain the Blog page, posts and Home articles.
 for(const root of walk(b,n=>n.tagName==='nav'||n.tagName==='footer')){
  for(const a of walk(root,n=>n.tagName==='a'&&attr(n,'href')==='blog.html'))disable(a.parentNode,'blogNavigation');
 }
 // Contact corrections are scoped to real contact elements, not prose/testimonials.
 for(const f of walk(b,n=>n.tagName==='footer')){
  const item=walk(f,n=>cls(n,'item')).find(n=>walk(n,x=>x.tagName==='h3'&&text(x)==='Contact').length);
  if(item){html(walk(item,n=>n.tagName==='p')[0],address);const p=one(item,n=>cls(n,'phone'));html(p,`<small>Emergency</small><br>${phone}`);for(const old of walk(item,n=>n.tagName==='p'&&text(n)==='Emergency phone'))disable(old,'duplicateEmergencyLabel');html(one(item,n=>cls(n,'mail')),email);}
 }
 for(const n of walk(b,n=>cls(n,'opening')||cls(n,'worktime')))html(n,hours);
 for(const n of walk(b,n=>n.tagName==='p'&&text(n).trim()==='Book appointment'))html(n,'Emergency contact');
 for(const n of walk(b,n=>n.tagName==='a'&&/^tel:/.test(attr(n,'href')??''))){set(n,'href','tel:+19035751507');if(!walk(n,x=>x.tagName==='i').length)html(n,'(903) 575-1507');else {set(n,'aria-label','Emergency: (903) 575-1507');for(const c of n.childNodes??[])if(c.nodeName==='#text'&&/444|903/.test(c.value))c.value=' Emergency: (903) 575-1507';}}
 for(const n of walk(b,n=>cls(n,'call-button'))){for(const s of walk(n,x=>x.tagName==='span'&&cls(x,'text')))html(s,'Emergency');for(const a of walk(n,x=>x.tagName==='a'&&cls(x,'phone'))){html(a,'(903) 575-1507');set(a,'href','tel:+19035751507');}}
 for(const n of walk(b,n=>n.tagName==='a'&&/^mailto:/.test(attr(n,'href')??''))){set(n,'href','mailto:frontdesk@wcaldwelldentalarts.com');html(n,'frontdesk@wcaldwelldentalarts.com');}
 for(const n of walk(b,n=>n.nodeName==='#text')){n.value=n.value.replace(/\+\(1\) 123 456 7890/g,'Emergency: (903) 575-1507').replace(/\+1 123 567 8910(?: \/ 5)?/g,'Emergency: (903) 575-1507').replace(/info@denartclinic\.com/g,'frontdesk@wcaldwelldentalarts.com');}
 if(file==='contact.html'){
  const boxes=walk(one(b,n=>cls(n,'contact-box')),n=>cls(n,'item'));
  [address,email,phone].forEach((s,i)=>html(one(boxes[i],n=>n.tagName==='p'),s));html(one(boxes[2],n=>n.tagName==='h5'),'Emergency');
 }
 if(file==='index.html'){
  const hero=one(b,n=>n.tagName==='header');disable(one(hero,n=>n.tagName==='h5'),'homeDentalClinicLabel');html(one(hero,n=>n.tagName==='p'),'Modern, compassionate care - building on a foundation of trust with advanced treatments and personalized attention.');
  team(b,[['Dr. Jonnathan Matute','General Dentistry'],['Dr. Katherine Vega','General Dentistry'],['Jennifer Oliveira, RDH','Hygienist']],true);
  const trusted=section(b,'A Trusted Dental');disable(trusted,'homeTrustedSection');
  const pricing=one(b,n=>cls(n,'pricing'));html(title(pricing),'In House <span>Plans</span>');remove(pricing);insertBefore(trusted,pricing);
  const core=section(b,'The core values');
  const call=one(core,n=>cls(n,'call-button'));disable(call.parentNode.parentNode,'homeCoreAppointment');
  const insurance=clone(core);set(insurance,'id','insurances');
  html(title(insurance),'Insurances');html(one(insurance,n=>cls(n,'section-subtitle')),'<i class="icon"></i> We accept');
  const lists=walk(insurance,n=>n.tagName==='ul'&&cls(n,'page-list'));
  const names=[['Aetna PPO','Blue Cross Blue Shield PPO','United Concordia','Metlife PPO'],['Anthem PPO','Cigna','Guardian Dental PPO','Delta Dental PPO, Delta Dental Advantage, Delta Dental Advantage Plus, Delta Dental Premier Plus']];
  lists.forEach((ul,i)=>{const template=ul.childNodes.find(n=>n.tagName==='li');ul.childNodes=[];for(const name of names[i]){let li=clone(template);html(one(li,n=>n.tagName==='p'),name);set(one(li,n=>n.tagName==='span'),'class','fa-solid fa-check');li.parentNode=ul;ul.childNodes.push(li);}});
  const p=one(insurance,n=>n.tagName==='p'&&text(n).includes('Principles guiding'));html(p,'<strong>We participate with major insurances</strong><br>• We participate with most major PPO insurances.<br>• If you don\'t have insurance, we offer in-house financing.');
  const icall=one(insurance,n=>cls(n,'call-button'));disable(icall.parentNode.parentNode,'insuranceAppointment');
  insertBefore(core,insurance);
  // R02: move entire source nodes; preserve all markup and disabled sections.
  const about=one(b,n=>n.parentNode===b&&cls(n,'about')&&text(n).includes('Your Trusted Partner'));
  about.approvedHomeAbout=true;
  const services=one(b,n=>n.parentNode===b&&cls(n,'services3'));
  const doctors=one(b,n=>n.parentNode===b&&cls(n,'team'));
  const faq=one(b,n=>n.parentNode===b&&cls(n,'faqs'));
  const articles=one(b,n=>n.parentNode===b&&cls(n,'blog'));
  let previous=hero;
  for(const block of [core,about,services,pricing,insurance,doctors,faq,articles]){
    remove(block);insertAfter(previous,block);previous=block;
  }
 }
 if(file==='about.html'){
  const matute=section(b,'Dr. Jonnathan Matute is');const vega=clone(matute);set(vega,'id','dr-vega');html(title(vega),'Dr. Katherine <span>Vega</span>');
  const paragraphs=walk(vega,n=>n.tagName==='p');paragraphs.forEach((p,i)=>{if(i===0)html(p,'Biography pending approval.');else html(p,'');});
  // Preserve the copied layout but never attribute Matute's credentials to Vega.
  for(const n of walk(vega,n=>attr(n,'id')==='textcircle'))set(n,'id','textcircle-vega');
  for(const n of walk(vega,n=>n.tagName?.toLowerCase()==='textpath')){for(const a of n.attrs)if(a.value==='#textcircle')a.value='#textcircle-vega';}
  insertAfter(matute,vega);
  disable(section(b,'A Trusted Dental'),'aboutTrustedSection');disable(one(b,n=>n.parentNode===b&&cls(n,'faqs')),'aboutFaqSection');
  team(b,[['Jessica Matute','Office Manager'],['Caren Pino','Front Desk'],['Katie Calandriello','Dental Assistant']],false);
 }
}
