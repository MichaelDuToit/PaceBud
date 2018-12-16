const cacheVersion = "v1.2.2";
const cacheFiles = [
    "/",
    "/index.html",
    "/main.js",
    "/main.css"
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheVersion)
            .then(cache => cache.addAll(cacheFiles))
        )
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        self.clients.claim(),
        caches.keys().then(keys => Promise.all(
            keys.map((key)=> {
                if (key !== cacheVersion){
                    return caches.delete(key)
                }
            })
        ))
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
                return caches.match('/'); //Go to home page if page not found.
            })
        })
    )

});

self.addEventListener('message', (event) => {
    if(event.data.action === 'skipWaiting'){
        self.skipWaiting();
    }
});
