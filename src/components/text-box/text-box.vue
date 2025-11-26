<script setup lang="ts" generic="T extends string | number">
import { ref } from 'vue';
import { uuidv4 } from '../../utils/uuidv4'
import { type LabelProps } from '../label-props'

const modelValue = defineModel<T>({ required: true })
defineProps<{ type?: 'text' | 'password' | 'number' } & LabelProps>()
const controlId = ref('tb_' + uuidv4())
</script>

<template>
  <div class="textbox">
    <label :for="controlId" v-if="caption">{{ caption }}</label>
    <input :id="controlId" :type="type? type :'text'" v-model="modelValue"  />
  </div>
</template>

<style lang="sass">
@use '../../assets/_base-control' as control

.textbox
  @include control.flex-container()

  input
    width: auto
</style>