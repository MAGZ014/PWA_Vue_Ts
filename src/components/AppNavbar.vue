<template>
  <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img
          src="../assets/img/Lobos-Lit Logo.png"
          alt="Logo"
          width="170"
          height="50"
          class="d-inline-block align-top"
        />a
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="/Home">Home</a>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <router-link class="nav-link" to="/Store">Store</router-link>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <router-link class="nav-link" to="/Cuenta">Carrera</router-link>
          </li>
          <li v-if="!isAuthenticated" class="nav-item">
            <router-link class="nav-link" to="/Login">Sign Up</router-link>
          </li>

          <li v-if="isAuthenticated" class="nav-item">
            <a class="nav-link" href="#" @click.prevent="logout">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                class="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
              Salir
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppNavbar",
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/Home");
    },
  },
};
</script>

<style scoped>
.navbar {
  color: white;
  background-color: #003571;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Agrega una sombra */
}
a {
  color: white;
  font-size: large;
}
a:hover {
  color: #00a788;
  font-size: large;
}
</style>
