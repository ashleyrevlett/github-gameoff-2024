<template>
  <div class="flex justify-between mb-4">
    <p>{{ gameStore.daysRemaining }} Days Left</p>
    <p>{{ gameStore.followers }} Followers</p>
  </div>
  <div>
    <StatBar
      label="Favor"
      :value="gameStore.favor"
      actionLabel="Pray"
      :action="gameStore.pray"
      :cooldown="0.1"
    />
    <StatBar
      label="Faith"
      :value="gameStore.faith"
      :valuePerSecond="gameStore.faithPerSecond"
      actionLabel="Preach"
      :action="gameStore.preach"
      :cooldown="0.6"
    />
    <StatBar
      label="Happiness"
      :value="gameStore.happiness"
      :valuePerSecond="gameStore.happinessPerSecond"
      actionLabel="Bless"
      :action="gameStore.bless"
      :cooldown="2.5"
    />
  </div>

  <p>Money: {{ gameStore.money }}</p>
</template>

<script setup>
import StatBar from '@/components/StatBar.vue';
import { useGameStore } from '@/stores/gameStore';

const gameStore = useGameStore();
</script>
