<template>
  <div class="p-3">
    <h1>Beliefs</h1>
    <ul class="list-inside list-decimal m-3">
      <li v-for="belief in eventStore.beliefs">{{ belief.title }}</li>
    </ul>
    <router-link to="game" class="btn">Back</router-link>
  </div>
</template>

<script setup>
import { useEventStore } from '../stores/eventStore';

const eventStore = useEventStore();
</script>