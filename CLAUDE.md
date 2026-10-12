# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Portafolio personal de Arón Rojas: SPA en Vue 3 (`<script setup>`, JS sin TypeScript) + Vite 8 + GSAP, desplegada en Vercel con Node 24. Todo el código, comentarios, nombres de variables y textos están en español.

## Comandos

- `npm run dev`: servidor de desarrollo de Vite
- `npm run build`: build de producción en `dist/`
- `npm run preview`: sirve el build
- `npm run lint`: ESLint 10 (flat config en `eslint.config.js`). Ojo: corre con `--fix` y modifica archivos.

No hay tests. CI (`.github/workflows/audit.yml`) corre `npm audit --audit-level=high` y `npm run build` en cada push/PR a `main` y los lunes. Dependabot actualiza dependencias.

## Arquitectura

**Una sola pantalla con "legajo de solapas".** No hay router. `App.vue` muestra la portada (`DatosPersonales.vue`) y `LegajoPanel.vue`. Cada sección (experiencia, habilidades, certificaciones, proyectos, educación, intereses) es una "hoja" guardada en una solapa de `NavBar.vue` que se abre como panel.

- `src/components/legajo/legajo.js` es el estado compartido a nivel de módulo (refs de Vue, sin Pinia): la lista `hojas`, la hoja `activa`, el `progreso` de lectura (lo muestra `BarraProgreso.vue`) y `abrir`/`cerrar`/`alternar`/`hojear`. La hoja abierta se refleja en el hash (`#proyectos`) con `history.replaceState`, y un `hashchange` manual también abre su hoja.
- `LegajoPanel.vue` carga cada componente de sección con `defineAsyncComponent` (mapa `cargadores`) y los precarga en `requestIdleCallback`. Anima la apertura/cierre con la Web Animations API usando `clip-path` medido desde la solapa (`.pestana[data-hoja="…"]`) y respeta `prefers-reduced-motion`.
- **Para agregar una sección** hay que tocarla en dos lugares: `hojas` en `legajo.js` y `cargadores` en `LegajoPanel.vue`.

**Tema claro/oscuro.** `components/tema/tema.js` sigue al sistema hasta que el usuario elige con `BotonTema`; la elección se guarda en `localStorage('tema')` y se aplica como `data-tema="claro|oscuro"` en `<html>`. Un script inline en `index.html` lo aplica antes del primer pintado (evita el destello). Los colores son variables CSS semánticas en `src/assets/base.css`; usar esas variables (`--color-heading`, `--color-texto-suave`, etc.) en vez de colores fijos.

**Animaciones.**
- `components/ondas/`: tela de partículas en WebGL puro (`ondas.js`) usada como fondo de la portada; `liviano.js` decide un modo reducido para móviles, ahorro de datos o poca memoria.
- `components/aparecer/`: directiva global `v-aparecer` (registrada en `main.js`), estilo AOS con un IntersectionObserver compartido. Uso: `v-aparecer="'subir'"` o `v-aparecer="{ efecto, retraso, duracion, repetir }"`.
- GSAP: `SplitText` en `texto-split/TextoSplit.vue` y `Flip` (import dinámico) en `ProyectosComponente.vue`. `micro-css/micro.css` tiene micro-animaciones CSS.
- El repo hermano `C:\proj\animaciones-portafolio` es un laboratorio de animaciones; las que funcionan allí se traen a este portafolio.

Vercel Web Analytics se inyecta en `main.js`. Alias `@` → `src/`. Los PDFs de certificados están en `public/certificados/`.

## Convenciones

- Commits en español con prefijo: `feat:`, `content:` (cambios de texto/datos del portafolio), `build:`, `ci:`.
- El contenido (experiencia, proyectos, habilidades) debe ser fiel al CV/legajo real de Arón; no inventar datos.
- Vercel publica cada push a `main`: trabajar en ramas y revisar en las previews.
