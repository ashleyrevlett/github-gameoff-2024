<template>
  <div>
    <h2>Daily Agenda</h2>
  </div>
  <button class="btn" @click="emit('nextTurn') && eventStore.setAgendaDecided(true)">Starting choices here</button>
</template>


<script setup>
import { defineEmits } from 'vue';
import { useEventStore } from '../stores/eventStore';
import { usePlayerStore } from '../stores/playerStore';

const emit = defineEmits(['nextTurn']);

const eventStore = useEventStore();
const playerStore = usePlayerStore();


</script>