import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import './styles/main.css';

// Create the Pinia store
const pinia = createPinia();

// Set up the router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'intro', component: () => import('./screens/Intro.vue') },
    { path: '/game', name: 'game', component: () => import('./screens/Game.vue') },
    // { path: '/event/:id', component: () => import('./pages/EventDetail.vue') },
    // { path: '/feedback', component: () => import('./pages/ActionFeedback.vue') },
    // { path: '/reputation', component: () => import('./pages/Reputation.vue') },
  ],
});

// Create and mount the app
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');
