/* VMP SaaS — Service Worker */
const CACHE_NAME = 'vmp-landing-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/termos.html',
  '/privacidade.html',
  '/assets/css/style.css',
  '/assets/js/script.js',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request);
      })
  );
});
