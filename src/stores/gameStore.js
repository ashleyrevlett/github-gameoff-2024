import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { useNotificationStore } from './notificationStore';
import { useECSStore } from './ecsStore';

const GAME_STATES = {
  MENU: 'menu',
  PLAYING: 'playing',
  PAUSED: 'paused',
  WON: 'won',
  LOST: 'lost',
};

const SECONDS_PER_DAY = 15;
const DAYS_PER_GAME = 30;

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    elapsedTime: 0,
    maxTime: DAYS_PER_GAME * SECONDS_PER_DAY,
    gameState: GAME_STATES.PLAYING,
    timer: null,
  }),

  getters: {
    isPlaying: (state) => state.gameState === GAME_STATES.PLAYING,
    isPaused: (state) => state.gameState === GAME_STATES.PAUSED,
    daysRemaining: (state) => Math.max(0, Math.ceil((state.maxTime - state.elapsedTime) / SECONDS_PER_DAY)),
  },

  actions: {
    startGame() {
      // reset the game state and start timer
      this.gameState = GAME_STATES.PLAYING;
      this.elapsedTime = 0;

      if (!this.timer) {
        this.timer = setInterval(this.onTick, 1000);
      }
    },

    pauseTimer() {
      this.gameState = GAME_STATES.PAUSED;
    },

    unpauseTimer() {
      this.gameState = GAME_STATES.PLAYING;
    },

    checkWinLose() {
      if (this.elapsedTime >= this.maxTime) {
        this.gameState = GAME_STATES.WON;
      }
    }

  },
});
