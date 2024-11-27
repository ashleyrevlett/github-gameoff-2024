<template>
  <div class="p-4 m-4 border border-black py-24 w-100">
    <h1 class="text-2xl font-bold my-16 text-center">Cult of Ka</h1>
    <div class="flex w-100 justify-center mt-8 flex-col gap-6 my-12">
      <router-link v-if="hasSaveGame" to="game" class="btn mx-auto">Continue Game</router-link>
      <button @click="newGame" class="btn mx-auto">New Game</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const hasSaveGame = computed(() => {
  return localStorage.getItem('gameStore');
});

function newGame() {
  localStorage.removeItem('gameStore');
  router.push('/vision');
}
</script>

<style scoped>
p {
  @apply mb-4 leading-tight text-center;
}
</style>
