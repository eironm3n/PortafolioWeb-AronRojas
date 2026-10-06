<script setup>
import { gsap } from 'gsap';
import { nextTick, onBeforeUnmount, ref } from 'vue';
import imgPowerBi from '/src/assets/proyectos/powerbi-videojuegos.webp';

const misProyectos = ref([
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
    id: 8,
    categoria: 'Cloud y DevOps',
    titulo: 'Infraestructura como código — Terraform (dedicado)',
    descripcion: 'Próximo proyecto dedicado de IaC. Objetivo: red y cómputo reproducibles en AWS con módulos reutilizables, backend de estado remoto (S3 + DynamoDB) y validación en CI. Hoy Terraform se usa dentro de shortlink-service (validado en CI, sin aplicar).',
    stack: 'Terraform · AWS',
    projectoLink: '',
    githubLink: '',
    estado: 'en construcción',
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
    >
      <article class="proyecto" v-aparecer="{ efecto: 'subir', retraso: (i % 3) * 120 }">
        <img v-if="proyecto.imagen" :src="proyecto.imagen" :alt="`Captura del proyecto ${proyecto.titulo}`">
        <div v-else class="proyecto-sinimg">{{ proyecto.stack }}</div>
        <div class="proyecto-info">
          <span class="badge" :class="proyecto.estado === 'publicado' ? 'badge-ok' : 'badge-wip'">
            {{ proyecto.estado }}
          </span>
          <h3>{{ proyecto.titulo }}</h3>
          <p>{{ proyecto.descripcion }}</p>
          <p class="stack">{{ proyecto.stack }}</p>
          <div class="proyecto-links">
            <a v-if="proyecto.projectoLink" :href="proyecto.projectoLink" class="btn-ver-mas" target="_blank" rel="noopener noreferrer">Ver proyecto</a>
            <a v-if="proyecto.githubLink" :href="proyecto.githubLink" class="github-link" target="_blank" rel="noopener noreferrer">Ver código en GitHub</a>
          </div>
        </div>
      </article>
    </li>
  </ul>
</template>

<style scoped>
.galeria {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  justify-content: center;
  background: var(--hoja-degrade);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@media (prefers-reduced-motion: reduce) {
  .galeria {
    animation: none;
  }
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.filtros {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-bottom: 1rem;
}

.filtros > button {
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid var(--color-acento);
  background: transparent;
  color: var(--color-acento);
  font: inherit;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.filtros > button:hover,
.filtros > button[aria-pressed='true'] {
  background: var(--color-acento);
  color: var(--color-sobre-acento);
}

.celda {
  display: flex;
  max-width: 300px;
  flex: 1 1 300px;
}

.proyecto {
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 2px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f9f9f9;
}

.proyecto img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  display: block;
}

.proyecto-sinimg {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  background: var(--hoja-miniatura);
  color: var(--hoja-miniatura-texto);
  font-weight: 700;
  letter-spacing: 0.5px;
  padding: 0 1rem;
  text-align: center;
}

.proyecto-info {
  padding: 15px;
  text-align: center;
}

.badge {
  display: inline-block;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 2px 8px;
  border-radius: 999px;
  margin-bottom: 8px;
}

.badge-ok { background: #cdeccd; color: #1b5e20; }
.badge-wip { background: #ffe0b2; color: #8a4b00; }

.proyecto-info h3 {
  margin: 6px 0;
  font-size: 1.2em;
  color: #333;
}

.proyecto-info p {
  margin: 8px 0;
  font-size: 0.95em;
  color: #666;
}

.stack {
  font-size: 0.85em !important;
  color: var(--hoja-stack) !important;
  font-weight: 600;
}

.proyecto-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.proyecto-links .btn-ver-mas {
  background-color: var(--hoja-boton);
  color: #fff;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.proyecto-links .btn-ver-mas:hover {
  background-color: var(--hoja-boton-hover);
}

.proyecto-links .github-link {
  color: #333;
  text-decoration: none;
  font-size: 0.9em;
}

.proyecto-links .github-link:hover {
  text-decoration: underline;
}
</style>
