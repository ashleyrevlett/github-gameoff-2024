<template>
  <div class="border border-black p-4">
    <div>
      <p class="font-bold">Messages</p>
      <div v-if="activeMessages.length > 0">
        <Message v-for="message in activeMessages" :key="message.id" :event="message" />
      </div>
    </div>
    <div>
      <p class="mt-4 font-bold">Phone Calls</p>
      <div v-if="activePhoneCalls.length > 0">
        <Message v-for="message in activePhoneCalls" :key="message.id" :event="message" />
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue';
import Message from "../components/Message.vue";
import { useEventStore } from '../stores/eventStore';

const eventStore = useEventStore();
const activeMessages = computed(() => eventStore.activeEvents.filter(e => e.type === 'message'));
const activePhoneCalls = computed(() => eventStore.activeEvents.filter(e => e.type === 'phoneCall'));
</script>
