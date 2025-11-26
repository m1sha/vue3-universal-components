<template>
  <div class="vue3_unico__toolbar">
    <slot></slot>
  </div>
</template>

<style lang="sass">
.vue3_unico__toolbar
  width: 100%
  display: flex
  

  .control-list
    flex-direction: row

  button
    max-width: 32px
</style>