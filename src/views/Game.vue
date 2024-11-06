<template>
  <main class="p-4">
    <div v-if="!gameStore.isGameOver" class="grid grid-cols-2 gap-4">
      <div>
        <p class="text-sm font-bold mb-3 p-4 block border-black border">Turn: {{ gameStore.turn }} / {{ gameStore.maxTurns }}</p>
        <Stats />
        <EventLog />
      </div>
      <div v-if="eventStore.activeEvent">
        <Message :event="eventStore.activeEvent" @choose="handleChoice" />
      </div>
      <button v-else @click="nextTurn" class="btn">Next Turn</button>
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
import { ref, onMounted } from 'vue';

import Stats from "../components/Stats.vue";
import EventLog from "../components/EventLog.vue";
import Message from "../components/Message.vue";

import { useGameStore } from '../stores/gameStore';
import { useEventStore } from '../stores/eventStore';
import { usePlayerStore } from '../stores/playerStore';

const gameStore = useGameStore();
const eventStore = useEventStore();
const playerStore = usePlayerStore();

onMounted(() => {
  gameStore.startNewGame();
});

function handleChoice(choiceId) {
  console.log('handleChoice', choiceId);
  const outcome = eventStore.resolveEvent(choiceId);
  if (outcome) {
    playerStore.updateStats(outcome);
  }
  gameStore.nextTurn();
}

function nextTurn() {
  gameStore.nextTurn();
}
</script>
