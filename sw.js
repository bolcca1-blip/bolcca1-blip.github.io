const CACHE="domaci-panel-v6";
const SHELL=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png"];

self.addEventListener("install", event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", event=>{
  event.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", event=>{
  const req=event.request;
  if(req.method!=="GET") return;

  const url=new URL(req.url);
  const sameOrigin=url.origin===self.location.origin;

  // For our own static files: cache-first, refresh in background.
  if(sameOrigin){
    event.respondWith(
      caches.match(req).then(cached=>{
        const network=fetch(req).then(resp=>{
          if(resp && resp.ok){
            const copy=resp.clone();
            caches.open(CACHE).then(c=>c.put(req,copy));
          }
          return resp;
        }).catch(()=>cached);
        return cached || network;
      })
    );
    return;
  }

  // External APIs/media: network first; don't trap stale dynamic content.
  event.respondWith(fetch(req).catch(()=>caches.match(req)));
});
