
import { createRouter, createWebHistory } from 'vue-router';
import Intro from '../views/Intro.vue';
import Game from '../views/Game.vue';
import Vision from '../views/Vision.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'intro', component: () => import('../views/Intro.vue') },
    { path: '/game', name: 'game', component: () => import('../views/Game.vue') },
    { path: '/vision', name: 'vision', component: () => import('../views/Vision.vue') },
  ],
});

export default router;
