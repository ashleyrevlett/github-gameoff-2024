<template>
  <div class="p-4">
    <div>
      <p class="font-bold mb-2">Messages</p>
      <TransitionGroup name="fade" tag="div" v-if="activeMessages.length > 0">
        <Message v-for="message in activeMessages" :key="message.id" :event="message" />
      </TransitionGroup>
      <p v-else>No messages</p>
    </div>
  </div>
</template>


<script setup>
import { storeToRefs } from 'pinia';
import { useEventStore } from '../stores/eventStore';
import Message from "../components/Message.vue";

const eventStore = useEventStore();
const { activeMessages } = storeToRefs(eventStore);
</script>

