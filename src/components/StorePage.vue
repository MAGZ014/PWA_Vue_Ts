<template>
  <h2>🐺 LOBOS KIT 🐺</h2>
  <p class="alert alert-success">Todos los Equipos</p>
  <div class="container mt-4">
    <div class="row">
      <div
        v-for="equipo in equipos"
        :key="equipo.id"
        class="col-lg-6 col-md-12 mb-4"
      >
        <!-- Ajusta el tamaño de la columna -->
        <div class="card h-100 d-flex flex-row align-items-center flex-wrap">
          <div class="image-container">
            <img
              :src="equipo.img_url"
              class="card-img"
              alt="Imagen de equipo"
            />
          </div>
          <div class="card-body">
            <h5 class="card-title">🐺 -- {{ equipo.datos }}</h5>
            <p class="card-text" style="color: #003571">
              <strong>Precio:</strong> ${{ equipo.price.toFixed(2) }}
            </p>
            <p class="card-text">
              <strong>Reseñas:</strong> {{ equipo.reviews }}
            </p>
            <button @click="openPopup(equipo)" class="btn">Ver Detalles</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showPopup" class="popup-overlay">
    <div class="popup" style="margin-top: 35px">
      <div class="popup-header">
        <h3 style="margin-left: 25%">Detalles del Equipo</h3>
      </div>
      <div class="popup-body">
        <img
          :src="selectedEquipo.img_url"
          class="image-container"
          alt="Imagen del equipo"
          style="width: 50%; display: flex; margin-left: 25%"
        />
        <h4>{{ selectedEquipo.datos }}</h4>
        <p><strong>Precio:</strong> ${{ selectedEquipo.price.toFixed(2) }}</p>
        <p><strong>Rating:</strong> {{ selectedEquipo.rating }} ⭐</p>
        <p><strong>Tipo de material:</strong> {{ selectedEquipo.tipo }}</p>
        <a :href="selectedEquipo.url" target="_blank" class="btn"
          >Página Oficial</a
        >
        <a
          @click="closePopup"
          target="_blank"
          class="btn"
          style="background-color: #a700009a; margin-left: 20px; width: 150px"
        >
          Cerrar
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      equipos: [], // Aquí irán los equipos
      showPopup: false, // Controla si el popup está visible o no
      selectedEquipo: null, // Almacena el equipo seleccionado para mostrar sus detalles
    };
  },
  async mounted() {
    await this.fetchEquipos(); // Llama a la función para obtener los equipos
  },
  methods: {
    async fetchEquipos() {
      try {
        const response = await fetch("http://localhost:3001/equipo", {
          method: "GET",
          credentials: "include", // Permite el envío de cookies
        });
        if (!response.ok) {
          throw new Error("Error al obtener equipos");
        }
        this.equipos = await response.json();
      } catch (error) {
        console.error("Error al obtener equipos:", error);
      }
    },
    // Abre el popup y carga los detalles del equipo seleccionado
    async openPopup(equipo) {
      try {
        const response = await fetch(
          `http://localhost:3001/equipo/${equipo.id}`,
          {
            method: "GET",
            credentials: "include", // Permite el envío de cookies
          }
        );
        if (!response.ok) {
          throw new Error("Error al obtener detalles del equipo");
        }
        this.selectedEquipo = await response.json();
        this.showPopup = true; // Muestra el popup
      } catch (error) {
        console.error("Error al abrir el popup:", error);
      }
    },
    // Cierra el popup
    closePopup() {
      this.showPopup = false;
      this.selectedEquipo = null; // Limpia el equipo seleccionado
    },
  },
};
</script>
<style scoped>
.card {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
}

.image-container {
  width: 150px;
  margin-right: 15px;
}

.card-img {
  width: 100%;
  height: auto;
  object-fit: cover; /* Ajusta la imagen sin distorsionarla */
  border-radius: 8px;
}

.card-body {
  flex: 1;
  padding-left: 15px;
}

.card-title {
  font-size: 1.1rem;
  font-weight: bold;
}

.card-text {
  margin-bottom: 0.5rem;
}

/* Estilos para el popup */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.popup-header h3 {
  margin: 0;
}

.popup-body {
  margin-top: 15px;
}

.popup-img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}

.btn {
  width: 50%;
  margin-top: 10px;
  color: #eeeeee;
  background-color: #00a788;
  transition: background-color 0.5s;
}

.btn:hover {
  margin-top: 10px;
  color: #fafafa;
  background-color: #006452;
}

/* Media Queries para diseño responsivo */
@media (max-width: 768px) {
  .popup {
    padding: 15px;
  }
  .popup-img {
    width: 100%;
  }
  .card {
    flex-direction: column; /* Cambia a una columna en pantallas pequeñas */
    text-align: center; /* Centrar el contenido en pantallas pequeñas */
  }

  .image-container {
    width: 100%; /* Imagen toma todo el ancho en pantallas pequeñas */
    margin: 0 0 15px 0; /* Margen solo en la parte inferior */
  }

  .card-body {
    padding-left: 0; /* Elimina el padding en pantallas pequeñas */
  }
}
</style>
