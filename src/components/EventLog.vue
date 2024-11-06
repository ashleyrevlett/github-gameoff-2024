<template>
  <div class="border border-black p-4">
    <h2>Event Log</h2>
    <ul v-if="eventStore.pastEvents.length > 0">
      <li v-for="(event, idx) in eventStore.pastEvents" :key="idx" class="mb-2 text-xs">{{ event }}</li>
    </ul>
    <p v-else>No events yet.</p>
  </div>
</template>

<script setup>
import { useEventStore } from '../stores/eventStore';

const eventStore = useEventStore();
</script>
