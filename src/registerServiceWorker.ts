if (process.env.NODE_ENV === "production") {
  // Espera a que el Service Worker se registre correctamente
  navigator.serviceWorker
    .register("/service-worker.js")
    .then((registration) => {
      console.log("Service Worker registrado con éxito:", registration);

      // Maneja las actualizaciones del Service Worker
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker) {
          installingWorker.onstatechange = () => {
            if (
              installingWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // La nueva versión del Service Worker ha sido instalada
              console.log(
                "Nuevo contenido disponible, refresca para actualizar."
              );
            }
          };
        }
      };
    })
    .catch((error) => {
      console.log("Error al registrar el Service Worker:", error);
    });
} else {
  console.log("Service Worker no registrado en desarrollo");
}
