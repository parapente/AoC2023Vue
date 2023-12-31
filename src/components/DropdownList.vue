<script setup lang="ts">
defineProps<{
  modelValue?: string
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <select
    class="text-black border-gray-300 focus:border-yellow-500 focus:ring-yellow-500"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
  >
    <slot />
  </select>
</template>
