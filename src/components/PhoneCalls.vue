<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 z-40 h-[100vh] w-[100vw]">
    <div class="border border-black bg-white w-[500px] h-[500px]  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <p class="p-1 mt-4 font-bold">Phone Call!</p>
        <div v-if="activePhoneCalls.length > 0">
        <Message v-for="message in activePhoneCalls" :key="message.id" :event="message" />
      </div>
      <p v-else>No phone calls</p>
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue';
import { useEventStore } from '../stores/eventStore';
import Message from "../components/Message.vue";

const eventStore = useEventStore();
const activePhoneCalls = computed(() => eventStore.activePhoneCalls);
</script>
