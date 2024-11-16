<template>
  <div class="flex-1">
    <div class="flex-grow w-100 h-3 bg-white border border-black rounded-full overflow-hidden">
      <div
        class="h-full rounded-full transition-width"
        :class="`bg-black`"
        :style="{
          width: `${percentage}%`,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    percentage: {
      type: Number,
      required: true,
      validator: (value) => value >= 0 && value <= 100
    }
  }
}
</script>