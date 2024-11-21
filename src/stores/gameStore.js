import { reactive } from 'vue';
import { defineStore } from 'pinia';
import {
  BUILDINGS,
  PLAYER_ACTIONS,
  GAME_STATES,
  SECONDS_PER_DAY,
  DAYS_PER_GAME,
  SCALE_FACTOR
} from '@/constants/game';

// attributes and resources
class Resource {
  constructor(resourceType, current = 0, max = 10, perSecond = 0, level = 1, unlocked = false, unlockedBy = undefined) {
    const resource = reactive({
      resourceType,
      current,
      max,
      perSecond,
      level,
      unlocked,
      unlockedBy
    });
    return resource;
  }
}

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    elapsedTime: 0,
    maxTime: DAYS_PER_GAME * SECONDS_PER_DAY,
    gameState: GAME_STATES.PLAYING,
    resources: {},
    buildings: [],
    prestigeCount: 1,
  }),

  getters: {
    isPlaying: (state) => state.gameState === GAME_STATES.PLAYING,
    isPaused: (state) => state.gameState === GAME_STATES.PAUSED,
    isGameOver: (state) => state.gameState === GAME_STATES.LOST || state.gameState === GAME_STATES.WON,
    daysRemaining: (state) => Math.max(0, Math.ceil((state.maxTime - state.elapsedTime) / SECONDS_PER_DAY)),
  },

  actions: {
    initState() {
      this.resources = {
        faith: new Resource('faith', 0, 10, 0, 1, true),
        followers: new Resource('followers', 0, Number.MAX_SAFE_INTEGER, 0, 1, false),
        money: new Resource('money', 0, Number.MAX_SAFE_INTEGER, 0, 1, false)
      }
    },

    startGame() {
      // reset the game state
      console.log('startGame!');
      this.initState();
      this.elapsedTime = 0;
      this.gameState = GAME_STATES.PLAYING;
    },

    prestige() {
      // play another run through
      console.log('prestige!');
      this.prestigeCount += 1;
      this.elapsedTime = 0;
      this.gameState = GAME_STATES.PLAYING;
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

      // Update all resources
      Object.values(this.resources).forEach(resource => {
          this.setResourcePerSecond(resource)
          this.setResourceCurrent(resource, resource.current + resource.perSecond * dt)
          this.checkLevelUp(resource)
          this.checkWinLose()
      })
    },

    setResourceCurrent(resource, value) {
      resource.current = Math.max(0, Math.min(resource.max, value))
      this.checkLevelUp(resource)
    },

    setResourcePerSecond(resource) {
      // reset the perSecond value
      resource.perSecond = 0;

      // money and faith are affected by followers
      if (resource.resourceType === 'money') {
        console.log('money rps', this.resources.money.current, this.resources.followers.current);
        resource.perSecond = Math.floor(this.resources.followers.current) * 0.1;
      }

      // loop through all buildings and add the perSecond value if it exists
      const resourceBuildings = this.buildings.filter(building => building.resourceAffected === resource.resourceType)
      resourceBuildings.forEach(building => {
        if (building.perSecond) {
          resource.perSecond += building.perSecond;
        }
      });
    },

    checkLevelUp(resource) {
      // this runs when the resource hits the max and award a level up
      if (resource.current >= resource.max) {
        switch (resource.resourceType) {
          case 'faith':
            // faith causes more followers
            this.resources.followers.current += 1
            break;
          case 'followers':
            // followers can only level up by purchasing more houses
            return;
        }
        resource.level++
        resource.max = Math.floor(resource.max * SCALE_FACTOR)
      }
    },

    checkWinLose() {
      if (this.elapsedTime >= this.maxTime) {
        this.gameState = GAME_STATES.WON;
      }
    },

    build(building) {
      // @param building {Object} - the building to build
      console.log('build!', building.name);
      if (this.resources.money.current >= building.cost) {
        this.setResourceCurrent(this.resources.money, this.resources.money.current - building.cost)
        this.buildings.push(building)
      }
    },

    pray() {
      console.log('pray!');
      const prayAmount = PLAYER_ACTIONS.PRAY.oneTimeAmount
      this.setResourceCurrent(this.resources.faith, this.resources.faith.current + prayAmount)
    },

    preach() {
      console.log('preach!');
      // const preachAmount = PLAYER_ACTIONS.PREACH.oneTimeAmount * Math.max(1, this.resources.followers.current)
      // // this.setResourceCurrent(this.resources.faith, this.resources.faith.current + preachAmount)
      this.buildings.push(PLAYER_ACTIONS.PREACH)
      console.log(this.buildings);
    },

    tithe() {
      console.log('tithe!');
      const titheCost = 1 * this.resources.followers.current * PLAYER_ACTIONS.TITHE.cost
      const titheAmount = PLAYER_ACTIONS.TITHE.oneTimeAmount * this.resources.followers.current
      this.setResourceCurrent(this.resources[PLAYER_ACTIONS.TITHE.currency], this.resources[PLAYER_ACTIONS.TITHE.currency].current - titheCost)
      this.setResourceCurrent(this.resources[PLAYER_ACTIONS.TITHE.resourceAffected], this.resources[PLAYER_ACTIONS.TITHE.resourceAffected].current + titheAmount)
    }
  }

});
