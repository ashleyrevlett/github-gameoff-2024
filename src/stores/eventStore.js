import { defineStore } from 'pinia';
import events from '../data/events.json'
import { usePlayerStore } from './playerStore';
import { useGameStore } from './gameStore';
import { useNotificationStore } from './notificationStore';

export const useEventStore = defineStore('eventStore', {
  state: () => ({
    activeEvents: [],  // messages and phone calls
    eventPool: [],
    todaysEvents: [],
    agendaDecided: null,
  }),

  actions: {
    initializeEvents() {
      this.eventPool = events; // Load events from events.json into eventPool
      this.todaysEvents = [];
      this.activeEvents = [];
      this.agendaDecided = false;
      this.nextTurn(); // begin the first turn
    },

    dismissMessage(uid) {
      this.activeEvents = this.activeEvents.filter(e => e.uid !== uid);
    },

    nextTurn() {
      console.log('refreshEvents');

      this.todaysEvents = [];

      // Randomly trigger 1-3 messages
      const numEvents = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < numEvents; i++) {
        this.triggerRandomEvent();
      }

      // reset agendaDecided
      this.agendaDecided = false; //
    },

    triggerRandomEvent() {
      // conditions need charisma, money, and scrutiny to be defined
      const charisma = usePlayerStore().charisma;
      const faith = usePlayerStore().faith;
      const scrutiny = usePlayerStore().scrutiny;

      const possibleEvents = this.eventPool.filter(e => {
        // provide variable names so bundler doesn't mangle them in prod builds
        const context = { charisma, faith, scrutiny };
        const passesCondition = e.condition
          ? new Function('charisma', 'faith', 'scrutiny', `return ${e.condition}`)(charisma, faith, scrutiny)
          : true;
        return passesCondition;
      });
      if (!possibleEvents.length) {
        console.log('no possibleEvents', eventType);
        return;
      }

      const randomEventIndex = Math.floor(Math.random() * possibleEvents.length);
      const randomEvent = possibleEvents[randomEventIndex];

      if (!randomEvent) {
        console.error('no randomEvent', eventType, possibleEvents, randomEventIndex);
        return;
      }

      // setup event, add to activeEvents
      const sendDate = useGameStore().currentDay;
      try {
        console.log('randomEvent', randomEvent);
        console.log(this.activeEvents);
        this.activeEvents.push({
          ...randomEvent,
          uid: window.crypto.randomUUID(),
          resolution: null,
          sendDate: sendDate,
        });
      } catch (error) {
        console.error('error adding event', error);
      }
    },

    resolveEvent(eventUid, choiceId) {
      /*
      Apply the outcome of the choice to the player's stats.
      Remove the event from the active list.
      Log the event to the pastEvents array.
      @return outcome
      */

      console.log('resolveEvent', eventUid, choiceId);

     const activeEvent = this.activeEvents.find(e => e.uid === eventUid);
      if (!activeEvent) return;

      const playerStore = usePlayerStore();

      const choice = activeEvent.choices.find(c => c.id === choiceId);
      if (choice?.outcome) {
        const outcome = choice.outcome;
        if (outcome.charisma) {
          playerStore.modifyCharisma(outcome.charisma);
        }
        if (outcome.faith) {
          playerStore.modifyFaith(outcome.faith);
        }
        if (outcome.scrutiny) {
          playerStore.modifyScrutiny(outcome.scrutiny);
        }
        if (outcome.money) {
          playerStore.modifyMoney(outcome.money);
        }

        activeEvent.resolution = choice; // remember the outcome
        this.logEvent(activeEvent, choice, outcome);
        useGameStore().checkWinLose();
        // message will be removed from activeEvents after user dismisses it
      } else {
        console.error('no outcome for choice', choice, eventUid);
      }
    },

    logEvent(event, choice, outcome) {
      const outcomeString = Object.entries(outcome).map(([key, value]) => `${key}: ${value}`).join(', ');
      const eventLog = `${event.title} -- You chose: ${choice.title}. Outcome: ${choice.message} Effect: ${outcomeString}`;
      this.todaysEvents.push(eventLog);
      console.log('eventLog', eventLog);
    },

    setAgendaDecided(value) {
      this.agendaDecided = value;
    },

    setAgenda(agenda) {
      var result = '';
      const playerStore = usePlayerStore();
      switch (agenda) {
        case 'worship':
          playerStore.modifyCharisma(10);
          result = 'Worshipped the God of the Church. charisma +10.';
          break;
        case 'recruit':
          playerStore.modifyCharisma(5);
          result = 'Recruited a new follower. charisma +5.';
          break;
        case 'purge':
          playerStore.modifyCharisma(-1);
          result = 'Purged a heretic. charisma -1.';
          break;
        case 'pray':
          playerStore.modifyCharisma(5);
          result = 'Prayed for guidance. charisma +5.';
          break;
      }
      this.todaysEvents.push(result);
      console.log('result', result);
      return result;
    },
  },
});
