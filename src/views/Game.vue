<template>
  <main v-if="gameStore.isPlaying" class="">
    <Notifications />
    <header class="w-100" >
      <Stats />
    </header>

    <section class="gap-3">
      <BuildingButton
        v-if="gameStore.resources.faith.level > 1"
        :building="BUILDINGS.SHRINE"
        :actionCallback="() => gameStore.build('shrine')"
        :money="gameStore.resources.money?.current"
      />
      <BuildingButton
        v-if="gameStore.resources.faith.level > 2"
        :building="BUILDINGS.TEMPLE"
        :actionCallback="() => gameStore.build('temple')"
        :money="gameStore.resources.money?.current"
      />
      <BuildingButton
        v-if="gameStore.resources.followers.current >= 3"
        :building="BUILDINGS.HOUSE"
        :actionCallback="() => gameStore.build('house')"
        :money="gameStore.resources.money?.current"
      />

      <div
        v-if="gameStore.resources.money.unlocked >= 1"
        class="flex flex-row gap-3 items-center mb-3"
      >
        <button class="btn" @click="gameStore.tithe()" :disabled="gameStore.resources.faith.current < 10">Tithe (10 faith)</button>
      </div>

      <ul>
        <li v-for="(building, index) in gameStore.buildings" :key="index">
          {{ building.icon }} <span v-if="building.perSecond" class="text-xs text-gray-500">+{{ building.perSecond.toFixed(2) }}/s {{ building.resourceAffected }}</span>
        </li>
      </ul>
    </section>

    <footer class="w-auto max-w-[150px] mt-auto flex flex-row gap-3">
      <button @click="gameStore.pauseTimer" class="btn flex-1">Pause</button>
    </footer>
  </main>
  <main v-else-if="gameStore.isPaused" class="items-center justify-center">
    PAUSED
    <button @click="gameStore.unpauseTimer" class="btn mb-4 mt-2">Unpause</button>
    <button @click="gameStore.startGame" class="btn">Restart</button>
  </main>
  <main v-else>
    <section class="p-4 border border-black m-4 text-center">
      <button @click="gameStore.startGame" class="btn mt-2">New Game</button>
      <h1 class="font-bold text-lg mr-auto">Game Over</h1>
    </section>
  </main>
</template>


<script setup>
import { onMounted, onUnmounted, onBeforeMount} from 'vue';
import Stats from '../components/Stats.vue';
import Notifications from '../components/Notifications.vue';
import BuildingButton from '../components/BuildingButton.vue';

import { useGameStore, BUILDINGS } from '../stores/gameStore';
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

onBeforeMount(() => {
  gameStore.startGame()
})

onMounted(() => {
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