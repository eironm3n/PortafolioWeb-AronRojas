<script setup>
import { ref } from 'vue';
import FondoLava from './FondoLava.vue';
//Este es un arreglo con ref para que se pueda reactivar el cambio de los intereses
const intereses = ref([
    'Desarrollo de Software: Actualmente creciendo en el mundo del Desarrollo, aprendo nuevas herramientas y las aplico con ejemplos de la vida real.',
    'Deporte de combate: Practico el boxeo como deporte para trabajar las tensiones corporales y poder mantener un estado fisico sano.',
    'Tecnología de Innovación: Me apasiona explorar nuevas tendencias tecnológicas como la inteligencia artificial y el desarrollo de aplicaciones móviles.',
    'Senderismo: Practico el arte del senderismo de alta montaña, me gusta realizar cumbres en montañas con alturas desafiantes. Me gusta poner a prueba mi estado fisico y disfrutar la naturaleza.'
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