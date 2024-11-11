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
    isGameStarted: false,
    gameOverMessage: null,
  }),

  actions: {
    startNewGame() {
      // console.log('startNewGame');
      if (this.isGameStarted) {
        return;
      }

      this.isGameStarted = true;
      this.turn = 1;
      this.isGameOver = false;
      usePlayerStore().resetState();
      useEventStore().initializeEvents();
      this.currentDay = new Date('1982-03-01');
    },


    checkWinLose() {
      const playerStore = usePlayerStore();
      if (playerStore.charisma >= 100 && playerStore.scrutiny <= 100) {
        this.isGameOver = true;
        this.gameOverMessage = 'The artist is a superstar! You win!';
        return;
      }

      if (playerStore.scrutiny >= 100) {
        this.isGameOver = true;
        this.gameOverMessage = 'The artist burned out and quit.';
        return;
      }

      if (this.turn >= this.maxTurns && playerStore.charisma < 100) {
        this.isGameOver = true;
        this.gameOverMessage = 'Time\'s up! You failed to reach superstar status.';
        return;
      }

    },

    nextTurn() {
      this.checkWinLose();
      if (this.isGameOver) {
        return;
      }

      // reset resources and events
      useEventStore().nextTurn();
      usePlayerStore().nextTurn();

      // advance the day
      this.turn++;
      this.currentDay.setDate(this.currentDay.getDate() + 1);

      // see if we lost/won after the turn began
      this.checkWinLose();
    },
  },
});
