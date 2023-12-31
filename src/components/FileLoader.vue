<script setup lang="ts">
import { useFileDialog, useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'

const props = defineProps<{
  storageKey: string
}>()

const { files, open, reset, onChange } = useFileDialog({
  multiple: false
})

const storage = useLocalStorage<string>(props.storageKey, null)

onChange((files) => {
  if (files === null || files.length === 0) {
    return
  }
  const file = files[0]

  const reader = new FileReader()
  reader.onload = () => {
    storage.value = reader.result as string
  }
  reader.readAsText(file)
})

const resetFile = () => {
  reset()
  storage.value = null
}

const isFileLoaded = computed(() => storage.value !== null)
</script>

<template>
  <div class="flex gap-3 items-center p-2 border">
    <button class="px-3 py-2 bg-green-400 hover:bg-green-600 text-black" @click="open()">
      Load file
    </button>
    <button
      class="px-3 py-2 bg-red-400 hover:bg-red-600 disabled:bg-gray-500 text-black"
      :disabled="!files && !isFileLoaded"
      @click="resetFile"
    >
      Reset
    </button>
    <div v-if="isFileLoaded" class="text-yellow-500">Data loaded in memory</div>
  </div>
</template>
