<template>
  <div class="flex justify-between">
    <p>Day {{ gameStore.turn }} of {{ gameStore.maxTurns }}</p>
    <p>Followers: {{ playerStore.followers }}</p>
  </div>
  <div class="p-4 border border-black mb-4">
    <ProgressBar :percentage="playerStore.charisma" label="charisma" color="green" />
    <ProgressBar :percentage="playerStore.faith" label="faith" color="purple" />
    <ProgressBar :percentage="playerStore.scrutiny" label="scrutiny" color="red" />
    <p class="text-lg">Money: ${{ playerStore.money.toLocaleString() }}</p>
  </div>
</template>

<script setup>
import { usePlayerStore } from '../stores/playerStore';
import ProgressBar from './ProgressBar.vue';
import { useGameStore } from '../stores/gameStore';

const gameStore = useGameStore();
const playerStore = usePlayerStore();
</script>
