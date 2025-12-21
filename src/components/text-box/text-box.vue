<script setup lang="ts" generic="T extends string | number">
import { ref } from 'vue';
import { uuidv4 } from '../../utils/uuidv4'
import { type LabelProps } from '../label-props'

const modelValue = defineModel<T>({ required: true })
defineProps<{ type?: 'text' | 'password' | 'number', search?: boolean, placeholder?: string } & LabelProps>()
const controlId = ref('tb_' + uuidv4())
</script>

<template>
  <div class="vue3-uui__textbox">
    <label :for="controlId" v-if="caption">{{ caption }}</label>
    <div class="vue3-uui__input-wrapper">
      <input :id="controlId" :type="type? type :'text'" v-model="modelValue" :placeholder="placeholder"  :style="{ paddingLeft: search ? '18px' : '4px' }" />
      <i v-if="search" class="fa fa-magnifying-glass"></i>
    </div>
  </div>
</template>

<style lang="sass">
@use '../../assets/_base-control' as control

.vue3-uui__textbox
  @include control.flex-container()
  .vue3-uui__input-wrapper
    position: relative
    input
      width: auto
    i
      position: absolute
      z-index: 1
      left: 0
      font-size: 0.8em
      top: 8px
      color: #888
</style>