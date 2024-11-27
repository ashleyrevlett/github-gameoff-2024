<template>
  <div class="clock w-4 h-4 relative">
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <!-- Clock face circle -->
      <circle
        :cx="size"
        :cy="size"
        :r="size - 1"
        fill="white"
        stroke="black"
        stroke-width="4"
      />

      <!-- Hour hand -->
      <line
        :x1="size"
        :y1="size"
        :x2="handEndX"
        :y2="handEndY"
        stroke="black"
        stroke-width="6"
        class="hand"
      />
    </svg>
  </div>
</template>


<script setup>
import { computed } from 'vue';


const props = defineProps({
  percentage: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 100
  },
  size: {
    type: Number,
    required: false,
    default: 15
  }
});

const handEndX = computed(() => {
  const angle = -(props.percentage / 100) * 2 * Math.PI - Math.PI/2;
  return props.size + (props.size - 1) * Math.cos(angle);
});

const handEndY = computed(() => {
  const angle = -(props.percentage / 100) * 2 * Math.PI - Math.PI/2;
  return props.size + (props.size - 1) * Math.sin(angle);
});
</script>


<style scoped>
svg {
  display: block;
  width: 100%;
  height: 100%;
}
</style>