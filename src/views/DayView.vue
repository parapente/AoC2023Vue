<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import DayNotImplementedError from '@/components/errors/DayNotImplementedError.vue'
import { currentDayFromRoute } from '@/utils'

const formattedDay = (day: string) => {
  return String(day).padStart(2, '0')
}

const DayComponent = defineAsyncComponent({
  loader: () => import(`../components/day/DayComponent${formattedDay(currentDayFromRoute())}.vue`),
  errorComponent: DayNotImplementedError
})
</script>

<template>
  <div class="flex flex-col">
    <div class="text-lg">--- Day {{ $route.params.day }} ---</div>
    <DayComponent />
  </div>
</template>
