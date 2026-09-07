<script setup>
import { ref } from 'vue';

// NOTA (NDA): se nombra a ReMASA como empleadora. El cliente final y los
// proyectos se describen por sector, sin datos sensibles. Si más adelante
// se confirma que se pueden nombrar las empresas cliente, ajustar aquí.
const experiencias = ref([
  {
    id: 1,
    puesto: 'Analista de Soporte de Aplicaciones L2',
    empresa: 'ReMASA — asignado a operadora del sector energético',
    periodo: 'Sep 2024 – Actualidad · Remoto',
    logros: [
      'Administración de infraestructura cloud en AWS (instancias EC2 con GPU, Linux y Windows) para plataformas de simulación de reservorios y cómputo intensivo.',
      'Automatización de correcciones de datos y tareas operativas recurrentes con Python y Bash (apoyada con IA), reduciendo trabajo manual en procesos de saneamiento de datos.',
      'Homologación e incorporación de nuevas aplicaciones: documentación técnica, gestión del cambio y coordinación con las áreas de Ciberseguridad y Networking según políticas corporativas.',
      'Administración y capacitación de Microsoft 365 / OneDrive para usuarios internos; gestión de credenciales y altas.',
      'Mejora continua del servicio de licencias y aplicaciones: diagnóstico de causa raíz y reducción de demoras en el uso de plataformas especializadas. [PENDIENTE: métricas antes/después]',
      'Referente técnico y mano derecha del Team Leader, con autonomía para explorar, diseñar e implementar soluciones.',
    ],
  },
  {
    id: 2,
    puesto: 'Soporte de Aplicaciones L1 · Trainee → Junior',
    empresa: 'ReMASA — Proyecto CSG, cliente del sector oil & gas',
    periodo: 'Nov 2021 – Sep 2024 · Remoto (LATAM y Europa)',
    logros: [
      'Soporte a clientes internos (geólogos, ingenieros de reservorios, exploración y analistas) sobre aplicaciones geocientíficas en Windows y Linux, con SLA definidos y gestión vía ServiceNow y Redmine.',
      'Participación en la migración de infraestructura on-premise a la nube (Azure): alta de usuarios, configuración de aplicaciones y acompañamiento a ~200 usuarios durante la transición.',
      'Gestión y mantenimiento de la base de conocimiento del equipo: procedimientos, fixes y documentación de versiones de aplicaciones y del servidor de licencias.',
      'Tareas de infraestructura on-premise: integración de volúmenes RAID0 en Linux sobre cabinas de discos físicos.',
      'Evolución de Trainee a Junior, asumiendo progresivamente tareas de nivel L2/L3 con acompañamiento del equipo.',
    ],
  },
  {
    id: 3,
    puesto: 'Equipo de Desarrollo Interno · Automatización y QA',
    empresa: 'ReMASA',
    periodo: 'Feb 2026 – Actualidad',
    logros: [
      'Configuración de un flujo de automatización de tareas de RRHH con n8n, Google Workspace y WordPress/DIVI.',
      'Análisis funcional y QA de la aplicación web desarrollada por el equipo.',
      'Prácticas profesionalizantes de la Tecnicatura efectivizadas en este rol.',
    ],
  },
]);
</script>

<template>
  <div class="card">
    <ul class="roles">
      <li class="rol" v-for="exp in experiencias" :key="exp.id">
        <h3 class="puesto">{{ exp.puesto }}</h3>
        <p class="empresa">{{ exp.empresa }}</p>
        <p class="periodo">{{ exp.periodo }}</p>
        <ul class="logros">
          <li v-for="(logro, i) in exp.logros" :key="i">{{ logro }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: rgb(28, 41, 52);
  border-radius: 15px;
}

.roles {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0;
}

.rol {
  border-left: 3px solid coral;
  padding-left: 1.25rem;
}

.puesto {
  font-size: 1.35rem;
  color: coral;
}

.empresa {
  font-size: 1.05rem;
  color: burlywood;
  margin-top: 0.15rem;
}

.periodo {
  font-size: 0.95rem;
  color: rgba(235, 235, 235, 0.64);
  margin-bottom: 0.75rem;
}

.logros {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-left: 1.1rem;
}

.logros li {
  list-style: disc;
  font-size: 1rem;
}
</style>
