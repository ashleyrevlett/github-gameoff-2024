
<template>
  <div
    class="border border-black p-4 z-10 bg-transparent transition-all duration-300 w-full">
    <h2 class="text-lg font-bold">{{ event.title }}</h2>
    <p class="mb-3">{{ event.description }}</p>
    <div v-if="!event.resolution">
      <div class="choices flex flex-row gap-2">
        <button
          v-for="choice in event.choices"
          :key="choice.id"
          @click="handleChoice(choice.id)"
          class="btn btn-red m-1 w-1/2"
        >
          <span>{{ choice.description }}</span>
        </button>
      </div>
    </div>
    <div v-else>
      <Modal @dismissModal="dismissMessage">
        <div class="p-4 my-4">
          <p>{{ event.resolution.message }}</p>
          <div v-if="effectDescription" class="mt-1 font-bold text-sm capitalize">{{ effectDescription}}</div>
        </div>
      </Modal>
    </div>


  </div>

</template>

<script setup>
import { computed, defineEmits } from 'vue';
import { useEventStore } from '../stores/eventStore';
import { usePlayerStore } from '../stores/playerStore';
import Modal from '../components/Modal.vue';

const eventStore = useEventStore();
const playerStore = usePlayerStore();

const props = defineProps({
  event: {
    type: Object,
    required: true
  },
  showStats: {
    type: Boolean,
    default: false
  }
});

const event = computed(() => props.event);

const emit = defineEmits(['dismiss', 'nextTurn']);

// get a description of the outcome of the event
// format ex: 'Faith: +10, Money: -500'
const effectDescription = computed(() => {
  if (event.value.resolution) {
    const effectedStats = Object.entries(event.value.resolution.outcome).filter(([key, value]) => value !== 0);
    return effectedStats.map(([key, value]) => {
      return key + ': ' + (value.toString().startsWith('-') ? '' : '+') + value;
    }).join(', ');
  }
  return null;
});

// process the choice in the store
function handleChoice(choiceId) {
  console.log('handleChoice', choiceId);
  eventStore.resolveEvent(event.value.uid, choiceId);
}

// remove this message
function dismissMessage() {
  eventStore.dismissMessage(event.value.uid);
}
</script>