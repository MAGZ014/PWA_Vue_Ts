// src/router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useStore } from "vuex";
import Home from "../components/HomePage.vue";
import Login from "../components/LoginPage.vue";
import Registro from "../components/RegisterForm.vue";
import CuentaUser from "../components/CuentaUser.vue";
import Store from "../components/StorePage.vue";
import StoreCarrera from "../components/StoreCarrera.vue";
import PanelAdmin from "../components/PanelAdim.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/Home" },
  { path: "/Home", name: "Home", component: Home },
  { path: "/Login", name: "Login", component: Login },
  { path: "/Registro", name: "Registro", component: Registro },
  {
    path: "/Cuenta",
    name: "Cuenta",
    component: CuentaUser,
    meta: { requiresAuth: true },
  },
  {
    path: "/Store",
    name: "Store",
    component: Store,
    meta: { requiresAuth: true },
  },
  {
    path: "/StoreCarrera/:id",
    name: "StoreCarrera",
    component: StoreCarrera,
    meta: { requiresAuth: true },
  },
  {
    path: "/PanelAdmin",
    name: "PanelAdmin",
    component: PanelAdmin,
    meta: { requiresAuth: true },
  },
  { path: "/:catchAll(.*)", redirect: "/Home" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guardia de navegación global para proteger rutas
router.beforeEach((to, from, next) => {
  const store = useStore(); // Obtenemos el store de Vuex
  const isAuthenticated = store.state.isAuthenticated;

  if (to.meta.requiresAuth && !isAuthenticated) {
    // Si la ruta requiere autenticación y el usuario no está autenticado, redirigir al login
    next({ path: "/Login" });
  } else {
    // De lo contrario, permitir el acceso a la ruta
    next();
  }
});

export default router;
