export const SECONDS_PER_DAY = 15;
export const DAYS_PER_GAME = 30;
export const SCALE_FACTOR = 2; // how much to increase the max of a resource when it levels up

export const GAME_STATES = {
  MENU: 'menu',
  PLAYING: 'playing',
  PAUSED: 'paused',
  WON: 'won',
  LOST: 'lost',
};


export const PLAYER_ACTIONS = {
  PRAY: {
    name: 'Pray',
    icon: '🙏',
    cost: 0,
    currency: 'faith',
    resourceAffected: 'faith',
    perSecond: 0,
    oneTimeAmount: 1,
    faithLevelRequired: 0,
    cooldown: 0.05,
    isBuilding: false,
  },
  ALTAR: {
    name: 'Altar',
    icon: '🔮',
    cost: 10,
    currency: 'faith',
    resourceAffected: 'faith',
    perSecond: 0.1,
    faithLevelRequired: 2,
    cooldown: .5,
    isBuilding: true,
  },
  PREACH: {
    name: 'Preach',
    icon: '🤵',
    cost: 20,
    currency: 'faith',
    resourceAffected: 'followers',
    perSecond: 0,
    oneTimeAmount: 1,
    faithLevelRequired: 3,
    cooldown: 3,
    isBuilding: false,
  },
  TITHE: {
    name: 'Tithe',
    icon: '💰',
    cost: 50,
    currency: 'faith',
    resourceAffected: 'money',
    perSecond: 0,
    oneTimeAmount: 1.00,
    followerMultiplier: 1,
    faithLevelRequired: 4,
    cooldown: 8,
    isBuilding: false,
  },
  TALISMAN: {
    name: 'Talisman',
    icon: '📿',
    cost: 3.0,
    currency: 'money',
    resourceAffected: 'faith',
    perSecond: .5,
    oneTimeAmount: 0,
    faithLevelRequired: 5,
    cooldown: 4,
    isBuilding: true,
  },
  SCRIPTURE: {
    name: 'Scripture',
    icon: '📜',
    cost: 5,
    currency: 'money',
    resourceAffected: 'followers',
    perSecond: .1,
    oneTimeAmount: 0,
    faithLevelRequired: 6,
    cooldown: 3,
    isBuilding: true,
  },
  SHRINE: {
    name: 'Shrine',
    icon: '⛩️',
    cost: 400,
    currency: 'faith',
    resourceAffected: 'faith',
    perSecond: 2.5,
    faithLevelRequired: 7,
    cooldown: 8,
    isBuilding: true,
  },
  MEETING_HALL: {
    name: 'Meeting Hall',
    icon: '👥',
    cost: 25,
    currency: 'money',
    resourceAffected: 'followers',
    perSecond: 0.5,
    faithLevelRequired: 8,
    cooldown: 16,
    isBuilding: true,
  },
  TEMPLE: {
    name: 'Temple',
    icon: '🏛️',
    cost: 25,
    currency: 'money',
    resourceAffected: 'faith',
    perSecond: 5,
    faithLevelRequired: 9,
    cooldown: 22,
    isBuilding: true,
  },
  RITUAL_CHAMBER: {
    name: 'Ritual Chamber',
    icon: '🚪',
    cost: 10,
    currency: 'followers',
    resourceAffected: 'faith',
    perSecond: 10,
    faithLevelRequired: 10,
    cooldown: 30,
    isBuilding: true,
  },

  LIBRARY: {
    name: 'Library',
    icon: '📚',
    cost: 10,
    currency: 'money',
    resourceAffected: 'faith',
    perSecond: 0.5,
    faithLevelRequired: 10,
    cooldown: 10,
    isBuilding: true,
  },
  TREASURY: {
    name: 'Treasury',
    icon: '🏦',
    cost: 10,
    currency: 'money',
    resourceAffected: 'money',
    perSecond: 0.1,
    faithLevelRequired: 11,
    cooldown: 10,
    isBuilding: true,
  },
  MONUMENT: {
    name: 'Monument',
    icon: '🗿',
    cost: 5,
    currency: 'money',
    resourceAffected: 'faith',
    perSecond: 20,
    faithLevelRequired: 12,
    cooldown: 5,
    isBuilding: true,
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
