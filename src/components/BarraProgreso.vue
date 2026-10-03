<script setup>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onBeforeUnmount, onMounted, ref } from 'vue';

gsap.registerPlugin(ScrollTrigger);

// Barra fina arriba de todo que se llena a medida que se baja por la página
// (adaptada de la animación "scroll-gsap" de la caja de herramientas).
const barra = ref(null);
let disparador;

onMounted(() => {
  disparador = ScrollTrigger.create({
    trigger: document.documentElement,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (st) => gsap.set(barra.value, { scaleX: st.progress }),
  });
});
onBeforeUnmount(() => disparador?.kill());
</script>

<template>
  <div ref="barra" class="barra-progreso" aria-hidden="true"></div>
</template>

<style scoped>
.barra-progreso {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #03346E, #6EACDA, #E2E2B6);
  transform: scaleX(0);
  transform-origin: left center;
  pointer-events: none;
}
</style>
