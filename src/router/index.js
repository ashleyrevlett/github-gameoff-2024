
import { createRouter, createWebHistory } from 'vue-router';
import Intro from '../views/Intro.vue';
import Game from '../views/Game.vue';
import Beliefs from '../views/Beliefs.vue';
import Vision from '../views/Vision.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'intro', component: () => import('../views/Intro.vue') },
    { path: '/game', name: 'game', component: () => import('../views/Game.vue') },
    { path: '/beliefs', name: 'beliefs', component: () => import('../views/Beliefs.vue') },
    { path: '/vision', name: 'vision', component: () => import('../views/Vision.vue') },
    // { path: '/event/:id', component: () => import('./pages/EventDetail.vue') },
    // { path: '/feedback', component: () => import('./pages/ActionFeedback.vue') },
    // { path: '/reputation', component: () => import('./pages/Reputation.vue') },
  ],
});

export default router;
