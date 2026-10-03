import './aparecer.css';

/**
 * Directiva v-aparecer: el elemento aparece al entrar en pantalla (al estilo de AOS, sin librerías).
 *
 *   <section v-aparecer="'subir'">…</section>
 *   <li v-aparecer="{ efecto: 'zoom', retraso: 150, duracion: 900, repetir: true }">…</li>
 *
 * Efectos: 'subir' | 'bajar' | 'izquierda' | 'derecha' | 'zoom' | 'voltear' | 'desvanecer'.
 * - retraso / duracion: en milisegundos (0 / 700).
 * - repetir: vuelve a ocultarse al salir de pantalla, para animarse otra vez (false).
 *
 * Sin JavaScript el contenido se ve igual: solo se oculta cuando la directiva marca el elemento.
 */
const configuracion = new WeakMap();
let observador;

function obtenerObservador() {
  // Un solo observador compartido para todos los elementos.
  observador ??= new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        const { repetir } = configuracion.get(entrada.target) ?? {};
        if (entrada.isIntersecting) {
          entrada.target.classList.add('aparecer-visible');
          if (!repetir) observador.unobserve(entrada.target);
        } else if (repetir) {
          entrada.target.classList.remove('aparecer-visible');
        }
      }
    },
    // Se activa cuando asoma un 15% del elemento, un poco antes del borde inferior.
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
  );
  return observador;
}

function aplicar(el, valor) {
  const { efecto = 'subir', retraso = 0, duracion = 700, repetir = false } = typeof valor === 'string' ? { efecto: valor } : (valor ?? {});
  el.dataset.aparecer = efecto;
  el.style.setProperty('--aparecer-retraso', `${retraso}ms`);
  el.style.setProperty('--aparecer-duracion', `${duracion}ms`);
  configuracion.set(el, { repetir });
}

export const vAparecer = {
  mounted(el, { value }) {
    aplicar(el, value);
    obtenerObservador().observe(el);
  },
  updated(el, { value }) {
    aplicar(el, value);
  },
  unmounted(el) {
    observador?.unobserve(el);
  },
};
