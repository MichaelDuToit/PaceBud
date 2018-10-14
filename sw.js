var cacheVersion = "v1";
var route = "/pace-calculator-pwa"
var cacheFiles = [
    route + "/",
    route + "/index.html",
    route + "/scripts.js",
    route + "/main.css"
];

self.addEventListener('install', function(e){
    e.waitUntil(
        caches.open(cacheVersion).then(function(cache){
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('fetch', function(e){
    e.respondWith(
        caches.match(e.request).then(function(response){
            return response || fetch(e.request).then(function(response){
                return caches.open(cacheVersion).then(function(cache){
                    cache.put(e.request, response.clone());
                    return response;
                });
            }).catch(function(){
                return caches.match(route + '/index.html'); //This is SW's version of 404, replace with a not found page later.
            })
        })
    );
});
