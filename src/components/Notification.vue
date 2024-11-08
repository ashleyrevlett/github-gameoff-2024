<template>
  <div class="notification">
    <div v-html="message"></div>
    <button class="btn p-1 text-xs" @click="closeNotification">OK</button>
  </div>
</template>

<script>
export default {
  props: {
    message: String,
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
  /* @apply bg-white text-sm px-3 py-1 border border-black p-3 text-center;
  @apply flex flex-col items-center justify-center gap-3;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  min-height: 30vh;
  overflow-y: scroll; */
  @apply bg-yellow-200 p-4;
}
</style>
