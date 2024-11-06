// /src/stores/gameStore.js
import { defineStore } from 'pinia';
import { usePlayerStore } from './playerStore';
import { useEventStore } from './eventStore';

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    turn: 1,
    maxTurns: 30,
    isGameOver: false,
    gameOverMessage: null,
  }),

  actions: {
    startNewGame() {
      // console.log('startNewGame');
      this.turn = 0;
      this.isGameOver = false;
      usePlayerStore().resetState();
      useEventStore().initializeEvents();
      this.nextTurn();
    },

    nextTurn() {
      if (usePlayerStore().stress >= 100) {
        this.isGameOver = true;
        this.gameOverMessage = 'The artist quit';
        return;
      }

      if (usePlayerStore().popularity <= 0) {
        this.isGameOver = true;
        this.gameOverMessage = 'The artist lost all popularity';
        return;
      }

      if (usePlayerStore().reputation <= 0) {
        this.isGameOver = true;
        this.gameOverMessage = 'The artist lost all reputation';
        return;
      }

      if (this.turn >= this.maxTurns) {
        this.isGameOver = true;
        this.gameOverMessage = 'Time\'s up!';
        return;
      }

      useEventStore().refreshEvents();

      this.turn++;
    },
  },
});
