<template>
  <div class="log-window border border-black p-4 h-60 overflow-y-scroll">
    <h2 class="text-sm font-bold mb-3">Event Log</h2>
    <TransitionGroup name="fade-slide" tag="ul" v-if="eventStore.pastEvents.length > 0">
      <li
        v-for="event in eventStore.pastEvents"
        :key="event"
        class="mb-2 text-xs"
      >
        {{ event }}
      </li>
    </TransitionGroup>
    <p v-else>No events yet.</p>
  </div>
</template>

<script setup>
import { useEventStore } from '../stores/eventStore';

const eventStore = useEventStore();
</script>
