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

class Blessing {
  constructor(name, resourceType, perSecond, timeRemaining = 0) {
    const blessing = reactive({
      name,
      resourceType,
      perSecond,
      timeRemaining
    })

    return blessing
  }
}

// Resource class to replace ResourceComponent
class Resource {
  constructor(resourceType, current = 0, max = 10, perSecond = 0, level = 1, unlocked = false, unlockedBy = undefined) {
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
      faith: new Resource('faith', 0, 10, 0, 1, false, { resourceType: 'favor', level: 2 }),
      followers: new Resource('followers', 0, 3, 0, 1, false, { resourceType: 'faith', level: 2 }),
      love: new Resource('love', 0, 10, 0, 1, false, { resourceType: 'followers', level: 1 }),
      money: new Resource('money', 100.0, 1000000.0, 0, 1, false, { resourceType: 'followers', level: 2 })
    },
    blessings: []
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
        resource.max = 10
        resource.level = 1
        resource.perSecond = 0
        resource.unlocked = false
      })
      this.resources.favor.unlocked = true
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

      // process blessings
      this.updateBlessings(dt)

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

    updateBlessings(dt) {
      this.blessings.forEach(blessing => {
        blessing.timeRemaining -= dt
        if (blessing.timeRemaining <= 0) {
          // blessing has expired
          let resource = this.resources[blessing.resourceType]
          resource.perSecond -= blessing.perSecond
          this.blessings = this.blessings.filter(b => b !== blessing)
        }
      })
    },

    addBlessing(blessing) {
      this.blessings.push(blessing)
      let resource = this.resources[blessing.resourceType]
      resource.perSecond += blessing.perSecond

      useNotificationStore().addNotification({
        id: crypto.randomUUID(),
        title: 'Blessing',
        message: `${blessing.name}`
      })
    },

    updateResource(resource, dt) {
      if (!resource.unlocked) return

      // update resource per second
      resource.current = Math.min(resource.max, resource.current + resource.perSecond * dt)

      this.checkLevelUp(resource)
    },

    checkUnlock(resource) {
      if (!resource.unlocked && resource.unlockedBy) {
        const dependency = this.resources[resource.unlockedBy.resourceType]
        if (dependency && dependency.unlocked && dependency.level >= resource.unlockedBy.level) {
          resource.unlocked = true

          // useNotificationStore().addNotification({
          //   id: crypto.randomUUID(),
          //   title: 'Unlocked',
          //   message: `${resource.resourceType} is now unlocked!`
          // })
        }
      }
    },

    checkLevelUp(resource) {
      if (resource.current >= resource.max) {

        // have hit resource cap
        switch (resource.resourceType) {
          case 'followers':
            // followers can only level up by purchasing more houses
            return;
          case 'faith':
            // faith causes more followers
            this.resources.followers.current += 1
            break;
          case 'favor':
            // favor causes a new blessing on level 2+
            if (resource.level >= 2) {
              const blessing = new Blessing(
                'Ka blesses you with +.01 followers per second for 10 seconds',
                'followers',
                .01,
                10
              )
              this.addBlessing(blessing)
            }
            break;
        }

        resource.level++
        resource.max = Math.floor(resource.max * 1.6)
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
      // console.log('triggerAction!', resource.resourceType, resource);
      if (!resource.unlocked) return
      resource.current = Math.min(resource.max, resource.current + 1) //  * resource.level
      this.checkLevelUp(resource)
    },

  }
});
