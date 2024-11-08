// /src/stores/characterStore.js
import { defineStore } from 'pinia';
import characters from '../data/characters.json';

export const useCharacterStore = defineStore('characterStore', {
  state: () => ({
    characterPool: [],
    contacts: [],
  }),

  actions: {
    initialize() {
      this.characterPool = characters; // Load characters from characters.json into characterPool
      // start with low influence contacts
      this.contacts = this.characterPool.filter(c => c.influence <= 2);
    },

  },
});
