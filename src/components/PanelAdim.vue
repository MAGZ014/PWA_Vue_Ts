<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";

axios.defaults.withCredentials = true;

export default defineComponent({
  name: "EquipoForm",
  setup() {
    const equipoList = ref([]);
    const tipoOptions = ref([]);

    const form = ref({
      id: null,
      datos: "",
      url: "",
      img_url: "",
      price: 0,
      reviews: 0,
      rating: 0,
      id_tipo_material: 1,
    });

    const isEditing = ref(false);

    onMounted(async () => {
      try {
        await fetchEquipos();
        const tipoResponse = await axios.get("http://localhost:3001/tipo", {
          withCredentials: true,
        });
        tipoOptions.value = tipoResponse.data;
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    });

    const fetchEquipos = async () => {
      const equipoResponse = await axios.get("http://localhost:3001/equipo", {
        withCredentials: true,
      });
      equipoList.value = equipoResponse.data;
    };

    const submitForm = async () => {
      try {
        if (isEditing.value && form.value.id !== null) {
          await axios.patch(
            `http://localhost:3001/equipo/${form.value.id}`,
            form.value,
            { withCredentials: true }
          );
          isEditing.value = false;
        } else {
          await axios.post("http://localhost:3001/equipo", form.value, {
            withCredentials: true,
          });
        }
        await fetchEquipos();
        resetForm();
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
      }
    };

    const resetForm = () => {
      form.value = {
        id: null,
        datos: "",
        url: "",
        img_url: "",
        price: 0,
        reviews: 0,
        rating: 0,
        id_tipo_material: 1,
      };
    };

    const editEquipo = (equipo) => {
      form.value = { ...equipo };
      isEditing.value = true;
    };

    const deleteEquipo = async (id) => {
      try {
        await axios.delete(`http://localhost:3001/equipo/${id}`, {
          withCredentials: true,
        });
        await fetchEquipos();
      } catch (error) {
        console.error("Error al eliminar el equipo:", error);
      }
    };

    return {
      form,
      equipoList,
      tipoOptions,
      submitForm,
      editEquipo,
      deleteEquipo,
      isEditing,
    };
  },
});
</script>

<template>
  <div class="container d-flex justify-content-center mt-1">
    <div class="card w-100" style="max-width: 100%">
      <div class="alert alert-success">
        <h1 class="d-flex justify-content-center">
          Agrega una Nueva oferta!!!!
        </h1>
      </div>
      <div class="row g-0">
        <div class="col-md-6 p-3">
          <h4 class="card-title">
            {{ isEditing ? "Editar Equipo" : "Formulario de Equipo" }}
          </h4>
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="datos" class="form-label">Datos del material</label>
              <input
                type="text"
                class="form-control"
                id="datos"
                v-model="form.datos"
                required
              />
            </div>
            <div class="mb-3">
              <label for="url" class="form-label"
                >URL de la tienda oficial</label
              >
              <input
                type="url"
                class="form-control"
                id="url"
                v-model="form.url"
                required
              />
            </div>
            <div class="mb-3">
              <label for="img_url" class="form-label">Imagen URL</label>
              <input
                type="url"
                class="form-control"
                id="img_url"
                v-model="form.img_url"
                required
              />
            </div>
            <div class="mb-3">
              <label for="price" class="form-label">Precio</label>
              <input
                type="number"
                class="form-control"
                id="price"
                v-model.number="form.price"
                required
              />
            </div>
            <div class="mb-3">
              <label for="reviews" class="form-label">Reseñas</label>
              <input
                type="number"
                class="form-control"
                id="reviews"
                v-model.number="form.reviews"
                required
              />
            </div>
            <div class="mb-3">
              <label for="rating" class="form-label">Calificación</label>
              <input
                type="number"
                step="0.1"
                class="form-control"
                id="rating"
                v-model.number="form.rating"
                required
              />
            </div>
            <div class="mb-3">
              <label for="id_tipo_material" class="form-label"
                >Tipo de Material</label
              >
              <select
                class="form-select"
                id="id_tipo_material"
                v-model.number="form.id_tipo_material"
                required
              >
                <option
                  v-for="tipo in tipoOptions"
                  :key="tipo.id"
                  :value="tipo.id"
                >
                  {{ tipo.tipo }}
                </option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">
              {{ isEditing ? "Actualizar" : "Guardar" }}
            </button>
          </form>
        </div>

        <div class="col-md-6 p-3">
          <h4 class="card-title">Datos de Equipos</h4>
          <div class="table-wrapper">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Datos</th>
                  <th>Imagen</th>
                  <th>Precio</th>
                  <th>Reseñas</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="equipo in equipoList" :key="equipo.id">
                  <td>{{ equipo.datos }}</td>
                  <td>
                    <img
                      :src="equipo.img_url"
                      alt="Imagen"
                      class="img-thumbnail"
                      style="width: 50px; height: 50px"
                    />
                  </td>
                  <td>{{ equipo.price }}</td>
                  <td>{{ equipo.reviews }}</td>
                  <td>
                    <button
                      class="btn btn-sm"
                      @click="editEquipo(equipo)"
                      style="background-color: #2eaa95; color: white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                        />
                      </svg>
                    </button>
                  </td>
                  <td>
                    <button
                      class="btn btn-sm"
                      @click="deleteEquipo(equipo.id)"
                      style="background-color: red; color: white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-trash-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5V12a.5.5 0 0 1-1 0V5.5A.5.5 0 0 1 5.5 5zm3 0a.5.5 0 0 1 .5.5V12a.5.5 0 0 1-1 0V5.5a.5.5 0 0 1 .5-.5zm3 0a.5.5 0 0 1 .5.5V12a.5.5 0 0 1-1 0V5.5a.5.5 0 0 1 .5-.5z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 90%;
}
.card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.table-wrapper {
  max-height: 600px; /* Ajusta la altura máxima según el tamaño del formulario */
  overflow-y: auto;
}
form button {
  width: 600px;
  margin-top: 15px;
}
</style>
