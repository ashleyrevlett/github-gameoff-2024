<template>
  <div class="p-4 border border-black mb-4">
    <p class="font-bold mb-2">Contacts</p>
    <div class="overflow-y-auto max-h-[350px]">
      <TransitionGroup name="fade" tag="div" v-if="contacts.length > 0">
        <Contact v-for="contact in contacts" :key="contact.name" :contact="contact" />
      </TransitionGroup>
    </div>
  </div>
</template>


<script setup>
import { storeToRefs } from 'pinia';
import { useCharacterStore } from '../stores/characterStore';
import Contact from './Contact.vue';

const characterStore = useCharacterStore();
characterStore.initialize();
const { contacts } = storeToRefs(characterStore);
</script>

