<script setup>
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

gsap.registerPlugin(SplitText);

const props = defineProps({
  texto: { type: String, default: 'Arón Rojas' },
  // Qué se anima por separado: 'letras' | 'palabras' | 'lineas'.
  modo: { type: String, default: 'letras' },
  // Entra, espera y sale en bucle (para vistas previas o un hero que rota frases).
  repetir: { type: Boolean, default: false },
  etiqueta: { type: String, default: 'h1' },
});

const UNIDADES = { letras: 'chars', palabras: 'words', lineas: 'lines' };
const titulo = ref(null);
let mm;

function iniciar() {
  mm = gsap.matchMedia();
  mm.add(
    { normal: '(prefers-reduced-motion: no-preference)', reducir: '(prefers-reduced-motion: reduce)' },
    ({ conditions }) => {
      if (conditions.reducir) {
        gsap.from(titulo.value, { opacity: 0, duration: 0.8 });
        return;
      }
      const unidad = UNIDADES[props.modo] ?? 'chars';
      SplitText.create(titulo.value, {
        // Con letras también se parte en palabras para que no se corten al saltar de línea.
        type: unidad === 'chars' ? 'words,chars' : unidad,
        mask: unidad,
        // Vuelve a partir al cambiar el ancho o cargar la fuente; la animación devuelta se rehace sola.
        autoSplit: true,
        onSplit(partes) {
          const piezas = partes[unidad];
          const entrada = {
            yPercent: 110,
            rotate: 6,
            opacity: 0,
            duration: 0.9,
            ease: 'expo.out',
            stagger: unidad === 'chars' ? 0.035 : 0.12,
          };
          if (!props.repetir) return gsap.from(piezas, entrada);
          return gsap
            .timeline({ repeat: -1, repeatDelay: 0.4 })
            .from(piezas, entrada)
            .to(piezas, { yPercent: -110, opacity: 0, duration: 0.6, ease: 'power3.in', stagger: entrada.stagger * 0.6 }, '+=1.6');
        },
      });
    },
  );
}

onMounted(iniciar);
// revert() devuelve el texto original antes de que Vue re-renderice; la :key fuerza un elemento nuevo.
watch(
  () => ({ ...props }),
  async () => {
    mm.revert();
    await nextTick();
    iniciar();
  },
);
onBeforeUnmount(() => mm.revert());
</script>

<template>
  <div class="texto-split">
    <component :is="etiqueta" :key="`${texto}|${modo}|${repetir}`" ref="titulo" class="titulo">{{ texto }}</component>
  </div>
</template>

<style scoped>
.texto-split {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  padding: 0 6%;
  container-type: inline-size;
}

.titulo {
  font-size: clamp(2rem, 12cqi, 9rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.05;
  text-align: center;
  color: var(--texto, #f2f2f7);
}
</style>
