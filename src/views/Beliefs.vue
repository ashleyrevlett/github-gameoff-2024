<template>
  <header class="w-100 p-4" >
    <NavBar />
  </header>
  <div class="p-4">
    <h1 class="font-bold">Beliefs</h1>
    <ul v-if="eventStore.beliefs.length" class="list-inside list-decimal m-3">
      <li v-for="belief in eventStore.beliefs">{{ belief.title }}</li>
    </ul>
    <p v-else class="mb-4">No beliefs yet.</p>
    <router-link to="game" class="btn">Back</router-link>
  </div>
</template>

<script setup>
import { useEventStore } from '../stores/eventStore';
import NavBar from '../components/NavBar.vue';

const eventStore = useEventStore();
</script>