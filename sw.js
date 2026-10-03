// Offline: App-Hülle und Bilder aus dem Cache, Rezepte zuerst frisch aus dem Netz.
const CACHE = "mixkueche-v14";
const SHELL = ["./", "index.html", "manifest.webmanifest", "recipes.json", "icons/apple-touch-icon.png", "icons/icon-192.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  const fresh = url.origin === location.origin && (url.pathname.endsWith("recipes.json") || e.request.mode === "navigate");
  if (fresh) {
    e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(k => k.put(e.request, c)); return r; })
      .catch(() => caches.match(e.request).then(r => r || caches.match("index.html"))));
  } else {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      if (res.ok) { const c = res.clone(); caches.open(CACHE).then(k => k.put(e.request, c)); }
      return res;
    })));
  }
});
