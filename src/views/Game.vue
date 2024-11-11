<template>
  <main v-if="!gameStore.isGameOver" class="p-4 flex flex-col md:flex-row gap-4">
    <header class="w-100 md:w-1/2" >
      <Stats />
      <NavBar />
    </header>
    <section class="w-100 md:w-1/2">
      <DecisionEvent
        v-if="activeEvents.length > 0"
        :event="activeEvents[0]"
        @nextTurn="nextTurn"
      />
      <DailyAgenda
        v-else-if="!agendaDecided"
      />
      <div v-else>
        <p>The day is done.</p>
        <p>Today's actions:</p>
        <p v-for="event in eventStore.todaysEvents">{{ event }}</p>
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

const activeEvents = computed(() => eventStore.activeEvents);
const agendaDecided = computed(() => eventStore.agendaDecided);

onMounted(() => {
  gameStore.startNewGame();
});

function nextTurn() {
  gameStore.nextTurn();
}
</script>
