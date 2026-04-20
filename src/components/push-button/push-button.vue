<script setup lang="ts">
defineProps<{
  size?: 'normal' | 'big' | 'small',
  loading?: boolean
}>()
</script>

<template>
  <button class="vue3-uui__push-button push-button" :class="{ size }">
    <slot></slot>
  </button>
</template>

<style lang="sass">
</style>