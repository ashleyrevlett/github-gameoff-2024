<template>
  <Notification v-if="notification" :notification="notification" />
  <main v-if="!gameStore.isGameOver" class="p-4 flex flex-col md:flex-row gap-4">
    <header class="w-100 md:w-1/2" >
      <NavBar />
      <GameTimer
        :turn="gameStore.turn"
        :max-turns="gameStore.maxTurns"
        :time-remaining="gameStore.turnTimeRemaining"
        :is-game-over="gameStore.isGameOver"
        :paused="false"
        @day-complete="endDay"
      />
      <Stats />
    </header>
    <section class="w-100 md:w-1/2">
      <TransitionGroup name="fade-slide-down">
        <DailyAgenda
          v-if="!agendaDecided"
        />
        <DecisionEvent
          v-else-if="events && events.length > 0"
          :event="events[0]"
          :key="events[0].uid"
        />
        <div v-else class="bg-gray-200 p-4 min-h-48 w-full flex flex-col justify-center items-center">
          <p class="text-center font-bold">No more decisions for today.</p>
          <p class="text-center italic">{{ gameStore.turnTimeRemaining }} seconds until next day</p>
        </div>
      </TransitionGroup>
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
      <p>{{ Math.floor(playerStore.followers).toLocaleString() }} Followers</p>
      <p>${{ playerStore.money.toLocaleString() }} </p>
      <button @click="endGame" class="btn mt-2">New Game</button>
    </section>
  </main>
</template>


<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { useGameStore } from '../stores/gameStore';
import { useEventStore } from '../stores/eventStore';
import { usePlayerStore } from '../stores/playerStore';
import { useNotificationStore } from '../stores/notificationStore';
import Notification from '../components/Notification.vue';
import NavBar from '../components/NavBar.vue';
import Stats from '../components/Stats.vue';
import GameTimer from '../components/GameTimer.vue';
import DecisionEvent from "./DecisionEvent.vue";
import DailyAgenda from "./DailyAgenda.vue";
import EndDay from '../components/EndDay.vue';

const gameStore = useGameStore();
const eventStore = useEventStore();
const playerStore = usePlayerStore();
const notificationStore = useNotificationStore();

const events = computed(() => eventStore.events);
const agendaDecided = computed(() => eventStore.agendaDecided);
const notification = computed(() => notificationStore.notifications.length > 0 ? notificationStore.notifications[0] : null);

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

function endDay() {
  gameStore.endTurn();
}
</script>
