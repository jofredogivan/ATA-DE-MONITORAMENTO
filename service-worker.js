const CACHE_NAME = 'minha-pwa-v1';
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  'imagem_57099f.png' // Adicione sua imagem aqui
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});