import { defineStore } from 'pinia';

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
    favor: 0,
    faith: 0,
    happiness: 0,
    scrutiny: 0,
    followers: 0,
    money: 0,
    timer: null,
  }),

  getters: {
    isPlaying: (state) => state.gameState === GAME_STATES.PLAYING,
    isPaused: (state) => state.gameState === GAME_STATES.PAUSED,
    faithPerSecond: (state) => state.faith * 0.1,
    daysRemaining: (state) => Math.max(0, Math.ceil((state.maxTime - state.elapsedTime) / SECONDS_PER_DAY)),
  },

  actions: {
    startGame() {
      // reset the game state and start timer
      this.gameState = GAME_STATES.PLAYING;
      this.elapsedTime = 0;
      this.approval = 0;
      this.faith = 0;
      this.happiness = 0;
      this.scrutiny = 0;
      this.followers = 0;
      this.money = 0;

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

    onTick() {
      if (this.gameState === GAME_STATES.PLAYING) {
        this.elapsedTime++;
        this.faith += this.faithPerSecond;
        this.checkWinLose();
      }
    },

    checkWinLose() {
      if (this.elapsedTime >= this.maxTime) {
        this.gameState = GAME_STATES.WON;
      } else if (this.scrutiny >= 100) {
        this.gameState = GAME_STATES.LOST;
      }
    },

    pray() {
      this.favor += 1;
    },

    preach() {
      this.faith += 1;
    },

    bless() {
      this.happiness += 1;
    },

  },
});
