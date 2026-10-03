import './micro.css';

/**
 * Reproduce una micro-animación de micro.css, aunque ya se haya reproducido antes.
 *
 *   reproducir(campo, 'micro-temblor');
 *
 * Sacar y volver a poner la clase no alcanza: el navegador tiene que recalcular el estilo
 * entre medio (offsetWidth lo fuerza). Al terminar se quita sola para dejar el elemento limpio.
 */
export function reproducir(el, clase) {
  el.classList.remove(clase);
  void el.offsetWidth;
  el.classList.add(clase);
  el.addEventListener('animationend', () => el.classList.remove(clase), { once: true });
}
