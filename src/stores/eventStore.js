// /src/stores/eventStore.js
import { defineStore } from 'pinia';
// import tabloidScandalEvent from '../events/tabloidScandalEvent';
// import publicMeltdownEvent from '../events/publicMeltdownEvent';
import events from '../events/events.json'
import { usePlayerStore } from './playerStore';

export const useEventStore = defineStore('eventStore', {
  state: () => ({
    activeEvents: [],  // messages and phone calls
    eventPool: [],
    pastEvents: [],
  }),

  getters: {
    activeMessages: (state) => state.activeEvents.filter(e => e.type === 'message'),
    activePhoneCalls: (state) => state.activeEvents.filter(e => e.type === 'phone_call'),
  },

  actions: {
    initializeEvents() {
      this.eventPool = events; // Load events from events.json into eventPool
      this.refreshEvents(); // populate activeEvents
      this.pastEvents = [];
    },

    refreshEvents() {
      console.log('refreshEvents');

      // remove expired events, decrementing expiresIn
      for (const event of this.activeEvents) {
        event.expiresIn--;
      }
      this.activeEvents = this.activeEvents.filter(e => e.expiresIn > 0);


      // add new events
      const messageEvents = this.eventPool.filter(e => e.type === 'message');
      const phoneEvents = this.eventPool.filter(e => e.type === 'phone_call');

      // Randomly trigger 1-4 messages
      const numEvents = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < numEvents; i++) {
        const randomMessageIndex = Math.floor(Math.random() * messageEvents.length);
        const randomMessage = messageEvents[randomMessageIndex];
        const uid = crypto.randomUUID();
        this.activeEvents.push({ ...randomMessage, id: uid });
      }

      // 50% of the time, trigger 1 phone call
      if (Math.random() < 0.5) {
        const randomPhoneCallIndex = Math.floor(Math.random() * phoneEvents.length);
        const randomPhoneCall = phoneEvents[randomPhoneCallIndex];
        const uid = crypto.randomUUID();
        this.activeEvents.push({ ...randomPhoneCall, id: uid });
      }
    },

    resolveEvent(eventId, choiceId) {
      /*
      Apply the outcome of the choice to the player's stats.
      Remove the event from the active list.
      Log the event to the pastEvents array.
      */
     const activeEvent = this.activeEvents.find(e => e.id === eventId);
      if (!activeEvent) return;

      const playerStore = usePlayerStore();

      const choice = activeEvent.choices.find(c => c.id === choiceId);
      if (playerStore.influencePoints < choice.cost.ip || playerStore.money < choice.cost.money) return;

      // randomly select between positive and negative outcome; 80% likelihood of positive outcome
      const outcome = Math.random() < 0.8 ? choice.positive_outcome : choice.negative_outcome;

      if (choice && outcome) {
        playerStore.updateStats(outcome);
        playerStore.modifyInfluencePoints(-choice.cost.ip);
        playerStore.modifyMoney(-choice.cost.money);
        this.logEvent(activeEvent, choice, outcome);
        this.activeEvents = this.activeEvents.filter(e => e.id !== eventId);
      }
    },

    logEvent(event, choice, outcome) {
      const statsChanged = Object.fromEntries(Object.entries(outcome).filter(([key, value]) => key !== 'message'));
      const outcomeString = Object.entries(statsChanged).map(([key, value]) => `${key}: ${value}`).join(', ');
      const eventLog = `${event.title} -- You chose: ${choice.label}. Outcome: ${outcome.message} Effect: ${outcomeString}`;
      this.pastEvents.unshift(eventLog);
    }
  },
});
