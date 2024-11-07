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
        :disabled="choice.cost.ip > playerStore.influencePoints || choice.cost.money > playerStore.money"
      >
        <span>{{ choice.label }}</span>
        <p v-if="event.expiresIn >= 0" class="mt-2 italic">Response due in {{ event.expiresIn }} days</p>
        <div
          v-if="choice.cost.ip > 0 || choice.cost.money > 0"
          class="text-xs gap-3"
        >
          (Cost:
          <span class="mr-1 inline-block" v-if="choice.cost.ip > 0">{{ choice.cost.ip }} IP</span>
          <span class="ml-1 inline-block" v-if="choice.cost.money > 0">${{ choice.cost.money.toLocaleString() }}</span>
          )
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useEventStore } from '../stores/eventStore';
import { usePlayerStore } from '../stores/playerStore';

const eventStore = useEventStore();
const playerStore = usePlayerStore();

const props = defineProps({
  event: Object,
});

function handleChoice(choiceId) {
  console.log('handleChoice', choiceId);
  eventStore.resolveEvent(props.event.id, choiceId);
}
</script>
