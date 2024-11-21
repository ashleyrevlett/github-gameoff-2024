<template>
  <div
    v-if="gameStore.resources.faith.level >= gameObject.faithLevelRequired"
    class="flex flex-row gap-3 items-center mb-1"
  >
    <ActionButton
      :action="action"
      :actionLabel="`${gameObject.name}`"
      :cooldown="gameObject.cooldown"
      :disabled="gameObject.currency ? gameStore.resources[gameObject.currency].current < gameObject.cost : false"
      @click="animateGhostIcon"
    >
      <div v-if="gameObject.cost > 0" class="text-xs text-gray-500 flex items-center ml-1">
        (
          <span v-if="gameObject.currency === 'money'">${{ gameObject.cost }}</span>
          <span v-else-if="gameObject.cost > 0">{{ gameObject.cost }} {{ gameObject.currency }}</span>
        )
      </div>
    </ActionButton>
    <div class="text-xs flex flex-row items-center w-100">
      <div>
        <span v-if="gameObject.perSecond > 0">
          +{{ gameObject.perSecond }} {{ gameObject.resourceAffected }}/s
        </span>
        <span v-else-if="gameObject.oneTimeAmount > 0">
          <span v-if="gameObject.name === 'Tithe'">
            +${{ gameObject.oneTimeAmount.toLocaleString() }}/follower
          </span>
          <span v-else>
            +{{ gameObject.oneTimeAmount }} {{ gameObject.resourceAffected }}
          </span>
        </span>
      </div>
    </div>
    <div class="ml-auto text-right text-xs relative flex items-center justify-center gap-2">
      <div v-if="buildingCount">x{{ buildingCount }}</div>
      <div class="relative w-6 h-6">
        <span ref="actionIcon" class="action-icon">{{ gameObject.icon }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ActionButton from './ActionButton.vue'
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()

const props = defineProps({
  gameObject: {
    type: Object,
    required: true
  },
  action: {
    type: Function,
    required: true
  },
  buildingCount: {
    type: Number,
    required: false
  }
})

// action icon animation
const actionIcon = ref(null)
const ghostAnimationDuration = ref(200) // ms
const animateGhostIcon = () => {
  actionIcon.value.classList.add('active')
  setTimeout(() => {
    actionIcon.value.classList.remove('active')
  }, ghostAnimationDuration.value)
}
</script>

<style scoped>
.action-icon {
  @apply absolute top-0 left-0 translate-x-1/2 translate-y-1/2 origin-center text-lg;
  transform: scale(1);
  transition: all v-bind(ghostAnimationDuration + 'ms') ease-out;
}

.action-icon.active {
  transform: scale(1.3);
}
</style>