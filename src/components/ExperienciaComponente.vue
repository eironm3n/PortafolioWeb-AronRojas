<script setup>
import { ref } from 'vue';

// NOTA (NDA): se pueden nombrar ReMASA (empleadora), YPF y PeCOM (clientes).
// No se incluyen datos de proyectos ni información sensible.
const experiencias = ref([
  {
    id: 1,
    puesto: 'Analista de Soporte de Aplicaciones L2',
    empresa: 'PeCOM — E&D HelpDesk (vía ReMASA)',
    periodo: 'Sep 2024 – Actualidad · Remoto',
    logros: [
      'Administración de instancias EC2 en AWS con Windows Server, incluidas instancias con GPU, para software de geociencia de alto cómputo (Petrel, tNavigator, CMG, Sahara, QGIS), con tareas de administración en PowerShell.',
      'Soporte L1 y L2 a geocientíficos e ingenieros vía TeamViewer, con gestión de tickets en InVgate.',
      'Homologación de aplicaciones nuevas: documentación técnica, circuito de aprobación y coordinación con Ciberseguridad y Networking para habilitarlas según las políticas de la compañía.',
      'Automatización con Python (con apoyo de IA) de la corrección y unificación de bases de datos de pozos (UWI, WellName), junto al área de Data Management.',
    ],
  },
  {
    id: 2,
    puesto: 'Soporte interno',
    empresa: 'ReMASA',
    periodo: 'Sep 2024 – Actualidad · Remoto',
    logros: [
      'Soporte a usuarios vía RDP, con gestión de tickets en Jira.',
      'Macros en VBA para automatizar cálculos y reportes internos.',
      'Administración de fileservers, Google Workspace y Microsoft 365, gestión de accesos y altas, y onboarding de usuarios.',
      'Mantenimiento del sitio web corporativo (WordPress + Divi).',
      'Automatización de procesos de RRHH con n8n, Google Workspace y WordPress + Divi.',
    ],
  },
  {
    id: 3,
    puesto: 'Analista de Soporte de Aplicaciones Jr.',
    empresa: 'YPF — CSG, Centro de Soluciones de Geociencia (vía ReMASA)',
    periodo: 'Nov 2021 – Sep 2024 · Remoto (usuarios de 6 países)',
    logros: [
      'Ingresé como Trainee y me formé en la práctica junto a los niveles L2 y L3 del equipo.',
      'Resolución de 6 a 10 tickets diarios bajo SLA, gestionados en ServiceNow y Redmine, para geólogos, ingenieros de reservorios y analistas.',
      'Instalación, licenciamiento y configuración de software de geociencia: suite Schlumberger (Petrel, Studio, Intersect, Visage), tNavigator, CMG, Paradigm y Geolog.',
      'Soporte en la migración de infraestructura on-premise a Azure, administrando VDIs y VMs.',
      'Mantenimiento de la base de conocimiento del equipo: procedimientos, soluciones y versiones de aplicaciones.',
      'Acceso remoto y soporte en entornos Linux y Windows (RDP, MobaXterm, VNC, Citrix).',
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
