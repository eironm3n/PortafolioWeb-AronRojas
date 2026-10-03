<template>
    <nav class="navbar">
        <ul class="navbar-menu">
            <li v-for="nav in navegacion" :key="nav.id">
                <a :href="nav.enlace" class="nav-item">{{ nav.nombre }}</a>
            </li>
            <li>
                <button type="button" class="nav-item boton-tema" :aria-label="`Cambiar a modo ${tema === 'oscuro' ? 'claro' : 'oscuro'}`" @click="alternarTema">
                    <svg v-if="tema === 'oscuro'" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                        <circle cx="12" cy="12" r="4.5" fill="currentColor" />
                        <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                    </svg>
                    <svg v-else viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                        <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" fill="currentColor" />
                    </svg>
                </button>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
const navegacion= ref([
    {id:1, nombre:'Experiencia', enlace:'#experiencia'},
    {id:2, nombre:'Habilidades', enlace:'#habilidades'},
    {id:3, nombre:'Certificaciones', enlace:'#certificaciones'},
    {id:4, nombre:'Proyectos', enlace:'#proyectos'},
    {id:5, nombre:'Educación', enlace:'#educacion'},
    {id:6, nombre:'Intereses', enlace:'#intereses'}
]);

// Tema: sigue al sistema hasta que se elige uno con el botón; la elección se guarda en localStorage
// y la aplica el script de index.html antes de pintar. Los colores de cada tema están en base.css.
const sistemaOscuro = window.matchMedia('(prefers-color-scheme: dark)');
const temaActual = () => document.documentElement.dataset.tema || (sistemaOscuro.matches ? 'oscuro' : 'claro');
const tema = ref(temaActual());
const actualizarTema = () => (tema.value = temaActual());

function alternarTema() {
  const nuevo = tema.value === 'oscuro' ? 'claro' : 'oscuro';
  document.documentElement.dataset.tema = nuevo;
  try {
    localStorage.setItem('tema', nuevo);
  } catch {
    // Sin acceso a localStorage el cambio vale solo para esta visita.
  }
  tema.value = nuevo;
}

onMounted(() => sistemaOscuro.addEventListener('change', actualizarTema));
onBeforeUnmount(() => sistemaOscuro.removeEventListener('change', actualizarTema));
</script>

<style scoped>
.navbar {
    background-color: var(--color-nav-fondo); 
    color: var(--color-nav-texto); 
    padding: 0.5rem 1rem; 
}

.navbar-menu {
    display: flex; 
    flex-wrap: wrap; /* en pantallas angostas los links pasan a otra línea en vez de salirse */
    justify-content: flex-end; 
    gap: 0.4rem;
    list-style: none; 
    padding: 0;
}

a,
.boton-tema {
    display: inline-block;
    color: var(--color-nav-texto);
    border: 1px solid; 
    border-color: var(--color-nav-borde);
    border-radius: 5px; 
    text-decoration: none; 
    transition: 0.4s;
    padding: 5px; 
}

a:hover,
.boton-tema:hover {
    background-color: var(--color-nav-hover); 
}

.boton-tema {
    display: inline-flex;
    align-items: center;
    height: 100%;
    background: none;
    font: inherit;
    cursor: pointer;
}

@media (max-width: 768px) {
  .navbar {
    padding: 0.5rem;
  }

  .navbar-menu {
    justify-content: center; 
  }
}

</style>
