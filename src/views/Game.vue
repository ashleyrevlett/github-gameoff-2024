<template>
  <main v-if="!gameStore.isGameOver" class="p-4 flex flex-col md:flex-row gap-4">
    <header class="w-100 md:w-1/2" >
      <NavBar />
      <Stats />
    </header>
    <section class="w-100 md:w-1/2">
      <DecisionEvent
        v-if="events && events.length > 0"
        :event="events[0]"
      />
      <DailyAgenda
        v-else-if="!agendaDecided"
      />
      <EndDay v-else @nextTurn="nextTurn" />
    </section>
  </main>
  <main v-else>
    <section class="p-4 border border-black m-4 text-center">
      <h1 class="font-bold text-lg">Game Over</h1>
      <p v-if="playerStore.faith <= 0">Your followers lost all faith.</p>
      <p v-if="playerStore.scrutiny <= 0">Your cult was taken down by the government agency.</p>
      <p v-if="playerStore.charisma <= 0">Your cult lost all appeal.</p>
      <p v-if="gameStore.turn > gameStore.maxTurns">Doomsday arrived and you ascended.</p>

      <p class="font-bold mt-3">Final results</p>
      <p>{{ playerStore.followers }} Followers</p>
      <p>${{ playerStore.money.toLocaleString() }} </p>
      <button @click="endGame" class="btn mt-2">New Game</button>
    </section>
  </main>
</template>


<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import DecisionEvent from "./DecisionEvent.vue";
import DailyAgenda from "./DailyAgenda.vue";
import { useGameStore } from '../stores/gameStore';
import { useEventStore } from '../stores/eventStore';
import { usePlayerStore } from '../stores/playerStore';
import Stats from '../components/Stats.vue';
import NavBar from '../components/NavBar.vue';
import EndDay from '../components/EndDay.vue';

const gameStore = useGameStore();
const eventStore = useEventStore();
const playerStore = usePlayerStore();

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

const router = useRouter();
function endGame() {
  gameStore.endGame();
  router.push({ name: 'intro' });
}
</script>
