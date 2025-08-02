const CACHE_NAME = 'minha-pwa-v1';
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  'imagem_57099f.png'
];

// Instalando e cacheando arquivos estáticos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Ativando e limpando caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.filter(name => name !== CACHE_NAME)
            .map(name => caches.delete(name))
        )
      )
  );
});

// Interceptando fetch e respondendo com cache ou rede
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request).catch(() => {
        if (event.request.destination === 'document') {
          return caches.match('index.html');
        }
      }))
  );
});
