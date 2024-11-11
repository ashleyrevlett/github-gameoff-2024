// /src/stores/playerStore.js
import { defineStore } from 'pinia';

export const usePlayerStore = defineStore('playerStore', {
  state: () => ({
    fame: 0,
    stress: 0,
    influencePoints: 10,
    money: 1000,
    followers: 2,
  }),

  actions: {
    updateStats(outcome) {
      if (outcome.fame) {
        this.modifyFame(outcome.fame);
      }
      if (outcome.stress) {
        this.modifyStress(outcome.stress);
      }
      if (outcome.money) {
        this.modifyMoney(outcome.money);
      }
    },
    modifyInfluencePoints(amount) {
      this.influencePoints = Math.max(0, this.influencePoints + amount);
    },
    modifyMoney(amount) {
      this.money = Math.max(0, this.money + amount);
    },
    modifyFame(amount) {
      this.fame = Math.max(0, Math.min(100, this.fame + amount));
    },
    modifyStress(amount) {
      this.stress = Math.max(0, Math.min(100, this.stress + amount));
    },
    resetState() {
      this.fame = 0;
      this.stress = 0;
      this.influencePoints = 10;
      this.money = 1000;
      this.followers = 2;
    },
    nextTurn() {
      this.influencePoints += 10;
      this.money += 100;
    },
  },
});
