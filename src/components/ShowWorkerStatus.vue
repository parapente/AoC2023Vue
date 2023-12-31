<script setup lang="ts">
import type { WebWorkerStatus } from '@vueuse/core'

const props = defineProps<{
  workerStatus: WebWorkerStatus
}>()
</script>

<template>
  <div>
    <div v-if="workerStatus === 'PENDING'"></div>
    <div v-else-if="workerStatus === 'RUNNING'" class="text-white font-bold">RUNNING</div>
    <div v-else-if="workerStatus === 'SUCCESS'" class="text-green-500">SUCCESS</div>
    <div v-else-if="workerStatus === 'ERROR'" class="text-red-600">ERROR</div>
    <div v-else-if="workerStatus === 'TIMEOUT_EXPIRED'" class="text-red-600">TIMEOUT-EXPIRED</div>
    <div v-else>!!UNKNOWN!!</div>
  </div>
</template>
