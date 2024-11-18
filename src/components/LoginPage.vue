<template>
  <div class="login-container">
    <div class="login-box">
      <img
        src="../assets/img/Lobos-Lit Logo.png"
        alt="Logo"
        class="login-logo"
      />
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Email address</label
          >
          <input
            type="email"
            v-model="correo"
            id="username"
            required
            class="form-control"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            type="password"
            v-model="password"
            required
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button type="submit" class="btn" :disabled="isLoading">Submit</button>
      </form>
      <br />
      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>

      <p>¿Nuevo en Lobos Kit? <a href="/Registro">Crea una cuenta</a></p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      correo: "",
      password: "",
      errorMessage: "",
      isLoading: false,
    };
  },
  methods: {
    async login() {
      this.isLoading = true;
      try {
        const response = await axios.post(
          "http://localhost:3001/auth/login",
          {
            correo: this.correo,
            password: this.password,
          },
          { withCredentials: true }
        );
        this.isLoading = false;

        // Verifica si la respuesta tiene un token y un id
        console.log("Respuesta del login:", response);

        const userId = response.data.id; // Obtén el id del usuario de la respuesta

        if (!userId) {
          throw new Error("No se recibió el id.");
        }

        // Guardamos la información de la sesión en el estado de Vuex o en cookies
        this.$store.dispatch("login", { userId }); // Guarda  el id
        this.$router.push("/Store"); // Redirige a la página de Store
      } catch (error) {
        this.isLoading = false;
        this.errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          "Error en la autenticación";
      }
    },
  },
};
</script>

<style scoped>
h1 {
  font-weight: bold;
}
/* Centrar el formulario en la pantalla */
.login-container {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}

.login-box {
  background-color: #174371;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 500px;
}

.login-logo {
  width: 200px;
  height: 80px;
  margin-bottom: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #fdfffb;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

.login-input {
  width: 100%;
  padding: 10px;
  border-radius: 25px;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
}
.form-control {
  color: #ffffff;
  background-color: #4f80b4;
}

.btn:hover {
  background-color: #3bd7bd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}
.btn {
  color: white;
  width: 70%;
  background-color: #2eaa95;
}
p {
  color: #fff;
}
label {
  color: #dbdbdb;
}
</style>
