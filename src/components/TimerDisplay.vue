<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    enabled: boolean
    reset?: boolean
  }>(),
  {
    reset: false
  }
)

const counter = ref(0)

let interval = 0

const start = () => {
  interval = setInterval(() => {
    counter.value++
  }, 1000)
}

const stop = () => {
  if (interval !== 0) {
    clearInterval(interval)
  }
}

const resetCounter = () => {
  stop()
  counter.value = 0
}

const formatElapsedTime = (elapsed: number) => {
  const minutes = Math.floor(elapsed / 60)
  const seconds = elapsed % 60
  return `${minutes}:${seconds.toFixed(0).padStart(2, '0')}`
}

watch(
  () => props.enabled,
  (enabled) => {
    console.log('Here! Enabled: ', enabled)
    if (enabled) {
      start()
    } else {
      stop()
    }
  }
)

watch(
  () => props.reset,
  (reset) => {
    if (reset) {
      resetCounter()
    }
  }
)

if (props.enabled) {
  start()
}

onUnmounted(() => {
  if (interval !== 0) {
    clearInterval(interval)
  }
})
</script>

<template>
  <div>
    {{ formatElapsedTime(counter) }}
  </div>
</template>
