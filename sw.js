const URGENCEDEVLINT = 'v1.0.2';
const RUNTIME = 'runtime';

// A list of local resources we always want to be cached.
const URGENCEDEVLINT_URLS = [
  'index.html',
  './', // Alias for index.html
  'img/samu.svg',
  'img/police.svg',
  'img/pompier.svg'
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(URGENCEDEVLINT)
      .then(cache => cache.addAll(URGENCEDEVLINT_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [URGENCEDEVLINT, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      //console.log(cachesToDelete);
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});