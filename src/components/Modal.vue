<template>
  <div class="modal" v-if="visible">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <Button @click="confirm">Confirm</Button>
      <Button variant="default" @click="closeModal">Cancel</Button>
    </div>
  </div>
</template>

<script>
import Button from './Button.vue';

export default {
  components: { Button },
  props: {
    title: String,
    message: String,
    visible: Boolean,
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    confirm() {
      this.$emit('confirm');
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
}

.close {
  cursor: pointer;
  font-size: 1.5rem;
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
