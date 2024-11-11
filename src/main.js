import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import router from './router';
import { createPinia } from 'pinia';
import './styles/main.css';

// Create the Pinia store
const pinia = createPinia();


// Create and mount the app
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');
