export const SECONDS_PER_DAY = 15;
export const DAYS_PER_GAME = 30;
export const SCALE_FACTOR = 3; // how much to increase the max of a resource when it levels up

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
    currency: null,
    resourceAffected: 'faith',
    perSecond: 0,
    oneTimeAmount: 1,
    followerMultiplier: 1,
    faithLevelRequired: 0,
    cooldown: 0.1,
  },
  PREACH: {
    name: 'Sermon',
    icon: '🤵',
    cost: 0,
    currency: null,
    resourceAffected: 'followers',
    perSecond: .01,
    oneTimeAmount: 0,
    followerMultiplier: 1,
    faithLevelRequired: 2,
    cooldown: 3,
  },
  TITHE: {
    name: 'Tithe',
    icon: '💰',
    cost: 1,
    currency: 'faith',
    resourceAffected: 'money',
    perSecond: .1,
    oneTimeAmount: null,
    followerMultiplier: 1,
    faithLevelRequired: 4,
    cooldown: 2,
  },
}

export const BUILDINGS = {
  TALISMAN: {
    name: 'Altar',
    icon: '🔮',
    cost: .25,
    currency: 'money',
    resourceAffected: 'faith',
    perSecond: 0.25,
    faithLevelRequired: 2,
    cooldown: .5,
  },
  SCRIPTURE: {
    name: 'Scripture',
    icon: '📜',
    cost: 0,
    currency: null,
    resourceAffected: 'followers',
    perSecond: .01,
    oneTimeAmount: 0,
    followerMultiplier: 1,
    faithLevelRequired: 2,
    cooldown: 3,
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
    name: 'Meeting Hall',
    icon: '👥',
    cost: 7,
    currency: 'money',
    resourceAffected: 'followers',
    perSecond: 0.1,
    faithLevelRequired: 5,
    cooldown: 10,
  },
  LIBRARY: {
    name: 'Library',
    icon: '📚',
    cost: 10,
    currency: 'money',
    resourceAffected: 'faith',
    perSecond: 0.5,
    faithLevelRequired: 6,
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
