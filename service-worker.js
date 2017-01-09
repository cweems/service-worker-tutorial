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
