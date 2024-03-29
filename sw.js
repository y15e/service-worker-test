var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = ['/cache.html'];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          console.log('cache hit')
          return response;
        }
        console.log('cache not hit')
        return fetch(event.request);
      }
    )
  );
});
