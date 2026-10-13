<script setup>
import { gsap } from 'gsap';
import { nextTick, onBeforeUnmount, ref } from 'vue';
import imgPowerBi from '/src/assets/proyectos/powerbi-videojuegos.webp';

const misProyectos = ref([
  {
    id: 6,
    categoria: 'Cloud y DevOps',
    titulo: 'shortlink-service — CI/CD y observabilidad end-to-end (2026)',
    descripcion: 'Servicio en FastAPI construido de punta a punta: contenedor multi-stage no-root, pipeline de CI/CD en GitHub Actions (ruff, mypy, pytest con 95% de cobertura, build, escaneo Trivy, smoke test y publicación en GHCR), observabilidad con Prometheus + Grafana (dashboard aprovisionado) e infraestructura como código con Terraform para AWS Lightsail.',
    stack: 'Python · FastAPI · Docker · GitHub Actions · Trivy · Prometheus · Grafana · Terraform · AWS',
    projectoLink: 'https://github.com/eironm3n/shortlink-service/actions',
    githubLink: 'https://github.com/eironm3n/shortlink-service',
    estado: 'publicado',
  },
  {
    id: 7,
    categoria: 'Desarrollo',
    titulo: 'OpenCaption Live — subtítulos en vivo (2026)',
    descripcion: 'Transcripción y traducción simultánea en tiempo real para conferencias, open source. Nació como propuesta para la Vibeathon de Nerdearla 2026; lo terminé después y lo publiqué como proyecto independiente. Ingesta de audio en vivo por WebSocket, múltiples sesiones concurrentes, exportación de subtítulos (SRT/VTT/texto) y overlay para OBS/vMix. Por defecto corre 100% local, sin API keys ni costo (Whisper + Argos Translate u Ollama); Gemini Live API como motor opcional.',
    stack: 'Python · FastAPI · WebSockets · Whisper · Argos/Ollama · Docker',
    projectoLink: '',
    githubLink: 'https://github.com/eironm3n/vibeathon-live-captions',
    estado: 'publicado',
  },
  {
    id: 4,
    categoria: 'Datos',
    titulo: 'Dashboard end-to-end — Histórico de Videojuegos (2025)',
    descripcion: 'Proyecto de datos completo: ETL y limpieza con Power Query, modelado en esquema estrella, métricas y KPIs con DAX, y un dashboard interactivo sobre ventas por género, plataforma, región y editor.',
    stack: 'Power BI · Power Query · DAX',
    imagen: imgPowerBi,
    projectoLink: '',
    githubLink: 'https://github.com/eironm3n/Proyectos-Power-Bi/tree/main/Hist%C3%B3rico_videojuegos',
    estado: 'publicado',
  },
  {
    id: 5,
    categoria: 'Desarrollo',
    titulo: 'Este portafolio (2024 – 2026)',
    descripcion: 'Portafolio en Vue 3 + Vite desplegado en Vercel. Mantenido al día: actualización a Vite 8, migración a ESLint 10 (flat config) y saneamiento de dependencias (0 vulnerabilidades).',
    stack: 'Vue 3 · Vite · Vercel',
    projectoLink: 'https://portafolio-web-aron-rojas.vercel.app',
    githubLink: 'https://github.com/eironm3n/PortafolioWeb-AronRojas',
    estado: 'publicado',
  },
  {
    id: 1,
    categoria: 'Desarrollo',
    titulo: 'E-commerce Fullstack — Proyecto Integrador (2025)',
    descripcion: 'Entrega final del 4.º semestre (equipo Código Enigma, UTN FRSR): tienda online con catálogo, categorías, carrito, usuarios con autenticación y checkout con pasarela de pago. Frontend y backend desplegados por separado.',
    stack: 'Angular 17 · Flask · SQLAlchemy · MySQL · JWT · Mercado Pago',
    projectoLink: '',
    githubLink: 'https://github.com/eironm3n/integrador-4to-semestre-ecommerce',
    estado: 'publicado',
  },
  {
    id: 2,
    categoria: 'Desarrollo',
    titulo: 'Estacionamiento — API REST con Flask (2025)',
    descripcion: 'Entrega final del 3.º semestre (equipo Código Enigma): sistema web para el cobro de estacionamiento por tiempo de permanencia. API REST en Flask con arquitectura en capas (controllers / models / repositories / services), persistencia con TinyDB y documentación con Swagger UI.',
    stack: 'Python · Flask · TinyDB · Swagger',
    projectoLink: '',
    githubLink: 'https://github.com/eironm3n/integrador-3er-semestre-estacionamiento',
    estado: 'publicado',
  },
  {
    id: 3,
    categoria: 'Desarrollo',
    titulo: 'Ruleta del Casino — Java (2024)',
    descripcion: 'Entrega final del 2.º semestre (equipo Código Enigma): juego de consola que simula una ruleta con apuestas a número (35:1), a color (1:1) y combinadas, validación de apuestas, RNG y gestión del saldo de fichas.',
    stack: 'Java SE · consola · Ant',
    projectoLink: '',
    githubLink: 'https://github.com/eironm3n/integrador-2do-semestre-ruleta-java',
    estado: 'publicado',
  },
]);

// Filtro por categoría con GSAP Flip (adaptado de "grilla-flip" de la caja de herramientas).
const categorias = ['Todos', ...new Set(misProyectos.value.map((p) => p.categoria))];
const filtro = ref('Todos');
const celdas = ref([]);
const galeria = ref(null);
const ctx = gsap.context(() => {});
// Flip se descarga recién al usar un filtro: no hace falta para la primera carga de la página.
let Flip;

