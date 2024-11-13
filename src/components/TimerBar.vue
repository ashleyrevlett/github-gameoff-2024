<template>
  <div class="w-full h-5 bg-gray-300 rounded-full relative">
    <div class="w-6 h-6 bg-center bg-contain bg-no-repeat absolute top-1/2 transform -translate-y-1/2 transition-all"
         :style="sunStyle">
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import icon from '../assets/sun.svg'

const props = defineProps({
  percentage: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 100,
  },
})

const sunStyle = computed(() => ({
  right: `${props.percentage - 5}%`,
  backgroundImage: `url(${icon})`,
  transitionDuration: '1000ms'
}))
</script>
