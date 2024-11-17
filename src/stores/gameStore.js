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

const SECONDS_PER_DAY = 15;
const DAYS_PER_GAME = 30;

// Resource class to replace ResourceComponent
class Resource {
  constructor(resourceType, current = 0, max = 100, perSecond = 0, level = 1, unlocked = false, unlockedBy = undefined) {
    // Make all properties reactive using ref or reactive
    const resource = reactive({
      resourceType,
      current,
      max,
      perSecond,
      level,
      unlocked,
      unlockedBy
    });

    // Return the reactive object
    return resource;
  }
}

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    elapsedTime: 0,
    maxTime: DAYS_PER_GAME * SECONDS_PER_DAY,
    gameState: GAME_STATES.PLAYING,
    resources: {
      favor: new Resource('favor', 0, 10, 0, 0, true),
      faith: new Resource('faith', 0, 10, 0.1, 1, false, { resourceType: 'favor', level: 2 }),
      followers: new Resource('followers', 0, 3, 0, 1, false, { resourceType: 'faith', level: 2 }),
      love: new Resource('love', 0, 10, 0.01, 1, false, { resourceType: 'followers', level: 1 }),
      money: new Resource('money', 100.0, 1000000.0, 0, 1, false, { resourceType: 'followers', level: 2 })
    }
  }),

  getters: {
    isPlaying: (state) => state.gameState === GAME_STATES.PLAYING,
    isPaused: (state) => state.gameState === GAME_STATES.PAUSED,
    isGameOver: (state) => state.gameState === GAME_STATES.LOST || state.gameState === GAME_STATES.WON,
    daysRemaining: (state) => Math.max(0, Math.ceil((state.maxTime - state.elapsedTime) / SECONDS_PER_DAY)),
  },

  actions: {
    startGame() {
      // reset the game state
      this.gameState = GAME_STATES.PLAYING;
      this.elapsedTime = 0;

      Object.values(this.resources).forEach(resource => {
        resource.current = 0
        resource.level = 1
      })
    },

    pauseTimer() {
      this.gameState = GAME_STATES.PAUSED;
    },

    unpauseTimer() {
      this.gameState = GAME_STATES.PLAYING;
    },

    update(dt) {
      // every tick of gameplay unless paused
      if (this.gameState !== GAME_STATES.PLAYING) return

      this.elapsedTime += dt

      // set followers per second based on faith level
      // this.resources.followers.perSecond = this.resources.faith.level * 0.1

      // Update all resources
      Object.values(this.resources).forEach(resource => {
        // Check if resource should be unlocked
        this.checkUnlock(resource)

        // Update resource if it is unlocked
        if (resource.unlocked) {
          this.updateResource(resource, dt);
          this.checkWinLose()
        }
      })
    },

    updateResource(resource, dt) {
      if (!resource.unlocked) return
      resource.current = Math.min(resource.max, resource.current + resource.perSecond * dt)
      this.checkLevelUp(resource)
    },

    checkUnlock(resource) {
      if (!resource.unlocked && resource.unlockedBy) {
        const dependency = this.resources[resource.unlockedBy.resourceType]
        if (dependency && dependency.unlocked && dependency.level >= resource.unlockedBy.level) {
          resource.unlocked = true
        }
      }
    },

    checkLevelUp(resource) {
      if (resource.current >= resource.max) {
        resource.level++
        resource.max *= 1.6
        // resource.current = 0

        if (resource.resourceType === 'faith') {
          this.resources.followers.current += 1
        }

        useNotificationStore().addNotification({
          id: crypto.randomUUID(),
          title: 'Level Up!',
          message: `${resource.resourceType} reached level ${resource.level}!`
        })
      }
    },

    checkWinLose() {
      if (this.elapsedTime >= this.maxTime) {
        this.gameState = GAME_STATES.WON;
      } else if (this.resources.favor.current < 0) {
        this.gameState = GAME_STATES.LOST;
      }
    },

    triggerAction(resource) {
      console.log('triggerAction!', resource.resourceType, resource);
      if (!resource.unlocked) return
      resource.current = Math.min(resource.max, resource.current + 1 * resource.level)
      this.checkLevelUp(resource)
    },

  }
});
