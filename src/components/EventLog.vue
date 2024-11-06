<template>
  <div class="log-window border border-black p-4 h-60 overflow-y-scroll">
    <h2 class="text-sm font-bold mb-3">Event Log</h2>
    <TransitionGroup name="fade" tag="ul" v-if="eventStore.pastEvents.length > 0">
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

<style scoped>
li:first-child {
  @apply bg-yellow-400;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.fade-move {
  transition: transform 0.5s ease;
}
</style>
