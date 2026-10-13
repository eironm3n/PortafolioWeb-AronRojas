<script setup>
import linkedin from '/src/assets/linkedin_icon.svg';
import github from '/src/assets/github_icon.svg';
import email from '/src/assets/email_icon.svg';
import iconAws from '/src/components/icons/aws.svg';
import iconAzure from '/src/components/icons/azure.svg';
import iconGcp from '/src/components/icons/gcp.svg';
import iconLinux from '/src/components/icons/linux.svg';
import iconPowershell from '/src/components/icons/powershell.svg';
import iconPython from '/src/components/icons/python.svg';
import iconDocker from '/src/components/icons/docker.svg';
import iconK8s from '/src/components/icons/kubernetes.svg';
import iconTerraform from '/src/components/icons/terraform.svg';
import iconN8n from '/src/components/icons/n8n.svg';
import iconGit from '/src/components/icons/git.svg';
import iconBash from '/src/components/icons/bash.svg';
import iconSql from '/src/components/icons/sql.svg';
import iconVue from '/src/components/icons/vue.svg';
import { computed, ref } from 'vue';
import FondoOndas from './ondas/FondoOndas.vue';
import TextoSplit from './texto-split/TextoSplit.vue';
import { reproducir } from './micro-css/micro.js';
import { tema } from './tema/tema.js';
import { abrir, activa } from './legajo/legajo.js';
import { liviano } from './ondas/liviano.js';

// Portada en mosaicos ("bento"), como un panel de operaciones: cada mosaico resume una hoja del
// legajo y la abre al hacer click. Todo el contenido sale del CV y de las hojas.
const title = 'Arón Rojas';
const descripcion = 'Especialista en Soporte de Aplicaciones';
const especialidades = 'Cloud (AWS/Azure) · Automatización · Geociencia / Oil & Gas';
const residencia = 'Mendoza, AR · Remoto';
const presentacion = 'Soporte L1 y L2 en entornos críticos de cómputo intensivo del sector energético, para geólogos, ingenieros de reservorios y equipos de exploración de YPF y PeCOM. Infraestructura en AWS y Azure, Windows Server con PowerShell y automatización con Python e IA.';
const redesSociales = [
  { id: 1, name: 'LinkedIn', src: linkedin, url: 'https://www.linkedin.com/in/aron-rojas/', externo: true },
  { id: 3, name: 'GitHub', src: github, url: 'https://github.com/eironm3n', externo: true },
  { id: 4, name: 'Email: c1.aronrojas@gmail.com', src: email, url: 'mailto:c1.aronrojas@gmail.com', externo: false },
];
// Copia del CV que genera C:/proj/cv (build-cv.js + exportado a PDF). Sin teléfono a propósito.
const cv = '/cv/CV_Aron_Rojas.pdf';

const stack = [
  { nombre: 'AWS', icono: iconAws },
  { nombre: 'Azure', icono: iconAzure },
  { nombre: 'Google Cloud', icono: iconGcp },
  { nombre: 'Linux', icono: iconLinux },
  { nombre: 'PowerShell', icono: iconPowershell },
  { nombre: 'Python', icono: iconPython },
  { nombre: 'Docker', icono: iconDocker },
  { nombre: 'Kubernetes', icono: iconK8s },
  { nombre: 'Terraform', icono: iconTerraform },
  { nombre: 'n8n', icono: iconN8n },
  { nombre: 'Git', icono: iconGit },
  { nombre: 'Bash', icono: iconBash },
  { nombre: 'SQL', icono: iconSql },
  { nombre: 'Vue', icono: iconVue },
];
const intereses = ['Homelab y self-hosting', 'IA aplicada', 'Infraestructura reproducible', 'Boxeo', 'Alta montaña'];
const geociencia = ['Petrel', 'Studio', 'Intersect', 'Visage', 'tNavigator', 'CMG', 'Paradigm', 'Geolog', 'Sahara', 'QGIS'];
// Etapas reales del pipeline de shortlink-service (ver la hoja Proyectos).
const pipeline = ['ruff', 'mypy', 'pytest 95%', 'build', 'Trivy', 'smoke', 'GHCR'];

// Ver la portada de main: modo liviano en celulares y tela congelada con una hoja abierta.
const resolucion = liviano ? 192 : 512;
const fpsMax = liviano ? 30 : 60;
const pausado = computed(() => liviano && Boolean(activa.value));
// Detrás de los mosaicos la tela va más tenue: es ambiente, no protagonista.
const paletas = {
  oscuro: { bajo: '#173f6e', alto: '#4f9fd8', fondo: '#000000', opacidad: 0.7 },
  claro: { bajo: '#ff8cc4', alto: '#c2116e', fondo: '#fff4f9', opacidad: 0.6 },
};
const paleta = computed(() => paletas[tema.value]);
const sobreRed = ref(false);

