<script setup>
import icono1 from '/src/assets/ventas.svg';
import icono2 from '/src/assets/ecomerce.svg';
import icono3 from '/src/assets/configuracion.svg';
import icono4 from '/src/assets/uiux.svg';
/*import icono5 from '/src/assets/watch.svg';*/

import { ref } from 'vue';
const titulo = 'Desarrollador Software';
const fecha = 'Desde Enero 2024 / Noviembre 2024';
const experiencias = ref([
    { id: 1, src: icono1, parrafo: 'Participé un equipo de 5 desarrolladores en la creación de una plataforma de comercio electrónico que incrementó las ventas en un 35% durante el primer año.' },
    { id: 2, src: icono2, parrafo: 'Diseñé y desarrollé aplicaciones web utilizando Node.js, Js, HTML y CSS.' },
    { id: 3, src: icono3, parrafo: 'Participe en la creación de una aplicacion con Java, tomando como base un codigo realizado en PSEINT con mis colegas de equipo.' },
    { id: 4, src: icono4, parrafo: 'Colaboré con el enfoque de un producto educativo, para tomar el punto de inicio en el negocio de un software para la concientización de las apuesta en el publico joven.' },
    /*{ id: 5, src: icono5, parrafo: 'Automaticé procesos de despliegue continuo utilizando Jenkins y Docker, reduciendo los tiempos de despliegue en un 40%.' },*/
]);
</script>

<template>
    <div class="card">
        <h3 class="titulo">{{ titulo.toLocaleUpperCase() }}</h3>
        <p class="fecha">{{ fecha }}</p>
        <ul class="listado">
            <li class="item" v-for="experencia in experiencias" :key="experencia.id">
                <img class="imagen-svg" :src="experencia.src" width="45rem" :alt="experencia.parrafo">
                <p>{{ experencia.parrafo }}</p>
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

.titulo {
    font-size: 1.5rem;
    color: coral;
}

.fecha {
    font-size: 1rem;
    color: burlywood;
    margin-bottom: 1rem;
}

.listado {
    display: flex;
    flex-direction: column;
}

.item {
    align-items: center;
    display: flex;
    padding: 1rem;
    gap: 1.5rem;
}
</style>