<script setup lang="ts">
import { ref, useId } from 'vue'
import { LabelProps } from '../label-props'

const model = defineModel<boolean>()
defineProps<{} & LabelProps>()

const id = useId()
const checkbox = ref<HTMLInputElement>()

</script>

<template>
  <div class="vue3-uui__switch">
    <div class="vue3-uui__switch-tracker" @click="checkbox?.click()">
      <input :id="id" type="checkbox" v-model="model" style="opacity: 0; width: 0; padding: 0; margin: 0;" ref="checkbox" />
      <div class="vue3-uui__switch-toggle" ></div>
    </div>
    <label :for="id" v-if="caption">{{ caption }}</label>
  </div>
</template>

<style lang="sass">
  .vue3-uui__switch
    display: flex
    gap: 8px
    align-items: center

    .vue3-uui__switch-tracker 
      background-color: var(--panel-color)
      border: 1px solid var(--panel-border)
      border-radius: 18px
      width: 28px
      display: flex

      &:has(>input:checked) 
        background-color: color-mix(in srgb, var(--panel-color) 85%, var(--data-accident-color) 15%)

      input:checked
        & + .vue3-uui__switch-toggle
          background-color: var(--data-accident-color)
          margin-left: auto
      input:not(:checked)
        & + .vue3-uui__switch-toggle
          background-color: #6f6f6f
          margin-right: auto

      .vue3-uui__switch-toggle
        width: 12px
        height: 12px
        border-radius: 50%
        
</style>