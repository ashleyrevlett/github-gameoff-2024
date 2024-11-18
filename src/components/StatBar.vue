<template>
  <Transition name="fade">
    <div
      v-if="resource?.unlocked"
    class="flex justify-between items-center my-3"
    :class="{ 'animate-pulse': justLeveledUp && resource.level !== 1 }"
  >
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
  </Transition>
</template>


<script setup>
import { computed, watch, onMounted, onUnmounted, ref } from 'vue';
import ActionButton from '@/components/ActionButton.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import { useNotificationStore } from '@/stores/notificationStore';

const notificationStore = useNotificationStore();


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
      unlocked: true,
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

const justLeveledUp = ref(false);
const levelWatcher = watch(() => props.resource.level, (newLevel) => {
  justLeveledUp.value = true;
  setTimeout(() => {
    justLeveledUp.value = false;
  }, 1000)
})
</script>

<style scoped>
.animate-pulse {
  animation: pulse 0.5s infinite;
}
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.03);  }
  100% { transform: scale(1);   }
}
</style>
