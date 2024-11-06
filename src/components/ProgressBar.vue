<template>
  <div class="meter-container">
    <div v-if="label" class="meter-label">
      {{ label }}
    </div>
    <div class="meter-bar">
      <div
        class="meter-fill animate-fill"
        :style="{ width: `${percentage}%` }"
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
    },
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.meter-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.meter-bar {
  flex-grow: 1;
  height: 0.75rem;
  background-color: white;
  border: 1px solid black;
  border-radius: 9999px;
  overflow: hidden;
}

.meter-fill {
  height: 100%;
  background-color: green;
  border-radius: 9999px;
}

.animate-fill {
  transition: width 0.3s ease-in-out;
}

.meter-label {
  font-size: 0.875rem;
  text-align: left;
  width: 60px;
}
</style>