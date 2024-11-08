// /src/stores/playerStore.js
import { defineStore } from 'pinia';

export const usePlayerStore = defineStore('playerStore', {
  state: () => ({
    reputation: 10,
    popularity: 10,
    stress: 0,
    influencePoints: 9,
    money: 1000,
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
      if (outcome.money) {
        this.modifyMoney(outcome.money);
      }
    },
    modifyInfluencePoints(amount) {
      this.influencePoints = Math.max(0, Math.min(100, this.influencePoints + amount));
    },
    modifyMoney(amount) {
      this.money = Math.max(0, Math.min(1000, this.money + amount));
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
      this.reputation = 10;
      this.popularity = 10;
      this.stress = 0;
      this.influencePoints = 9;
      this.money = 1000;
    },
    refreshResources() {
      this.influencePoints += 10;
      this.money += 100;
    },
  },
});
