import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Importar Bootstrap CSS y JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Importar estilos globales personalizados
import './styles/global.css';

// Bootstrap Icons se carga desde el CDN en index.html

const app = createApp(App);

// Usar el router
app.use(router);

// Montar la aplicación
app.mount('#app');
