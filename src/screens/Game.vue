<template>
  <main v-if="!gameStore.isGameOver" class="p-4">
    <Stats />
    <DecisionEvent @nextTurn="nextTurn" />
  </main>
</template>


<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import Stats from "../components/Stats.vue";
import DecisionEvent from "../components/DecisionEvent.vue";
import { useGameStore } from '../stores/gameStore';
const gameStore = useGameStore();
const router = useRouter();

onMounted(() => {
  gameStore.startNewGame();
});

function nextTurn() {
  gameStore.nextTurn();
}
</script>
