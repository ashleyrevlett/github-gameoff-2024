<template>
  <main v-if="!gameStore.isGameOver" class="p-4 flex flex-col md:flex-row gap-4">
    <header class="w-100 md:w-1/2" >
      <Stats />
      <NavBar />
    </header>
    <section class="w-100 md:w-1/2">
      <DecisionEvent
        v-if="events && events.length > 0"
        :event="events[0]"
      />
      <DailyAgenda
        v-else-if="!agendaDecided"
      />
      <div v-else>
        <h1 class="text-lg font-bold">The day is done.</h1>
        <p>Today's actions:</p>
        <ul class="list-disc list-outside">
          <li v-for="event in eventStore.todaysEvents" class="ml-4 text-sm my-1">{{ event }}</li>
        </ul>
        <button class="btn mt-2" @click="nextTurn">Next Turn</button>
      </div>
    </section>
  </main>
  <main v-else>
    <p>Game Over</p>
    <router-link to="/" class="btn mt-2">New Game</router-link>
  </main>
</template>


<script setup>
import { computed, onMounted } from 'vue';

import DecisionEvent from "./DecisionEvent.vue";
import DailyAgenda from "./DailyAgenda.vue";
import { useGameStore } from '../stores/gameStore';
import { useEventStore } from '../stores/eventStore';
import Stats from '../components/Stats.vue';
import NavBar from '../components/NavBar.vue';

const gameStore = useGameStore();
const eventStore = useEventStore();

const events = computed(() => eventStore.events);
const agendaDecided = computed(() => eventStore.agendaDecided);

onMounted(() => {
  if (!gameStore.isGameStarted) {
    gameStore.startNewGame();
  }
});

function nextTurn() {
  gameStore.nextTurn();
}
</script>
