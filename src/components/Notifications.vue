<template>
  <div class="notifications absolute top-0 left-0 w-full z-60">
    <transition-group name="fade">
      <Notification v-for="notification in notifications" :key="notification.id" :notification="notification" />
    </transition-group>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import Notification from "../components/Notification.vue";

import { useNotificationStore } from '../stores/notificationStore';

const notifications = computed(() => useNotificationStore().notifications);
</script>