async function cargarFlip() {
  if (!Flip) {
    ({ Flip } = await import('gsap/Flip'));
    gsap.registerPlugin(Flip);
  }
}

// Flip: 1) guarda posición y tamaño de cada tarjeta, 2) Vue cambia el filtro,
// 3) anima desde el estado guardado hasta el nuevo.
async function filtrar(categoria) {
  if (categoria === filtro.value) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    filtro.value = categoria;
    return;
  }
  await cargarFlip();
  const estado = Flip.getState(celdas.value);
  const altoAntes = galeria.value.offsetHeight;
  filtro.value = categoria;
  await nextTick();
  const altoDespues = galeria.value.offsetHeight;
  ctx.add(() => {
    // Durante el Flip las tarjetas quedan en absolute y la galería se colapsaría: se anima su alto.
    gsap.fromTo(galeria.value, { height: altoAntes }, { height: altoDespues, duration: 0.7, ease: 'power3.inOut', clearProps: 'height' });
    Flip.from(estado, {
      duration: 0.7,
      ease: 'power3.inOut',
      absolute: true, // las que salen no empujan al resto mientras se van
      stagger: 0.03,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.5 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.6, duration: 0.4 }),
    });
  });
}

onBeforeUnmount(() => ctx.revert());
</script>

<template>
  <div class="filtros" role="group" aria-label="Filtrar proyectos">
    <button v-for="c in categorias" :key="c" type="button" :aria-pressed="filtro === c" @click="filtrar(c)">{{ c }}</button>
  </div>
  <ul ref="galeria" class="galeria">
    <!-- Flip mueve la celda y v-aparecer anima la tarjeta: si fueran el mismo elemento, la transición CSS pelearía con GSAP. -->
    <li
      v-for="(proyecto, i) in misProyectos"
      v-show="filtro === 'Todos' || proyecto.categoria === filtro"
      :key="proyecto.id"
      ref="celdas"
      class="celda"
      :class="{ destacada: i === 0 }"
    >
      <article v-aparecer="{ efecto: 'subir', retraso: (i % 3) * 120 }" class="tarjeta tarjeta-interactiva proyecto">
        <img v-if="proyecto.imagen" :src="proyecto.imagen" :alt="`Captura del proyecto ${proyecto.titulo}`">
        <!-- Sin captura: una miniatura con la categoría sobre una grilla, como un plano. -->
        <div v-else class="proyecto-sinimg" aria-hidden="true">
          <span class="meta">{{ proyecto.categoria }}</span>
        </div>
        <div class="proyecto-info">
          <h3>{{ proyecto.titulo }}</h3>
          <p class="descripcion">{{ proyecto.descripcion }}</p>
          <ul class="chips" aria-label="Tecnologías">
            <li v-for="tec in proyecto.stack.split(' · ')" :key="tec" class="chip">{{ tec }}</li>
          </ul>
          <div class="proyecto-links">
            <a v-if="proyecto.githubLink" :href="proyecto.githubLink" class="enlace-codigo" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" /></svg>
              Código
            </a>
            <a v-if="proyecto.projectoLink" :href="proyecto.projectoLink" class="enlace-ver" target="_blank" rel="noopener noreferrer">Ver proyecto ↗</a>
          </div>
        </div>
      </article>
    </li>
  </ul>
</template>

<style scoped>
.galeria {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: 1rem;
  align-items: start;
  padding: 0;
}

/* El proyecto más completo ocupa dos columnas cuando hay lugar. */
@media (min-width: 900px) {
  .celda.destacada {
    grid-column: span 2;
  }

  .destacada .proyecto-sinimg {
    height: 180px;
  }
}

.filtros {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 1.25rem;
}

.filtros > button {
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid var(--color-chip-borde);
  background: transparent;
  color: var(--color-text);
  font: inherit;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.filtros > button:hover {
  border-color: var(--color-acento);
}

.filtros > button[aria-pressed='true'] {
  background: var(--color-acento);
  border-color: var(--color-acento);
  color: var(--color-sobre-acento);
}

.celda {
  display: flex;
}

.proyecto {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
}

.proyecto img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  object-position: top;
  display: block;
  border-bottom: 1px solid var(--color-superficie-borde);
}

.proyecto-sinimg {
  display: flex;
  align-items: flex-end;
  height: 160px;
  padding: 0.9rem 1.1rem;
  background:
    linear-gradient(var(--color-linea) 1px, transparent 1px) 0 0 / 24px 24px,
    linear-gradient(90deg, var(--color-linea) 1px, transparent 1px) 0 0 / 24px 24px,
    linear-gradient(135deg, var(--color-chip-fondo), var(--color-superficie-2));
  border-bottom: 1px solid var(--color-superficie-borde);
}

.proyecto-sinimg .meta {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-chip-texto);
}

.proyecto-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
  padding: 1.1rem 1.2rem 1.2rem;
}

.proyecto-info h3 {
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.35;
  color: var(--color-puesto);
}

.descripcion {
  font-size: 0.93rem;
  color: var(--color-texto-suave);
}

.proyecto-links {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
  padding-top: 0.25rem;
}

.proyecto-links a {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  font-weight: 600;
}

.enlace-codigo {
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  color: var(--color-sobre-acento);
  background: var(--color-acento);
  transition: filter 0.2s;
}

.enlace-codigo:hover {
  filter: brightness(1.1);
}

.enlace-ver {
  color: var(--color-acento);
}

.enlace-ver:hover {
  text-decoration: underline;
}
</style>
