<template>
  <div class="border border-black p-3">
    <h2 class="text-lg font-bold">Calendar</h2>
    <div class="grid grid-cols-7">
      <div v-for="day in 7" :key="day" class="border border-black p-1">{{ day }}</div>
    </div>
  </div>
</template>

<script setup>
</script>
