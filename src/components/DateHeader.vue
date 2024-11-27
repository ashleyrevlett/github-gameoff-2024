<template>
  <div class="date-header" ref="dateHeader">
    <p class="font-bold">{{ gameStore.daysRemaining }} Days Left</p>
  </div>
</template>


<script setup>
import { computed, watch, ref } from 'vue';
import { useGameStore } from '@/stores/gameStore';

const gameStore = useGameStore();

const dateHeader = ref(null)
const daysRemaining = computed(() => gameStore.daysRemaining )
watch(daysRemaining, (newVal, oldVal) => {
  console.log(`daysRemaining changed from ${oldVal} to ${newVal}`)
  if (dateHeader.value) {
    dateHeader.value.classList.add('animate-pulse')
    setTimeout(() => {
      dateHeader.value.classList.remove('animate-pulse')
    }, 1000)
  }
})
</script>

<style scoped>
.date-header {
  @apply mb-5 text-center p-1 px-2;

  align-self: center;
  transition: all 0.2s ease;
  background: white;
  color: red;
}

.animate-pulse {
  animation: pulse 1s ease-out infinite;
  background: red;
  color: white;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    /* background: black;
    color: white; */
  }
  50% {
    transform: scale(1.03);
    /* background: white;
    color: black; */
  }
  100% {
    transform: scale(1);
    /* background: black;
    color: white; */
  }
}
</style>