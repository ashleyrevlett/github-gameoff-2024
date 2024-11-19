<template>
  <div class="flex justify-between mb-4">
    <p>{{ gameStore.daysRemaining }} Days Left</p>
    <p class="text-right">
      <Transition name="fade">
        <div>
          {{ Math.round(followers?.current) }} / {{ followers?.max }} Followers
          <div class="text-xs text-gray-500" v-if="followers?.perSecond > 0">
            <span>+{{ followers?.perSecond.toFixed(2) }}/sec</span>
          </div>
          <span v-if="followerBlessings.length > 0">
            <p v-for="(blessing, index) in followerBlessings" class="text-xs text-gray-500" :key="index">
              Ka's blessing: {{ Math.round(blessing.timeRemaining) }}s
            </p>
          </span>
        </div>
      </Transition>
      <span v-if="money?.unlocked">${{ money?.current.toLocaleString() }}</span>
      <span v-else>&nbsp;</span>
    </p>
  </div>
  <div>
    <StatBar
      label="Favor"
      :resource="favor"
      actionLabel="Pray"
      :action="() => gameStore.performAction(PLAYER_ACTIONS.PRAY)"
      :cooldown="0.1"
    />
    <StatBar
      label="Faith"
      :resource="faith"
      actionLabel="Preach"
      :action="() => gameStore.performAction(PLAYER_ACTIONS.PREACH)"
      :cooldown="0.1"
    />
    <!-- <StatBar
      label="Love"
      :resource="love"
      actionLabel="Bless"
      :action="() => gameStore.triggerAction(love)"
      :cooldown="1"
    /> -->
  </div>

</template>

<script setup>
import { computed } from 'vue';
import StatBar from '@/components/StatBar.vue';
import { useGameStore, PLAYER_ACTIONS } from '@/stores/gameStore';

const gameStore = useGameStore();
const favor = computed(() => gameStore.resources.favor);
const faith = computed(() => gameStore.resources.faith);
const love = computed(() => gameStore.resources.love);
const followers = computed(() => gameStore.resources.followers);
const money = computed(() => gameStore.resources.money);
const blessings = computed(() => gameStore.blessings);
const followerBlessings = computed(() => blessings.value.filter(b => b.resourceType === 'followers'));

</script>
