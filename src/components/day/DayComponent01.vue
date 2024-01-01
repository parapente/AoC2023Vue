<script setup lang="ts">
import { currentDayFromRoute } from '@/utils'
import { nextTick, ref, type Ref } from 'vue'
import { useWebWorkerFn } from '@vueuse/core'
import FileLoader from '@/components/FileLoader.vue'
import ShowWorkerStatus from '@/components/ShowWorkerStatus.vue'
import { part1 } from '@/solutions/01a'
import { part2 } from '@/solutions/01b'
import TimerDisplay from '../TimerDisplay.vue'

const storageKey = `AoC2023_day${currentDayFromRoute()}_data`

const answer1: Ref<number | null> = ref(null)
const answer2: Ref<number | null> = ref(null)

const worker1 = useWebWorkerFn<typeof part1>(part1, {
  timeout: 50000
})

const worker2 = useWebWorkerFn<typeof part2>(part2, {
  timeout: 50000
})

const startPart1 = async () => {
  await nextTick()
  answer1.value = await worker1.workerFn(storageKey)
}

const startPart2 = async () => {
  await nextTick()
  answer2.value = await worker2.workerFn()
}
</script>

<template>
  <div class="mt-4">
    <FileLoader :storageKey="storageKey" />
    <div class="mt-4 flex items-center gap-3">
      <div class="font-bold">Part1:</div>
      <button class="px-3 py-2 bg-blue-500 hover:bg-blue-700 text-black" @click="startPart1">
        Get answer
      </button>
      <div v-if="worker1.workerStatus.value === 'RUNNING'">
        <TimerDisplay :enabled="worker1.workerStatus.value === 'RUNNING'" />
      </div>
      <ShowWorkerStatus :workerStatus="worker1.workerStatus.value" />
      <button
        v-if="worker1.workerStatus.value === 'RUNNING'"
        @click="worker1.workerTerminate('PENDING')"
      >
        Stop
      </button>
      <div v-if="answer1" class="font-bold text-yellow-500">Answer: {{ answer1 }}</div>
    </div>
    <div class="mt-4 flex items-center gap-3">
      <div class="font-bold">Part2:</div>
      <button class="px-3 py-2 bg-blue-500 hover:bg-blue-700 text-black" @click="startPart2">
        Get answer
      </button>
      <div v-if="worker2.workerStatus.value === 'RUNNING'">
        <TimerDisplay :enabled="worker2.workerStatus.value === 'RUNNING'" />
      </div>
      <ShowWorkerStatus :workerStatus="worker2.workerStatus.value" />
      <button
        v-if="worker2.workerStatus.value === 'RUNNING'"
        @click="worker2.workerTerminate('PENDING')"
      >
        Stop
      </button>
      <div v-if="answer2" class="font-bold text-yellow-500">Answer: {{ answer2 }}</div>
    </div>
  </div>
</template>
