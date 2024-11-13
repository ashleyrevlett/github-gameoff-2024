import { defineStore } from 'pinia';
import events from '../data/events.json';
import beliefs from '../data/beliefs.json';
import npcs from '../data/npcs.json';
import { usePlayerStore } from './playerStore';
import { useGameStore } from './gameStore';
import { useNotificationStore } from './notificationStore';

export const useEventStore = defineStore('eventStore', {
  state: () => ({
    events: [],  // messages and phone calls
    eventPool: [],
    todaysEvents: [],
    agendaDecided: null,
    beliefs: [],
    beliefPool: [],
    npcPool: [],
  }),

  actions: {
    initializeEvents() {
      this.eventPool = events; // Load events from events.json into eventPool
      this.beliefPool = beliefs; // Load beliefs from beliefs.json into beliefs
      this.npcPool = npcs; // Load npcs from npcs.json into npcPool
      this.todaysEvents = [];
      this.events = [];
      this.beliefs = [];
      this.agendaDecided = false;
      this.nextTurn(); // begin the first turn
    },

    dismissMessage(uid) {
      this.events = this.events.filter(e => e.uid !== uid);
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
      // const charisma = usePlayerStore().charisma;
      // const faith = usePlayerStore().faith;
      // const scrutiny = usePlayerStore().scrutiny;

      // const possibleEvents = this.eventPool.filter(e => {
      //   // provide variable names so bundler doesn't mangle them in prod builds
      //   const context = { charisma, faith, scrutiny };
      //   const passesCondition = e.condition
      //     ? new Function('charisma', 'faith', 'scrutiny', `return ${e.condition}`)(charisma, faith, scrutiny)
      //     : true;
      //   return passesCondition;
      // });
      // if (!possibleEvents.length) {
      //   console.log('no possibleEvents', eventType);
      //   return;
      // }

      // const possibleEvents = this.eventPool.slice();

      const randomEventIndex = Math.floor(Math.random() * this.eventPool.length);
      const randomEvent = this.eventPool[randomEventIndex];

      if (!randomEvent) {
        console.error('no randomEvent', this.eventPool, randomEventIndex);
        return;
      }

      // setup event, add to events
      // const sendDate = useGameStore().currentDay;
      try {
        console.log('randomEvent', randomEvent);
        console.log(this.events);
        this.events.push({
          ...randomEvent,
          uid: window.crypto.randomUUID(),
          resolution: null,
          // sendDate: sendDate,
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
      const playerStore = usePlayerStore();

      const activeEvent = this.events.find(e => e.uid === eventUid);
      if (!activeEvent) {
        console.error('no activeEvent', eventUid);
        return;
      }

      const choice = activeEvent.choices.find(c => c.id === choiceId);
      if (!choice || !choice.outcome) {
        console.error('no choice or no outcome', choiceId, choice);
        return;
      }

      // do we hold supporting beliefs?
      const outcome = choice.outcome;
      let beliefMultiplier = 1;
      if (choice.beliefs_supported?.length) {
        for (const beliefId of choice.beliefs_supported) {
          const belief = this.beliefPool.find(b => b.id === beliefId);
          if (!belief) {
            console.error('no belief', beliefId);
            return;
          }
          if (this.beliefs.includes(belief)) {
            console.log('belief already held', belief.title);
            beliefMultiplier = 2;
          } else {
            console.log('new belief', belief.title);
            this.beliefs.push(belief); // get a new belief
            outcome.belief = belief.title;
            useNotificationStore().addNotification({
              id: window.crypto.randomUUID(),
              title: 'New Belief',
              message: belief.title,
            });
          }
        }
      }

      if (outcome.charisma) {
        playerStore.modifyCharisma(outcome.charisma * beliefMultiplier);
      }
      if (outcome.faith) {
        playerStore.modifyFaith(outcome.faith * beliefMultiplier);
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
      // message will be removed from events after user dismisses it
    },

    logEvent(event, choice, outcome) {
      var outcomeString = Object.entries(outcome).map(([key, value]) => `${key}: ${value}`).join(', ');
      const eventLog = `${event.title} -- You chose: ${choice.title}. Outcome: ${choice.message} Effect: ${outcomeString}`;
      this.todaysEvents.push({ event, choice, outcome });
      console.log('eventLog', eventLog);
    },

    setAgendaDecided(value) {
      this.agendaDecided = value;
    },

    setAgenda(agenda) {
      let result = '';
      let outcome = {};
      const playerStore = usePlayerStore();
      switch (agenda) {
        case 'worship':
          playerStore.modifyCharisma(10);
          result = 'Worshipped the God of the Church. charisma +10.';
          outcome = { "charisma": 10 }
          break;
        case 'recruit':
          playerStore.modifyCharisma(5);
          result = 'Recruited a new follower. charisma +5.';
          outcome = { "charisma": 5 }
          break;
        case 'purge':
          playerStore.modifyScrutiny(90);
          result = 'Purged a heretic. Scrutiny +90.';
          outcome = { "scrutiny": 90 }
          break;
        case 'pray':
          playerStore.modifyCharisma(5);
          result = 'Prayed for guidance. charisma +5.';
          outcome = { "charisma": 5 }
          break;
      }
      this.todaysEvents.push({ outcome: outcome });
      console.log('result', result);
      return result;
    },

    getNpc(npcId) {
      return this.npcPool.find(npc => npc.id === npcId);
    },
  },
});
