<template>
    <nav class="navbar" aria-label="Secciones">
        <span class="espaciador" aria-hidden="true"></span>
        <!-- Solapas del legajo: cada hoja sale de su solapa y se guarda en ella (ver legajo/). -->
        <ul class="pestanas">
            <li v-for="hoja in hojas" :key="hoja.id">
                <a :href="`#${hoja.id}`" class="pestana" :class="{ activa: activa === hoja.id }" :data-hoja="hoja.id" :aria-expanded="activa === hoja.id" @click.prevent="alternar(hoja.id)">{{ hoja.nombre }}</a>
            </li>
        </ul>
        <BotonTema class="boton-tema" />
    </nav>
</template>

<script setup>
import BotonTema from './tema/BotonTema.vue';
import { hojas, activa, alternar } from './legajo/legajo.js';
</script>

<style scoped>
/* Barra con las solapas centradas: el espaciador de la izquierda mide lo mismo que la columna del
   botón de tema, así las solapas quedan en el centro exacto. Va por encima de la hoja abierta. */
.navbar {
    position: sticky;
    top: 0.5rem;
    z-index: 5;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 0.5rem;
    background-color: color-mix(in srgb, var(--color-nav-fondo) 80%, transparent);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    color: var(--color-nav-texto);
    padding: 0.5rem 0.75rem 0;
}

/* Todas las solapas del mismo ancho (el de la más larga). */
.pestanas {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    gap: 0.3rem;
    align-self: end;
    list-style: none;
    padding: 0;
}

/* Solapa de carpeta: esquinas de arriba redondeadas, apoyada sobre el borde inferior de la barra. */
.pestana {
    display: block;
    padding: 0.45rem 1rem;
    text-align: center;
    white-space: nowrap;
    color: var(--color-nav-texto);
    border: 1px solid var(--color-nav-borde);
    border-bottom: none;
    border-radius: 9px 9px 0 0;
    transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
}

.pestana:hover,
.pestana:focus-visible {
    background-color: var(--color-nav-hover);
}

/* La solapa abierta toma el color de la hoja y una línea de acento arriba; no cambia de tamaño. */
.pestana.activa {
    background-color: var(--color-background);
    color: var(--color-heading);
    box-shadow: inset 0 3px 0 var(--color-acento);
}

.boton-tema {
    justify-self: end;
    margin-bottom: 0.5rem;
}

/* En táctiles, fondo más opaco en vez de desenfoque (se recalcularía en cada cuadro de la tela). */
@media (max-width: 768px), (pointer: coarse) {
    .navbar {
        backdrop-filter: none;
        background-color: color-mix(in srgb, var(--color-nav-fondo) 94%, transparent);
    }
}

/* Si las seis solapas no entran en una fila con el centro exacto (celulares y tablets), van en una
   grilla pareja de 3 × 2 solapas redondeadas y el botón de tema pasa al pie (ver App.vue). */
@media (max-width: 1180px) {
    .navbar {
        display: block;
        padding: 0.4rem;
    }

    .espaciador,
    .boton-tema {
        display: none;
    }

    .pestanas {
        grid-auto-flow: row;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.35rem;
    }

    .pestana {
        padding: 0.45rem 0.25rem;
        border-bottom: 1px solid var(--color-nav-borde);
        border-radius: 8px;
    }
}
</style>
