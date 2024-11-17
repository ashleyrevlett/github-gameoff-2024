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
      :action="() => doAction('favor')"
      :cooldown="0.1"
    />
    <StatBar
      label="Faith"
      :resource="faith"
      actionLabel="Preach"
      :action="() => doAction('faith')"
      :cooldown="0.1"
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
import { onMounted, onUnmounted, computed } from 'vue';
import StatBar from '@/components/StatBar.vue';
import { useGameStore } from '@/stores/gameStore';
import { useECSStore } from '@/stores/ecsStore';
import { eventBus } from '@/game/services/EventBus';
import { useNotificationStore } from '../stores/notificationStore';
// import { ResourceSystem } from '../game/ecs/systems/ResourceSystem';

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
    // ResourceSystem.triggerAction(resource);
  } else {
    console.error('No resource found', resourceType);
  }
}

const handleLevelUp = (data) => {
  useNotificationStore().addNotification({
    id: window.crypto.randomUUID(),
    title: 'Level Up!',
    message: `${data.type} reached level ${data.level}!`
  });
};

const handleUnlocked = (data) => {
  useNotificationStore().addNotification({
    id: window.crypto.randomUUID(),
    title: 'Unlocked!',
    message: `${data.type} is now unlocked!`
  });
};

onMounted(() => {
  eventBus.on('resource:levelUp', handleLevelUp);
  eventBus.on('resource:unlocked', handleUnlocked);
});

onUnmounted(() => {
  eventBus.off('resource:levelUp', handleLevelUp);
  eventBus.off('resource:unlocked', handleUnlocked);
});

</script>
