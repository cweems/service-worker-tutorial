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
      })
  );
});
