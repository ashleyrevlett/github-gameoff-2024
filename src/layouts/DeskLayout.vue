<template>
  <main class="p-4">
    <div v-if="!gameStore.isGameOver" class="grid grid-cols-2 gap-4">
      <div>
        <p>Turn: {{ gameStore.turn }} / {{ gameStore.maxTurns }}</p>
        <Stats />
        <EventLog />
      </div>
      <div v-if="eventStore.activeEvent">
        <Message :event="eventStore.activeEvent" @choose="handleChoice" />
        <Notification v-if="notificationMessage" :message="notificationMessage" :visible="true" @close="notificationMessage=null" />
      </div>
      <button v-else @click="nextTurn" class="btn">Next Turn</button>
    </div>
    <div v-else>
      <h2>Game Over</h2>
      <p>Your star's journey has ended!</p>
      <p>{{ gameStore.gameOverMessage }}</p>
    </div>
  </main>
</template>


<script setup>
import { ref } from 'vue';

import Stats from "../components/Stats.vue";
import EventLog from "../components/EventLog.vue";
import Message from "../components/Message.vue";
import Notification from "../components/Notification.vue";

import { useGameStore } from '../stores/gameStore';
import { useEventStore } from '../stores/eventStore';
import { usePlayerStore } from '../stores/playerStore';

const gameStore = useGameStore();
const eventStore = useEventStore();
const playerStore = usePlayerStore();

const notificationMessage = ref(null);

function handleChoice(choiceId) {
  console.log('handleChoice', choiceId);
  const outcome = eventStore.resolveEvent(choiceId);
  if (outcome) {
    notificationMessage.value = `Outcome: ${Object.entries(outcome).map(([key, value]) => `${key}: ${value}`).join(', ')  }`;
    playerStore.updateStats(outcome);
  }
  gameStore.nextTurn();
}

function nextTurn() {
  gameStore.nextTurn();
}
</script>