function entrarRed(evento) {
  sobreRed.value = true;
  reproducir(evento.currentTarget.querySelector('img'), 'micro-pulso');
}
</script>

<template>
  <section class="datos-personales">
    <FondoOndas class="hero-ondas" :resolucion="resolucion" :color-bajo="paleta.bajo" :color-alto="paleta.alto" :color-fondo="paleta.fondo" :opacidad="paleta.opacidad" :destellos="sobreRed" :fps-max="fpsMax" :pausado="pausado" fijo>
      <div class="bento">
        <!-- Identidad: el único mosaico que no abre una hoja; tiene sus propias acciones. -->
        <article class="mosaico identidad">
          <p class="etiqueta"><span class="punto" aria-hidden="true"></span>{{ residencia }}</p>
          <TextoSplit class="nombre" :texto="title" />
          <h2>{{ descripcion }}</h2>
          <p class="especialidades">{{ especialidades }}</p>
          <p class="presentacion">{{ presentacion }}</p>
          <div class="acciones">
            <a class="boton-principal" :href="cv" download="CV_Aron_Rojas.pdf">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 19h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" /></svg>
              Descargar CV <span class="formato">(PDF)</span>
            </a>
            <ul class="redes">
              <li v-for="red in redesSociales" :key="red.id">
                <a :href="red.url" :target="red.externo ? '_blank' : null" :rel="red.externo ? 'noopener noreferrer' : null" :aria-label="red.externo ? `${red.name} (se abre en otra pestaña)` : red.name" :title="red.name" @mouseenter="entrarRed" @mouseleave="sobreRed = false" @focus="entrarRed" @blur="sobreRed = false">
                  <img :src="red.src" width="30" height="30" alt="">
                </a>
              </li>
            </ul>
          </div>
        </article>

        <article class="mosaico cifra">
          <p class="etiqueta">experiencia</p>
          <p class="valor">5<span> años</span></p>
          <p class="detalle">Soporte L1 / L2 para el sector energético</p>
          <button type="button" class="abrir" aria-label="Abrir Experiencia" @click="abrir('experiencia')"></button>
        </article>

        <article class="mosaico cifra">
          <p class="etiqueta">alcance</p>
          <p class="valor">6<span> países</span></p>
          <p class="detalle">Usuarios atendidos en YPF, bajo SLA</p>
          <button type="button" class="abrir" aria-label="Abrir Experiencia" @click="abrir('experiencia')"></button>
        </article>

        <article class="mosaico ahora">
          <p class="etiqueta"><span class="punto" aria-hidden="true"></span>en curso</p>
          <ul class="estado">
            <li><strong>Soporte L1/L2</strong> en PeCOM · E&amp;D HelpDesk <span class="meta">desde sep 2024</span></li>
            <li><strong>Equipo de desarrollo interno</strong> de ReMASA <span class="meta">desde feb 2026</span></li>
          </ul>
          <span class="ir" aria-hidden="true">Experiencia →</span>
          <button type="button" class="abrir" aria-label="Abrir Experiencia" @click="abrir('experiencia')"></button>
        </article>

        <article class="mosaico stack">
          <p class="etiqueta">stack</p>
          <!-- Cinta que se desplaza sola; la copia es solo visual para que el bucle no tenga cortes. -->
          <div class="cinta">
            <ul v-for="copia in 2" :key="copia" :aria-hidden="copia === 2">
              <li v-for="s in stack" :key="s.nombre"><img :src="s.icono" alt="" width="22" height="22">{{ s.nombre }}</li>
            </ul>
          </div>
          <span class="ir" aria-hidden="true">Habilidades →</span>
          <button type="button" class="abrir" aria-label="Abrir Habilidades" @click="abrir('habilidades')"></button>
        </article>

        <article class="mosaico proyecto">
          <p class="etiqueta">proyecto destacado</p>
          <h3>shortlink-service</h3>
          <p class="detalle">FastAPI con CI/CD, observabilidad e IaC de punta a punta.</p>
          <ol class="pipeline" aria-label="Etapas del pipeline">
            <li v-for="(etapa, i) in pipeline" :key="etapa" :style="{ '--i': i }">{{ etapa }}</li>
          </ol>
          <span class="ir" aria-hidden="true">Proyectos →</span>
          <button type="button" class="abrir" aria-label="Abrir Proyectos" @click="abrir('proyectos')"></button>
        </article>

        <article class="mosaico geo">
          <p class="etiqueta">geociencia · oil &amp; gas</p>
          <ul class="chips">
            <li v-for="app in geociencia" :key="app" class="chip">{{ app }}</li>
          </ul>
          <span class="ir" aria-hidden="true">Habilidades →</span>
          <button type="button" class="abrir" aria-label="Abrir Habilidades" @click="abrir('habilidades')"></button>
        </article>

        <article class="mosaico cifra">
          <p class="etiqueta">certificaciones</p>
          <p class="valor">12</p>
          <p class="detalle">Google Cloud, Azure, Kubernetes, Linux, IA</p>
          <button type="button" class="abrir" aria-label="Abrir Certificaciones" @click="abrir('certificaciones')"></button>
        </article>

        <article class="mosaico cifra">
          <p class="etiqueta">educación</p>
          <p class="valor chico">UTN</p>
          <p class="detalle">Técnico Universitario en Programación</p>
          <button type="button" class="abrir" aria-label="Abrir Educación" @click="abrir('educacion')"></button>
        </article>

        <article class="mosaico intereses">
          <p class="etiqueta">fuera del ticket</p>
          <ul class="chips">
            <li v-for="interes in intereses" :key="interes" class="chip">{{ interes }}</li>
          </ul>
          <span class="ir" aria-hidden="true">Intereses →</span>
          <button type="button" class="abrir" aria-label="Abrir Intereses" @click="abrir('intereses')"></button>
        </article>
      </div>
    </FondoOndas>
  </section>
