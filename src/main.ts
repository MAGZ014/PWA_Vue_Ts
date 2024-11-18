// src/main.ts
import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes/router"; // Importar el router
import store from "./store/store"; // Importar el store de Vuex
import "./registerServiceWorker";
import "./service-worker";

const app = createApp(App);

app.use(router); // Usar el router en la aplicación
app.use(store); // Usar Vuex en la aplicación
app.mount("#app");
