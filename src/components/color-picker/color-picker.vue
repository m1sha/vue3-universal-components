<script setup lang="ts">
import { ref } from 'vue'
import { LabelProps } from '../label-props'
import { uuidv4 } from '../../utils/uuidv4'

defineModel<string>()
defineProps<LabelProps>()

const controlId = ref('ddl_' + uuidv4())

const picker = ref<HTMLInputElement>()
</script>

<template>
  <div class="vue3_unico__color-picker">
    <label :for="controlId" v-if="caption">{{ caption }}</label>
    <div class="color-picker-wrapper">
      <div class="color-preview" :style="{ backgroundColor: modelValue }" @click="picker?.click()"></div>
      <input :id="controlId" type="color" :value="modelValue" ref="picker" @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"></input>
    </div>
  </div>
  
</template>

<style lang="sass">
.vue3_unico__color-picker
  display: flex
  gap: 6px
  align-items: center
  flex-direction: row-reverse
  justify-content: flex-end
  position: relative

  .color-picker-wrapper
    display: flex
    align-items: center
  
  .color-preview
    width: 20px
    height: 20px
    border-radius: 2px
  input[type='color']
    opacity: 0
    width: 0
    height: 0
    padding: 0
    margin: 0

</style>