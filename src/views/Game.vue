<template>
  <main class="p-4">
    <div v-if="!gameStore.isGameOver" class="grid grid-cols-2 gap-4">
      <div>
        <p class="text-sm font-bold mb-3 p-4 block border-black border">Day {{ gameStore.turn }} of {{ gameStore.maxTurns }}</p>
        <Stats />
        <EventLog />
      </div>
      <Messages />
      <button @click="nextTurn" class="btn" :disabled="!canAdvance">Next Turn</button>
    </div>
    <div v-else>
      <div class="p-4 border border-black mb-4">
        <h2 class="text-lg font-bold">Game Over</h2>
        <p>Your star's journey has ended!</p>
        <p class="mb-3">{{ gameStore.gameOverMessage }}</p>
        <button @click="gameStore.startNewGame()" class="btn">Start New Game</button>
      </div>
    </div>
  </main>
</template>


<script setup>
import { computed, onMounted } from 'vue';

import Stats from "../components/Stats.vue";
import EventLog from "../components/EventLog.vue";
import Messages from "../components/Messages.vue";

import { useGameStore } from '../stores/gameStore';
const gameStore = useGameStore();

import { useEventStore } from '../stores/eventStore';
const eventStore = useEventStore();

const canAdvance = computed(() => {
  return eventStore.activeEvents.length === 0;
});

onMounted(() => {
  gameStore.startNewGame();
});

function nextTurn() {
  gameStore.nextTurn();
}
</script>
