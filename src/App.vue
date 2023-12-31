<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <header>
      <div class="flex flex-col items-center text-center">
        <div class="text-3xl">Advent of Code 2023 in Vue and Typescript</div>
        <nav class="mt-8 flex gap-3">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView class="mt-8" />
  </AppLayout>
</template>

<style scoped>
.router-link-active {
  @apply text-yellow-400;
}
</style>
