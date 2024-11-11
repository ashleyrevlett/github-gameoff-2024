<template>
  <main v-if="!gameStore.isGameOver" class="p-4">
    <header>
      <Stats />
      <NavBar />
    </header>
    <section>
      <DecisionEvent
        v-if="activeEvents.length > 0"
        :event="activeEvents[0]"
        @nextTurn="nextTurn"
      />
      <DailyAgenda
        v-else-if="!agendaDecided"
        @nextTurn="nextTurn"
      />
      <div v-else>
        <p>The day is done.</p>
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
  eventStore.setAgendaDecided(true);
  gameStore.nextTurn();
}
</script>
