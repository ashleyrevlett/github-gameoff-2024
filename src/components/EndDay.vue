<template>
  <div>
    <h1 class="text-lg font-bold">The day is done.</h1>
    <p>Today's results:</p>
    <ul class="list-disc list-outside">
      <li v-for="(val, key) in outcomes" class="ml-4 my-1 capitalize">
        {{ key }}:
        <span v-if="val >= 0" class="text-green-500 text-bold">+{{ val }}</span>
        <span v-else-if="val < 0" class="text-red-500 text-bold">-{{ val }}</span>
      </li>
    </ul>
    <button class="btn mt-2" @click="$emit('nextTurn')">Next Turn</button>
  </div>
</template>

<script setup>
import { computed, defineEmits } from 'vue';
import { useEventStore } from '../stores/eventStore';

defineEmits(['nextTurn']);


const eventStore = useEventStore();
const outcomes = computed(() => {
  const rolledUpStats = {};
  eventStore.todaysEvents.forEach(entry => {
    const outcome = entry.outcome;
    for (const stat in outcome) {
      if (typeof outcome[stat] === 'number') {
        rolledUpStats[stat] = (rolledUpStats[stat] || 0) + outcome[stat];
      }
    }
  });
  return rolledUpStats;
});

</script>

<style scoped>
.router-link-active {
  background-color: red;
}
</style>
