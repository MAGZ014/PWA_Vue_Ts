<template>
  <div id="app">
    <Navbar />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
// App.vue
import { mapActions } from "vuex";
import Navbar from "./components/AppNavbar.vue";

export default {
  components: {
    Navbar,
  },
  name: "App",
  methods: {
    ...mapActions(["login"]),
  },
  created() {
    const token = localStorage.getItem("token");
    if (token) {
      this.login(token); // Vuelve a cargar el estado de autenticación si existe un token en localStorage
    }
  },
};
</script>

<style>
.content {
  margin-top: 80px; /* Ajusta según la altura del navbar */
  padding: 20px;
}
</style>
