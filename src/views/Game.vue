<template>
  <main v-if="gameStore.isPlaying" class="">
    <header>
      <div class="mb-5 text-center">
        <p class="text-red-500 font-bold">{{ gameStore.daysRemaining }} Days Left</p>
      </div>

      <div id="followers" class="stat-section">
        <span class="block text-xl">{{ Math.floor(gameStore.resources.followers.current) }} Followers</span>
        <span v-if="gameStore.resources.followers.perSecond > 0" class="text-xs text-gray-500">+{{ gameStore.resources.followers.perSecond.toFixed(2) }}/s</span>
      </div>

      <div id="money" class="stat-section">
        <span class="block text-base">${{ moneyDisplay }}</span>
        <span v-if="gameStore.resources.money.perSecond > 0" class="text-xs text-gray-500">+${{ gameStore.resources.money.perSecond.toFixed(2) }}/follower</span>
      </div>
      <div class="flex justify-evenly items-end mb-1">
        <p class="text-left flex-1">Faith <span v-if="gameStore.resources.faith.perSecond > 0" class="text-xs text-gray-500">+{{ gameStore.resources.faith.perSecond }}/s</span></p>
        <p class="text-right flex-1">
          <span class="inline-block mr-4 text-gray-500 text-xs">{{ Math.round(gameStore.resources.faith.current).toLocaleString() }}/{{ Math.round(gameStore.resources.faith.max).toLocaleString() }}</span>
          <span class="inline-block">Lvl {{ gameStore.resources.faith.level }}</span>
        </p>
      </div>
      <ProgressBar :resource="gameStore.resources.faith" />
    </header>

    <section class="my-5 gap-3 flex flex-col">
      <PlayerAction :gameObject="PLAYER_ACTIONS.PRAY" :action="() => gameStore.pray()" />
      <!-- <PlayerAction :gameObject="PLAYER_ACTIONS.PREACH" :action="() => gameStore.preach()" /> -->
      <PlayerAction :gameObject="PLAYER_ACTIONS.TITHE" :action="() => gameStore.tithe()" />
      <PlayerAction
        v-for="building in BUILDINGS"
        :key="building.name"
        :gameObject="building"
        :action="() => gameStore.build(building)"
        :buildingCount="gameStore.buildings.filter(b => b.name === building.name).length"
      />

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
      <h1 class="font-bold text-lg mr-auto my-4">Doomsday arrives!</h1>
      <p class="mb-4">The cult of Ka ascends to the astral plane, escaping the comet's destruction.</p>
      <p class="text-lg">{{ Math.round(gameStore.resources.followers.current).toLocaleString() }} Followers</p>
      <p>${{ Math.round(gameStore.resources.money.current).toLocaleString() }}</p>
      <p>{{ Math.round(gameStore.resources.faith.current).toLocaleString() }} Faith</p>
      <div class="flex flex-col gap-6 my-8">
        <button @click="gameStore.prestige" class="btn">Ascend</button>
        <button @click="gameStore.startGame" class="btn">End Game</button>
      </div>
    </section>
  </main>
</template>


<script setup>
import { onMounted, onUnmounted, onBeforeMount, computed } from 'vue';
import ProgressBar from '@/components/ProgressBar.vue';
import PlayerAction from '@/components/PlayerAction.vue';

import { BUILDINGS, PLAYER_ACTIONS } from '@/constants/game';
import { useGameStore } from '@/stores/gameStore';
const gameStore = useGameStore()

// let animationFrameId;
let intervalId; // Changed from animationFrameId
let lastTime = performance.now()

function onTick() {
  const currentTime = performance.now()
  const dt = (currentTime - lastTime) / 1000
  lastTime = currentTime
  gameStore.update(dt)
  // animationFrameId = requestAnimationFrame(onTick) // Request next frame

}

onBeforeMount(() => {
  gameStore.startGame()
})

onMounted(() => {
  // animationFrameId = requestAnimationFrame(onTick) // Start animation loop
  intervalId = setInterval(onTick, 1000)
})

onUnmounted(() => {
  // if (animationFrameId) cancelAnimationFrame(animationFrameId); // Clean up
  if (intervalId) clearInterval(intervalId)
})

const moneyDisplay = computed(() => {
  return gameStore.resources.money.current.toFixed(2).toLocaleString();
})
</script>

<style scoped>
main {
  @apply p-4 flex gap-4 w-full min-h-screen flex-col md:flex-row;
}

.stat-section {
  @apply mb-4 leading-none flex flex-col text-center;
}
</style>