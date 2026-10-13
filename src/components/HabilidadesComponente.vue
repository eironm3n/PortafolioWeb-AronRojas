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
    id: 6, nombre: 'Soporte y Gestión del Servicio', habilidades: [
      { id: 1, nombre: 'ServiceNow', nivel: 'Uso profesional', icono: null },
      { id: 2, nombre: 'Jira / InVgate / Redmine', nivel: 'Uso profesional', icono: null },
      { id: 3, nombre: 'SLA / gestión de incidencias', nivel: 'Aplicado', icono: null },
      { id: 4, nombre: 'Homologación de aplicaciones', nivel: 'Aplicado', icono: null },
      { id: 5, nombre: 'Documentación y base de conocimiento', nivel: 'Aplicado', icono: null },
    ],
  },
  {
    id: 8, nombre: 'Aplicaciones de Geociencia', habilidades: [
      { id: 1, nombre: 'Petrel y suite SLB (Studio, Ocean, Visage, Intersect)', nivel: 'Soporte L1/L2', icono: null },
      { id: 2, nombre: 'tNavigator', nivel: 'Soporte L1/L2', icono: null },
      { id: 3, nombre: 'CMG', nivel: 'Soporte L1/L2', icono: null },
      { id: 4, nombre: 'Paradigm / Geolog', nivel: 'Soporte L1/L2', icono: null },
      { id: 5, nombre: 'Sahara / QGIS', nivel: 'Soporte L1/L2', icono: null },
    ],
  },
  {
    id: 1, nombre: 'Cloud', habilidades: [
      { id: 1, nombre: 'AWS (EC2, instancias GPU)', nivel: 'Uso profesional', icono: iconAws },
      { id: 2, nombre: 'Microsoft Azure (VMs, VDIs)', nivel: 'Uso profesional · curso AZ-900', icono: iconAzure },
      { id: 3, nombre: 'Google Cloud Platform', nivel: 'Fundamentos + administración básica', icono: iconGcp },
    ],
  },
  {
    id: 2, nombre: 'Infraestructura y Sistemas', habilidades: [
      { id: 1, nombre: 'Linux (Red Hat, Debian)', nivel: 'Uso profesional', icono: iconLinux },
      { id: 2, nombre: 'Windows Server 2016 / 2022', nivel: 'Uso profesional', icono: null },
      { id: 3, nombre: 'Administración de sistemas', nivel: 'Uso profesional', icono: null },
      { id: 4, nombre: 'RDP / VNC / Citrix', nivel: 'Uso profesional', icono: null },
    ],
  },
  {
    id: 3, nombre: 'Contenedores y Automatización', habilidades: [
      { id: 1, nombre: 'Docker', nivel: 'Intermedio', icono: iconDocker },
      { id: 2, nombre: 'Kubernetes', nivel: 'Fundamentos', icono: iconK8s },
      { id: 3, nombre: 'Bash scripting', nivel: 'Intermedio', icono: iconBash },
      { id: 4, nombre: 'PowerShell', nivel: 'Uso profesional', icono: iconPowershell },
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
      { id: 3, nombre: 'JavaScript', nivel: 'Básico-intermedio', icono: iconJs },
      { id: 4, nombre: 'Java', nivel: 'Académico', icono: iconJava },
      { id: 5, nombre: 'Vue.js', nivel: 'Intermedio', icono: iconVue },
      { id: 6, nombre: 'Node.js', nivel: 'Básico', icono: iconNode },
      { id: 7, nombre: 'PostgreSQL', nivel: 'Intermedio', icono: iconPostgres },
      { id: 8, nombre: 'MySQL', nivel: 'Intermedio', icono: iconMysql },
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
  <div class="grilla">
    <section v-for="(categoria, i) in habilidades" :key="categoria.id" v-aparecer="{ efecto: 'subir', retraso: (i % 3) * 100 }" class="tarjeta categoria">
      <h3 class="grupo-titulo">{{ categoria.nombre }} <span class="meta">{{ String(categoria.habilidades.length).padStart(2, '0') }}</span></h3>
      <ul class="skills">
        <li v-for="skill in categoria.habilidades" :key="skill.id" class="skill">
          <!-- Sin logo propio va la inicial, así todas las filas quedan alineadas. -->
          <img v-if="skill.icono" :src="skill.icono" alt="" width="28" height="28">
          <span v-else class="inicial" aria-hidden="true">{{ skill.nombre[0] }}</span>
          <span class="nombre">{{ skill.nombre }}</span>
          <span class="meta nivel">{{ skill.nivel }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.grilla {
  --grilla-min: 320px;
  align-items: start;
}

/* La regla global de <section> (paneles translúcidos) no aplica a estas tarjetas. */
.categoria {
  margin: 0;
  padding: 1.25rem 1.25rem 0.75rem;
  backdrop-filter: none;
}

.skills {
  display: flex;
  flex-direction: column;
  padding: 0;
}

.skill {
  display: grid;
  grid-template-columns: 28px 1fr;
  column-gap: 0.75rem;
  align-items: center;
  padding: 0.55rem 0;
  border-top: 1px solid var(--color-border);
}

.skill img,
.inicial {
  grid-row: span 2;
  width: 28px;
  height: 28px;
}

.inicial {
  display: grid;
  place-items: center;
  border-radius: var(--radio-chico);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-chip-texto);
  background: var(--color-chip-fondo);
}

.nombre {
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.35;
  color: var(--color-puesto);
}

.nivel {
  font-size: 0.75rem;
}
</style>
