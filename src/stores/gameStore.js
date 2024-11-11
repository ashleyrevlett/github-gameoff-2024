// /src/stores/gameStore.js
import { defineStore } from 'pinia';
import { usePlayerStore } from './playerStore';
import { useEventStore } from './eventStore';
import { useCharacterStore } from './characterStore';

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
      this.turn = 1;
      this.isGameOver = false;
      usePlayerStore().resetState();
      useEventStore().initializeEvents();
      this.currentDay = new Date('1982-03-01');
    },


    checkWinLose() {
      const playerStore = usePlayerStore();
      if (playerStore.fame >= 100 && playerStore.stress <= 100) {
        this.isGameOver = true;
        this.gameOverMessage = 'The artist is a superstar! You win!';
        return;
      }

      if (playerStore.stress >= 100) {
        this.isGameOver = true;
        this.gameOverMessage = 'The artist burned out and quit.';
        return;
      }

      if (this.turn >= this.maxTurns && playerStore.fame < 100) {
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
      useCharacterStore().nextTurn();

      // advance the day
      this.turn++;
      this.currentDay.setDate(this.currentDay.getDate() + 1);

      // see if we lost/won after the turn began
      this.checkWinLose();
    },
  },
});
