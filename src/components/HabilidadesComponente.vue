<script setup>
import iconJs from '/src/components/icons/js.svg';
import iconPython from '/src/components/icons/python.svg';
import iconJava from '/src/components/icons/java.svg';
import iconSql from '/src/components/icons/sql.svg';
import iconVue from '/src/components/icons/vue.svg';
import iconNode from '/src/components/icons/node.svg';
import iconGit from '/src/components/icons/git.svg';
import iconDocker from '/src/components/icons/docker.svg';
import iconPostgres from '/src/components/icons/postgres.svg';
import iconMysql from '/src/components/icons/mysql.svg';
import iconArg from '/src/components/icons/arg.svg';
import iconUsa from '/src/components/icons/eeuu.svg';
import iconAws from '/src/components/icons/aws.svg';
import iconAzure from '/src/components/icons/azure.svg';
import iconGcp from '/src/components/icons/gcp.svg';
import iconLinux from '/src/components/icons/linux.svg';
import iconK8s from '/src/components/icons/kubernetes.svg';
import iconTerraform from '/src/components/icons/terraform.svg';
import iconBash from '/src/components/icons/bash.svg';
import iconN8n from '/src/components/icons/n8n.svg';
import iconPowershell from '/src/components/icons/powershell.svg';

import { ref } from 'vue';

const habilidades = ref([
  {
    id: 1, nombre: 'Cloud', habilidades: [
      { id: 1, nombre: 'AWS (EC2, GPU, IAM)', nivel: 'Práctico', icono: iconAws },
      { id: 2, nombre: 'Microsoft Azure', nivel: 'Certificado AZ-900', icono: iconAzure },
      { id: 3, nombre: 'Google Cloud Platform', nivel: 'Certificado (fundamentos + GKE)', icono: iconGcp },
    ],
  },
  {
    id: 2, nombre: 'Infraestructura y Sistemas', habilidades: [
      { id: 1, nombre: 'Linux (Red Hat, Debian, Arch)', nivel: 'Avanzado', icono: iconLinux },
      { id: 2, nombre: 'Windows Server', nivel: 'Intermedio', icono: null },
      { id: 3, nombre: 'Administración de sistemas', nivel: 'Avanzado', icono: null },
      { id: 4, nombre: 'RDP / VNC / Citrix', nivel: 'Uso profesional', icono: null },
    ],
  },
  {
    id: 3, nombre: 'Contenedores y Automatización', habilidades: [
      { id: 1, nombre: 'Docker', nivel: 'Intermedio', icono: iconDocker },
      { id: 2, nombre: 'Kubernetes', nivel: 'Fundamentos', icono: iconK8s },
      { id: 3, nombre: 'Bash scripting', nivel: 'Avanzado', icono: iconBash },
      { id: 4, nombre: 'PowerShell', nivel: 'Intermedio', icono: iconPowershell },
      { id: 5, nombre: 'n8n', nivel: 'Intermedio', icono: iconN8n },
    ],
  },
  {
    id: 4, nombre: 'IaC, CI/CD y Control de versiones', habilidades: [
      { id: 1, nombre: 'Git', nivel: 'Intermedio', icono: iconGit },
      { id: 2, nombre: 'GitHub Actions', nivel: 'En formación', icono: null },
      { id: 3, nombre: 'Terraform', nivel: 'En formación', icono: iconTerraform },
    ],
  },
  {
    id: 5, nombre: 'Lenguajes y Datos', habilidades: [
      { id: 1, nombre: 'Python', nivel: 'Intermedio', icono: iconPython },
      { id: 2, nombre: 'SQL', nivel: 'Intermedio', icono: iconSql },
      { id: 3, nombre: 'JavaScript', nivel: 'Intermedio', icono: iconJs },
      { id: 4, nombre: 'Java', nivel: 'Académico', icono: iconJava },
      { id: 5, nombre: 'Vue.js', nivel: 'Intermedio', icono: iconVue },
      { id: 6, nombre: 'Node.js', nivel: 'Básico', icono: iconNode },
      { id: 7, nombre: 'PostgreSQL', nivel: 'Intermedio', icono: iconPostgres },
      { id: 8, nombre: 'MySQL', nivel: 'Intermedio', icono: iconMysql },
    ],
  },
  {
    id: 6, nombre: 'Soporte y Gestión del Servicio', habilidades: [
      { id: 1, nombre: 'ServiceNow', nivel: 'Uso profesional', icono: null },
      { id: 2, nombre: 'Jira / InVgate / Redmine', nivel: 'Uso profesional', icono: null },
      { id: 3, nombre: 'ITIL / SLA / gestión del cambio', nivel: 'Aplicado', icono: null },
      { id: 4, nombre: 'Homologación de aplicaciones', nivel: 'Aplicado', icono: null },
    ],
  },
  {
    id: 7, nombre: 'Idiomas', habilidades: [
      { id: 1, nombre: 'Español', nivel: 'Nativo', icono: iconArg },
      { id: 2, nombre: 'Inglés', nivel: 'B2 (lectura y comunicación)', icono: iconUsa },
    ],
  },
]);
</script>

<template>
  <div class="skills-contenedor">
    <div v-for="habilidad in habilidades" :key="habilidad.id" class="skills-categoria">
      <h3>{{ habilidad.nombre }}</h3>
      <ul class="skills">
        <li v-for="skill in habilidad.habilidades" :key="skill.id" class="skill">
          <img v-if="skill.icono" :src="skill.icono" :alt="skill.nombre">
          <span>{{ skill.nombre }}: {{ skill.nivel }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.skills-contenedor {
  padding: 2rem;
  background: linear-gradient(-45deg, #021526, #03346E, #6EACDA, #E2E2B6);
}

.skills-categoria {
  margin-bottom: 20px;
}

.skills-categoria h3 {
  display: flex;
  justify-content: left;
  margin-bottom: 10px;
  font-size: 1.5em;
  color: aliceblue;
  font-weight: bold;
}

.skills {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 20px;
}

.skill {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: rgba(241, 245, 243, 0.856);
  padding: 0.3em 0.6em;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(2, 151, 151, 0.963);
  flex: 1 1 200px;
  max-width: 280px;
}

.skill:hover {
  background-color: rgba(2, 151, 151, 0.963);
}

.skill img {
  width: 35px;
  height: 35px;
}

.skill span {
  font-size: 0.95em;
  color: #333;
}

@media (max-width: 768px) {
  .skills-categoria h3 {
    justify-content: center;
  }

  .skill {
    justify-content: center;
  }
}
</style>
