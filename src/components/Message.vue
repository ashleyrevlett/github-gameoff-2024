<template>
  <div class="border border-black p-3">
    <h2 class="text-lg font-bold">{{ event.title }}</h2>
    <p class="mb-3">{{ event.description }}</p>
    <div class="choices grid grid-cols-1 gap-1">
      <button
        v-for="choice in event.choices"
        :key="choice.id"
        @click="$emit('choose', choice.id)"
        class="btn m-1"
      >
        {{ choice.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  event: Object,
});
</script>
