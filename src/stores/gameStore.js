// /src/stores/gameStore.js
import { defineStore } from 'pinia';
import { usePlayerStore } from './playerStore';
import { useEventStore } from './eventStore';

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    turn: 1,
    maxTurns: 30,
    currentDay: new Date('1982-03-01'),
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
      this.currentDay = new Date('1982-03-01');
      this.nextTurn();
    },


    checkWinLose() {
      const playerStore = usePlayerStore();
      if (playerStore.reputation >= 100 && playerStore.popularity >= 100 && playerStore.stress <= 100) {
        this.isGameOver = true;
        this.gameOverMessage = 'The artists is a superstar! You win!';
        return;
      }

      if (playerStore.stress >= 100) {
        this.isGameOver = true;
        this.gameOverMessage = 'The artist burned out and quit';
        return;
      }

      if (playerStore.popularity <= 0 && playerStore.reputation <= 0) {
        this.isGameOver = true;
        this.gameOverMessage = 'The artist lost all popularity and reputation';
        return;
      }

      if (this.turn >= this.maxTurns) {
        this.isGameOver = true;
        this.gameOverMessage = 'Time\'s up!';
        return;
      }

    },

    nextTurn() {
      this.checkWinLose();
      if (this.isGameOver) {
        return;
      }

      // reset resources and events
      useEventStore().refreshEvents();
      usePlayerStore().refreshResources();

      // advance the day
      this.turn++;
      this.currentDay.setDate(this.currentDay.getDate() + 1);
    },
  },
});
