<script setup>
import NavBar from './components/NavBar.vue';
import BarraProgreso from './components/BarraProgreso.vue';
import DatosPersonales from './components/DatosPersonales.vue';
import LegajoPanel from './components/legajo/LegajoPanel.vue';
import BotonTema from './components/tema/BotonTema.vue';
import { activa } from './components/legajo/legajo.js';
</script>

<template>
    <BarraProgreso />
    <NavBar />
    <main>
        <!-- Portada; las secciones están guardadas en las solapas de la barra. -->
        <!-- Con una hoja abierta, lo que queda tapado detrás no recibe foco ni lo leen los lectores
             de pantalla: el Tab recorre solo las solapas, la hoja y sus controles. -->
        <DatosPersonales :inert="Boolean(activa)" />
        <LegajoPanel />
    </main>
    <footer :inert="Boolean(activa)">
        <p>© 2026 Arón Rojas — Portafolio</p>
        <!-- En pantallas angostas el botón de tema vive acá, para que las solapas queden parejas arriba. -->
        <BotonTema class="tema-pie" />
    </footer>
</template>

<style scoped>
footer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem;
    font-size: 0.85rem;
    color: var(--color-texto-suave);
}

.tema-pie {
    display: none;
}

@media (max-width: 1180px) {
    .tema-pie {
        display: inline-flex;
    }
}
</style>
