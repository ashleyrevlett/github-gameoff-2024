<template>
  <main>
    <section class="p-4 border border-black m-4 text-center">
      <h1 class="font-bold text-lg mr-auto my-4">Doomsday arrives!</h1>
      <p class="mb-4">The cult of Ka ascends to the astral plane, escaping the comet's destruction.</p>
      <p class="text-lg">{{ Math.round(gameStore.resources.followers.current).toLocaleString() }} Followers</p>
      <p>${{ Math.round(gameStore.resources.money.current).toLocaleString() }}</p>
      <p>{{ Math.round(gameStore.resources.faith.current).toLocaleString() }} Faith</p>
      <div class="flex flex-col gap-6 my-8">
        <button @click="gameStore.prestige" class="btn">Ascend</button>
        <button @click="gameStore.startGame" class="btn">End Game</button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useGameStore } from '@/stores/gameStore';
const gameStore = useGameStore();
</script>
