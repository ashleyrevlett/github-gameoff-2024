<template>
  <Teleport to="body">
  <div class="fixed inset-0 bg-white flex items-center justify-center">
    <div class="bg-white p-4 rounded-lg w-96">
      <slot></slot>
      <button
        @click="$emit('dismissModal')"
        class="mt-4 px-4 py-2 bg-gray-200 rounded"
      >
        Close
      </button>
    </div>
    </div>
  </Teleport>
</template>

<script setup>
defineEmits(['dismissModal'])
</script>