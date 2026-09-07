<script setup>
import NavBar from './components/NavBar.vue';
import DatosPersonales from './components/DatosPersonales.vue';
import Educacion from './components/EducacionComponente.vue';
import ExperienciaComponente from './components/ExperienciaComponente.vue';
import ProyectosComponente from './components/ProyectosComponente.vue';
import HabilidadesComponente from './components/HabilidadesComponente.vue';
import CertificacionesComponente from './components/CertificacionesComponente.vue';
import InteresesComponente from './components/InteresesComponente.vue';
</script>

<template>
    <header id="top">
        <NavBar />
        <DatosPersonales />
    </header>
    <main>
        <section id="experiencia">
            <h2>Experiencia</h2>
            <ExperienciaComponente />
        </section>
        <section id="habilidades">
            <h2>Habilidades</h2>
            <HabilidadesComponente />
        </section>
        <section id="certificaciones">
            <h2>Certificaciones</h2>
            <CertificacionesComponente />
        </section>
        <section id="proyectos">
            <h2>Proyectos</h2>
            <ProyectosComponente />
        </section>
        <section id="educacion">
            <h2>Educación</h2>
            <Educacion />
        </section>
        <section id="intereses">
            <h2>Intereses</h2>
            <InteresesComponente />
        </section>
    </main>
    <footer>
        <a href="#top">Volver al inicio</a>
        <p>© 2026 Arón Rojas — Portafolio</p>
    </footer>
</template>

<style scoped>
footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    font-size: 1.3rem;
}
</style>
