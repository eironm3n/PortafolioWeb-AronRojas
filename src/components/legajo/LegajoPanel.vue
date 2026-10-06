<script setup>
import { computed, defineAsyncComponent, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { activa, cerrar, hojas, hojear, indiceDe, progreso } from './legajo.js';

// Cada hoja se descarga aparte: la portada carga liviana y las hojas se traen en segundo plano
// apenas el navegador está libre, así ya están listas cuando se abre la primera.
const cargadores = {
  experiencia: () => import('../ExperienciaComponente.vue'),
  habilidades: () => import('../HabilidadesComponente.vue'),
  certificaciones: () => import('../CertificacionesComponente.vue'),
  proyectos: () => import('../ProyectosComponente.vue'),
  educacion: () => import('../EducacionComponente.vue'),
  intereses: () => import('../InteresesComponente.vue'),
};
const contenidos = Object.fromEntries(Object.entries(cargadores).map(([id, cargar]) => [id, defineAsyncComponent(cargar)]));
const precargar = () => Object.values(cargadores).forEach((cargar) => cargar());
onMounted(() => (window.requestIdleCallback ?? ((f) => setTimeout(f, 1500)))(precargar));

// `mostrada` es la hoja que está en pantalla; puede ir un paso atrás de `activa` mientras una hoja
// se guarda en su solapa y la otra todavía no salió de la suya.
const mostrada = ref(null);
const indice = computed(() => indiceDe(mostrada.value));
const hoja = computed(() => hojas[indice.value]);
const numero = (i) => String(i + 1).padStart(2, '0');

const panel = ref(null);
// La hoja se abre justo debajo de la barra de solapas.
const arriba = ref(0);
const medirArriba = () => (arriba.value = (document.querySelector('.navbar')?.getBoundingClientRect().bottom ?? 64) + 12);
const contenido = ref(null);
const cuerpo = ref(null);
const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const solapaDe = (id) => document.querySelector(`.pestana[data-hoja="${id}"]`);

// Recorte con la forma de la solapa, medido desde el panel ya ubicado en su lugar final. El panel
// además se sube hasta la altura de la solapa, así el recorte nunca necesita valores negativos.
function formaDeSolapa(id) {
  const p = panel.value.getBoundingClientRect();
  const s = solapaDe(id)?.getBoundingClientRect();
  if (!s) return null;
  const limitar = (v) => Math.min(Math.max(v, 0), p.width - 1);
  const izquierda = limitar(s.left - p.left);
  const derecha = limitar(p.right - s.right);
  return {
    transform: `translateY(${s.top - p.top}px)`,
    clipPath: `inset(0px ${derecha}px ${Math.max(p.height - s.height, 0)}px ${izquierda}px round 9px)`,
  };
}
const formaAbierta = { transform: 'translateY(0px)', clipPath: 'inset(0px 0px 0px 0px round 14px)' };

function animar(el, cuadros, opciones) {
  if (movimientoReducido) {
    cuadros = [{ opacity: cuadros[0].opacity ?? 1 }, { opacity: cuadros[1].opacity ?? 1 }];
    opciones = { ...opciones, duration: 150, delay: 0 };
  }
  return el.animate(cuadros, opciones).finished;
}

// Sale de la solapa: el recorte crece desde la forma de la solapa hasta el panel entero.
async function sacarDe(id) {
  const desde = formaDeSolapa(id) ?? { ...formaAbierta, opacity: 0 };
  await Promise.all([
    animar(panel.value, [desde, { ...formaAbierta, opacity: 1 }], {
      duration: 480,
      easing: 'cubic-bezier(0.2, 0.85, 0.25, 1)',
      fill: 'backwards',
    }),
    animar(contenido.value, [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], {
      duration: 300,
      delay: 200,
      easing: 'ease-out',
      fill: 'backwards',
    }),
  ]);
}

// Se guarda en la solapa: primero se apaga el contenido y después el panel se encoge hasta ella.
async function guardarEn(id) {
  const hasta = formaDeSolapa(id) ?? { ...formaAbierta, opacity: 0 };
  const opciones = { easing: 'cubic-bezier(0.55, 0, 0.75, 0.2)', fill: 'forwards' };
  const animaciones = [
    animar(contenido.value, [{ opacity: 1 }, { opacity: 0 }], { duration: 140, fill: 'forwards' }),
    animar(panel.value, [{ ...formaAbierta, opacity: 1 }, { ...hasta, opacity: 0.6 }], { ...opciones, duration: 320 }),
  ];
  await Promise.all(animaciones);
}

// Lleva lo que se ve hasta `activa`, de a un paso por vez: si se hace click rápido en varias solapas
// no se pisan las animaciones, y al final siempre queda abierta la última pedida.
let ocupado = false;
async function sincronizar() {
  if (ocupado) return;
  ocupado = true;
  try {
    while (mostrada.value !== activa.value) {
      if (mostrada.value) {
        await guardarEn(mostrada.value);
        mostrada.value = null;
        await nextTick();
      } else {
        medirArriba();
        mostrada.value = activa.value;
        progreso.value = 0;
        await nextTick();
        cuerpo.value.scrollTop = 0;
        panel.value.focus({ preventScroll: true });
        await sacarDe(mostrada.value);
      }
    }
  } finally {
    ocupado = false;
  }
}

watch(activa, (id, anterior) => {
  // Al guardar con Escape o click afuera, el foco vuelve a la solapa de donde salió la hoja.
  if (!id && anterior) solapaDe(anterior)?.focus({ preventScroll: true });
  sincronizar();
});
onMounted(sincronizar);

function alDesplazar() {
  const { scrollTop, scrollHeight, clientHeight } = cuerpo.value;
  progreso.value = scrollHeight > clientHeight ? scrollTop / (scrollHeight - clientHeight) : 1;
}

// Teclado, como en una presentación: ← / → cambian de hoja y Escape la guarda.
function teclas(evento) {
  if (!activa.value || evento.altKey || evento.ctrlKey || evento.metaKey) return;
  if (evento.target.closest?.('input, textarea, select')) return;
  if (evento.key === 'ArrowRight') hojear(1);
  else if (evento.key === 'ArrowLeft') hojear(-1);
  else if (evento.key === 'Escape') cerrar();
  else return;
  evento.preventDefault();
}
onMounted(() => window.addEventListener('keydown', teclas));
onBeforeUnmount(() => window.removeEventListener('keydown', teclas));

// En pantallas táctiles también se hojea deslizando el dedo de costado.
let inicio = null;
function tocar(evento) {
  const t = evento.changedTouches[0];
  inicio = { x: t.clientX, y: t.clientY };
}
function soltar(evento) {
  if (!inicio) return;
  const t = evento.changedTouches[0];
  const dx = t.clientX - inicio.x;
  const dy = t.clientY - inicio.y;
  inicio = null;
  // Solo cuenta un deslizamiento claramente horizontal, para no confundirlo con el scroll.
  if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.8) hojear(dx < 0 ? 1 : -1);
}
</script>

