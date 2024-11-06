// /src/stores/eventStore.js
import { defineStore } from 'pinia';
// import tabloidScandalEvent from '../events/tabloidScandalEvent';
// import publicMeltdownEvent from '../events/publicMeltdownEvent';
import events from '../events/events.json'
import { usePlayerStore } from './playerStore';

export const useEventStore = defineStore('eventStore', {
  state: () => ({
    activeEvents: [],  // Deferred-choice messages shown to the player
    eventPool: [],
    pastEvents: [],
  }),

  actions: {
    initializeEvents() {
      this.eventPool = events; // Load events from events.json into eventPool
      this.refreshEvents(); // populate activeEvents
    },

    refreshEvents() {
      this.activeEvents = [];
      const numEvents = Math.floor(Math.random() * 4) + 2; // Random number between 2 and 5
      for (let i = 0; i < numEvents; i++) {
        this.triggerRandomEvent();
      }
    },

    triggerRandomEvent() {
      // Randomly trigger an event
      const i = Math.floor(Math.random() * this.eventPool.length);
      const event = this.eventPool[i];
      // Generate a unique ID for this event instance
      const uid = crypto.randomUUID();
      this.activeEvents.push({ ...event, id: uid });
    },

    resolveEvent(eventId, choiceId) {
      /*
      Apply the outcome of the choice to the player's stats.
      Remove the event from the active list.
      Log the event to the pastEvents array.
      */
      const activeEvent = this.activeEvents.find(e => e.id === eventId);
      if (!activeEvent) return;

      const choice = activeEvent.choices.find(c => c.id === choiceId);
      if (choice && choice.outcome) {
        usePlayerStore().updateStats(choice.outcome);
        this.logEvent(activeEvent, choice);
        this.activeEvents = this.activeEvents.filter(e => e.id !== eventId);
      }
    },

    logEvent(event, choice) {
      const outcome = choice.outcome;
      const outcomeString = Object.entries(outcome).map(([key, value]) => `${key}: ${value}`).join(', ');
      const eventLog = `${event.title} - You chose to ${choice.label}. Effect: ${outcomeString}`;
      this.pastEvents.unshift(eventLog);
    }
  },
});
