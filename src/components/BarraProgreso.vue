<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { activa, progreso } from './legajo/legajo.js';
import { tema } from './tema/tema.js';

// "Hilo de lectura": una línea de puntos cruza el borde superior, como la tela del fondo. A medida
// que se lee la hoja abierta, el hilo se enhebra (los puntos pasan a ser una línea encendida) y
// alrededor de la punta viaja una onda, como si el hilo vibrara al avanzar.
const lienzo = ref(null);
const colores = {
  oscuro: ['#1f5fa8', '#8fd3ff'],
  claro: ['#ff1f8f', '#a8005a'],
};
const ALTO = 16; // px de CSS
const BASE = 5; // altura de la línea en reposo

const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let ctx;
let ancho = 0;
let actual = 0;
let visible = 0; // 0 sin hoja abierta, 1 con hoja: aparece y se apaga el hilo
let fase = 0;
let raf = 0;
let anterior = 0;

function medir() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  ancho = lienzo.value.clientWidth;
  lienzo.value.width = Math.round(ancho * dpr);
  lienzo.value.height = Math.round(ALTO * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

// Altura del hilo en x: casi recto, salvo una onda que se concentra alrededor de la punta.
function altura(x, punta) {
  const cerca = Math.exp(-(((x - punta) / 70) ** 2));
  return BASE + Math.sin(x * 0.11 - fase) * (0.6 + 3.2 * cerca) * visible;
}

function dibujar(ahora) {
  const dt = Math.min(0.05, (ahora - anterior) / 1000 || 0);
  anterior = ahora;
  const objetivo = activa.value ? progreso.value : 0;
  const seguir = 1 - Math.exp(-dt / 0.12);
  actual += (objetivo - actual) * seguir;
  visible += ((activa.value ? 1 : 0) - visible) * seguir;
  if (!movimientoReducido) fase += dt * 7;

  ctx.clearRect(0, 0, ancho, ALTO);
  const [desde, hasta] = colores[tema.value];
  const punta = actual * ancho;

  // Tramo por leer: puntos sueltos. Sin hoja abierta el hilo no se ve (no hay nada que leer).
  ctx.fillStyle = hasta;
  ctx.globalAlpha = 0.5 * visible;
  for (let x = punta + 6; x < ancho; x += 7) {
    ctx.beginPath();
    ctx.arc(x, altura(x, punta), 1.1, 0, Math.PI * 2);
    ctx.fill();
  }

  // Tramo leído: línea continua con degradé que se enciende hacia la punta.
  if (punta > 1) {
    const degrade = ctx.createLinearGradient(0, 0, punta, 0);
    degrade.addColorStop(0, desde);
    degrade.addColorStop(1, hasta);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = degrade;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, altura(0, punta));
    for (let x = 2; x <= punta; x += 2) ctx.lineTo(x, altura(x, punta));
    ctx.stroke();

    // Punta: un destello que respira.
    const y = altura(punta, punta);
    const radio = 7 + Math.sin(fase * 0.8) * 1.5;
    const brillo = ctx.createRadialGradient(punta, y, 0, punta, y, radio);
    brillo.addColorStop(0, hasta);
    brillo.addColorStop(1, 'transparent');
    ctx.fillStyle = brillo;
    ctx.beginPath();
    ctx.arc(punta, y, radio, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Sin hoja abierta y ya quieto, deja de animarse hasta que vuelva a hacer falta.
  const quieto = !activa.value && actual < 0.001 && visible < 0.001;
  raf = quieto ? 0 : requestAnimationFrame(dibujar);
}

function despertar() {
  if (raf) return;
  anterior = performance.now();
  raf = requestAnimationFrame(dibujar);
}

let observador;
onMounted(() => {
  ctx = lienzo.value.getContext('2d');
  medir();
  observador = new ResizeObserver(() => {
    medir();
    despertar();
  });
  observador.observe(lienzo.value);
  despertar();
});
watch([activa, progreso, tema], despertar);
onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
  observador?.disconnect();
});
</script>

<template>
  <canvas ref="lienzo" class="hilo-lectura" aria-hidden="true"></canvas>
</template>

<style scoped>
.hilo-lectura {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 16px;
  pointer-events: none;
}
</style>
