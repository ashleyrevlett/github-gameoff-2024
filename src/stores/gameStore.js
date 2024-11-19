import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { useNotificationStore } from './notificationStore';

const SECONDS_PER_DAY = 15;
const DAYS_PER_GAME = 30;

const GAME_STATES = {
  MENU: 'menu',
  PLAYING: 'playing',
  PAUSED: 'paused',
  WON: 'won',
  LOST: 'lost',
};

export const PLAYER_ACTIONS = {
  PRAY: 'pray',
  PREACH: 'preach',
  RECRUIT: 'recruit',
  ANNOIT: 'annoit',
  TITHE: 'tithe',
  PERFORM_MIRACLE: 'perform_miracle',
  BLESS: 'bless'
}

export const BUILDINGS = {
  SHRINE: {
    name: 'Shrine',
    icon: '🗿',
    cost: 1,
    resourceAffected: 'favor',
    perSecond: 0.01,
  },
  TEMPLE: {
    name: 'Temple',
    icon: '🏛️',
    cost: 1,
    resourceAffected: 'favor',
    perSecond: 0.01,
  },
  HOUSE: {
    name: 'House',
    icon: '🏠',
    cost: 10,
    resourceAffected: 'followers',
    perSecond: null,
    effect: 'followers.max += 1'
  }
}

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
    blessings: [],
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
        favor: new Resource('favor', 0, 10, 0, 0, true),
        faith: new Resource('faith', 0, 10, 0, 1, false, { resourceType: 'favor', level: 1 }),
        followers: new Resource('followers', 0, 3, 0, 1, false, { resourceType: 'favor', level: 1 }),
        money: new Resource('money', 0, 1000000.0, 0, 1, false, { resourceType: 'faith', level: 2 })
        // love: new Resource('love', 0, 10, 0, 1, false, { resourceType: 'followers', level: 1 }),
      }
    },

    startGame() {
      // reset the game state
      this.gameState = GAME_STATES.PLAYING;
      this.elapsedTime = 0;

      this.initState();
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

      // process blessing updates
      this.updateBlessings(dt)

      // process building updates
      this.updateBuildings(dt)

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

    updateBuildings(dt) {
      this.buildings.forEach(building => {
        // console.log('updateBuilding!', building);
        this.resources[building.resourceAffected].current += building.perSecond * dt
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

    setResource(resource, value) {
      this.resources[resource].current = Math.max(0, Math.min(this.resources[resource].max, value))
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
      // this runs when the resource hits the max and will
      // award a level up
      if (resource.current >= resource.max) {

        // have hit resource cap
        switch (resource.resourceType) {

          case 'favor':
            // on hitting favor level 1, grant follower
            // if (resource.level === 0) {
              this.resources.followers.current += 1
              useNotificationStore().addNotification({
                id: crypto.randomUUID(),
                title: 'Follower',
                message: `You have a new follower!`
              })
            // } else if (resource.level === 1) {
            //   // on hitting favor level 2,
            //   this.resources.faith.current = this.resources.faith.current + this.resources.faith.max * 0.5
            //   useNotificationStore().addNotification({
            //     id: crypto.randomUUID(),
            //     title: 'Faith',
            //     message: `Ka blesses you with a full faith bar!`
            //   })
            // }
          case 'faith':
            // faith causes more followers
            this.resources.followers.current += 1
            // if (resource.level === 0) {
            //     this.setResource('faith', this.resources.faith.max * 0.3)
            // }
            break;
          case 'followers':
            // followers can only level up by purchasing more houses
            return;


            // favor causes a new blessing on level 2+
            // if (resource.level >= 1) {
            //   const blessing = new Blessing(
            //     'Ka blesses you with +.01 followers per second for 10 seconds',
            //     'followers',
            //     .01,
            //     10
            //   )
            //   this.addBlessing(blessing)
            // }
            break;
        }

        resource.level++
        resource.max = Math.floor(resource.max * 2)
      }
    },

    checkWinLose() {
      if (this.elapsedTime >= this.maxTime) {
        this.gameState = GAME_STATES.WON;
      } else if (this.resources.favor.current < 0) {
        this.gameState = GAME_STATES.LOST;
      }
    },

    triggerAction(resource, amount = 1) {
      // console.log('triggerAction!', resource.resourceType, resource);
      if (!resource.unlocked) return
      resource.current = Math.min(resource.max, resource.current + amount) //  * resource.level
      this.checkLevelUp(resource)
    },

    performAction(action) {
      console.log('performAction!', action);

      switch (action) {
        case PLAYER_ACTIONS.PRAY:
          this.triggerAction(this.resources.favor, 1)
          break;
        case PLAYER_ACTIONS.PREACH:
          this.triggerAction(this.resources.faith, 1)
          break;
        // case PLAYER_ACTIONS.RECRUIT:
        //   this.triggerAction(this.resources.followers)
        //   break;
        // case PLAYER_ACTIONS.ANNOIT:
        //   this.triggerAction(this.resources.priests)
        //   break;
      }
    },

    build(buildingType) {
      console.log('build!', buildingType);

      switch (buildingType) {
        case 'shrine':
          if (this.resources.money.current >= BUILDINGS.SHRINE.cost) {
            this.resources.money.current -= BUILDINGS.SHRINE.cost
            this.buildings.push(BUILDINGS.SHRINE)
          }
          break;
        case 'temple':
          if (this.resources.money.current >= BUILDINGS.TEMPLE.cost) {
            this.resources.money.current -= BUILDINGS.TEMPLE.cost
            this.buildings.push(BUILDINGS.TEMPLE)
          }
          break;
        case 'house':
          if (this.resources.money.current >= BUILDINGS.HOUSE.cost) {
            this.resources.money.current -= BUILDINGS.HOUSE.cost
            this.resources.followers.current += BUILDINGS.HOUSE.currentChange
            this.buildings.push(BUILDINGS.HOUSE)
          }
          break;
        default:
          console.log('unknown building type', buildingType);
      }
    },

    tithe() {
      console.log('tithe!');
      if (this.resources.faith.current < 10) return

      this.resources.faith.current -= 10
      this.resources.money.current += 10 * this.resources.followers.current
    }
  }

});
