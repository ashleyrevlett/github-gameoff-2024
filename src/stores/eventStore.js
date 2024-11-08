import { defineStore } from 'pinia';
import events from '../data/events.json'
import { usePlayerStore } from './playerStore';
import { useGameStore } from './gameStore';
import { useCharacterStore } from './characterStore';
import { useNotificationStore } from './notificationStore';

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

    dismissMessage(uid) {
      this.activeEvents = this.activeEvents.filter(e => e.uid !== uid);
    },

    handleExpiredEvents() {
      // remove expired events, decrementing expiresIn
      for (const event of this.activeEvents) {
        event.expiresIn--;
        if (event.expiresIn <= 0) {
          // send notification
          useNotificationStore().addNotification({
            id: crypto.randomUUID(),
            notificationType: 'eventExpired',
            object: {...event},
          });
        }
      }
      // remove expired events
      this.activeEvents = this.activeEvents.filter(e => e.expiresIn > 0);
    },

    refreshEvents() {
      console.log('refreshEvents');

      this.handleExpiredEvents();

      // Randomly trigger 1-3 messages
      const numEvents = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < numEvents; i++) {
        this.triggerRandomEvent('message');
      }

      // 60% of the time, trigger 1 phone call if not first turn
      if (Math.random() < 0.6 && useGameStore().turn > 1) {
        this.triggerRandomEvent('phone_call');
      }
    },

    triggerRandomEvent(eventType='message') {
      const possibleEvents = this.eventPool.filter(e => e.type === eventType);
      const randomEventIndex = Math.floor(Math.random() * possibleEvents.length);
      const randomEvent = possibleEvents[randomEventIndex];

      // setup event, add to activeEvents
      const uid = crypto.randomUUID();
      const sendDate = useGameStore().currentDay;
      const potentialSenders = useCharacterStore().contacts.filter(c => c.category === randomEvent.category);
      if (potentialSenders.length > 0) {
        const randomSender = potentialSenders[Math.floor(Math.random() * potentialSenders.length)];
        this.activeEvents.unshift({
          ...randomEvent,
          uid: uid,
          sender: randomSender,
          resolution: null,
          sendDate: sendDate,
        });
      } else {
        console.log('no potential senders for', randomEvent.category);
      }
    },

    resolveEvent(eventUid, choiceId) {
      /*
      Apply the outcome of the choice to the player's stats.
      Remove the event from the active list.
      Log the event to the pastEvents array.
      @return outcome
      */

     const activeEvent = this.activeEvents.find(e => e.uid === eventUid);
      if (!activeEvent) return;

      const playerStore = usePlayerStore();

      const choice = activeEvent.choices.find(c => c.id === choiceId);
      if (playerStore.influencePoints < choice.cost.ip || playerStore.money < choice.cost.money) return;

      // randomly select between positive and negative outcome; 90% likelihood of positive outcome
      const positiveOutcome = Math.random() < 0.8;
      const outcome = positiveOutcome ? choice.outcomes.find(o => o.effect === "positive") : choice.outcomes.find(o => o.effect === "negative");
      if (outcome) {
        playerStore.updateStats(outcome);
        playerStore.modifyInfluencePoints(-choice.cost.ip);
        playerStore.modifyMoney(-choice.cost.money);
        activeEvent.resolution = outcome; // remember the outcome
        this.logEvent(activeEvent, choice, outcome);
        useGameStore().checkWinLose();
      } else {
        console.error('no outcome for choice', choice, eventUid);
      }
    },

    logEvent(event, choice, outcome) {
      const statsChanged = Object.fromEntries(Object.entries(outcome).filter(([key, value]) => key !== 'message'));
      const outcomeString = Object.entries(statsChanged).map(([key, value]) => `${key}: ${value}`).join(', ');
      const eventLog = `${event.title} -- You chose: ${choice.label}. Outcome: ${outcome.message} Effect: ${outcomeString}`;
      this.pastEvents.unshift(eventLog);
      console.log('eventLog', eventLog);
    }
  },
});
