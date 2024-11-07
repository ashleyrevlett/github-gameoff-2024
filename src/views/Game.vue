<template>
  <main  v-if="!gameStore.isGameOver" class="p-4">
    <PhoneCalls v-if="eventStore.activePhoneCalls.length > 0" />
    <div class="grid grid-cols-2 gap-4">
      <div>
        <header class="flex justify-between items-center p-4 border-black border">
          <div>
            <p class="text-md font-bold mb-1">{{ gameStore.currentDay.toLocaleString("en-US", { month: 'long', day: 'numeric', year: 'numeric' }) }}</p>
            <p class="text-xs mb-3">Turn {{ gameStore.turn }} of {{ gameStore.maxTurns }}</p>
          </div>
          <button @click="nextTurn" class="btn btn-green" :disabled="!canAdvance">Go to Next Day</button>
        </header>
        <Stats />
        <EventLog />
      </div>
      <Messages />
    </div>
  </main>
  <main v-else>
    <div class="p-4 border border-black mb-4">
      <h2 class="text-lg font-bold">Game Over</h2>
      <p>Your star's journey has ended!</p>
      <p class="mb-3">{{ gameStore.gameOverMessage }}</p>
      <button @click="gameStore.startNewGame()" class="btn">Start New Game</button>
    </div>
  </main>
</template>


<script setup>
import { computed, onMounted } from 'vue';

import Stats from "../components/Stats.vue";
import EventLog from "../components/EventLog.vue";
import Messages from "../components/Messages.vue";
import PhoneCalls from "../components/PhoneCalls.vue";

import { useGameStore } from '../stores/gameStore';
const gameStore = useGameStore();

import { useEventStore } from '../stores/eventStore';
const eventStore = useEventStore();

const canAdvance = computed(() => {
  return eventStore.activePhoneCalls.length === 0;
});

onMounted(() => {
  gameStore.startNewGame();
});

function nextTurn() {
  gameStore.nextTurn();
}
</script>
