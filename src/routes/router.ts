import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../components/HomePage.vue";
import Login from "../components/LoginPage.vue";
import Registro from "../components/RegisterForm.vue";
import CuentaUser from "../components/CuentaUser.vue";
import Store from "../components/StorePage.vue";
import StoreCarrera from "../components/StoreCarrera.vue";
import PanelAdmin from "../components/PanelAdim.vue";

// Definir las rutas con el tipo `RouteRecordRaw`
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/Home", // Redirige al inicio
  },
  {
    path: "/Home",
    name: "Home",
    component: Home,
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Registro",
    name: "Registro",
    component: Registro,
  },
  {
    path: "/Cuenta",
    name: "Cuenta",
    component: CuentaUser,
  },
  {
    path: "/Store",
    name: "Store",
    component: Store,
  },
  {
    path: "/StoreCarrera/:id",
    name: "StoreCarrera",
    component: StoreCarrera,
  },
  {
    path: "/PanelAdmin",
    name: "PanelAdmin",
    component: PanelAdmin,
  },
  {
    path: "/:catchAll(.*)", // Ruta para manejar rutas no definidas
    redirect: "/Home",
  },
];

// Crear la instancia del router con el tipo adecuado
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
