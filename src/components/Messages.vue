<template>
  <div class="p-4">
    <div>
      <p class="font-bold text-center">Messages</p>
      <div v-if="activeMessages.length > 0">
        <header class="py-2">
          <div class="flex justify-between items-center mb-2">
            <button
              class="btn min-w-24"
              :disabled="currentIndex === 0"
              @click="previousMessage"
            >
              Previous
            </button>
            <span class="text-sm">{{ currentIndex + 1 }} of {{ activeMessages.length }}</span>
            <button
              class="btn min-w-24"
              :disabled="currentIndex === activeMessages.length - 1"
              @click="nextMessage"
            >
              Next
            </button>
          </div>
        </header>
        <div class="relative">
          <Message
            v-for="(message, index) in activeMessages"
            :key="message.uid"
            :event="message"
            :is-active="index === currentIndex"
            :index="index"
            @dismiss="dismissMessage"
          />
        </div>
      </div>
      <div v-else class="flex flex-col items-center justify-center min-h-[50vh] bg-gray-300 mt-3">
        <p class="text-center">No messages</p>
        <button class="btn btn-green" @click="currentIndex = 0; $emit('nextTurn');">Skip to next day</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useEventStore } from '../stores/eventStore';
import Message from "../components/Message.vue";

const eventStore = useEventStore();
const activeMessages = computed(() => eventStore.activeMessages);
const currentIndex = ref(0);

function nextMessage() {
  if (currentIndex.value < activeMessages.value.length - 1) {
    currentIndex.value++;
  }
}

function previousMessage() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
}

function dismissMessage() {
  eventStore.dismissMessage(activeMessages.value[currentIndex.value].uid);
  currentIndex.value = Math.max(currentIndex.value - 1, 0);
}
</script>
