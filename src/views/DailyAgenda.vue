<template>
  <section class="p-4 border border-black">
    <div>
      <h2 class="text-center font-bold mb-2">A new day dawns...</h2>
      <p class="text-center mb-4">How shall we serve Xenu today?</p>
    </div>
    <div v-if="!result" class="flex flex-col gap-2">
      <button @click="setAgenda('worship')" class="btn">Worship</button>
      <button @click="setAgenda('recruit')" class="btn">Recruit</button>
      <button @click="setAgenda('purge')" class="btn">Purge Heretics</button>
      <button @click="setAgenda('pray')" class="btn">Pray for Guidance</button>
    </div>
    <div v-if="result" class="bg-yellow-100 p-4">
      <p>{{ result }}</p>
      <button @click="setAgendaDecided" class="btn">OK</button>
    </div>
  </section>
</template>


<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';
import { useEventStore } from '../stores/eventStore';

const eventStore = useEventStore();

const result = ref(null);
function setAgenda(agenda) {
  result.value = eventStore.setAgenda(agenda);
}


function setAgendaDecided() {
  eventStore.setAgendaDecided(true);
}
</script>
