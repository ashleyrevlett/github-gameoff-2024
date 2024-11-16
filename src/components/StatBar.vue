<template>
  <div class="flex justify-between items-center my-3">
    <ActionButton
      :action="action"
      :actionLabel="actionLabel"
      :cooldown="cooldown"
      class="mr-3"
    />
    <ProgressBar :percentage="percentage" />
    <div class="ml-auto w-28 text-sm text-right">
      {{ label }} <span class="text-xs">Lvl {{ resource.level }}</span>
      <br />{{ Math.floor(resource.current).toLocaleString() }} / {{ resource.max.toLocaleString() }}
      <span v-if="resource.perSecond" class="text-xs block">
        (<span v-if="resource.perSecond > 0">+</span>{{ resource.perSecond.toFixed(1) }}/s)
      </span>
    </div>
  </div>
</template>


<script setup>
import { computed } from 'vue';
import ActionButton from '@/components/ActionButton.vue';
import ProgressBar from '@/components/ProgressBar.vue';

const props = defineProps({
  label: String,
  resource: {
    type: Object,
    required: true,
    default: () => ({
      current: 0,
      max: 100,
      perSecond: 0,
      level: 1,
    }),
  },
  action: Function,
  actionLabel: String,
  cooldown: {
    type: Number,
    default: 0,
  },
});

const percentage = computed(() => props.resource?.current / props.resource?.max * 100 || 0);
</script>
