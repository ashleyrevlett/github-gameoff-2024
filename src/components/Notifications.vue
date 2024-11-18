
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
import { Teleport } from "vue";
import Notification from "./Notification.vue";
import { useNotificationStore } from "@/stores/notificationStore";
const notificationStore = useNotificationStore();
</script>
