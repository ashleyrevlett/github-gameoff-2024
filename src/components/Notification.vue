<template>
  <div class="notification" v-if="visible">
    <p>{{ message }}</p>
    <button class="btn" @click="closeNotification">OK</button>
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
  background-color: #ffcc00;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
}
</style>
