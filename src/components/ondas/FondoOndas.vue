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
  foco: { type: Number, default: undefined },
  apertura: { type: Number, default: undefined },
  tamano: { type: Number, default: undefined },
  opacidad: { type: Number, default: undefined },
  vinetaOscuridad: { type: Number, default: undefined },
  vinetaInicio: { type: Number, default: undefined },
  // Deja solo los puntos que destellan (ej. al pasar el mouse por un botón).
  destellos: { type: Boolean, default: false },
});

const canvas = ref(null);
// Un contexto WebGL liberado no se puede reutilizar: al cambiar props se recrea el canvas.
const version = ref(0);
let ondas = { detener: () => {}, destellos: () => {} };

// Todas las props menos `destellos`, que se cambia en caliente sin recrear nada.
const opciones = () =>
  Object.fromEntries(Object.entries(props).filter(([k, v]) => k !== 'destellos' && v !== undefined));

function arrancar() {
  ondas = iniciarOndas(canvas.value, opciones());
  ondas.destellos(props.destellos);
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
onBeforeUnmount(() => ondas.detener());
</script>

<template>
  <div class="fondo-ondas">
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
