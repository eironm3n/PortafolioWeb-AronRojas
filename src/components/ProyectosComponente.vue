<script setup>
import proyecto1 from '/src/assets/restaurant.png';
import proyecto2 from '/src/assets/e-learning.png';
import proyecto3 from '/src/assets/blog.png';
import proyecto4 from '/src/assets/restaurant.png';

import { ref } from 'vue';
var misProyectos = ref([]);
misProyectos.value = ([
    {
        id: 1,
        src: proyecto1,
        titulo: "Aplicación de Reservas para Restaurantes (2023)",
        descripcion: "Creé una aplicación móvil con Flutter que permite a los usuarios reservar mesas en restaurantes locales",
        projectoLink: "https://www.google.com.ar",
        githubLink: "https://github.com/usuario/proyecto"
    },
    {
        id: 2,
        src: proyecto2,
        titulo: "Plataforma de E-learning (2022)",
        descripcion: "Diseñé y desarrollé una plataforma de educación en línea utilizando Django y React. Con diferentes funcionalidades",
        projectoLink: "https://www.google.com.ar",
        githubLink: "https://github.com/usuario/proyecto"
    },
    {
        id: 3,
        src: proyecto3,
        titulo: "Blog Personal con CMS (2022)",
        descripcion: "Construí un blog personal con un sistema de gestión de contenidos (CMS) personalizado en WordPress.",
        projectoLink: "https://www.google.com.ar",
        githubLink: "https://github.com/usuario/proyecto"
    },
    {
        id: 4,
        src: proyecto4,
        titulo: "Proyecto Ruleta Rusa en Java",
        descripcion: "Diseñé y desarrollé una ruleta del casino en Java , se trataba de apostar a numeros y colores y la ruleta giraba y caia en un numero aleatorio , random que me elige un numero al azar dentro de un rango definido y lo mismo para el color solo que tenia un rango de negro y rojo",
        projectoLink: "https://github.com/PowerSystem2024/CodigoEnigma-ProyectoIntegradorJava",
        githubLink: "https://github.com/PowerSystem2024/CodigoEnigma-ProyectoIntegradorJava"
    },
])

</script>

<template>
    <!-- Aquí va el código HTML de la galería de proyectos -->
    <div class="galeria">
        <!-- Itera sobre cada proyecto en la lista de misProyectos -->
        <li class="proyecto" v-for="proyecto in misProyectos" :key="proyecto.id">
            <!-- Muestra la imagen del proyecto utilizando : que es una directiva de enlace de atributo en Vue.js -->
            <img :src="proyecto.src" :alt="proyecto.titlulo">
            <div class="proyecto-info">
                <h3>{{ proyecto.titulo }}</h3>
                <p>{{ proyecto.descripcion }}</p>
                <div class="proyecto-links">
                    <a :href="proyecto.projectoLink" class="btn-ver-mas" target="_blank" rel="noopener noreferrer">Ver
                        Proyecto</a>
                    <a :href="proyecto.githubLink" class="github-link" target="_blank" rel="noopener noreferrer">Ver
                        Código en GitHub</a>
                </div>
            </div>
        </li>
    </div>
</template>

<style scoped>

/* Estilos Fondo Animado de Css de la galería */
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

/* Define una animación llamada 'gradient' para cambiar la posición del fondo */
@keyframes gradient {

    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

/* La clase 'proyecto' es el contenedor individual de cada proyecto */
.proyecto {
    display: flex;
    flex-direction: column;
    border: 2px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    background-color: #f9f9f9;
    max-width: 222px;
    flex: 1 1 300px;
}

/* Estilo para las imágenes dentro del contenedor 'proyecto' */
.proyecto img {
    width: 100%;
    height: auto;
    display: block;
}

/* La clase 'proyecto-info' contiene la información del proyecto */
.proyecto-info {
    padding: 15px;
    text-align: center;
}

/* Estilo para los títulos de los proyectos */
.proyecto-info h3 {
    margin: 10px 0;
    font-size: 1.3em;
    color: #333;
}

/* Estilo para los párrafos de los proyectos */
.proyecto-info p {
    margin: 10px 0;
    font-size: 1em;
    color: #666;
}

.proyecto-links {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 30px;

}

.proyecto-links .btn-ver-mas {
    background-color: #007BFF;
    color: #fff;
    padding: 10px 15px;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s;
    margin-top: 1rem;
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