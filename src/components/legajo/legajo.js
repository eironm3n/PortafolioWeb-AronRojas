import { ref } from 'vue';

// Estado del legajo: qué hoja está abierta (o ninguna, `null`). Cada hoja vive guardada en su solapa
// de la barra (NavBar) y se abre en un panel que sale de ella (LegajoPanel). La hoja abierta se
// refleja en la dirección (#proyectos) para poder compartir el enlace a una hoja.
export const hojas = [
  { id: 'experiencia', nombre: 'Experiencia' },
  { id: 'habilidades', nombre: 'Habilidades' },
  { id: 'certificaciones', nombre: 'Certificaciones' },
  { id: 'proyectos', nombre: 'Proyectos' },
  { id: 'educacion', nombre: 'Educación' },
  { id: 'intereses', nombre: 'Intereses' },
];

export const indiceDe = (id) => hojas.findIndex((h) => h.id === id);
const desdeDireccion = () => {
  const id = location.hash.slice(1);
  return indiceDe(id) >= 0 ? id : null;
};

export const activa = ref(desdeDireccion());
// Cuánto se leyó de la hoja abierta (0 a 1); lo muestra la barra de arriba.
export const progreso = ref(0);

function reflejarEnDireccion(id) {
  history.replaceState(null, '', id ? `#${id}` : location.pathname + location.search);
}

export function abrir(id) {
  if (indiceDe(id) < 0 || id === activa.value) return;
  activa.value = id;
  reflejarEnDireccion(id);
}

export function cerrar() {
  if (!activa.value) return;
  activa.value = null;
  reflejarEnDireccion(null);
}

// Click en una solapa: abre su hoja, o la guarda si ya estaba abierta.
export function alternar(id) {
  if (activa.value === id) cerrar();
  else abrir(id);
}

export function hojear(paso) {
  const siguiente = hojas[indiceDe(activa.value) + paso];
  if (siguiente) abrir(siguiente.id);
}

// Un enlace #seccion escrito a mano también abre su hoja (otros, como #top, se ignoran).
window.addEventListener('hashchange', () => {
  const id = desdeDireccion();
  if (id) abrir(id);
});
