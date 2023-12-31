<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import router from '@/router/index'
import DayNotImplementedError from '@/components/errors/DayNotImplementedError.vue'

const formattedDay = (day: string) => {
  return String(day).padStart(2, '0')
}

const currentDay = () => {
  if (Array.isArray(router.currentRoute.value.params.day)) {
    return router.currentRoute.value.params.day[0]
  }

  return router.currentRoute.value.params.day
}

const DayComponent = defineAsyncComponent({
  loader: () => import(`../components/day/DayComponent${formattedDay(currentDay())}.vue`),
  errorComponent: DayNotImplementedError
})
</script>

<template>
  <div class="flex flex-col">
    <div class="text-lg">--- Day {{ $route.params.day }} ---</div>
    <DayComponent />
  </div>
</template>
