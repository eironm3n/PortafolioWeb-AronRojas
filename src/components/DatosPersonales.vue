<script setup>
import linkedin from '/src/assets/linkedin_icon.svg';
/*import instagram from '/src/assets/instagram_icon.svg';*/
import github from '/src/assets/github_icon.svg';
import { ref } from 'vue';
import FondoOndas from './ondas/FondoOndas.vue';
import TextoSplit from './texto-split/TextoSplit.vue';
import { reproducir } from './micro-css/micro.js';

const title = 'Arón Rojas';
const descripcion = 'Infraestructura Cloud · Automatización · Datos';
const residencia = 'Mendoza, Argentina · Trabajo remoto';
const presentacion = 'Analista de Soporte de Aplicaciones L2 con 5 años en entornos críticos de cómputo intensivo (cloud + GPU) para YPF y PeCOM. Técnico Universitario en Programación (UTN). Foco en infraestructura cloud, contenedores y automatización con Python y PowerShell.';
const redesSociales = [
  { id: 1, name: 'linkedin', src: linkedin, url: 'https://www.linkedin.com/in/aron-rojas/' },
  { id: 3, name: 'github', src: github, url: 'https://github.com/eironm3n' },
];

// En celulares la tela usa una grilla más chica (65k puntos en vez de 262k) para no trabarse.
const resolucion = window.matchMedia('(max-width: 768px)').matches ? 256 : 512;
// Al pasar el mouse por una red social la tela deja solo los puntos que destellan.
const sobreRed = ref(false);

function entrarRed(evento) {
  sobreRed.value = true;
  reproducir(evento.currentTarget.querySelector('img'), 'micro-pulso');
}
</script>

<template>
  <section class="datos-personales">
    <FondoOndas class="hero-ondas" :resolucion="resolucion" color-bajo="#03346E" color-alto="#6EACDA" :destellos="sobreRed">
      <div class="card">
        <TextoSplit class="nombre" :texto="title" />
        <h2>{{ descripcion }}</h2>
        <p>{{ presentacion }}</p>
        <ul class="container-lista">
          <li v-for="red in redesSociales" :key="red.id">
            <a :href="red.url" @mouseenter="entrarRed" @mouseleave="sobreRed = false" @focus="entrarRed" @blur="sobreRed = false">
              <img class="icon-redsocial" :src="red.src" width="35" height="35" :alt="red.name">
            </a>
          </li>
        </ul>
        <p class="residencia">{{ residencia }}</p>
      </div>
    </FondoOndas>
  </section>
</template>

<style scoped>
/* TextoSplit trae un título gigante; acá se lo deja como el h1 original. */
.card .nombre {
  padding: 0;
}

.nombre :deep(.titulo) {
  font-size: 2.5rem;
  font-weight: normal;
  letter-spacing: normal;
  line-height: 1.2;
  color: inherit;
}

p {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.datos-personales .hero-ondas {
  min-height: 85vh;
  border-radius: 10px;
}

.card {
  /* El hero es oscuro en los dos temas (la tela necesita fondo negro): colores fijos. */
  color: rgba(235, 235, 235, 0.64);
  /* Semitransparente para que la tela se vea detrás. */
  background-color: rgba(16, 40, 92, 0.6);
  backdrop-filter: blur(6px);
  max-width: 760px;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  text-align: center;
}

.container-lista {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
}

.icon-redsocial {
  align-items: center;
  background-color: aliceblue;
  border-radius: 50%;
  padding: 2px;
  margin: 5px;
  box-shadow: 0 0 5px rgba(95, 124, 205, 0.934);
}

.icon-redsocial:hover {
  background-color: rgb(28, 41, 52);
  box-shadow: 0 0 5px rgba(251, 249, 249, 0.934);
}

.card h2 {
  color: aliceblue;
}

.card .residencia {
  font-size: 1rem;
  font-weight: normal;
  margin: 0;
}

@media (max-width: 768px) {
  .datos-personales {
    padding: 0.5rem 0;
  }

  .card {
    margin: 10px 6px;
  }

  .card h2 {
    font-size: 1.4rem;
  }
}
</style>