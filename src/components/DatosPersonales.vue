<script setup>
import linkedin from '/src/assets/linkedin_icon.svg';
import github from '/src/assets/github_icon.svg';
import email from '/src/assets/email_icon.svg';
import { computed, ref } from 'vue';
import FondoOndas from './ondas/FondoOndas.vue';
import TextoSplit from './texto-split/TextoSplit.vue';
import { reproducir } from './micro-css/micro.js';
import { tema } from './tema/tema.js';
import { abrir, activa } from './legajo/legajo.js';
import { liviano } from './ondas/liviano.js';

const title = 'Arón Rojas';
const descripcion = 'Especialista en Soporte de Aplicaciones';
const especialidades = 'Cloud (AWS/Azure) · Automatización · Geociencia / Oil & Gas';
const residencia = 'Mendoza, Argentina · Trabajo remoto';
const presentacion = 'Cinco años de soporte L1 y L2 en entornos críticos de cómputo intensivo del sector energético, para geólogos, ingenieros de reservorios y equipos de exploración de YPF y PeCOM; empecé como Trainee y hoy soy referente L2. Sumo infraestructura en AWS y Azure, Windows Server con PowerShell y automatización con Python e IA. Técnico Universitario en Programación (UTN, título en trámite).';
const redesSociales = [
  { id: 1, name: 'LinkedIn', src: linkedin, url: 'https://www.linkedin.com/in/aron-rojas/', externo: true },
  { id: 3, name: 'GitHub', src: github, url: 'https://github.com/eironm3n', externo: true },
  { id: 4, name: 'Email: c1.aronrojas@gmail.com', src: email, url: 'mailto:c1.aronrojas@gmail.com', externo: false },
];
// Copia del CV que genera C:/proj/cv (build-cv.js + exportado a PDF). Sin teléfono a propósito.
const cv = '/cv/CV_Aron_Rojas.pdf';

// Modo liviano (celulares, tablets, ahorro de datos o equipos con poca memoria): grilla de ~37k
// puntos en vez de 262k y como mucho 30 cuadros por segundo. Además, con una hoja abierta la tela
// queda congelada: la hoja la tapa casi entera y no tiene sentido seguir dibujándola.
const resolucion = liviano ? 192 : 512;
const fpsMax = liviano ? 30 : 60;
const pausado = computed(() => liviano && Boolean(activa.value));
// Paleta de la tela según el tema: azules sobre negro en oscuro; rosa intenso sobre un blanco
// rosado en claro, con más opacidad porque sobre fondo claro los puntos se pierden.
const paletas = {
  oscuro: { bajo: '#1f5fa8', alto: '#8fd3ff', fondo: '#000000', opacidad: 1 },
  claro: { bajo: '#ff1f8f', alto: '#a8005a', fondo: '#fff4f9', opacidad: 1 },
};
const paleta = computed(() => paletas[tema.value]);
// Al pasar el mouse por una red social la tela deja solo los puntos que destellan.
const sobreRed = ref(false);

function entrarRed(evento) {
  sobreRed.value = true;
  reproducir(evento.currentTarget.querySelector('img'), 'micro-pulso');
}
</script>

<template>
  <section class="datos-personales">
    <FondoOndas class="hero-ondas" :resolucion="resolucion" :color-bajo="paleta.bajo" :color-alto="paleta.alto" :color-fondo="paleta.fondo" :opacidad="paleta.opacidad" :destellos="sobreRed" :fps-max="fpsMax" :pausado="pausado" fijo>
      <div class="card">
        <TextoSplit class="nombre" :texto="title" />
        <h2>{{ descripcion }}</h2>
        <p class="especialidades">{{ especialidades }}</p>
        <p class="presentacion">{{ presentacion }}</p>
        <div class="acciones">
          <!-- Acción principal: abre la primera hoja desde su solapa y enseña cómo se usa el sitio. -->
          <button type="button" class="boton-principal" @click="abrir('experiencia')">
            Ver experiencia <span aria-hidden="true">→</span>
          </button>
          <a class="boton-secundario" :href="cv" download="CV_Aron_Rojas.pdf">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 19h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" /></svg>
            Descargar CV <span class="formato">(PDF)</span>
          </a>
          <ul class="container-lista">
            <li v-for="red in redesSociales" :key="red.id">
              <a :href="red.url" :target="red.externo ? '_blank' : null" :rel="red.externo ? 'noopener noreferrer' : null" :aria-label="red.externo ? `${red.name} (se abre en otra pestaña)` : red.name" :title="red.name" @mouseenter="entrarRed" @mouseleave="sobreRed = false" @focus="entrarRed" @blur="sobreRed = false">
                <img class="icon-redsocial" :src="red.src" width="36" height="36" alt="">
              </a>
            </li>
          </ul>
        </div>
        <p class="residencia">{{ residencia }}</p>
      </div>
    </FondoOndas>
  </section>
</template>

<style scoped>
/* Jerarquía: nombre (lo más fuerte), especialidad en el color de acento, presentación más suave. */
.card .nombre {
  padding: 0;
}

