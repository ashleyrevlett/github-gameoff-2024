// /src/stores/playerStore.js
import { defineStore } from 'pinia';

export const usePlayerStore = defineStore('playerStore', {
  state: () => ({
    charisma: 0,
    faith: 0,
    scrutiny: 0,
    money: 1000,
    followers: 2,
  }),

  actions: {
    modifyMoney(amount) {
      this.money = Math.max(0, this.money + amount);
    },
    modifyCharisma(amount) {
      this.charisma = Math.max(0, Math.min(100, this.charisma + amount));
    },
    modifyFaith(amount) {
      this.faith = Math.max(0, Math.min(100, this.faith + amount));
    },
    modifyScrutiny(amount) {
      this.scrutiny = Math.max(0, Math.min(100, this.scrutiny + amount));
    },
    resetState() {
      this.charisma = 0;
      this.faith = 0;
      this.scrutiny = 0;
      this.money = 1000;
      this.followers = 2;
    },
    nextTurn() {
      this.money += 100;
      this.followers += 1;
    },
  },
});
