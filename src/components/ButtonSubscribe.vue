<template>
  <button @click="subscribeToNotifications">Habilitar Notificaciones</button>
</template>

<script setup>
import { useStore } from "vuex"; // Importa useStore
const store = useStore(); // Obtén la instancia del store

async function askPermission() {
  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    console.error("Error al solicitar permiso de notificaciones:", error);
    throw error;
  }
}

function convertVapidKey(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function subscribeToNotifications() {
  try {
    if (!("serviceWorker" in navigator && "PushManager" in window)) {
      console.error("Service Worker o PushManager no soportados.");
      return;
    }

    const permission = await askPermission();
    if (permission !== "granted") {
      console.error("Permiso de notificaciones denegado.");
      return;
    }

    const registration = await navigator.serviceWorker.ready;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertVapidKey(
        process.env.VUE_APP_VAPID_PUBLIC_KEY
      ),
    });

    console.log("Suscripción generada:", subscription);
    const subscriptionJson = JSON.stringify(subscription);
    const subscriptionObject = JSON.parse(subscriptionJson);
    // Acceder a los datos de la suscripción
    console.log("Endpoint:", subscriptionObject.endpoint);
    console.log("Claves p256dh:", subscriptionObject.keys.p256dh);
    console.log("Claves auth:", subscriptionObject.keys.auth);
    // Acceder al userId desde el store
    const userId = store.state.userId;
    if (!userId) {
      console.error("No se encontró un userId válido en el store.");
      return;
    }

    // Enviar la suscripción al backend
    await fetch("http://localhost:3001/subscription/subscribe", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        endpoint: subscriptionObject.endpoint,
        p256dh: subscriptionObject.keys.p256dh,
        auth: subscriptionObject.keys.auth,
      }),
    });
  } catch (error) {
    console.error("Error al suscribirse:", error);
  }
}
</script>

<style scoped>
button {
  color: white;
  font-size: large;
}
button:hover {
  color: #00a788;
  font-size: large;
}
</style>
