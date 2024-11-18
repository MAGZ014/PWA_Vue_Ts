const CACHE_NAME = "api-cache-v1";

// Manejo del evento `install` para precargar la cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache abierto");
      return cache.addAll(["/"]); // Precarga de rutas si es necesario
    })
  );
});

// Manejo del evento `activate` para limpiar caches antiguas
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});

self.addEventListener("push", function (event) {
  const data = event.data.json(); // Recibe los datos enviados desde el servidor
  const options = {
    body: data.body,
    icon: data.icon || "/default-icon.png",
    badge: data.badge || "/default-badge.png",
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

const registration = await navigator.serviceWorker.ready;
console.log("Service Worker activo:", registration);
