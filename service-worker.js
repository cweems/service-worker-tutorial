var CACHE_NAME = 'building-inspector-cache-v1';

var baseSiteFiles = [
  './',
  '/style.css'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(baseSiteFiles);
      }).then(function(){
        // Force the service worker to become active
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', function(event) {
  // Claim all sessions
  return self.clients.claim();
});

// Add an event listener for when the browser fetches
self.addEventListener('fetch', function(event) {
  // Respond to the event with a promise
  event.respondWith(
    // Check if we have the file in our cache
    caches.match(event.request)
      .then(function(response) {
        // If we find it, return it
        if (response) {
          return response;
        }

        // If we can't find the file, we clone the request
        var fetchRequest = event.request.clone();

        // Return the request we need to make
        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              // If not, we just return it
              return response;
            }
            // Clone the response to put in the cache
            var responseToCache = response.clone();

            // Add the cloned resource to our cache
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});
