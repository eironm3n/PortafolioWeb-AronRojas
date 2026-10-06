<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { iniciarOndas } from './ondas.js';

// Ver OpcionesOndas en ondas.js para el detalle de cada prop.
const props = defineProps({
  resolucion: { type: Number, default: undefined },
  escala: { type: Number, default: undefined },
  velocidad: { type: Number, default: undefined },
  escalaRuido: { type: Number, default: undefined },
  intensidad: { type: Number, default: undefined },
  colorBajo: { type: String, default: undefined },
  colorAlto: { type: String, default: undefined },
  colorFondo: { type: String, default: undefined },
  foco: { type: Number, default: undefined },
  apertura: { type: Number, default: undefined },
  tamano: { type: Number, default: undefined },
  opacidad: { type: Number, default: undefined },
  vinetaOscuridad: { type: Number, default: undefined },
  vinetaInicio: { type: Number, default: undefined },
  // Deja solo los puntos que destellan (ej. al pasar el mouse por un botón).
  destellos: { type: Boolean, default: false },
  // La tela cubre toda la ventana y queda quieta detrás de la página mientras se scrollea.
  fijo: { type: Boolean, default: false },
  fpsMax: { type: Number, default: undefined },
  // Congela la tela en el último cuadro (por ejemplo, cuando algo la tapa por completo).
  pausado: { type: Boolean, default: false },
});

const canvas = ref(null);
// Un contexto WebGL liberado no se puede reutilizar: al cambiar props se recrea el canvas.
const version = ref(0);
let ondas = { detener: () => {}, destellos: () => {}, colores: () => {}, pausar: () => {} };

// Estas props se aplican en caliente (los colores con un fundido): cambiarlas no recrea la tela.
const EN_CALIENTE = ['destellos', 'fijo', 'pausado', 'colorBajo', 'colorAlto', 'colorFondo', 'opacidad'];
const opciones = () =>
  Object.fromEntries(Object.entries(props).filter(([k, v]) => !EN_CALIENTE.includes(k) && v !== undefined));
const colores = () => ({
  colorBajo: props.colorBajo,
  colorAlto: props.colorAlto,
  colorFondo: props.colorFondo,
  opacidad: props.opacidad,
});

function arrancar() {
  // Los colores van como opciones iniciales para que la primera imagen ya salga con la paleta correcta.
  const iniciales = Object.fromEntries(Object.entries(colores()).filter(([, v]) => v !== undefined));
  ondas = iniciarOndas(canvas.value, { ...opciones(), ...iniciales });
  ondas.destellos(props.destellos);
  ondas.pausar(props.pausado);
}

onMounted(arrancar);
watch(
  () => JSON.stringify(opciones()),
  async () => {
    ondas.detener();
    version.value++;
    await nextTick();
    arrancar();
  },
);
watch(
  () => props.destellos,
  (activo) => ondas.destellos(activo),
);
watch(
  () => props.pausado,
  (activo) => ondas.pausar(activo),
);
watch(colores, (c) => ondas.colores({ bajo: c.colorBajo, alto: c.colorAlto, fondo: c.colorFondo, opacidad: c.opacidad }));
onBeforeUnmount(() => ondas.detener());
</script>

<template>
  <div class="fondo-ondas" :class="{ fijo }">
    <canvas :key="version" ref="canvas" aria-hidden="true"></canvas>
    <div v-if="$slots.default" class="contenido">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.fondo-ondas {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: #000;
  overflow: hidden;
}

canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.fijo {
  background: transparent;
  overflow: visible;
}

/* z-index negativo: se pinta sobre el fondo del body pero debajo de todo el contenido. */
.fijo canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100lvh;
  z-index: -1;
  background: var(--color-background);
}

.contenido {
  position: relative;
  z-index: 1;
  min-height: inherit;
  display: grid;
  place-items: center;
  pointer-events: none;
}

.contenido > :deep(*) {
  pointer-events: auto;
}
</style>
