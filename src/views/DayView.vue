<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import router from '@/router/index'

const DayComponent = defineAsyncComponent(
  () => import(`../components/day/DayComponent${router.currentRoute.value.params.day}.vue`)
)
</script>

<template>
  <div class="flex flex-col">
    <div class="text-lg">--- Day {{ $route.params.day }} ---</div>
    <DayComponent />
  </div>
</template>
