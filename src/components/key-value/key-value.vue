<script setup lang="ts" generic="T">
import { computed } from 'vue';

const porps = defineProps<{ header: string, value: T }>()

const val = computed(() => {
  const value = porps.value
  if (typeof value === 'undefined' || value === null) {
    return '-'
  }

  if (typeof value === 'number') {
    if (Number.isInteger(value)) return value + ''
    return value.toFixed(2)
  }

  if (value instanceof Date) {
    return value.toDateString()
  }

  return porps.value + ''
})
</script>
<template>
<div class="vue3-uui__ket-value">
  <span>{{ header }}</span>
  <span>{{ val }}</span>
</div>
</template>

<style lang="sass" scoped>
@use '../../assets/_colors' 

.vue3-uui__ket-value
  display: flex
  gap: 8px
  span
    &:first-child
      color: var(--text-secondary-color)
      font-weight: 300
    &:last-child
      color: var(--text-color)
</style>
