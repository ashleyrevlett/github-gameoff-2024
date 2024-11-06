<template>
  <div class="notification" v-if="visible">
    <p>{{ message }}</p>
    <button class="btn p-1 text-xs" @click="closeNotification">OK</button>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
    visible: Boolean,
  },
  methods: {
    closeNotification() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.notification {
  @apply bg-yellow-400 text-sm px-3 py-1 border border-t-0 border-black;
  @apply flex flex-row items-center gap-3;

  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>
