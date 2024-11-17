<template>
  <main v-if="gameStore.isPlaying" class="">
    <Notifications />
    <header class="w-100" >
      <Stats />
    </header>

    <footer class="w-auto max-w-[150px] mt-auto flex flex-row gap-3">
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
      <button @click="restartGame" class="btn mt-2">New Game</button>
      <h1 class="font-bold text-lg mr-auto">Game Over</h1>
    </section>
  </main>
</template>


<script setup>
import { onMounted, onUnmounted } from 'vue';
import Stats from '../components/Stats.vue';
import Notifications from '../components/Notifications.vue';

import { useGameStore } from '../stores/gameStore';
const gameStore = useGameStore()

let lastTime = performance.now()
let animationFrameId;

function onTick() {
  const currentTime = performance.now()
  const dt = (currentTime - lastTime) / 1000
  lastTime = currentTime
  gameStore.update(dt)
  animationFrameId = requestAnimationFrame(onTick) // Request next frame
}

onMounted(() => {
  gameStore.startGame()
  animationFrameId = requestAnimationFrame(onTick) // Start animation loop
})

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId); // Clean up
})
</script>

<style scoped>
main {
  @apply p-4 flex gap-4 w-full min-h-screen flex-col md:flex-row;
}
</style>