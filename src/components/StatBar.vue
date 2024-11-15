<template>
  <div class="flex justify-between items-center my-3">
    <ActionButton
      :action="action"
      :actionLabel="actionLabel"
      :cooldown="cooldown"
    />
    <div class="ml-auto">
      {{ label }}: {{ value.toFixed(1) }}
      <span v-if="valuePerSecond" class="text-sm">
        (+{{ valuePerSecond.toFixed(1) }}/s)
      </span>
    </div>
  </div>
</template>


<script setup>
import ActionButton from '@/components/ActionButton.vue';

const props = defineProps({
  label: String,
  value: Number,
  valuePerSecond: Number,
  action: Function,
  actionLabel: String,
  cooldown: {
    type: Number,
    default: 0,
  },
});
</script>
