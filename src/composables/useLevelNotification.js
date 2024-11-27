import { watch, computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { useNotificationStore } from '@/stores/notificationStore'

export function useLevelNotification(onLevelUp) {
  const gameStore = useGameStore()
  const notificationStore = useNotificationStore()

  const faithLevel = computed(() => {
    return gameStore.resources.faith?.level
  })

  watch(faithLevel, (newLevel, oldLevel) => {
    // Only show notification if this is a level up (not initial load)
    if (oldLevel && newLevel > oldLevel) {
      // Call the callback function if provided
      if (onLevelUp) {
        onLevelUp(newLevel, oldLevel)
      } else {
        // default notification
        const notification = {
          id: Date.now(),
          title: `Faith Level ${newLevel}`,
          message: 'New actions now available.'
        }
        notificationStore.addNotification(notification)
      }
    }
  })
}
