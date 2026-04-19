const CACHE_NAME = 'sax-alto-v1';

const SHELL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

const CDN_ASSETS = [
  'https://cdn.jsdelivr.net/npm/opensheetmusicdisplay@1.9.7/build/opensheetmusicdisplay.min.js',
  'https://cdn.jsdelivr.net/npm/soundfont-player@0.12.0/dist/soundfont-player.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
  'https://surikov.github.io/webaudiofont/npm/dist/WebAudioFontPlayer.js',
  'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap'
];

// Install: cache shell + CDN assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled([
        cache.addAll(SHELL_ASSETS),
        ...CDN_ASSETS.map(url =>
          fetch(url, { mode: 'no-cors' })
            .then(res => cache.put(url, res))
            .catch(() => {})
        )
      ])
    ).then(() => self.skipWaiting())
  );
});

// Activate: remove old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first for same-origin assets and CDN, network-first for XML scores
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // Network-first for XML score files (so updates propagate)
  if (url.pathname.endsWith('.xml') || url.pathname.endsWith('.mus')) {
    event.respondWith(
      fetch(request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return res;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Cache-first for everything else
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        }
        return res;
      });
    })
  );
});
