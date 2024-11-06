<template>
  <div class="border border-black p-3">
    <h2 class="text-lg font-bold">{{ event.title }}</h2>
    <p class="mb-3">{{ event.description }}</p>
    <div class="choices flex flex-row gap-1">
      <button
        v-for="choice in event.choices"
        :key="choice.id"
        @click="handleChoice(choice.id)"
        class="btn m-1"
      >
        {{ choice.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useEventStore } from '../stores/eventStore';
const eventStore = useEventStore();

const props = defineProps({
  event: Object,
});

function handleChoice(choiceId) {
  console.log('handleChoice', choiceId);
  eventStore.resolveEvent(props.event.id, choiceId);
}

</script>
