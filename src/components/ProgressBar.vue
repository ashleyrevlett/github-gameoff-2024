<template>
  <div class="flex-1">
    <div class="flex-grow w-100 h-3 bg-white border border-black rounded-full overflow-hidden">
      <div
        class="h-full rounded-full transition-all bg-black"
        :style="{
          width: `${percentage}%`,
          transitionDuration: `.1s`,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  resource: {
      type: Object,
      required: true,
  }
});

const percentage = computed(() => {
  return props.resource.current / props.resource.max * 100;
});
</script>