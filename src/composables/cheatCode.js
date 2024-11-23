import { ref, onMounted, onUnmounted } from 'vue'

export function useCheatCode() {
  const sequence = ['ArrowLeft', 'ArrowLeft', 'ArrowRight', 'ArrowRight']
  const currentSequence = ref([])

  const checkSequence = () => {
    const current = currentSequence.value.join(',')
    const target = sequence.join(',')

    if (current === target) {
      // Reset the sequence and emit the event
      currentSequence.value = []
      return true
    }

    // If sequence is longer than target, remove oldest entry
    if (currentSequence.value.length > sequence.length) {
      currentSequence.value.shift()
    }

    return false
  }

  const handleKeydown = (event) => {
    // Reset the sequence if the escape key is pressed
    if (event.key === 'Escape') {
      currentSequence.value = []
      return
    }

    // Only track arrow keys
    if (!event.key.startsWith('Arrow')) return

    currentSequence.value.push(event.key)
    if (checkSequence()) {
      window.dispatchEvent(new CustomEvent('cheatcode-activated'))
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })

  return {
    isCheatActivated: checkSequence
  }
}