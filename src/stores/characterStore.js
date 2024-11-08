// /src/stores/characterStore.js
import { defineStore } from 'pinia';
import characters from '../data/characters.json';
import { usePlayerStore } from './playerStore';

export const useCharacterStore = defineStore('characterStore', {
  state: () => ({
    characterPool: [],
    contacts: [],
  }),

  actions: {
    initialize() {
      this.characterPool = characters; // Load characters from characters.json into characterPool
      // start with low influence contacts
      this.contacts = this.characterPool.filter(c => c.influence <= 4);
    },

    refreshContacts() {
      const influence = Math.max(4, Math.ceil(usePlayerStore().fame / 10));
      this.contacts = this.characterPool.filter(c => c.influence <= influence);
    },

  },
});
