// /src/stores/eventStore.js
import { defineStore } from 'pinia';
import tabloidScandalEvent from '../events/tabloidScandalEvent';
import publicMeltdownEvent from '../events/publicMeltdownEvent';

export const useEventStore = defineStore('eventStore', {
  state: () => ({
    activeEvent: null,
    events: [tabloidScandalEvent, publicMeltdownEvent],
    pastEvents: [],
  }),

  actions: {
    initializeEvents() {
      this.activeEvent = null;
    },

    triggerRandomEvent() {
      // Randomly trigger an event (for MVP, we'll pick a single example)
      const randomIndex = Math.floor(Math.random() * this.events.length);
      this.activeEvent = this.events[randomIndex];
    },

    resolveEvent(choiceId) {
      console.log('resolveEvent', choiceId, this.activeEvent);
      if (!this.activeEvent) return;

      const choice = this.activeEvent.choices.find(c => c.id === choiceId);
      if (choice && choice.outcome) {
        const outcome = choice.outcome();
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
