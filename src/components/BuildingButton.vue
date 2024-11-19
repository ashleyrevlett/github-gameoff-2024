<template>
  <div class="flex flex-row gap-3 items-center mb-3">
    <button class="btn" @click="actionCallback" :disabled="money < building.cost">{{ building.name }}</button>
    <p class="text-xs text-gray-500">
      Cost: ${{ building.cost }}
      <span v-if="building.perSecond">gives +{{ building.perSecond.toFixed(1) }}/s {{ building.resourceAffected }}</span>
    </p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

const props = defineProps({
  building: {
    type: Object,
    required: true,
  },
  actionCallback: {
    type: Function,
    required: true,
  },
  money: {
    type: Number,
    required: true,
  },
});


onMounted(() => {
  console.log('building', props.building);
});
</script>
