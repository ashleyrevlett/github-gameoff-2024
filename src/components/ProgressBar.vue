<template>
  <div class="flex-1">
    <div
      ref="progressBar"
      class="progress-bar"
      :class="{ 'level-up': highlight }"
    >
      <div
        class="progress-bar-fill"
        :style="{
          width: `${percentage}%`,
          transitionDuration: `.1s`,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, watch, ref } from 'vue';
import { useGameStore } from '@/stores/gameStore';

const gameStore = useGameStore();

const props = defineProps({
  resource: {
      type: Object,
      required: true,
  }
});

const percentage = computed(() => {
  return (props.resource.current / props.resource.max) * 100;
});

const highlight = ref(false);
watch(() => gameStore.resources[props.resource.resourceType].level, () => {
  console.log('highlight', props.highlight)
  highlight.value = true
  setTimeout(() => {
    highlight.value = false
  }, 200)
});
</script>


<style scoped>
.progress-bar {
  --level-up-color: rgba(0, 255, 0, 1);
  /* transition: background-color .5s; */
  @apply flex-grow w-full h-3 border border-black rounded-full overflow-hidden;

  background-color: white;
  transition: background-color .2s;

  &.level-up {
    background-color: var(--level-up-color);
  }
}

.progress-bar-fill {
  @apply h-full rounded-full transition-all bg-black;
}
</style>
