<script setup>
import linkedin from '/src/assets/linkedin_icon.svg';
/*import instagram from '/src/assets/instagram_icon.svg';*/
import github from '/src/assets/github_icon.svg';
import cv from '/src/assets/cv_resume_icon.svg';

const title = 'Arón Rojas';
const descripcion = 'Técnico Universitario en Programación - UTN';
const residencia = 'Guaymallén, Mendoza, Argentina';
const presentacion = 'Hola, Bienvenido a mi portafolio de proyectos. Soy un desarrollador de software con conocimientos en el desarrollo de aplicaciones web y de computadoras.';
const redesSociales = [
  { id: 1, name: 'linkedin', src: linkedin, url: 'https://www.linkedin.com/in/aron-rojas/' },
  { id: 3, name: 'github', src: github, url: 'https://github.com/eironm3n' },
  { id: 4, name: 'curriculum', src: cv, url: 'https://drive.google.com/file/d/1lIuMuRHC1oxaueg1otMzKcywQDCc5Cui/view?usp=drive_link' },
];
const telefono = '+54 9 2615-595969';
</script>

<template>
  <section class="datos-personales">
    <div class="card">
      <h1>{{ title }}</h1>
      <h2>{{ descripcion }}</h2>
      <p>{{ presentacion }}</p>
      <ul class="container-lista">
        <li v-for="red in redesSociales" :key="red.id">
          <a :href="red.url"><img class="icon-redsocial" :src="red.src" width="35rem" :alt="red.name"></a>
        </li>
      </ul>
      <h3>☎ Mi Teléfono personal: {{ telefono }}</h3>
      <h4>{{ residencia }}</h4>
    </div>
  </section>
</template>

<style scoped>
h1 {
  font-size: 2.5rem;
}

p {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.card {
  background-color: rgb(16, 40, 92);
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  text-align: center;
}

.container-lista {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
}

.icon-redsocial {
  align-items: center;
  background-color: aliceblue;
  border-radius: 50%;
  padding: 2px;
  margin: 5px;
  box-shadow: 0 0 5px rgba(95, 124, 205, 0.934);
}

.icon-redsocial:hover {
  background-color: rgb(28, 41, 52);
  box-shadow: 0 0 5px rgba(251, 249, 249, 0.934);
}

h3 {
  font-size: 1.2rem;
  font-weight: 600;
}
</style>