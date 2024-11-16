<template>
  <div class="flex justify-between items-center my-3">
    <ActionButton
      :action="action"
      :actionLabel="actionLabel"
      :cooldown="cooldown"
    />
    <ProgressBar :percentage="value" />
    <div class="ml-auto">
      {{ label }} {{ Math.floor(value).toLocaleString() }}
      <span v-if="valuePerSecond && value != 0" class="text-xs block text-right">
        (<span v-if="valuePerSecond > 0">+</span>{{ valuePerSecond.toFixed(1) }}/s)
      </span>
    </div>
  </div>
</template>


<script setup>
import ActionButton from '@/components/ActionButton.vue';
import ProgressBar from '@/components/ProgressBar.vue';

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
