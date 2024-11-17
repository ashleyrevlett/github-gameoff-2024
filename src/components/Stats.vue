<template>
  <div class="flex justify-between mb-4">
    <p>{{ gameStore.daysRemaining }} Days Left</p>
    <p class="text-right">
      <span v-if="followers?.unlocked">{{ followers?.current }} / {{ followers?.max }} Followers <span class="text-xs text-gray-500">Lvl ({{ followers?.level }})</span><br /></span>
      <span v-if="money?.unlocked">${{ money?.current.toLocaleString() }}</span>
    </p>
  </div>
  <div>
    <StatBar
      label="Favor"
      :resource="favor"
      actionLabel="Pray"
      :action="() => gameStore.triggerAction(favor)"
      :cooldown="0.1"
    />
    <StatBar
      label="Faith"
      :resource="faith"
      actionLabel="Preach"
      :action="() => gameStore.triggerAction(faith)"
      :cooldown="0.1"
    />
    <StatBar
      label="Love"
      :resource="love"
      actionLabel="Bless"
      :action="() => gameStore.triggerAction(love)"
      :cooldown="1"
    />
  </div>

</template>

<script setup>
import { computed } from 'vue';
import StatBar from '@/components/StatBar.vue';
import { useGameStore } from '@/stores/gameStore';

const gameStore = useGameStore();
const favor = computed(() => gameStore.resources.favor);
const faith = computed(() => gameStore.resources.faith);
const love = computed(() => gameStore.resources.love);
const followers = computed(() => gameStore.resources.followers);
const money = computed(() => gameStore.resources.money);
</script>
