<script setup lang="ts">
import { ref } from 'vue'
import { LabelProps } from '../label-props'
import { uuidv4 } from '../../utils/uuidv4'

defineModel<number>()
defineProps<{ min: number, max: number, step: number } & LabelProps>()
const controlId = ref('ddl_' + uuidv4())

const getValue = (ev: Event): number => {
  const val = +(ev.target as HTMLInputElement).value
  return isNaN(val) ? 0 : val
}

const calPos = (val: number, min: number, max: number) => {
  const r = (val - min) / ((max - min) / 100) + '%'
  return `calc(${r} - var(--w) / 2)`
}

const isEdit = ref(false)

</script>
<template>
  <div class="vue3_unico__tracker">
    <label :for="controlId" v-if="caption">{{ caption }}</label>

    <div class="tracker-wrapeer"> 
      
      <div class="tracker-label">
        <div v-if="(modelValue || 0) < max" class="current" style="position: absolute;" :style="{ left: calPos(modelValue || 0, min, max)  }" >
          <span v-if="!isEdit" @click="isEdit=true">{{ modelValue }}</span>
          <input v-if="isEdit" :value="modelValue" 
            @blur="$emit('update:modelValue', getValue($event)); isEdit=false"  
            @keydown.enter="$emit('update:modelValue', getValue($event)); isEdit=false"
            />
        </div>
        <div>{{ min }}</div>
        <div :class="{ current: modelValue == max  }">{{ max }}</div>
      </div>
      <input :id="controlId" type="range" :min="min" :max="max" :step="step" :value="modelValue" @input="$emit('update:modelValue', getValue($event))"  />
    </div>
  </div>
</template>

<style lang="sass">
.vue3_unico__tracker
  display: flex
  flex-direction: column
  gap: 8px
  .tracker-wrapeer
    display: flex
    flex-direction: column
    gap: 4px
    .tracker-label
      display: flex
      justify-content: space-between
      position: relative
      input
        field-sizing: content
        padding: 0
        margin: 0
        border: 0
        outline: none
        color: var(--text-secondary-color)
        background-color: transparent
        font-size: 0.9em
      div
        font-size: 0.6em
        color: var(--text-secondary-color)
        &.current
          background-color: var(--panel-color)
          padding: 0 4px
          --w: 2px
</style>