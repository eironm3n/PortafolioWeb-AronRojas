<script setup>
import { ref } from 'vue';
import imgPowerBi from '/src/assets/proyectos/powerbi-videojuegos.png';

const misProyectos = ref([
  {
    id: 1,
    titulo: 'Proyecto Integrador — E-commerce (2025)',
    descripcion: 'Aplicación de comercio electrónico desarrollada como proyecto integrador de la Tecnicatura, trabajando el flujo completo: catálogo, carrito y gestión de productos.',
    stack: 'JavaScript · HTML/CSS',
    projectoLink: '',
    githubLink: 'https://github.com/eironm3n/proyecto_integrador_e-commerce',
    estado: 'publicado',
  },
  {
    id: 2,
    titulo: 'Dashboard end-to-end — Histórico de Videojuegos (2025)',
    descripcion: 'Proyecto de datos completo: ETL y limpieza con Power Query, modelado en esquema estrella, métricas y KPIs con DAX, y un dashboard interactivo sobre ventas por género, plataforma, región y editor.',
    stack: 'Power BI · Power Query · DAX',
    imagen: imgPowerBi,
    projectoLink: '',
    githubLink: 'https://github.com/eironm3n/Proyectos-Power-Bi/tree/main/Hist%C3%B3rico_videojuegos',
    estado: 'publicado',
  },
  {
    id: 3,
    titulo: 'Este portafolio (2024 – 2026)',
    descripcion: 'Portafolio en Vue 3 + Vite desplegado en Vercel. Mantenido al día: actualización a Vite 8, migración a ESLint 10 (flat config) y saneamiento de dependencias (0 vulnerabilidades).',
    stack: 'Vue 3 · Vite · Vercel',
    projectoLink: 'https://portafolio-web-aron-rojas.vercel.app',
    githubLink: 'https://github.com/eironm3n/PortafolioWeb-AronRojas',
    estado: 'publicado',
  },
  {
    id: 4,
    titulo: 'Infraestructura como código — Terraform + AWS',
    descripcion: 'Aprovisionamiento reproducible de una VPC con instancias EC2 y almacenamiento en AWS mediante Terraform, con módulos reutilizables y estado remoto.',
    stack: 'Terraform · AWS',
    projectoLink: '',
    githubLink: '',
    estado: 'en construcción',
  },
  {
    id: 5,
    titulo: 'Pipeline CI/CD con contenedores',
    descripcion: 'Build, test y despliegue automatizados de una aplicación contenedorizada con GitHub Actions y Docker.',
    stack: 'Docker · GitHub Actions',
    projectoLink: '',
    githubLink: '',
    estado: 'en construcción',
  },
]);
</script>

<template>
  <div class="galeria">
    <li class="proyecto" v-for="proyecto in misProyectos" :key="proyecto.id">
      <img v-if="proyecto.imagen" :src="proyecto.imagen" :alt="`Captura del proyecto ${proyecto.titulo}`">
      <div v-else class="proyecto-sinimg">{{ proyecto.stack }}</div>
      <div class="proyecto-info">
        <span class="badge" :class="proyecto.estado === 'publicado' ? 'badge-ok' : 'badge-wip'">
          {{ proyecto.estado }}
        </span>
        <h3>{{ proyecto.titulo }}</h3>
        <p>{{ proyecto.descripcion }}</p>
        <p class="stack">{{ proyecto.stack }}</p>
        <div class="proyecto-links">
          <a v-if="proyecto.projectoLink" :href="proyecto.projectoLink" class="btn-ver-mas" target="_blank" rel="noopener noreferrer">Ver proyecto</a>
          <a v-if="proyecto.githubLink" :href="proyecto.githubLink" class="github-link" target="_blank" rel="noopener noreferrer">Ver código en GitHub</a>
        </div>
      </div>
    </li>
  </div>
</template>

<style scoped>
.galeria {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  justify-content: center;
  background: linear-gradient(-45deg, #021526, #03346E, #6EACDA, #E2E2B6);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.proyecto {
  display: flex;
  flex-direction: column;
  border: 2px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f9f9f9;
  max-width: 300px;
  flex: 1 1 300px;
}

.proyecto img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  display: block;
}

.proyecto-sinimg {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  background: linear-gradient(135deg, #03346E, #021526);
  color: #6EACDA;
  font-weight: 700;
  letter-spacing: 0.5px;
  padding: 0 1rem;
  text-align: center;
}

.proyecto-info {
  padding: 15px;
  text-align: center;
}

.badge {
  display: inline-block;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 2px 8px;
  border-radius: 999px;
  margin-bottom: 8px;
}

.badge-ok { background: #cdeccd; color: #1b5e20; }
.badge-wip { background: #ffe0b2; color: #8a4b00; }

.proyecto-info h3 {
  margin: 6px 0;
  font-size: 1.2em;
  color: #333;
}

.proyecto-info p {
  margin: 8px 0;
  font-size: 0.95em;
  color: #666;
}

.stack {
  font-size: 0.85em !important;
  color: #03346E !important;
  font-weight: 600;
}

.proyecto-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.proyecto-links .btn-ver-mas {
  background-color: #007BFF;
  color: #fff;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.proyecto-links .btn-ver-mas:hover {
  background-color: #0056b3;
}

.proyecto-links .github-link {
  color: #333;
  text-decoration: none;
  font-size: 0.9em;
}

.proyecto-links .github-link:hover {
  text-decoration: underline;
}
</style>
