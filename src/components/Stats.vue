<template>
  <div class="flex justify-between mb-4">
    <p>{{ gameStore.daysRemaining }} Days Left</p>
    <p class="text-right">
      {{ gameStore.followers }} Followers<br />
      ${{ gameStore.money.toLocaleString() }}
    </p>
  </div>
  <div>
    <StatBar
      v-if="gameStore.canPray"
      label="Favor"
      :value="gameStore.favor.current"
      :valuePerSecond="gameStore.favorPerSecond"
      actionLabel="Pray"
      :action="gameStore.pray"
      :cooldown="0.1"
    />
    <StatBar
      v-if="gameStore.canPreach"
      label="Faith"
      :value="gameStore.faith"
      :valuePerSecond="gameStore.faithPerSecond"
      actionLabel="Preach"
      :action="gameStore.preach"
      :cooldown="0.6"
    />
    <StatBar
      v-if="gameStore.canBless"
      label="Happiness"
      :value="gameStore.happiness"
      :valuePerSecond="gameStore.happinessPerSecond"
      actionLabel="Bless"
      :action="gameStore.bless"
      :cooldown="2.5"
    />
  </div>

</template>

<script setup>
import StatBar from '@/components/StatBar.vue';
import { useGameStore } from '@/stores/gameStore';

const gameStore = useGameStore();
</script>
