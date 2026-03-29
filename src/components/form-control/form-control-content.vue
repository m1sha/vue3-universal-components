<script setup lang="ts">
defineProps<{ row?: boolean }>()
</script>

<template>
  <div class="vue3-uui__form-control-content" :style="{ flexDirection: row ? 'row' : 'column' }">
    <slot></slot>
  </div>
</template>

<style lang="sass">
  .vue3-uui__form-control-content
    padding: 4px 8px

    display: flex
    flex-direction: column
    gap: 12px
</style>