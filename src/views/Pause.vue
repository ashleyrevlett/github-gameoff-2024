<template>
  <main class="flex flex-col h-screen items-center justify-center">
    PAUSED
    <button @click="gameStore.unpauseTimer()" class="btn mb-6 mt-4">Unpause</button>
    <button @click="restartGame()" class="btn">Restart</button>
  </main>
</template>

<script setup>
import { useGameStore } from '@/stores/gameStore';
const gameStore = useGameStore();
import { useRouter } from 'vue-router';
const router = useRouter();
import { useNotificationStore } from '@/stores/notificationStore';
const notificationStore = useNotificationStore();

function restartGame() {
  notificationStore.clearNotifications()
  localStorage.removeItem('gameStore');
  router.push({ name: 'intro' });
}
</script>