.nombre :deep(.titulo) {
  font-size: 2.75rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.2;
  color: var(--color-hero-nombre);
}

.card h2 {
  font-size: 1.5rem;
  color: var(--color-hero-titulo);
  margin-bottom: 0.2rem;
}

/* Segunda línea del título: en qué se apoya la especialidad. */
.especialidades {
  font-size: 1rem;
  letter-spacing: 0.01em;
  color: var(--color-hero-titulo);
  opacity: 0.85;
  margin: 0 0 1rem;
}

.presentacion {
  max-width: 62ch;
  margin: 0 auto 1.5rem;
  font-size: 1.1rem;
  line-height: 1.65;
}

.datos-personales {
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  backdrop-filter: none;
}

/* La tela es el fondo fijo de la ventana: acá solo queda la tarjeta (la centra la grilla de #app). */
.datos-personales .hero-ondas {
  min-height: 0;
}

.card {
  color: var(--color-hero-texto);
  /* Semitransparente para que la tela se vea detrás. */
  background-color: var(--color-hero-tarjeta);
  transition: color 0.5s, background-color 0.5s;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(6px);
  max-width: 780px;
  border-radius: 14px;
  padding: 1.75rem 2rem 1.25rem;
  margin: 10px;
  text-align: center;
}

.acciones {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  margin-bottom: 1rem;
}

.boton-principal {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
  padding: 0.6rem 1.4rem;
  font: inherit;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-sobre-acento);
  background: var(--color-acento);
  border: none;
  border-radius: 999px;
  cursor: pointer;
  box-shadow: 0 6px 18px color-mix(in srgb, var(--color-acento) 35%, transparent);
  transition: transform 0.2s, box-shadow 0.2s;
}

.boton-principal span {
  transition: transform 0.2s;
}

.boton-principal:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px color-mix(in srgb, var(--color-acento) 45%, transparent);
}

.boton-principal:hover span {
  transform: translateX(3px);
}

.boton-principal:active {
  transform: translateY(0) scale(0.98);
}

/* Acción secundaria: misma forma que la principal, pero con borde en vez de relleno. */
.boton-secundario {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 44px;
  padding: 0.6rem 1.25rem;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-acento);
  background: transparent;
  border: 2px solid var(--color-acento);
  border-radius: 999px;
  text-decoration: none;
  transition: transform 0.2s, background-color 0.2s, color 0.2s;
}

.boton-secundario .formato {
  font-weight: 400;
  opacity: 0.8;
}

.boton-secundario:hover {
  transform: translateY(-1px);
  color: var(--color-sobre-acento);
  background: var(--color-acento);
}

.boton-secundario:active {
  transform: translateY(0) scale(0.98);
}

.boton-secundario svg {
  transition: transform 0.2s;
}

.boton-secundario:hover svg {
  transform: translateY(2px);
}

.container-lista {
  display: flex;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Área táctil de 44 px alrededor de cada ícono. */
.container-lista a {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
}

.icon-redsocial {
  background-color: aliceblue;
  border-radius: 50%;
  padding: 2px;
  box-shadow: 0 0 5px rgba(95, 124, 205, 0.934);
  transition: background-color 0.3s, box-shadow 0.3s;
}

.container-lista a:hover .icon-redsocial {
  background-color: rgb(28, 41, 52);
  box-shadow: 0 0 5px rgba(251, 249, 249, 0.934);
}

.card .residencia {
  font-size: 0.95rem;
  margin: 0;
  opacity: 0.85;
}

/* En táctiles el desenfoque detrás de la tarjeta se recalcularía en cada cuadro de la tela: se lo
   cambia por un fondo más opaco, que se ve casi igual y no le cuesta nada al celular. */
@media (max-width: 768px), (pointer: coarse) {
  .card {
    backdrop-filter: none;
    background-color: color-mix(in srgb, var(--color-hero-tarjeta) 75%, var(--color-background));
  }
}

@media (max-width: 768px) {
  .card {
    margin: 10px 6px;
    padding: 1.25rem 1rem 1rem;
  }

  .nombre :deep(.titulo) {
    font-size: 2.2rem;
  }

  .card h2 {
    font-size: 1.2rem;
    margin-bottom: 0.2rem;
  }

  .especialidades {
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
  }

  .presentacion {
    font-size: 1rem;
    margin-bottom: 1.1rem;
  }
}

/* Pantallas bajas (celulares chicos): todo un poco más compacto para que la tarjeta entre entera. */
@media (max-width: 768px) and (max-height: 700px) {
  .card {
    padding: 0.9rem 0.85rem 0.8rem;
  }

  .nombre :deep(.titulo) {
    font-size: 1.9rem;
  }

  .card h2 {
    font-size: 1.05rem;
    margin-bottom: 0.15rem;
  }

  .especialidades {
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
  }

  .presentacion {
    font-size: 0.93rem;
    line-height: 1.5;
    margin-bottom: 0.8rem;
  }

  .acciones {
    margin-bottom: 0.6rem;
  }
}
</style>
