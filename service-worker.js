self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-cache").then((cache) => {
      // Cache your resources here
      return cache.addAll([
        "/", // Homepage
        "/index.html", // Ensure index.html is cached
        "/public/assets/css/style.css", // Example CSS file
        "/public/assets/js/main.js", // Example JS file
        "/public/assets/img/background/bg_counts.jpg",
        "/public/assets/img/background/bg_testimonials.jpg",
        "/public/assets/img/team/team_rasuljabbarov.jpg", // Example image
        "/public/assets/img/team/team_arzueyyubova.jpg", // Another image
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Serve the cached content or fetch it if not found
      return response || fetch(event.request);
    })
  );
});

console.log("Service worker registered, cache ready");