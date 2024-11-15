<template>
    <button
      class="btn"
      @click="callAction"
      :disabled="isOnCooldown"
    >
      {{ actionLabel }}
      <div
        v-if="isOnCooldown"
        class="cooldown-overlay"
        :style="{ animationDuration: props.cooldown + 's' }"
      ></div>
    </button>
</template>


<script setup>
import { ref } from 'vue';

const props = defineProps({
  action: Function,
  actionLabel: String,
  cooldown: {
    type: Number,
    default: 0,
  },
});

const timer = ref(null);
const isOnCooldown = ref(false);
const cooldownRemaining = ref(0);

const callAction = () => {
  if (isOnCooldown.value) return;

  props.action();
  if (props.cooldown > 0) {
    isOnCooldown.value = true;
    cooldownRemaining.value = props.cooldown;

    timer.value = setInterval(() => {
      cooldownRemaining.value = cooldownRemaining.value - 0.1;
      if (cooldownRemaining.value <= 0) {
        clearInterval(timer.value);
        isOnCooldown.value = false;
      }
    }, 100);
  }
};
</script>


<style scoped>
.btn {
  position: relative;
  overflow: hidden;

  &:disabled {
    opacity: 1;
    background-color: #ccc;
    color: #666;
    border-color: #ccc;
  }
}

.cooldown-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.5);
  animation: cooldown-progress linear;
  width: 100%;
}

@keyframes cooldown-progress {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>