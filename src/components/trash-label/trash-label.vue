<script setup lang="ts">
  
</script>

<template>
<div class="trash-label">
  <div class="text"><slot></slot></div>  <i class="fa fa-arrow-right"></i> <i class="fa fa-trash"></i>
</div>
</template>

<style lang="sass" scoped>
.trash-label
  display: flex
  align-items: center
  justify-content: center
  gap: 16px
  background-color: #353535
  padding: 18px 32px
  border-radius: 6px
  i
    &:first-child
      font-size: 10px
    &:last-child
      font-size: 24px
</style>