<script setup lang="ts">
import { ref, watch } from 'vue'
import DropdownList from './DropdownList.vue'
import router from '@/router/index'

const day = ref('none')
watch(day, (val) => {
  if (val === 'none') {
    return
  }

  router.push(`/day/${val}`)
})
</script>

<template>
  <div>
    <DropdownList v-model="day">
      <option value="none" disabled="true">Please select</option>
      <option value="01">01</option>
    </DropdownList>
  </div>
</template>
