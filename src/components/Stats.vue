<template>
  <div class="status-panel">
    <ProgressBar :percentage="playerStore.reputation" label="Reputation" />
    <ProgressBar :percentage="playerStore.popularity" label="Buzz" />
    <ProgressBar :percentage="playerStore.stress" label="Stress" />
  </div>
</template>

<script setup>
import { usePlayerStore } from '../stores/playerStore';
import ProgressBar from './ProgressBar.vue';

const playerStore = usePlayerStore();
</script>
