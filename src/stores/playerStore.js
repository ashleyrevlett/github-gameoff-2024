// /src/stores/playerStore.js
import { defineStore } from 'pinia';
import { useEventStore } from './eventStore';

export const usePlayerStore = defineStore('playerStore', {
  state: () => ({
    charisma: 10,
    faith: 0,
    scrutiny: 0,
    money: 1000.0,
    moneyGrowthRate: 1.0,
    followers: 2.0,
    followerGrowthRate: 2.0,
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
      this.charisma = 10;
      this.faith = 0;
      this.scrutiny = 0;
      this.money = 1000.0;
      this.moneyGrowthRate = 1.0;
      this.followers = 2.0;
      this.followerGrowthRate = 2.0;
    },
    nextTurn() {
      // this.money += 100;
    },
    onTick() {
      // increase followers
      const standardGrowth = 2 + useEventStore().beliefs.length;
      const t = this.charisma / 100;  // normalize to 0-1
      const growthFactor = t * t;  // easeInQuad formula
      const newFollowers = standardGrowth * growthFactor;
      this.followerGrowthRate = newFollowers.toFixed(2);
      this.followers += newFollowers;

      // increase money
      const moneyGrowth = Math.ceil(this.followers) + 1;
      const tMoney = this.faith / 100;  // normalize to 0-1
      const moneyFactor = tMoney * tMoney;  // easeInQuad formula
      const newMoneyGrowth = Math.max(1, moneyGrowth * moneyFactor);
      this.moneyGrowthRate = newMoneyGrowth.toFixed(2);
      this.money += newMoneyGrowth;
    },
  },
});
