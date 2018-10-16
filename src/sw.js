const cacheVersion = "v1.1";
const cacheFiles = [
    "/",
    "/index.html",
    "/main.js",
    "/main.css"
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(cacheVersion)
            .then(cache => cache.addAll(cacheFiles))
            .catch(err => console.log('[sw.js]: ' + err))
        );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).then((response) => {
                return caches.open(cacheVersion).then((cache) =>{
                    cache.put(event.request, response.clone());
                    return response;
                });
            }).catch(()=>{
                return caches.match('/'); //404 Page
            })
        })
    )
});

self.addEventListener('activate', (event) => {
    self.clients.claim();
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if(!cacheVersion.includes(key)){
                    return caches.delete(key);
                }
            })
        ))
    );
});