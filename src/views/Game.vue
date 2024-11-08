<template>
  <main v-if="!gameStore.isGameOver" class="p-4">
    <Notification v-if="eventStore.notificationMessage" :message="eventStore.notificationMessage" @close="eventStore.closeNotification" />
    <PhoneCalls v-if="eventStore.activePhoneCalls.length > 0" />
    <div class="flex gap-4">
      <div class="w-1/3">
        <header class="flex justify-between items-center p-4 border-black border">
          <div>
            <p class="text-md font-bold mb-1">{{ gameStore.currentDay.toLocaleString("en-US", { month: 'long', day: 'numeric', year: 'numeric' }) }}</p>
            <p class="text-xs mb-3">Turn {{ gameStore.turn }} of {{ gameStore.maxTurns }}</p>
          </div>
          <button @click="nextTurn" class="btn btn-green" :disabled="!canAdvance">Skip to Next Day</button>
        </header>
        <Stats />
        <Contacts />
        <EventLog />
      </div>
      <div class="w-2/3">
        <!-- <Calendar /> -->
        <Messages />
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
import EventLog from "../components/EventLog.vue";
import Messages from "../components/Messages.vue";
import PhoneCalls from "../components/PhoneCalls.vue";
// import Calendar from "../components/Calendar.vue";
import Notification from "../components/Notification.vue";
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
