<script setup>
import { ref } from 'vue';

// Los PDFs se sirven desde public/certificados/. Los que tienen verificación
// online (Coursera, Credly, Atlassian, Desafío Latam) enlazan a la fuente.
const grupos = ref([
  {
    id: 1,
    nombre: 'Cloud e Infraestructura',
    items: [
      { id: 1, nombre: 'Microsoft Azure Fundamentals – Curso preparatorio AZ-900', emisor: 'EducacionIT', anio: '2023', link: '/certificados/azure-fundamentals-az900-educacionit.pdf' },
      { id: 2, nombre: 'Google Cloud Fundamentals: Core Infrastructure', emisor: 'Coursera / Google Cloud', anio: '2021', link: 'https://www.coursera.org/account/accomplishments/verify/4SJ6HG7YFGNJ' },
      { id: 3, nombre: 'Essential Cloud Infrastructure: Foundation', emisor: 'Coursera / Google Cloud', anio: '2022', link: 'https://www.coursera.org/account/accomplishments/verify/FGNQY3JGUD2R' },
      { id: 4, nombre: 'Essential Cloud Infrastructure: Core Services', emisor: 'Coursera / Google Cloud', anio: '2022', link: 'https://www.coursera.org/account/accomplishments/verify/2ALJ6AARKCA8' },
      { id: 5, nombre: 'Linux Administrador (curso, 18 h)', emisor: 'EducacionIT', anio: '2022', link: '/certificados/linux-administrador-educacionit.pdf' },
    ],
  },
  {
    id: 2,
    nombre: 'Contenedores y Orquestación',
    items: [
      { id: 1, nombre: 'Docker and Kubernetes Fundamentals', emisor: 'Kubernetes Academy Online', anio: '2022', link: '/certificados/docker-kubernetes-fundamentals-kubernetes-academy.pdf' },
      { id: 2, nombre: 'Architecting with Google Kubernetes Engine: Foundations', emisor: 'Coursera / Google Cloud', anio: '2022', link: 'https://www.coursera.org/account/accomplishments/verify/R4WSABEMSH2Z' },
    ],
  },
  {
    id: 3,
    nombre: 'Automatización e IA',
    items: [
      { id: 1, nombre: 'IA para Programadores (chatbots, Claude, n8n)', emisor: 'EducacionIT', anio: '2025', link: '/certificados/ia-para-programadores-educacionit.pdf' },
      { id: 2, nombre: 'Inteligencia Artificial y Productividad', emisor: 'EducacionIT', anio: '2025', link: '/certificados/ia-y-productividad-educacionit.pdf' },
    ],
  },
  {
    id: 4,
    nombre: 'Datos y Metodologías',
    items: [
      { id: 1, nombre: 'Taller de Data Analysis (Python, Seaborn)', emisor: 'Desafío Latam', anio: '2023', link: 'https://cursos.desafiolatam.com/certificates/iikocd8qw7' },
      { id: 2, nombre: 'Scrum Foundation Professional Certificate (SFPC)', emisor: 'CertiProf', anio: '2022', link: 'https://www.credly.com/badges/79714471' },
      { id: 3, nombre: 'Jira Fundamentals', emisor: 'Atlassian', anio: '2024', link: 'https://university.atlassian.com/student/award/GRuNZXfFgyYeqphnYSV9d2Hm' },
    ],
  },
]);
</script>

<template>
  <div class="cert-contenedor">
    <section v-for="(grupo, i) in grupos" :key="grupo.id" v-aparecer="{ efecto: 'subir', retraso: (i % 2) * 120 }" class="cert-grupo">
      <h3 class="grupo-titulo">{{ grupo.nombre }} <span class="meta">{{ String(grupo.items.length).padStart(2, '0') }}</span></h3>
      <ul class="grilla">
        <li v-for="item in grupo.items" :key="item.id">
          <a :href="item.link" class="tarjeta cert" target="_blank" rel="noopener noreferrer">
            <span class="cert-nombre">{{ item.nombre }}</span>
            <span class="cert-pie">
              <span class="meta">{{ item.emisor }} · {{ item.anio }}</span>
              <!-- Los enlaces externos se pueden verificar en la fuente; el resto es el PDF del certificado. -->
              <span class="chip">{{ item.link.startsWith('http') ? 'Verificar ↗' : 'Ver PDF' }}</span>
            </span>
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.cert-contenedor {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* La regla global de <section> (paneles translúcidos) no aplica acá. */
.cert-grupo {
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  backdrop-filter: none;
}

.grilla {
  --grilla-min: 300px;
}

.cert {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.75rem;
  height: 100%;
  padding: 1rem 1.1rem;
  color: var(--color-text);
}

.cert-nombre {
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-puesto);
}

.cert-pie {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}
</style>
