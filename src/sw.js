const cacheVersion = "v1";
const cacheFiles = [
    "./",
    "./index.html",
    "./main.js",
    "./main.css"
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheVersion)
            .then(cache => cache.addAll(cacheFiles))
            .then(self.skipWaiting())
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
})