</template>

<style scoped>
.datos-personales {
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  backdrop-filter: none;
}

.datos-personales .hero-ondas {
  min-height: 0;
}

.bento {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-rows: minmax(150px, auto);
  gap: 0.85rem;
  margin: 1.25rem auto;
  max-width: 1180px;
}

.identidad { grid-column: 1 / 3; grid-row: 1 / 3; }
.ahora { grid-column: 3 / 5; }
.stack { grid-column: 1 / 3; }
.proyecto { grid-column: 3 / 5; grid-row: span 2; }
.geo { grid-column: 1 / 3; }
.intereses { grid-column: 3 / 5; }

.mosaico {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.25rem 1.35rem;
  overflow: hidden;
  color: var(--color-text);
  background: color-mix(in srgb, var(--color-superficie) 82%, transparent);
  border: 1px solid var(--color-superficie-borde);
  border-radius: 18px;
  box-shadow: var(--sombra-1);
  backdrop-filter: blur(8px);
  transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
}

/* Todo el mosaico es el botón que abre su hoja (los enlaces de adentro quedan por encima). */
.abrir {
  position: absolute;
  inset: 0;
  border: none;
  background: none;
  border-radius: inherit;
  cursor: pointer;
}

.mosaico:has(.abrir):hover {
  transform: translateY(-3px);
  box-shadow: var(--sombra-2);
  border-color: color-mix(in srgb, var(--color-acento) 45%, transparent);
}

.etiqueta {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--fuente-mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-acento);
}

/* Punto de "en línea", como en un panel de estado. */
.punto {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #2fbf71;
  box-shadow: 0 0 0 0 rgba(47, 191, 113, 0.6);
  animation: en-linea 2.2s ease-out infinite;
}

@keyframes en-linea {
  70% { box-shadow: 0 0 0 8px rgba(47, 191, 113, 0); }
  100% { box-shadow: 0 0 0 0 rgba(47, 191, 113, 0); }
}

.ir {
  margin-top: auto;
  align-self: flex-end;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-acento);
  transition: transform 0.25s;
}

.mosaico:hover .ir {
  transform: translateX(3px);
}

/* Identidad */
.identidad {
  justify-content: center;
  padding: 1.75rem 2rem;
  background: color-mix(in srgb, var(--color-superficie) 90%, transparent);
}

.identidad .nombre {
  padding: 0;
  place-items: start;
  margin-top: 0.4rem;
}

.nombre :deep(.titulo) {
  font-size: clamp(2.4rem, 4.2vw, 3.6rem);
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1.05;
  text-align: left;
  color: var(--color-hero-nombre);
}

.identidad h2 {
  text-align: left;
  font-size: 1.35rem;
  font-weight: 500;
  color: var(--color-hero-titulo);
}

.especialidades {
  font-family: var(--fuente-mono);
  font-size: 0.82rem;
  color: var(--color-texto-suave);
}

.presentacion {
  margin: 0.5rem 0 0.75rem;
  font-size: 1rem;
  line-height: 1.65;
  max-width: 58ch;
}

.acciones {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
}

