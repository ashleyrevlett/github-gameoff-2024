<template>
  <div class="flex items-center gap-2 my-3 text-sm">
    <div class="w-32">Day {{ turn }} of {{ maxTurns }}</div>
    <div class="w-24 text-sm">{{ formatTime(timeRemaining) }}</div>
    <TimerBar v-if="!paused" :percentage="timeProgress" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import TimerBar from './TimerBar.vue';
import { MAX_TIME, START_HOUR, END_HOUR, HOUR_DURATION } from '../config';

const props = defineProps({
  turn: Number,
  maxTurns: Number,
  isGameOver: Boolean,
  paused: Boolean,
  timeRemaining: Number,
});

const timeRemaining = computed(() => props.timeRemaining);

const timeProgress = computed(() => {
  return (timeRemaining.value / MAX_TIME) * 100;
});


function formatTime(seconds) {
  // Convert seconds into game hours (every 5 real seconds = 1 game hour)

  const hoursElapsed = Math.floor((MAX_TIME - seconds) / HOUR_DURATION);
  const currentHour = START_HOUR + hoursElapsed;

  // Format as 12-hour time with AM/PM
  let displayHour = currentHour;
  const period = displayHour >= 12 ? 'PM' : 'AM';

  if (displayHour > 12) {
    displayHour -= 12;
  }

  return `${displayHour}:00 ${period}`;
}

</script>