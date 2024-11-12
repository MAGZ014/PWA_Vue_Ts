<template>
  <br />
  <br />
  <div class="login-container">
    <div class="login-box">
      <img
        src="../assets/img/Lobos-Lit Logo.png"
        alt="Logo"
        class="login-logo"
      />
      <h1>REGISTRO</h1>
      <form @submit.prevent="register">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            v-model="formData.correo"
            type="email"
            required
            class="form-control"
            id="email"
          />

          <label for="nombre" class="form-label">Nombre</label>
          <input
            v-model="formData.nombre"
            type="text"
            required
            class="form-control"
            id="nombre"
          />

          <label for="cuatrimestre" class="form-label">Cuatrimestre</label>
          <input
            v-model.number="formData.cuatrimestre"
            type="number"
            required
            class="form-control"
            id="cuatrimestre"
          />

          <label for="carrera" class="form-label">Carrera</label>
          <select
            v-model="formData.id_carrera"
            class="form-control"
            id="carrera"
            required
          >
            <option value="" disabled>Selecciona una carrera</option>
            <option
              v-for="carrera in carreras"
              :key="carrera.id"
              :value="carrera.id"
            >
              {{ carrera.nombre }}
            </option>
          </select>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              v-model="formData.password"
              type="password"
              required
              class="form-control"
              id="password"
            />
          </div>
          <br />
          <button type="submit" class="btn">Registrar</button>
        </div>
      </form>
      <p>¿Ya tienes una cuenta? <a href="/Login">Sign Up</a></p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const formData = ref({
  nombre: "",
  correo: "",
  cuatrimestre: 0,
  password: "",
  id_carrera: "", // ID de la carrera seleccionada
  id_rol: 2, // Rol predeterminado
});

const carreras = ref([]); // Array para almacenar las carreras

// Función para cargar las carreras desde la API
const fetchCarreras = async () => {
  try {
    const response = await fetch("http://localhost:3001/carrera");
    if (response.ok) {
      carreras.value = await response.json();
    } else {
      console.error("Error al obtener las carreras:", response.statusText);
    }
  } catch (error) {
    console.error("Error al conectar con la API:", error);
  }
};

// Cargar las carreras al montar el componente
onMounted(fetchCarreras);

const register = async () => {
  try {
    const response = await fetch("http://localhost:3001/cliente/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData.value),
    });

    if (!response.ok) {
      throw new Error("Error en el registro");
    }

    const data = await response.json();
    console.log("Usuario registrado:", data);
    alert("Registro exitoso");

    // Redirigir al usuario al iniciar sesión
    router.push("/Login");
  } catch (error) {
    console.error("Error:", error);
    alert("Error en el registro");
  }
};
</script>

<style scoped>
h1 {
  font-weight: bold;
}
/* Estilos */
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
