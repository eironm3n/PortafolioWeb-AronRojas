<script setup>
import NavBar from './components/NavBar.vue';
import BarraProgreso from './components/BarraProgreso.vue';
import DatosPersonales from './components/DatosPersonales.vue';
import Educacion from './components/EducacionComponente.vue';
import ExperienciaComponente from './components/ExperienciaComponente.vue';
import ProyectosComponente from './components/ProyectosComponente.vue';
import HabilidadesComponente from './components/HabilidadesComponente.vue';
import CertificacionesComponente from './components/CertificacionesComponente.vue';
import InteresesComponente from './components/InteresesComponente.vue';
</script>

<template>
    <BarraProgreso />
    <header id="top">
        <NavBar />
        <DatosPersonales />
    </header>
    <main>
        <section id="experiencia">
            <h2 v-aparecer="'subir'">Experiencia</h2>
            <ExperienciaComponente />
        </section>
        <section id="habilidades">
            <h2 v-aparecer="'subir'">Habilidades</h2>
            <HabilidadesComponente />
        </section>
        <section id="certificaciones">
            <h2 v-aparecer="'subir'">Certificaciones</h2>
            <CertificacionesComponente />
        </section>
        <section id="proyectos">
            <h2 v-aparecer="'subir'">Proyectos</h2>
            <ProyectosComponente />
        </section>
        <section id="educacion">
            <h2 v-aparecer="'subir'">Educación</h2>
            <Educacion />
        </section>
        <section id="intereses">
            <h2 v-aparecer="'subir'">Intereses</h2>
            <InteresesComponente />
        </section>
    </main>
    <footer>
        <a href="#top">Volver al inicio</a>
        <p>© 2026 Arón Rojas — Portafolio</p>
    </footer>
</template>

<style scoped>
/* Los ítems de la línea de tiempo entran de costado (v-aparecer): sin esto generan scroll horizontal en celulares. */
#educacion {
    overflow-x: clip;
}

footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    font-size: 1.3rem;
}
</style>
