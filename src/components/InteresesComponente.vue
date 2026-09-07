<script setup>
import { ref } from 'vue';
import FondoLava from './FondoLava.vue';
//Este es un arreglo con ref para que se pueda reactivar el cambio de los intereses
const intereses = ref([
    'Cloud y DevOps: Me interesa el diseño de infraestructura reproducible, la automatización de operaciones y la observabilidad. Aprendo y pruebo herramientas en entornos propios antes de aplicarlas.',
    'Homelab y self-hosting: Monto servicios en casa (contenedores, monitoreo, backups) para experimentar con lo que después uso en el trabajo.',
    'Inteligencia Artificial aplicada: Uso de IA para generar scripts, automatizar tareas y documentar de forma clara y consistente.',
    'Boxeo: Lo practico para manejar el estrés y mantener un estado físico sano.',
    'Senderismo de alta montaña: Hago cumbres en montañas de altura desafiante; me gusta poner a prueba el estado físico y disfrutar la naturaleza.'
]);
</script>

<template>
    <div class="intereses-contenedor">
        <FondoLava />
        <ul class="contenedor-lista">
            <li class="item" v-for="interes in intereses" :key="interes">
                {{ interes }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
.intereses-contenedor {
    display: flex;
    position: relative;
    margin: 0 auto;
    max-width: 85%;
    padding: 1rem;
}

.contenedor-lista {
    list-style-type: none;
    padding: 1rem;
    margin-bottom: .5rem;
    color: var(--vt-c-white-soft);
    font-size: 1.4rem;
    text-shadow: 3px 3px 6px rgba(0, 0, 0, 1);
}

.item {
    margin-bottom: 1rem;
}
</style>