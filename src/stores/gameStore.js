import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { useNotificationStore } from './notificationStore';

const GAME_STATES = {
  MENU: 'menu',
  PLAYING: 'playing',
  PAUSED: 'paused',
  WON: 'won',
  LOST: 'lost',
};

const MECHANICS = {
  PRAY: 'pray',
  PREACH: 'preach',
  BLESS: 'bless',
};

const SECONDS_PER_DAY = 15;
const DAYS_PER_GAME = 30;

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    elapsedTime: 0,
    maxTime: DAYS_PER_GAME * SECONDS_PER_DAY,
    gameState: GAME_STATES.PLAYING,
    favor: reactive({ current: 0, level: 1 }),
    faith: 0,
    happiness: 0,
    scrutiny: 0,
    followers: 0,
    money: 0,
    timer: null,
    unlockedMechanics: [MECHANICS.PRAY],
  }),

  getters: {
    isPlaying: (state) => state.gameState === GAME_STATES.PLAYING,
    isPaused: (state) => state.gameState === GAME_STATES.PAUSED,
    faithPerSecond: (state) => state.faith * 0.1,
    favorPerSecond: (state) => state.faith > 10 ? Math.min(10, Math.floor(state.faith * 0.1)) : -0.1,
    daysRemaining: (state) => Math.max(0, Math.ceil((state.maxTime - state.elapsedTime) / SECONDS_PER_DAY)),
    canPray: (state) => state.unlockedMechanics.includes(MECHANICS.PRAY),
    canPreach: (state) => state.unlockedMechanics.includes(MECHANICS.PREACH),
    canBless: (state) => state.unlockedMechanics.includes(MECHANICS.BLESS),
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
      this.unlockedMechanics = [MECHANICS.PRAY];

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
      if (this.gameState !== GAME_STATES.PLAYING) return;

      this.elapsedTime++;
      this.faith += this.faithPerSecond;
      if (this.faith >= 20) {
        useNotificationStore().addNotification({
          id: 'followers',
          title: 'New Followers',
          message: 'You have gained a new follower!',
        });
        this.favor += 10;
        this.followers += 1;
      }

      this.favor.current += this.favorPerSecond;
      if (this.favor.current < 0) {
        useNotificationStore().addNotification({
          id: 'favor',
          title: 'Wrath of Ka',
          message: 'Ka no longer favors you!',
        });
        this.happiness -= 10;
      }

      this.checkUnlockedMechanics();
      this.checkWinLose();

    },

    checkUnlockedMechanics() {
      if (this.favor.current >= 10 && !this.unlockedMechanics.includes(MECHANICS.PREACH)) {
        this.unlockedMechanics.push(MECHANICS.PREACH);
        useNotificationStore().addNotification({
          id: 'preach',
          title: 'Unlocked',
          message: 'You can now preach!',
        });
      }
      if (this.faith >= 10 && !this.unlockedMechanics.includes(MECHANICS.BLESS)) {
        this.unlockedMechanics.push(MECHANICS.BLESS);
        useNotificationStore().addNotification({
          id: 'bless',
          title: 'Unlocked',
          message: 'You can now bless!',
        });
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
      this.favor.current += 1;
    },

    preach() {
      this.faith += 1;
    },

    bless() {
      this.happiness += 1;
    },

  },
});
