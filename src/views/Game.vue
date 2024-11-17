<template>
  <main v-if="gameStore.isPlaying" class="">
    <Notifications />
    <header class="w-100" >
      <Stats />
    </header>

    <footer class="w-auto max-w-[150px] mt-auto flex flex-row gap-3">
      <button @click="gameStore.pauseTimer" class="btn flex-1">Pause</button>
      <button @click="restartGame" class="btn flex-1">Restart</button>
    </footer>
  </main>
  <main v-else-if="gameStore.isPaused" class="items-center justify-center">
    PAUSED
    <button @click="gameStore.unpauseTimer" class="btn">Unpause</button>
  </main>
  <main v-else>
    <section class="p-4 border border-black m-4 text-center">
      <button @click="restartGame" class="btn mt-2">New Game</button>
      <h1 class="font-bold text-lg mr-auto">Game Over</h1>
    </section>
  </main>
</template>


<script setup>
import { onMounted } from 'vue';
import Stats from '../components/Stats.vue';
import Notifications from '../components/Notifications.vue';
import { useECSStore } from '../stores/ecsStore';
import { ResourceSystem } from '../game/ecs/systems/ResourceSystem';
import { ResourceComponent } from '../game/ecs/components/ResourceComponent';
// import { ResourceEffectComponent } from '../game/ecs/components/ResourceEffectComponent';

import { useRouter } from 'vue-router';
const router = useRouter();

import { useGameStore } from '../stores/gameStore';
const gameStore = useGameStore();

const ecsStore = useECSStore();

function gameLoop(systems) {
  // console.log('gameLoop');
  for (const system of systems) {
    system.update(1000); // every second
  }
}


function startGame() {
  gameStore.startGame();

  const player = ecsStore.createEntity('player');
  ecsStore.addComponent(player.id, new ResourceComponent(player.id, 'favor', 0, 10, 1, true));
  ecsStore.addComponent(player.id, new ResourceComponent(player.id, 'faith', 0, 10, 0.1, false, 'favor', 2));
  ecsStore.addComponent(player.id, new ResourceComponent(player.id, 'love', 0, 10, 0.01, false, 'followers', 2));
  ecsStore.addComponent(player.id, new ResourceComponent(player.id, 'money', 0, 10, 0, false, 'followers', 2));

  // const ka = ecsStore.createEntity('ka');
  // ecsStore.addComponent(ka.id, new ResourceEffectComponent(ka.id, 'favor', -0.1));

  // Create systems
  const systems = [
    new ResourceSystem(),
  ];

  console.log('startGame');

  setInterval(() => gameLoop(systems), 1000);
}


onMounted(() => {
  startGame();
});

function restartGame() {
  router.push({ name: 'intro' });
}

</script>

<style scoped>
main {
  @apply p-4 flex gap-4 w-full min-h-screen flex-col md:flex-row;
}
</style>