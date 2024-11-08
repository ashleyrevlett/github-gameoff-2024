<template>
  <main v-if="!gameStore.isGameOver" class="p-4">
    <Notifications />
    <PhoneCalls v-if="eventStore.activePhoneCalls.length > 0" />
    <header class="flex justify-between items-center px-4 py-2 border-black border mb-4">
        <div>
          <p class="text-md font-bold">{{ gameStore.currentDay.toLocaleString("en-US", { month: 'long', day: 'numeric', year: 'numeric' }) }}</p>
          <p class="text-xs">Turn {{ gameStore.turn }} of {{ gameStore.maxTurns }}</p>
        </div>
        <button @click="nextTurn" class="btn btn-green" :disabled="!canAdvance">Skip to Next Day</button>
    </header>
    <div class="flex gap-4 flex-col md:flex-row">
      <div class="md:w-1/3 w-full">
        <Stats />
        <Contacts />
        <!-- <EventLog /> -->
      </div>
      <div class="md:w-2/3 w-full">
        <!-- <Calendar /> -->
        <Messages @nextTurn="nextTurn" />
      </div>
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
// import EventLog from "../components/EventLog.vue";
import Messages from "../components/Messages.vue";
import PhoneCalls from "../components/PhoneCalls.vue";
// import Calendar from "../components/Calendar.vue";
import Notifications from "../components/Notifications.vue";
import Contacts from "../components/Contacts.vue";
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
