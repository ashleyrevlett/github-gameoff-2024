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
          +{{ gameObject.perSecond }} {{ gameObject.resourceAffected }}/sec
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
    <div
      v-if="buildingCount"
      class="ml-auto text-right text-xs"
    >
      x{{ buildingCount }} <span class="text-lg">{{ gameObject.icon }}</span>
    </div>
  </div>
</template>

<script setup>
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
</script>