.boton-principal {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 44px;
  padding: 0.55rem 1.3rem;
  font-weight: 600;
  color: var(--color-sobre-acento);
  background: var(--color-acento);
  border-radius: 999px;
  box-shadow: 0 6px 18px color-mix(in srgb, var(--color-acento) 35%, transparent);
  transition: transform 0.2s, box-shadow 0.2s;
}

.boton-principal:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px color-mix(in srgb, var(--color-acento) 45%, transparent);
}

.boton-principal .formato {
  font-weight: 400;
  opacity: 0.8;
}

.redes {
  display: flex;
  gap: 0.35rem;
  padding: 0;
}

.redes a {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
}

.redes img {
  background: #fff;
  border-radius: 50%;
  padding: 2px;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-acento) 40%, transparent);
  transition: transform 0.25s, box-shadow 0.25s;
}

.redes a:hover img,
.redes a:focus-visible img {
  transform: translateY(-2px);
  box-shadow: 0 0 0 2px var(--color-acento);
}

/* Cifras */
.valor {
  margin-top: auto;
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--color-hero-nombre);
}

.valor span {
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.valor.chico {
  font-size: 2.4rem;
}

.detalle {
  font-size: 0.9rem;
  line-height: 1.45;
  color: var(--color-texto-suave);
}

/* En curso */
.estado {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0;
  font-size: 0.98rem;
}

.estado strong {
  font-weight: 600;
  color: var(--color-hero-nombre);
}

.estado .meta {
  display: block;
  font-size: 0.75rem;
}

/* Cinta del stack */
.cinta {
  display: flex;
  gap: 0.6rem;
  margin: auto -1.35rem 0;
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}

.cinta ul {
  display: flex;
  flex-shrink: 0;
  gap: 0.6rem;
  padding: 0;
  animation: cinta 32s linear infinite;
}

.mosaico:hover .cinta ul {
  animation-play-state: paused;
}

.cinta li {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.88rem;
  font-weight: 500;
  white-space: nowrap;
  background: var(--color-chip-fondo);
  border: 1px solid var(--color-chip-borde);
  border-radius: 10px;
}

@keyframes cinta {
  to { transform: translateX(calc(-100% - 0.6rem)); }
}

/* Proyecto destacado: las etapas del pipeline se encienden en orden, como un run de CI. */
.proyecto h3 {
  font-family: var(--fuente-mono);
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--color-hero-nombre);
}

.pipeline {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin: 0.5rem 0;
  padding: 0;
  font-family: var(--fuente-mono);
  font-size: 0.82rem;
}

.pipeline li {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.35rem 0.7rem;
  border-radius: 8px;
  background: var(--color-superficie-2);
  border: 1px solid var(--color-superficie-borde);
  animation: etapa 7s calc(var(--i) * 0.6s) infinite both;
}

.pipeline li::before {
  content: '✓';
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  font-size: 0.7rem;
  border-radius: 50%;
  color: #fff;
  background: #2fbf71;
}

@keyframes etapa {
  0% { opacity: 0.35; }
  6%, 85% { opacity: 1; }
  100% { opacity: 0.35; }
}

.geo .chips,
.intereses .chips {
  margin-top: 0.25rem;
}

@media (prefers-reduced-motion: reduce) {
  .punto,
  .pipeline li,
  .cinta ul {
    animation: none;
  }

  .cinta {
    flex-wrap: wrap;
    mask-image: none;
    margin-inline: 0;
  }

  .cinta ul {
    flex-wrap: wrap;
    flex-shrink: 1;
  }

  .cinta ul[aria-hidden='true'] {
    display: none;
  }
}

/* En táctiles, fondo más opaco en vez de desenfoque (se recalcularía en cada cuadro de la tela). */
@media (max-width: 768px), (pointer: coarse) {
  .mosaico {
    backdrop-filter: none;
    background: color-mix(in srgb, var(--color-superficie) 94%, transparent);
  }
}

/* Tablets: dos columnas; la identidad ocupa todo el ancho. */
@media (max-width: 1024px) {
  .bento {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: minmax(140px, auto);
  }

  .identidad,
  .ahora,
  .stack,
  .geo,
  .intereses {
    grid-column: 1 / -1;
    grid-row: auto;
  }

  .proyecto {
    grid-column: 1 / -1;
    grid-row: auto;
  }
}

@media (max-width: 560px) {
  .bento {
    gap: 0.6rem;
    margin-block: 0.75rem;
  }

  .mosaico {
    padding: 1rem 1.05rem;
  }

  .identidad {
    padding: 1.35rem 1.2rem;
  }

  .valor {
    font-size: 2.4rem;
  }

  .cinta {
    margin-inline: -1.05rem;
  }
}
</style>
