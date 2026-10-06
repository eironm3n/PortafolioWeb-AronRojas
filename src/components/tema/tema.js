import { ref } from 'vue';

// Tema: sigue al sistema hasta que se elige uno con el botón de la barra; la elección se guarda en
// localStorage y la aplica el script de index.html antes de pintar. Los colores de cada tema están
// en base.css. El estado es uno solo para toda la página (barra, fondo de ondas, etc.).
const sistemaOscuro = window.matchMedia('(prefers-color-scheme: dark)');
const temaActual = () => document.documentElement.dataset.tema || (sistemaOscuro.matches ? 'oscuro' : 'claro');

export const tema = ref(temaActual());

sistemaOscuro.addEventListener('change', () => (tema.value = temaActual()));

export function alternarTema() {
  const nuevo = tema.value === 'oscuro' ? 'claro' : 'oscuro';
  document.documentElement.dataset.tema = nuevo;
  try {
    localStorage.setItem('tema', nuevo);
  } catch {
    // Sin acceso a localStorage el cambio vale solo para esta visita.
  }
  tema.value = nuevo;
}
