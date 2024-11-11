<template>
  <div class="flex justify-between">
    <p>Day {{ gameStore.turn }} of {{ gameStore.maxTurns }}</p>
    <p>Followers: {{ playerStore.followers }}</p>
  </div>
  <div class="p-4 border border-black mb-4">
    <ProgressBar :percentage="playerStore.fame" label="Fame" color="green" />
    <ProgressBar :percentage="playerStore.stress" label="Stress" color="red" />
    <p class="mt-2 text-lg">Influence Points: {{ playerStore.influencePoints }}</p>
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
