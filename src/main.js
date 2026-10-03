import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { vAparecer } from './components/aparecer/aparecer.js'

createApp(App).directive('aparecer', vAparecer).mount('#app')
