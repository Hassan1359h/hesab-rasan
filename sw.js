const CACHE='rasan-accounting-v3-shamsi-20260909';
const ASSETS=['./','./app.html','./manifest.json','./rassan-accounting-192.png','./rassan-accounting-512.png','./rassan-accounting-maskable-192.png','./rassan-accounting-maskable-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{if(e.request.method==='GET'&&r.ok){let copy=r.clone();caches.open(CACHE).then(x=>x.put(e.request,copy))}return r}).catch(()=>caches.match('./app.html')))));
