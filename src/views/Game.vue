<template>
  <main v-if="gameStore.isPlaying" class="p-4 flex flex-col md:flex-row gap-4">
    <header class="w-100" >
      <Stats />
    </header>

    <button @click="gameStore.pauseTimer" class="btn">Pause</button>
    <button @click="restartGame" class="btn">Restart</button>
  </main>
  <main v-else-if="gameStore.isPaused">
    PAUSED
    <button @click="gameStore.unpauseTimer" class="btn">Unpause Timer</button>
  </main>
  <main v-else>
    <section class="p-4 border border-black m-4 text-center">
      <h1 class="font-bold text-lg">Game Over</h1>
      <button @click="restartGame" class="btn mt-2">New Game</button>
    </section>
  </main>
</template>


<script setup>
import { onMounted } from 'vue';
import Stats from '../components/Stats.vue';

import { useRouter } from 'vue-router';
const router = useRouter();

import { useGameStore } from '../stores/gameStore';
const gameStore = useGameStore();

onMounted(() => {
  gameStore.startGame();
});

function restartGame() {
  router.push({ name: 'intro' });
}

</script>
