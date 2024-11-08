<template>
  <div
    class="border border-black p-4 z-10 bg-white absolute transition-all duration-300 w-full"
    :style="{ left: offset + 'px', top: offset + 'px' }"
    :class="{
      'min-h-[50vh]': event.type === 'message',
      'border-red-500': event.expiresIn === 0 && event.type === 'message',
      'z-30': isActive
     }">
    <h2 class="text-lg font-bold">{{ event.title }}</h2>
    <h3 class="font-bold">From: {{ event.sender.name }}, {{ event.sender.organization }}</h3>
    <p v-if="event.type === 'message'" class="mb-3">{{ event.sendDate.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
    <p class="mb-3">{{ event.description }}</p>
    <div
      v-if="!event.resolution"
    >
    <div class="choices flex flex-row gap-2">
      <button
        v-for="choice in event.choices"
        :key="choice.id"
        @click="handleChoice(choice.id)"
        class="btn btn-red m-1 w-1/2"
        :disabled="choice.cost.ip > playerStore.influencePoints || choice.cost.money > playerStore.money"
      >
        <span>{{ choice.label }}</span>
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
        <div class="my-4">
        <p v-if="event.expiresIn >= 0" class="font-bold text-red-500 text-sm">Response due within {{ event.expiresIn }} days</p>
        <p v-if="event.expiresIn === 0 && event.type === 'message'" class="font-bold text-red-500 text-sm">Response due today!</p>
      </div>
    </div>
    <div
      v-else
      class="bg-yellow-200 p-4 my-4"
    >
      <p>{{ event.resolution.message }}</p>
      <div v-if="effect" class="mt-1 font-bold text-sm capitalize">{{ effect}}</div>
      <button class="btn mt-2" @click="emit('dismiss')">Dismiss</button>
    </div>

  </div>
</template>

<script setup>
import { computed, defineEmits } from 'vue';
import { useEventStore } from '../stores/eventStore';
import { usePlayerStore } from '../stores/playerStore';

const eventStore = useEventStore();
const playerStore = usePlayerStore();

const props = defineProps({
  event: Object,
  isActive: Boolean,
  index: Number
});

const emit = defineEmits(['dismiss']);
const offset = computed(() => props.index * 10);

const effect = computed(() => {
  if (props.event.resolution) {
    const effectedStats = Object.entries(props.event.resolution).filter(([key, value]) => key !== 'effect' && key !== 'message' && value !== 0);
    return effectedStats.map(([key, value]) => {
      return key + ': ' + (value.toString().startsWith('-') ? '' : '+') + value;
    }).join(', ');
  }
  return null;
});


function handleChoice(choiceId) {
  eventStore.resolveEvent(props.event.uid, choiceId);
}
</script>
