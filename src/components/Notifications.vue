
<template>
  <Teleport to="body">
    <div class="fixed bottom-0 left-0 w-full z-50">
      <Notification
        v-for="notification in notificationStore.notifications"
        :key="notification.id"
        :notification="notification"
      />
    </div>
  </Teleport>
</template>

<script setup>
import { Teleport, onMounted, onUnmounted } from "vue";
import Notification from "./Notification.vue";
import { useNotificationStore } from "@/stores/notificationStore";
import { eventBus } from '@/game/services/EventBus';
const notificationStore = useNotificationStore();

const handleLevelUp = (data) => {
  notificationStore.addNotification({
    id: window.crypto.randomUUID(),
    title: 'Level Up!',
    message: `${data.resourceType} reached level ${data.level}!`
  });
};

const handleUnlocked = (data) => {
  notificationStore.addNotification({
    id: window.crypto.randomUUID(),
    title: 'Unlocked!',
    message: `${data.resourceType} is now unlocked!`
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
