<template>
  <transition name="fade">
    <div class="notification absolute bottom-0 left-0 w-full flex items-center justify-center gap-3 @apply bg-yellow-200 p-4 border-b border-black">
      <div>
        <span class="font-bold">{{ notification.title }}</span>: <span v-html="notification.message"></span>
      </div>
      <button class="btn p-1 text-xs ml-auto" @click="closeNotification">OK</button>
    </div>
  </transition>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue';
import { useNotificationStore } from '../stores/notificationStore';
const notificationStore = useNotificationStore();

const props = defineProps({
    notification: Object,
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
