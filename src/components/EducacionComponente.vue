<script setup>
import { ref } from 'vue';
const educacion = ref([
  {fecha: '2025', title: 'Técnico Universitario en Programación', descripcion: 'UTN — Facultad Regional San Rafael. Cursada finalizada en diciembre de 2025; prácticas profesionalizantes realizadas en ReMASA (feb – jun 2026). Incumbencias: desarrollo en distintos lenguajes, análisis y control de sistemas informáticos, operación y programación de computadoras.', enlace:'https://www.frsr.utn.edu.ar/'},
  {fecha: '2024', title: 'Inicio de la Tecnicatura Universitaria en Programación', descripcion: 'Comienzo de la carrera en la UTN FRSR bajo modalidad a distancia sincrónica, en paralelo a la actividad laboral en soporte de aplicaciones e infraestructura.', enlace:'https://www.frsr.utn.edu.ar/'},
  {fecha: '2021', title: 'Google IT Support Professional Certificate', descripcion: 'Coursera. Fundamentos de soporte técnico de IT: troubleshooting, redes, sistemas operativos, administración de sistemas y seguridad informática. Base sobre la que se construyó el resto de la carrera.', enlace:'https://www.coursera.org/account/accomplishments/professional-cert/VGEAUBTJ5CA7'},
]);
</script>

<template>
  <ol class="linea-tiempo">
    <li v-for="(item, index) in educacion" :key="index" v-aparecer="'subir'" :class="{ actual: index === 0 }">
      <article class="tarjeta">
        <p class="meta">{{ item.fecha }}</p>
        <h3>{{ item.title }}</h3>
        <p class="descripcion">{{ item.descripcion }}</p>
        <a class="enlace" :href="item.enlace" target="_blank" rel="noopener noreferrer">Saber más ↗</a>
      </article>
    </li>
  </ol>
</template>

<style scoped>
.linea-tiempo {
  max-width: 820px;
  margin: 0 auto;
}

.tarjeta {
  padding: 1.25rem 1.5rem;
}

h3 {
  margin: 0.2rem 0 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--color-puesto);
}

.descripcion {
  font-size: 0.97rem;
}

.enlace {
  display: inline-block;
  margin-top: 0.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-acento);
}

.enlace:hover {
  text-decoration: underline;
}
</style>
