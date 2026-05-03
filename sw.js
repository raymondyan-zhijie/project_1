const CACHE_NAME = 'weather-dashboard-v1';
const APP_SHELL = [
    '/',
    'index.html',
    'styles.css',
    'script.js',
    'config.js',
    'weather.js',
    'timer.js',
    'translations.js',
    'cities-data.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
        ))
    );
});
