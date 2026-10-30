const K='ja3';
self.addEventListener('install',e=>{e.waitUntil(caches.open(K).then(c=>c.addAll(['./','icon-192.png','icon-512.png','manifest.webmanifest'])).catch(()=>{}).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==K).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||!r.url.startsWith(self.location.origin))return;
if(r.mode==='navigate'){e.respondWith(fetch(r).then(n=>{const c=n.clone();caches.open(K).then(x=>x.put(r,c));return n}).catch(()=>caches.match(r).then(m=>m||caches.match('./'))));return}
e.respondWith(caches.open(K).then(c=>c.match(r).then(m=>{const f=fetch(r).then(n=>{if(n.ok)c.put(r,n.clone());return n}).catch(()=>m);return m||f})))});
