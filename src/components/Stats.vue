<template>
  <div class="p-4 border border-black mb-4">
    <ProgressBar :percentage="playerStore.reputation" label="Reputation" />
    <ProgressBar :percentage="playerStore.popularity" label="Buzz" />
    <ProgressBar :percentage="playerStore.stress" label="Stress" />
    <div class="flex justify-between mt-2">
      <p class="text-sm">Influence Points: {{ playerStore.influencePoints }}</p>
      <p class="text-sm">Money: ${{ playerStore.money.toLocaleString() }}</p>
    </div>
  </div>
</template>

<script setup>
import { usePlayerStore } from '../stores/playerStore';
import ProgressBar from './ProgressBar.vue';

const playerStore = usePlayerStore();
</script>
