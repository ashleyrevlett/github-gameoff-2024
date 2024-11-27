<template>
  <main class="flex flex-col h-screen items-center justify-center">
    PAUSED
    <button @click="gameStore.unpauseTimer()" class="btn mb-6 mt-4">Unpause</button>
    <button @click="gameStore.startGame()" class="btn">Restart</button>
  </main>
</template>

<script setup>
import { useGameStore } from '@/stores/gameStore';
const gameStore = useGameStore();
</script>
