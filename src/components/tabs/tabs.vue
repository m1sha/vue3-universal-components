<script setup lang="ts">

defineProps<{
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', tabName: string): void,
  (e: 'change', newTabName: string, oldTabName: string): void
}>()

</script>

<template>
  <div class="tabs">
    <slot></slot>
    <div class="last-item"></div>
  </div>  
</template>

<style lang="sass">
@use '../../assets/_colors' as colors
@use '../../assets/_sizes' as sizes

.tabs
  display: flex
  .tab + .last-item 
    border-bottom: sizes.$border-width solid var(--panel-border)
    width: 100%
</style>