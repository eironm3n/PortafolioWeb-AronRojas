<script setup>
import { tema, alternarTema } from './tema.js';
</script>

<template>
    <button type="button" class="boton-tema" :aria-label="`Cambiar a modo ${tema === 'oscuro' ? 'claro' : 'oscuro'}`" @click="alternarTema">
        <svg v-if="tema === 'oscuro'" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <circle cx="12" cy="12" r="4.5" fill="currentColor" />
            <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        <svg v-else viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" fill="currentColor" />
        </svg>
    </button>
</template>

<style scoped>
.boton-tema {
    display: inline-flex;
    align-items: center;
    padding: 6px;
    color: var(--color-nav-texto);
    background: none;
    border: 1px solid var(--color-nav-borde);
    border-radius: 6px;
    font: inherit;
    cursor: pointer;
    transition: background-color 0.4s;
}

.boton-tema:hover {
    background-color: var(--color-nav-hover);
}
</style>
