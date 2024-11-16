<template>
  <div class="flex justify-between mb-4">
    <p>{{ gameStore.daysRemaining }} Days Left</p>
    <p class="text-right">
      {{ followers?.current }} Followers<br />
      ${{ money?.current.toLocaleString() }}
    </p>
  </div>
  <div>
    <StatBar
      label="Favor"
      :resource="favor"
      actionLabel="Pray"
      :action="() => doAction('favor')"
      :cooldown="0.1"
    />
    <StatBar
      label="Faith"
      :resource="faith"
      actionLabel="Preach"
      :action="() => doAction('faith')"
      :cooldown="0.5"
    />
    <StatBar
      label="Love"
      :resource="love"
      actionLabel="Bless"
      :action="() => doAction('love')"
      :cooldown="1"
    />
  </div>

</template>

<script setup>
import { computed } from 'vue';
import StatBar from '@/components/StatBar.vue';
import { useGameStore } from '@/stores/gameStore';
import { useECSStore } from '@/stores/ecsStore';

const gameStore = useGameStore();
const ecsStore = useECSStore();

const favor = computed(() => ecsStore.getResource('favor'));
const faith = computed(() => ecsStore.getResource('faith'));
const love = computed(() => ecsStore.getResource('love'));
const followers = computed(() => ecsStore.getResource('followers'));
const money = computed(() => ecsStore.getResource('money'));

function doAction(resourceType) {
  const resource = ecsStore.getResource(resourceType);
  console.log('doAction', resource);
  if (resource) {
    resource.triggerAction();
  } else {
    console.error('No resource found', resourceType);
  }
}

</script>
