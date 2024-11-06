// /src/stores/playerStore.js
import { defineStore } from 'pinia';

export const usePlayerStore = defineStore('playerStore', {
  state: () => ({
    reputation: 10,
    popularity: 10,
    stress: 10,
  }),

  actions: {
    updateStats(outcome) {
      if (outcome.reputation) {
        this.modifyReputation(outcome.reputation);
      }
      if (outcome.popularity) {
        this.modifyPopularity(outcome.popularity);
      }
      if (outcome.stress) {
        this.modifyStress(outcome.stress);
      }
    },
    modifyReputation(amount) {
      this.reputation = Math.max(0, Math.min(100, this.reputation + amount));
    },
    modifyPopularity(amount) {
      this.popularity = Math.max(0, Math.min(100, this.popularity + amount));
    },
    modifyStress(amount) {
      this.stress = Math.max(0, Math.min(100, this.stress + amount));
    },
    resetState() {
      this.reputation = 50;
      this.popularity = 50;
      this.stress = 10;
    },
  },
});
