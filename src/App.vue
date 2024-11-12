<template>
  <div id="app">
    <Navbar />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/AppNavbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style>
.content {
  margin-top: 80px; /* Ajusta según la altura del navbar */
  padding: 20px;
}
</style>