<template>
  <div class="legajo" :class="{ visible: mostrada }">
    <!-- Click afuera de la hoja: se guarda en su solapa. -->
    <div class="fondo" :class="{ activo: activa }" aria-hidden="true" @click="cerrar"></div>

    <div v-if="mostrada" class="marco" :style="{ top: `${arriba}px` }">
      <div ref="panel" class="panel" role="dialog" :aria-labelledby="`titulo-${hoja.id}`" tabindex="-1" @touchstart.passive="tocar" @touchend.passive="soltar">
        <!-- En celulares la hoja ocupa casi toda la pantalla y casi no queda "afuera" para tocar. -->
        <button type="button" class="cerrar" aria-label="Guardar la hoja" @click="cerrar">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" /></svg>
        </button>
        <div ref="cuerpo" class="cuerpo" @scroll.passive="alDesplazar">
          <div ref="contenido" class="contenido">
            <header class="hoja-encabezado">
              <span class="hoja-numero">{{ numero(indice) }} / {{ numero(hojas.length - 1) }}</span>
              <h2 :id="`titulo-${hoja.id}`">{{ hoja.nombre }}</h2>
            </header>
            <component :is="contenidos[hoja.id]" />
          </div>
        </div>
      </div>

      <!-- Controles de presentación: anterior / siguiente. -->
      <div class="controles" :class="{ activos: activa === mostrada }">
        <button type="button" class="control" aria-label="Hoja anterior" :disabled="indice === 0" @click="hojear(-1)">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </button>
        <span class="contador" aria-hidden="true">{{ numero(indice) }} / {{ numero(hojas.length - 1) }}</span>
        <button type="button" class="control" aria-label="Hoja siguiente" :disabled="indice === hojas.length - 1" @click="hojear(1)">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Capa que cubre la ventana, por debajo de la barra de solapas (z-index 5). */
