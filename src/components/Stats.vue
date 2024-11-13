<template>
  <div class="p-4 border border-black mb-4 w-100">
    <div class="flex justify-between mb-2">
      <p>
        Followers: {{  playerStore.followers.toLocaleString() }}
        <span class="text-xs text-gray-500 block">
          (+{{ playerStore.followerGrowthRate }} per second)
        </span>
      </p>
      <p class="text-right">
        ${{ playerStore.money.toLocaleString() }}
        <span class="text-xs text-gray-500 block">
          (+{{ playerStore.moneyGrowthRate }} per second)
        </span>
      </p>
    </div>
    <div class="flex flex-row gap-5 w-100">
      <ProgressBar :percentage="playerStore.charisma" label="charisma" color="green" />
      <ProgressBar :percentage="playerStore.faith" label="faith" color="purple" />
      <ProgressBar :percentage="playerStore.scrutiny" label="scrutiny" color="red" />
    </div>
  </div>
</template>

<script setup>
import { usePlayerStore } from '../stores/playerStore';
import ProgressBar from './ProgressBar.vue';
import { useGameStore } from '../stores/gameStore';

const gameStore = useGameStore();
const playerStore = usePlayerStore();
</script>
