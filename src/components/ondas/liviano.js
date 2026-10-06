// Modo liviano para la tela de ondas: celulares y tablets (pantalla angosta o táctil), quien activó
// el ahorro de datos o equipos con poca memoria. Se decide una vez al cargar.
const conexion = navigator.connection;

export const liviano =
  window.matchMedia('(max-width: 768px), (pointer: coarse)').matches ||
  Boolean(conexion?.saveData) ||
  (navigator.deviceMemory ?? 8) <= 4;
