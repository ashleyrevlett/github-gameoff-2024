<template>
  <main class="h-screen flex flex-col">
    <div class="w-full h-8">
      <button @click="gameStore.pauseTimer" class="pause-button btn">⏸︎</button>
    </div>
    <div id="main-screen" class="p-4">
      <DateHeader />

      <section id="stats">
        <TransitionGroup name="fade">
          <div
            v-if="gameStore.resources.followers.current > 0 || gameStore.resources.faith.level > 3"
            key="followers-section"
            id="followers"
            class="stat-section"
          >
            <span class="block text-xl">{{ Math.floor(gameStore.resources.followers.current) }} Followers</span>
            <span v-if="gameStore.resources.followers.perSecond > 0" class="text-xs text-gray-500">+{{ gameStore.resources.followers.perSecond.toFixed(2) }}/s</span>
          </div>

          <div
            v-if="gameStore.resources.money.current > 0 || gameStore.resources.faith.level > 3"
            key="money-section"
            id="money"
            class="stat-section"
          >
            <span class="block text-base">${{ moneyDisplay }}</span>
            <span v-if="gameStore.resources.money.perSecond > 0" class="text-xs text-gray-500">+${{ gameStore.resources.money.perSecond.toFixed(2) }}/follower</span>
          </div>

          <div
            :class="{ 'invisible': gameStore.resources.faith.level <= 1 && gameStore.resources.faith.current === 0 }"
            key="faith-section"
            id="faith"
            class="stat-section"
          >
            <div class="flex justify-evenly items-end mb-1">
              <p class="text-left flex-1">Faith <span v-if="gameStore.resources.faith.perSecond > 0" class="text-xs text-gray-500">+{{ gameStore.resources.faith.perSecond.toFixed(2) }}/s</span></p>
              <p class="text-right flex-1">
                <span class="inline-block mr-4 text-gray-500 text-xs">{{ Math.round(gameStore.resources.faith.current).toLocaleString() }}/{{ Math.round(gameStore.resources.faith.max).toLocaleString() }}</span>
                <span class="faith-level-stat inline-block"
                  :class="{ 'highlight': notifyLevelUp }"
                >Lvl {{ gameStore.resources.faith.level }}</span>
              </p>
            </div>
            <ProgressBar :highlight="notifyLevelUp" :resource="gameStore.resources.faith" />
          </div>
        </TransitionGroup>
      </section>

      <section id="actions" class="my-5 gap-3 flex flex-col">
        <TransitionGroup name="fade-slide">
          <PlayerAction
            v-for="action in PLAYER_ACTIONS"
            :key="action.name"
            :gameObject="action"
            :action="() => gameStore.doAction(action.name)"
          />
        </TransitionGroup>
      </section>
    </div>
    <Notifications />
  </main>
</template>

<script setup>
import { onMounted, onUnmounted, onBeforeMount, computed, ref } from 'vue';

import DateHeader from '@/components/DateHeader.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import PlayerAction from '@/components/PlayerAction.vue';

import { PLAYER_ACTIONS } from '@/constants';
import { useGameStore } from '@/stores/gameStore';
const gameStore = useGameStore();

import { useNotificationStore } from '@/stores/notificationStore';
const notificationStore = useNotificationStore();

// let animationFrameId;
let intervalId; // Changed from animationFrameId
let lastTime = performance.now()

const moneyDisplay = computed(() => {
  return gameStore.resources.money.current.toFixed(2).toLocaleString();
})

function onTick() {
  const currentTime = performance.now()
  const dt = (currentTime - lastTime) / 1000
  lastTime = currentTime
  gameStore.update(dt)
  // animationFrameId = requestAnimationFrame(onTick) // Request next frame
}

onBeforeMount(() => {
  // do not restart the game if we are coming from the pause screen
  if (localStorage.getItem('gameStore')) {
    gameStore.loadState()
  } else {
    gameStore.startGame()
  }
})

onMounted(() => {
  // animationFrameId = requestAnimationFrame(onTick) // Start animation loop
  intervalId = setInterval(onTick, 1000)
})

onUnmounted(() => {
  // if (animationFrameId) cancelAnimationFrame(animationFrameId); // Clean up
  if (intervalId) clearInterval(intervalId)
})

// level up notifications
import Notifications from '@/components/Notifications.vue';
import { useLevelNotification } from '@/composables/useLevelNotification';
const notifyLevelUp = ref(null)
const onLevelUp = (newLevel, oldLevel) => {
  console.log(`Faith level up from ${oldLevel} to ${newLevel}`)
  notifyLevelUp.value = true
  setTimeout(() => {
    notifyLevelUp.value = false
  }, 1000)
  // notificationStore.addNotification({
  //   id: Date.now(),
  //   title: `Faith Level ${newLevel}`,
  //   message: 'New actions now available.'
  // })
}
useLevelNotification(onLevelUp)

</script>

<style scoped>
.stat-section {
  @apply mb-4 leading-none flex flex-col text-center;
}

.faith-level-stat {
  @apply text-xs transition-all duration-300;

  &.highlight {
    animation: bounceScale 0.5s ease-in-out;
  }
}

@keyframes bounceScale {
  0% {
    transform: scale(1);
    translate: 0 0;
  }
  50% {
    transform: scale(1.1);
    translate: -5% -5%;
  }
  75% {
    transform: scale(0.95);
    translate: -.25% -.25%;
  }
  100% {
    transform: scale(1);
    translate: 0 0;
  }
}

.pause-button {
  @apply text-lg flex-1 ml-auto float-right mb-2 border-0;

  opacity: 0.35;
  &:hover {
    opacity: 1;
  }
}
</style>
