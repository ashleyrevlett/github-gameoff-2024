import { reactive } from 'vue';
import { defineStore } from 'pinia';

const SECONDS_PER_DAY = 15;
const DAYS_PER_GAME = 30;
const SCALE_FACTOR = 3; // how much to increase the max of a resource when it levels up

const GAME_STATES = {
  MENU: 'menu',
  PLAYING: 'playing',
  PAUSED: 'paused',
  WON: 'won',
  LOST: 'lost',
};

export const PLAYER_ACTIONS = {
  PREACH: {
    name: 'Preach',
    icon: '🙏',
    cost: 0,
    currency: null,
    resourceAffected: 'faith',
    perSecond: 0,
    oneTimeAmount: 1,
    followerMultiplier: 1,
    faithLevelRequired: 0,
    cooldown: 0.1,
  },
  TITHE: {
    name: 'Tithe',
    icon: '💰',
    cost: 1,
    currency: 'faith',
    resourceAffected: 'money',
    perSecond: 0,
    oneTimeAmount: .1,
    followerMultiplier: 1,
    faithLevelRequired: 4,
    cooldown: .1,
  },
}

export const BUILDINGS = {
  TALISMAN: {
    name: 'Talisman',
    icon: '🔮',
    cost: .25,
    currency: 'money',
    resourceAffected: 'faith',
    perSecond: 0.25,
    faithLevelRequired: 2,
    cooldown: .5,
  },
  SHRINE: {
    name: 'Shrine',
    icon: '🗿',
    cost: .50,
    currency: 'money',
    resourceAffected: 'faith',
    perSecond: 0.5,
    faithLevelRequired: 3,
    cooldown: .5,
  },
  TEMPLE: {
    name: 'Temple',
    icon: '🏛️',
    cost: 3,
    currency: 'money',
    resourceAffected: 'faith',
    perSecond: 2.5,
    faithLevelRequired: 4,
    cooldown: 1,
  },
  RECRUITER_OFFICE: {
    name: 'Recruiter Office',
    icon: '👥',
    cost: 7,
    currency: 'money',
    resourceAffected: 'followers',
    perSecond: 0.1,
    faithLevelRequired: 5,
    cooldown: 10,
  },
  TREASURY: {
    name: 'Treasury',
    icon: '🏦',
    cost: 10,
    currency: 'money',
    resourceAffected: 'money',
    perSecond: 0.1,
    faithLevelRequired: 6,
    cooldown: 10,
  },
  MONUMENT: {
    name: 'Monument',
    icon: '🗼',
    cost: 5,
    currency: 'money',
    resourceAffected: 'faith',
    perSecond: 20,
    faithLevelRequired: 7,
    cooldown: 5,
  },
}

// more buildings:
// Library, Meeting Hall, Bunkhouse, Farm, Idol, ...

// class Blessing {
//   constructor(name, resourceType, perSecond, timeRemaining = 0) {
//     const blessing = reactive({
//       name,
//       resourceType,
//       perSecond,
//       timeRemaining
//     })

//     return blessing
//   }
// }

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
        resource.perSecond = this.resources.followers.current * 0.1;
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

    preach() {
      console.log('preach!');
      const preachAmount = PLAYER_ACTIONS.PREACH.oneTimeAmount * Math.max(1, this.resources.followers.current)
      this.setResourceCurrent(this.resources.faith, this.resources.faith.current + preachAmount)
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
