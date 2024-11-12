<template>
  <div class="image-container">
    <img
      src="../assets/img/Lobos-Lit Logo.png"
      alt="Imagen descriptiva de Lobos-Kit"
      class="header-image"
    />
  </div>

  <!-- Contenedor principal para el h2 y el párrafo -->
  <div class="content-container">
    <!-- Encabezado que cambia con el efecto de escritura de teclado -->
    <h2 class="typewriter">{{ currentText }}</h2>

    <!-- Texto de descripción -->
    <p>
      Lobos Kit es una aplicación móvil y web diseñada para ayudar a estudiantes
      de nuevo ingreso de la Universidad Tecnológica de San Juan del Río a
      cotizar y seleccionar equipos de cómputo, materiales y software necesarios
      para sus carreras. La app ofrece recomendaciones personalizadas basadas en
      el plan de estudios, comparaciones de precios, y opciones de
      financiamiento.
    </p>

    <!-- Botón debajo del párrafo -->
    <router-link to="/Login" class="btn">Comienza ahora!!</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      texts: [
        "Tu guía inteligente para equiparte y triunfar en la Universidad.",
        "Todo lo que necesitas para comenzar tu carrera, al alcance de un clic.",
        "Encuentra el equipo perfecto para tu carrera.",
        "Equípate para el éxito desde el primer día.",
        "Tu aliado en tecnología para la vida universitaria.",
      ],
      currentText: "",
      textIndex: 0,
      charIndex: 0,
    };
  },
  mounted() {
    this.typeText();
  },
  methods: {
    // Método para crear el efecto de escritura de teclado
    typeText() {
      const currentString = this.texts[this.textIndex];

      if (this.charIndex < currentString.length) {
        this.currentText += currentString.charAt(this.charIndex);
        this.charIndex++;
        setTimeout(this.typeText, 100); // Velocidad de escritura
      } else {
        // Espera antes de borrar el texto y pasar al siguiente
        setTimeout(this.eraseText, 2000); // Tiempo en ms antes de borrar
      }
    },
    // Método para borrar el texto antes de pasar al siguiente
    eraseText() {
      if (this.charIndex > 0) {
        this.currentText = this.currentText.slice(0, this.charIndex - 1);
        this.charIndex--;
        setTimeout(this.eraseText, 50); // Velocidad de borrado
      } else {
        // Cambia al siguiente texto en el arreglo
        this.textIndex = (this.textIndex + 1) % this.texts.length;
        this.typeText();
      }
    },
  },
};
</script>

<style scoped>
/* Estilos para centrar la imagen */
.image-container {
  display: flex; /* Activa flexbox */
  justify-content: center; /* Centra horizontalmente */
}

.header-image {
  max-width: 100%; /* La imagen ocupa el 100% del ancho del contenedor */
  height: auto; /* Mantiene la relación de aspecto */
}

/* Contenedor para el h2 y el párrafo */
.content-container {
  max-width: 800px; /* Limita el ancho del contenedor de texto */
  margin: 20px auto; /* Centra el contenedor horizontalmente */
  padding: 0 20px; /* Espaciado a los lados */
  text-align: center; /* Centra el texto dentro del contenedor */
}

/* Estilos para el efecto de máquina de escribir */
.typewriter {
  font-size: 1.5em; /* Tamaño de fuente */
  font-weight: bold; /* Negrita */
  white-space: nowrap; /* No permite que el texto se rompa */
  overflow: hidden; /* Oculta el texto desbordado */
  border-right: 3px solid; /* Cursor parpadeante */
  animation: blink-caret 0.7s step-end infinite; /* Animación del cursor */
}

/* Efecto de parpadeo del cursor */
@keyframes blink-caret {
  from,
  to {
    border-color: transparent; /* Sin color al inicio y fin */
  }
  50% {
    border-color: black; /* Color del cursor */
  }
}

/* Estilos para el párrafo */
p {
  font-size: 1em; /* Tamaño de fuente del párrafo */
  margin-top: 10px; /* Espaciado superior */
  line-height: 1.5; /* Espaciado entre líneas */
}

/* Estilos para el botón */
.action-button {
  margin-top: 20px; /* Espaciado superior */
  padding: 10px 20px; /* Espaciado interno del botón */
  font-size: 1em; /* Tamaño de fuente del botón */
  color: white; /* Color del texto del botón */
  background-color: #007bff; /* Color de fondo del botón */
  border: none; /* Sin borde */
  border-radius: 5px; /* Bordes redondeados */
  cursor: pointer; /* Cambia el cursor al pasar sobre el botón */
}

/* Cambia el color del botón al pasar el cursor sobre él */
.action-button:hover {
  background-color: #0056b3; /* Color más oscuro */
}

/* Media Queries para responsividad */
@media (max-width: 768px) {
  .content-container {
    padding: 0 10px; /* Reduce el espaciado en pantallas pequeñas */
  }

  .typewriter {
    font-size: 1.2em; /* Ajusta el tamaño de la fuente en pantallas pequeñas */
  }

  p {
    font-size: 0.9em; /* Ajusta el tamaño del párrafo en pantallas pequeñas */
  }
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
</style>
