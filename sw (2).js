const V='ja-v6';
const LOCAL=['./','index.html','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png'];
const FB=['https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js','https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js','https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js'];
const EXT=/^https:\/\/(www\.gstatic\.com\/firebasejs\/|fonts\.googleapis\.com\/|fonts\.gstatic\.com\/)/;
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(async c=>{await Promise.all(LOCAL.map(u=>c.add(u).catch(()=>{})));await Promise.all(FB.map(u=>fetch(u,{mode:'no-cors'}).then(r=>c.put(u,r)).catch(()=>{})))}))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
const swr=(r)=>caches.match(r).then(m=>{const n=fetch(r).then(x=>{if(x&&(x.ok||x.type==='opaque')){const c=x.clone();caches.open(V).then(h=>h.put(r,c))}return x}).catch(()=>m);return m||n});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
if(u.origin===location.origin){
 if(r.mode==='navigate'||u.pathname.endsWith('.html')||u.pathname.endsWith('/')){e.respondWith(fetch(r,{cache:'no-cache'}).then(x=>{const c=x.clone();caches.open(V).then(h=>h.put(r,c));return x}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html')||caches.match('./'))));return}
 e.respondWith(swr(r));return}
if(EXT.test(r.url))e.respondWith(swr(r))});
