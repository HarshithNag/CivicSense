/* ==========================================================================
   CIVIC SENSE — SERVICE WORKER
   Caches the app shell so the prototype opens instantly and works offline
   once visited. Bump CACHE_NAME whenever you change any cached file so
   returning visitors pick up the update.
   ========================================================================== */
const CACHE_NAME = "civic-sense-v1";
const SHELL_FILES = [
  "./",
  "index.html",
  "manifest.json",
  "css/style.css",
  "js/icons.js",
  "js/data.js",
  "js/illustrations.js",
  "js/app.js",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-192.png",
  "icons/maskable-512.png",
  "icons/apple-touch-icon.png",
  "icons/favicon-32.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL_FILES)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* Cache-first for the app shell, network-first fallback for anything else
   (e.g. Google Fonts) so the app still works offline after first load. */
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).catch(() => caches.match("index.html"));
    })
  );
});
