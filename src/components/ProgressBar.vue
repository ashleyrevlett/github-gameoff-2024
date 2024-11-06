<template>
  <div class="flex items-center gap-4">
    <div v-if="label" class="text-sm text-left w-[60px]">
      {{ label }}
    </div>
    <div class="flex-grow h-3 bg-white border border-black rounded-full overflow-hidden">
      <div
        class="h-full bg-green-500 rounded-full transition-width duration-300 ease-in-out"
        :style="{ width: `${percentage}%` }"
      ></div>
    </div>
    <div>{{ percentage }}%</div>
  </div>
</template>

<script>
export default {
  props: {
    percentage: {
      type: Number,
      required: true,
      validator: (value) => value >= 0 && value <= 100
    },
    label: {
      type: String,
      default: ''
    }
  }
}
</script>