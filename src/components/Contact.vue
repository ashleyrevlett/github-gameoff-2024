<template>
  <div class="border border-gray-300 rounded-md p-2 mb-2 flex justify-between items-center">
    <div>
      <p class="text-sm font-bold">{{ contact.name }}</p>
      <p class="text-xs">{{ contact.category }}</p>
      <p class="text-xs">{{ contact.city }}</p>
    </div>
    <button class="bg-blue-500 text-white px-2 py-1 rounded-md text-sm">Send Message</button>
  </div>
</template>

<script setup>
const props = defineProps({
  contact: Object,
});
</script>
