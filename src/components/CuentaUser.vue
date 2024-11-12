<template>
  <div class="container">
    <div class="box">
      <h2>Selecciona una carrera</h2>
      <div class="row">
        <div
          class="category-container"
          v-for="carrera in carreras"
          :key="carrera.id"
        >
          <button class="category-button" @click="selectCategory(carrera.id)">
            <span v-html="carrera.icono"></span>
            <!-- Renderizamos el SVG aquí -->
          </button>
          <p>{{ carrera.nombre }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router"; // Importa el router

const router = useRouter(); // Inicializa el router
const carreras = ref([]);

// Función para obtener las carreras de la API al montar el componente
const fetchCarreras = async () => {
  try {
    const response = await fetch("http://localhost:3001/carrera", {
      method: "GET",
      credentials: "include", // Incluye las cookies en la solicitud
    });
    if (response.ok) {
      carreras.value = await response.json();
    } else {
      console.error("Error en la respuesta de la API:", response.statusText);
    }
  } catch (error) {
    console.error("Error al obtener las carreras:", error);
  }
};

// Llamada a la función de obtención de datos al montar el componente
onMounted(fetchCarreras);

// Función para manejar la selección de la categoría
const selectCategory = async (carreraId) => {
  try {
    const response = await fetch(
      `http://localhost:3001/equipo/carrera/${carreraId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Incluye las credenciales en la solicitud
      }
    );

    if (response.ok) {
      console.log("Carrera seleccionada:", carreraId);
      router.push({ name: "StoreCarrera", params: { id: carreraId } });
    } else {
      console.error("Error en la respuesta de la API:", response.statusText);
    }
  } catch (error) {
    console.error("Error al enviar la carrera seleccionada:", error);
  }
};
</script>

<style scoped>
.container {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
}
.box {
  background-color: #0e3460;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 700px;
}
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
.category-container {
  text-align: center;
  margin: 10px;
  width: 100px;
}
.category-button {
  background-color: white;
  border: none;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
.category-button:hover {
  transform: scale(1.1);
}
.category-button span svg {
  width: 30px;
  height: 30px;
  fill: #0e3460;
}
p {
  margin-top: 10px;
  font-size: 12px;
  color: white;
}
.category-button span {
  width: 30px;
  height: 30px;
  fill: #00a788; /* Cambia el color del SVG */
}
h2 {
  margin-bottom: 22px;
  color: #00a788;
  font-weight: bold;
}
</style>
