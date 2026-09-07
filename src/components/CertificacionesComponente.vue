<script setup>
import { ref } from 'vue';

// Los PDFs se sirven desde public/certificados/. Los que tienen verificación
// online (Coursera, Credly, Atlassian, Desafío Latam) enlazan a la fuente.
const grupos = ref([
  {
    id: 1,
    nombre: 'Cloud e Infraestructura',
    items: [
      { id: 1, nombre: 'Microsoft Azure Fundamentals (AZ-900)', emisor: 'EducacionIT · examen oficial Microsoft', anio: '2023', link: '/certificados/azure-fundamentals-az900-educacionit.pdf' },
      { id: 2, nombre: 'Google Cloud Fundamentals: Core Infrastructure', emisor: 'Coursera / Google Cloud', anio: '2021', link: 'https://www.coursera.org/account/accomplishments/verify/4SJ6HG7YFGNJ' },
      { id: 3, nombre: 'Essential Cloud Infrastructure: Foundation', emisor: 'Coursera / Google Cloud', anio: '2022', link: 'https://www.coursera.org/account/accomplishments/verify/FGNQY3JGUD2R' },
      { id: 4, nombre: 'Essential Cloud Infrastructure: Core Services', emisor: 'Coursera / Google Cloud', anio: '2022', link: 'https://www.coursera.org/account/accomplishments/verify/2ALJ6AARKCA8' },
      { id: 5, nombre: 'Linux Administrador', emisor: 'EducacionIT', anio: '2022', link: '/certificados/linux-administrador-educacionit.pdf' },
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
    <div class="cert-grupo" v-for="grupo in grupos" :key="grupo.id">
      <h3>{{ grupo.nombre }}</h3>
      <ul class="cert-lista">
        <li class="cert" v-for="item in grupo.items" :key="item.id">
          <a :href="item.link" target="_blank" rel="noopener noreferrer">
            <span class="cert-nombre">{{ item.nombre }}</span>
            <span class="cert-meta">{{ item.emisor }} · {{ item.anio }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.cert-contenedor {
  padding: 2rem;
  background: linear-gradient(-45deg, #021526, #03346E, #6EACDA, #E2E2B6);
  border-radius: 10px;
}

.cert-grupo {
  margin-bottom: 1.75rem;
}

.cert-grupo h3 {
  margin-bottom: 0.75rem;
  font-size: 1.4rem;
  font-weight: bold;
  color: aliceblue;
}

.cert-lista {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 0;
}

.cert {
  flex: 1 1 320px;
  max-width: 420px;
}

.cert a {
  display: flex;
  flex-direction: column;
  gap: 2px;
  background-color: rgba(241, 245, 243, 0.9);
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(2, 151, 151, 0.5);
  color: #222;
  transition: background-color 0.3s;
}

.cert a:hover {
  background-color: rgba(2, 151, 151, 0.85);
  color: #fff;
}

.cert-nombre {
  font-weight: 600;
  font-size: 0.98rem;
}

.cert-meta {
  font-size: 0.82rem;
  opacity: 0.75;
}
</style>
