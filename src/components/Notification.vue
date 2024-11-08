<template>
  <div class="notification flex items-center justify-center gap-3 @apply bg-yellow-200 p-4 border-b border-black">
    <div v-html="message"></div>
    <button class="btn p-1 text-xs ml-auto" @click="closeNotification">OK</button>
    </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue';
import { useNotificationStore } from '../stores/notificationStore';
const notificationStore = useNotificationStore();

const props = defineProps({
    notification: Object,
});

const message = computed(() => {
  if (props.notification.notificationType === 'eventExpired') {
    return `You failed to respond to ${props.notification.object.sender.name}'s message in time.`;
  } else {
    return props.notification.object.resolution?.message;
  }
});

function closeNotification() {
  notificationStore.removeNotification(props.notification.id);
}

let timeoutId = null;

onMounted(() => {
  timeoutId = setTimeout(() => {
    closeNotification();
  }, 5000);
});

onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
});
</script>
