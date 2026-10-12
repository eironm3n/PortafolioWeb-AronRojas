# Portafolio — Arón Rojas

Especialista en Soporte de Aplicaciones · Cloud (AWS/Azure) · Automatización · Geociencia / Oil & Gas

🌐 **https://portafolio-web-aron-rojas.vercel.app**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aron-rojas/)
[![GitHub](https://img.shields.io/badge/GitHub-181717.svg?logo=github&logoColor=white)](https://github.com/eironm3n)

## Qué es

Portafolio en una sola pantalla: la portada con la presentación y el CV, y un "legajo" con solapas
(Experiencia, Habilidades, Certificaciones, Proyectos, Educación, Intereses) que se abren como hojas.
Tiene modo claro y oscuro, un fondo de partículas en WebGL propio y animaciones con GSAP.

## Stack

Vue 3 · Vite · GSAP · WebGL · Vercel (Node 24)

## Desarrollo

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # build de producción en dist/
npm run preview   # sirve el build
npm run lint      # ESLint (aplica --fix)
```

CI: auditoría de dependencias (`npm audit`) y build en cada push o PR a `main`, y todos los lunes.
