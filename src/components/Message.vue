<template>
  <div class="event-panel">
    <h2>{{ event.title }}</h2>
    <p>{{ event.description }}</p>
    <div class="choices">
      <button
        v-for="choice in event.choices"
        :key="choice.id"
        @click="$emit('choose', choice.id)"
        class="btn"
      >
        {{ choice.label }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: Object,
  },
};
</script>
