<template>
  <div ref="dateHeader" class="date-header flex flex-row items-center justify-center gap-3">
    <Clock :size="48" :percentage="percentDayComplete ? percentDayComplete : 0" />
    <p class="font-bold text-center">{{ gameStore.daysRemaining }} Days Left</p>
  </div>
</template>


<script setup>
import { computed, watch, ref } from 'vue';
import { SECONDS_PER_DAY } from '@/constants';
import { useGameStore } from '@/stores/gameStore';
import Clock from '@/components/Clock.vue';
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

const percentDayComplete = computed(() =>  {
  const secondsRemainingInDay = gameStore.elapsedTime % SECONDS_PER_DAY;
  return (SECONDS_PER_DAY - secondsRemainingInDay) / SECONDS_PER_DAY * 100;
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
  animation: pulse .5s ease-out infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
  }
}
</style>