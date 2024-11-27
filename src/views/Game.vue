<template>
  <Level v-if="gameStore.isPlaying" />
  <Pause v-else-if="gameStore.isPaused" />
  <GameOver v-else-if="gameStore.isGameOver" />
</template>


<script setup>
// Views
import Pause from '@/views/Pause.vue';
import GameOver from '@/views/GameOver.vue';
import Level from '@/views/Level.vue';

// Cheat code activation logic
import { onMounted } from 'vue';
import { useCheatCode } from '@/composables/cheatCode'

import { useGameStore } from '@/stores/gameStore';
const gameStore = useGameStore();

const { isCheatActivated } = useCheatCode()
onMounted(() => {
  window.addEventListener('cheatcode-activated', () => {
    console.log('Cheat code activated!')
    gameStore.setResourceCurrent(gameStore.resources.faith, gameStore.resources.faith.current + 1000)
    gameStore.resources.money.current += 1000
  })
})
</script>
