<script setup lang="ts">
import { ref, watch } from 'vue'
import DropdownList from './DropdownList.vue'
import router from '@/router/index'

const daySelected = ref('none')
watch(daySelected, (val) => {
  if (val === 'none') {
    return
  }

  router.push(`/day/${val}`)
})
</script>

<template>
  <div>
    <DropdownList v-model="daySelected">
      <option value="none" disabled="true">Please select</option>
      <option v-for="day in 25" :value="day" :key="day">{{ day }}</option>
    </DropdownList>
  </div>
</template>
