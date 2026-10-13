<script setup>
import { ref } from 'vue';
//Este es un arreglo con ref para que se pueda reactivar el cambio de los intereses
const intereses = ref([
    'Infraestructura y automatización: Me interesa el diseño de infraestructura reproducible, la automatización de operaciones y la observabilidad. Aprendo y pruebo herramientas en entornos propios antes de aplicarlas.',
    'Homelab y self-hosting: Monto servicios en casa (contenedores, monitoreo, backups) para experimentar con lo que después uso en el trabajo.',
    'Inteligencia Artificial aplicada: Uso de IA para generar scripts, automatizar tareas y documentar de forma clara y consistente.',
    'Boxeo: Lo practico para manejar el estrés y mantener un estado físico sano.',
    'Senderismo de alta montaña: Hago cumbres en montañas de altura desafiante; me gusta poner a prueba el estado físico y disfrutar la naturaleza.'
]);
// Cada interés es "Título: descripción"; se separa para mostrarlo como tarjeta.
const tarjetas = intereses.value.map((texto) => {
    const [titulo, ...resto] = texto.split(': ');
    return { titulo, texto: resto.join(': ') };
});
</script>

<template>
    <ul class="grilla">
        <li v-for="(interes, i) in tarjetas" :key="interes.titulo" v-aparecer="{ efecto: 'subir', retraso: (i % 3) * 100 }" class="tarjeta interes">
            <span class="meta">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3>{{ interes.titulo }}</h3>
            <p>{{ interes.texto }}</p>
        </li>
    </ul>
</template>

<style scoped>
.grilla {
    --grilla-min: 260px;
}

.interes {
    padding: 1.25rem 1.3rem;
}

h3 {
    margin: 0.25rem 0 0.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-puesto);
}

p {
    font-size: 0.95rem;
}
</style>