.fondo {
  position: fixed;
  inset: 0;
  z-index: 3;
  background: rgba(0, 0, 0, 0.25);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s;
}

.fondo.activo {
  opacity: 1;
  pointer-events: auto;
}

/* El marco ocupa el lugar de la hoja abierta: debajo de la barra y centrado. */
.marco {
  position: fixed;
  z-index: 4;
  bottom: 1rem;
  left: 0;
  right: 0;
  width: min(1100px, calc(100% - 2rem));
  margin-inline: auto;
  pointer-events: none;
}

.panel {
  position: relative;
  height: 100%;
  pointer-events: auto;
  border-radius: 14px;
  border: 1px solid var(--color-border);
  /* Opaco y sin desenfoque: el desenfoque sobre la tela animada, mientras la hoja se recorta, hacía
     parpadear la pantalla y es caro en celulares; y con transparencia se leía la portada detrás. */
  background: var(--color-background);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.3);
  outline: none;
  touch-action: pan-y pinch-zoom;
  overscroll-behavior-x: none;
}

.cerrar {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: var(--color-nav-texto);
  background: color-mix(in srgb, var(--color-nav-fondo) 85%, transparent);
  border: 1px solid var(--color-nav-borde);
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
}

.cerrar:hover,
.cerrar:focus-visible {
  transform: rotate(90deg);
  background-color: var(--color-nav-hover);
}

.cuerpo {
  height: 100%;
  overflow-y: auto;
  overflow-x: clip;
  overscroll-behavior: contain;
  padding: 2rem 2rem 5rem;
  scrollbar-width: thin;
}

.hoja-encabezado {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  margin-bottom: 1.5rem;
}

.hoja-numero {
  font-size: 0.85rem;
  letter-spacing: 0.15em;
  color: var(--color-texto-suave);
}

.hoja-encabezado h2 {
  font-size: 2rem;
  color: var(--color-heading);
}

/* Barra de presentación flotante al pie de la hoja: ‹ 04 / 06 ›. */
.controles {
  position: absolute;
  left: 50%;
  bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.35rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-nav-fondo) 85%, transparent);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-nav-borde);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  transform: translate(-50%, 12px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s, transform 0.25s;
}

.controles.activos {
  transform: translate(-50%, 0);
  opacity: 1;
  pointer-events: auto;
  transition-delay: 0.3s;
}

.contador {
  min-width: 4.5em;
  text-align: center;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  color: var(--color-nav-texto);
}

.control {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  color: var(--color-sobre-acento);
  background: var(--color-acento);
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s, box-shadow 0.2s;
}

.control:hover:not(:disabled),
.control:focus-visible {
  transform: scale(1.1);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-acento) 30%, transparent);
}

.control:active:not(:disabled) {
  transform: scale(0.94);
}

.control:disabled {
  opacity: 0.3;
  cursor: default;
}

/* En pantallas anchas las flechas van a los costados de la hoja, como en una presentación. */
@media (min-width: 1240px) {
  .controles {
    inset: 0;
    transform: none;
    padding: 0;
    border: none;
    border-radius: 0;
    background: none;
    backdrop-filter: none;
    box-shadow: none;
    justify-content: space-between;
    pointer-events: none;
  }

  .controles.activos {
    transform: none;
    pointer-events: none;
  }

  .contador {
    display: none;
  }

  .control {
    width: 56px;
    height: 56px;
    margin-inline: -84px;
    pointer-events: auto;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  }
}

@media (max-width: 768px) {
  .marco {
    width: calc(100% - 1rem);
    bottom: 0.5rem;
  }

  .cuerpo {
    padding: 1.25rem 0.9rem 5rem;
  }
}
</style>
