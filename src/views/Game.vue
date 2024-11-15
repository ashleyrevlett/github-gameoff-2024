<template>
  <main v-if="gameStore.isPlaying" class="">
    <header class="w-100" >
      <Stats />
    </header>

    <footer class="w-full mt-auto flex flex-row gap-3">
      <button @click="gameStore.pauseTimer" class="btn flex-1">Pause</button>
      <button @click="restartGame" class="btn flex-1">Restart</button>
    </footer>
  </main>
  <main v-else-if="gameStore.isPaused" class="items-center justify-center">
    PAUSED
    <button @click="gameStore.unpauseTimer" class="btn">Unpause</button>
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

<style scoped>
main {
  @apply p-4 flex gap-4 w-full min-h-screen flex-col md:flex-row;
}
</style>