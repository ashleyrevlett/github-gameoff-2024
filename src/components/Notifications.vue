
<template>

  <section id="notifications"
    class="bg-yellow-200 mt-auto w-full z-50"
    :class="{ 'active': notificationStore.notifications.length > 0 }"
  >
    <Notification
      v-for="notification in notificationStore.notifications"
        :key="notification.id"
        :notification="notification"
      />
    </section>

</template>

<script setup>
import { Teleport } from "vue";
import Notification from "./Notification.vue";
import { useNotificationStore } from "@/stores/notificationStore";
const notificationStore = useNotificationStore();
</script>

<style scoped>
#notifications {
  transition: all 0.3s ease-in-out;
}
.active {
  opacity: 1;
  top: 0;
}
</style>
