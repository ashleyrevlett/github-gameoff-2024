<template>
    <button
      ref="actionButton"
      class="btn min-w-20"
      @click="callAction"
      :disabled="isOnCooldown"
    >
      <div class="flex flex-row gap-1 items-center">
        <div>{{ actionLabel }}</div>
        <slot></slot>
      </div>
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
const actionButton = ref(null);

const callAction = () => {
  if (isOnCooldown.value) return;

  props.action();
  actionButton.value.classList.add('active');
  setTimeout(() => {
    actionButton.value.classList.remove('active');
  }, 100)

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
    opacity: .4;
    color: #666;
    border-color: #666;
  }
}

.cooldown-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
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