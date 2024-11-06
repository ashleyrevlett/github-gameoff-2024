// /src/stores/eventStore.js
import { defineStore } from 'pinia';
// import tabloidScandalEvent from '../events/tabloidScandalEvent';
// import publicMeltdownEvent from '../events/publicMeltdownEvent';
import events from '../events/events.json'
// import { usePlayerStore } from './playerStore';

export const useEventStore = defineStore('eventStore', {
  state: () => ({
    activeEvent: null,
    eventPool: [],
    pastEvents: [],
  }),

  actions: {
    initializeEvents() {
      this.activeEvent = null;
      // load events from events.json into eventPool
      this.eventPool = events;
      // console.log('eventPool', this.eventPool);
      this.triggerRandomEvent();
    },

    triggerRandomEvent() {
      // Randomly trigger an event (for MVP, we'll pick a single example)
      const randomIndex = Math.floor(Math.random() * this.eventPool.length);
      this.activeEvent = this.eventPool[randomIndex];
      // console.log('triggerRandomEvent', this.activeEvent, randomIndex, this.eventPool);
    },

    resolveEvent(choiceId) {
      // console.log('resolveEvent', choiceId, this.activeEvent);
      if (!this.activeEvent) return;

      const choice = this.activeEvent.choices.find(c => c.id === choiceId);
      if (choice && choice.outcome) {
        const outcome = choice.outcome;
        this.logEvent(this.activeEvent, choice, outcome);
        this.activeEvent = null;
        return outcome;
      }
    },

    logEvent(event, choice, outcome) {
      const outcomeString = Object.entries(outcome).map(([key, value]) => `${key}: ${value}`).join(', ');
      const eventLog = `${event.title} - You chose to ${choice.label}. Effect: ${outcomeString}`;
      this.pastEvents.unshift(eventLog);
    }
  },
});
