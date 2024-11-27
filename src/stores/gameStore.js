import { reactive } from 'vue';
import { defineStore } from 'pinia';
import {
  PLAYER_ACTIONS,
  GAME_STATES,
  SECONDS_PER_DAY,
  DAYS_PER_GAME,
  SCALE_FACTOR
} from '@/constants';
import { Resource } from '@/models/Resource';



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
    saveState() {
      console.log('saveState!');
      const state = {
        ...this.$state,
        resources: Resource.serializeAll(this.resources)
      };
      localStorage.setItem('gameStore', JSON.stringify(state));
    },

    loadState() {
      console.log('loadState!');
      const savedState = localStorage.getItem('gameStore');
      if (savedState) {
        const parsed = JSON.parse(savedState);

        // First assign non-resource state
        Object.assign(this.$state, {
          elapsedTime: parsed.elapsedTime,
          maxTime: parsed.maxTime,
          gameState: parsed.gameState,
          buildings: parsed.buildings,
          prestigeCount: parsed.prestigeCount
        });

        // Use the static deserialize method
        this.resources = Resource.deserializeAll(parsed.resources);
      }
    },

    startGame() {
      // then clear the local state and initialize a new one
      console.log('clearing state');
      localStorage.removeItem('gameStore');
      this.resources = {
        faith: new Resource('faith', 0, 10, 0, 1, true),
        followers: new Resource('followers', 0, Number.MAX_SAFE_INTEGER, 0, 1, false),
        money: new Resource('money', 0, Number.MAX_SAFE_INTEGER, 0, 1, false)
      }
      this.elapsedTime = 0;
      this.gameState = GAME_STATES.PLAYING;
      this.buildings = [];
      // do not overwrite the prestige count
      console.log(`prestige count ${this.prestigeCount}`);

      this.saveState(); // rehydrate local state
    },

    prestige() {
      // play another run through
      this.prestigeCount += 1;
      console.log(`prestige! ${this.prestigeCount}`);
      // @todo add buff for new game+
      this.startGame();
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

      // Update all resources w/ persecond values
      Object.values(this.resources).forEach(resource => {
          this.setResourceCurrent(resource, resource.current + (resource.perSecond * dt))
          this.checkLevelUp(resource)
          this.checkWinLose()
      })

      // persist changes
      this.saveState();
    },

    setResourceCurrent(resource, value) {
      // resource should be a ref to gameStore.resources[resourceType]
      resource.current = Math.max(0, Math.min(resource.max, value))
      this.checkLevelUp(resource)
    },

    checkLevelUp(resource) {
      // this runs when the resource hits the max and award a level up
      if (resource.current >= resource.max) {
        resource.level++

        // set new max for this level using log algorithm
        const x = resource.level
        const base = Math.E
        const scale = SCALE_FACTOR
        const newMax = Math.ceil(scale * Math.log(x + 1) / Math.log(base) + 1)
        resource.max = Math.floor(resource.max * SCALE_FACTOR)

        // reset current
        resource.current = 0
      }
    },

    checkWinLose() {
      if (this.elapsedTime >= this.maxTime) {
        this.gameState = GAME_STATES.WON;
      }
    },

    doAction(actionName) {
      const actionKey = actionName.toUpperCase().replace(/ /g, '_')
      const action = PLAYER_ACTIONS[actionKey]
      if (!action) {
        console.log('action not found', actionName);
        return;
      }

      // check if the player has enough of the required currency
      // if it's free, price and currency should be null
      const price = action.cost
      const bank = this.resources[action.currency] ? this.resources[action.currency].current : null;
      if (!price || !bank || bank >= price) {
        const resource = this.resources[action.resourceAffected]
        const currencyResource = this.resources[action.currency]

        // apply cost if any
        if (bank) {
          this.setResourceCurrent(currencyResource, currencyResource.current - price)
        }

        // calculate any multipliers
        const followerMultiplier = action.followerMultiplier ? this.resources.followers.current * action.followerMultiplier : 1

        // apply perSecond or oneTimeAmount
        if (action.perSecond != 0) {
          const amount = action.perSecond * followerMultiplier
          // console.log('setting resource persecond', resource, amount);
          resource.perSecond += amount
        } else if (action.oneTimeAmount != 0) {
          const amount = action.oneTimeAmount * followerMultiplier
          // console.log('setting resource', resource, amount);
          this.setResourceCurrent(resource, resource.current + amount)
        }

        // add building if it's a building
        if (action.isBuilding) {
          this.buildings.push(action)
        }
      }
    },

  }

});
