<script setup>
import { ref } from 'vue';

// NOTA (NDA): se pueden nombrar ReMASA (empleadora), YPF y PeCOM (clientes).
// No se incluyen datos de proyectos ni información sensible.
const experiencias = ref([
  {
    id: 1,
    puesto: 'Soporte Técnico de Aplicaciones y Datos (L1/L2)',
    empresa: 'PeCOM — E&D HelpDesk (vía ReMASA)',
    periodo: 'Sep 2024 – Actualidad · Remoto',
    actual: true,
    etiquetas: ['AWS EC2', 'Windows Server', 'PowerShell', 'Petrel', 'tNavigator', 'InVgate', 'Python'],
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
    actual: true,
    etiquetas: ['Jira', 'VBA', 'Microsoft 365', 'Google Workspace', 'n8n', 'Docker', 'WordPress'],
    logros: [
      'Soporte a usuarios vía RDP, con gestión de tickets en Jira.',
      'Macros en VBA para automatizar cálculos y reportes internos.',
      'Administración de fileservers, Google Workspace y Microsoft 365, gestión de accesos y altas, y onboarding de usuarios.',
      'Mantenimiento del sitio web corporativo (WordPress + Divi).',
      'Equipo de desarrollo interno (desde feb 2026): en paralelo al soporte, participo en el equipo que crea soluciones para la compañía, sus clientes y otras empresas.',
      'Soluciones asistidas por IA y automatización de procesos internos, como un flujo para RRHH con n8n integrado con Google Workspace y WordPress.',
      'Pruebas de versiones antes de su presentación, documentación de bugs y mejoras, y resolución de parte de los bugs reportados.',
      'Armado de entornos Windows y Linux, contenedores con Docker y configuraciones en YAML, con n8n, Make, Cloudflare, DigitalOcean, Hostinger y Google Cloud (administración básica).',
      'Check-ins diarios con el equipo y seguimiento del trabajo en Jira.',
    ],
  },
  {
    id: 3,
    puesto: 'Soporte de Aplicaciones L1 · Trainee → Junior',
    empresa: 'YPF — CSG, Centro de Soluciones de Geociencia (vía ReMASA)',
    periodo: 'Nov 2021 – Sep 2024 · Remoto (usuarios de 6 países)',
    etiquetas: ['ServiceNow', 'Redmine', 'Suite SLB', 'CMG', 'Azure', 'Linux', 'Citrix'],
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
  <ol class="linea-tiempo">
    <li v-for="exp in experiencias" :key="exp.id" v-aparecer="'subir'" class="rol" :class="{ actual: exp.actual }">
      <article class="tarjeta">
        <header>
          <p class="meta periodo">{{ exp.periodo }}</p>
          <h3 class="puesto">{{ exp.puesto }}</h3>
          <p class="empresa">{{ exp.empresa }}</p>
        </header>
        <ul class="logros">
          <li v-for="(logro, i) in exp.logros" :key="i">{{ logro }}</li>
        </ul>
        <ul class="chips" aria-label="Herramientas">
          <li v-for="etiqueta in exp.etiquetas" :key="etiqueta" class="chip">{{ etiqueta }}</li>
        </ul>
      </article>
    </li>
  </ol>
</template>

<style scoped>
.linea-tiempo {
  max-width: 880px;
  margin: 0 auto;
}

.tarjeta {
  padding: 1.4rem 1.6rem;
}

.periodo {
  margin-bottom: 0.3rem;
}

.puesto {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--color-puesto);
}

.empresa {
  font-weight: 500;
  color: var(--color-empresa);
  margin-top: 0.15rem;
}

.logros {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  margin: 1rem 0 1.1rem;
  padding: 0;
}

.logros li {
  position: relative;
  padding-left: 1.1rem;
  font-size: 0.98rem;
}

/* Viñeta propia en el color de acento. */
.logros li::before {
  content: '';
  position: absolute;
  left: 0.15rem;
  top: 0.62em;
  width: 6px;
  height: 6px;
  border-radius: 2px;
  background: var(--color-acento);
  opacity: 0.7;
}

@media (max-width: 768px) {
  .tarjeta {
    padding: 1.1rem 1rem;
  }
}
</style>
