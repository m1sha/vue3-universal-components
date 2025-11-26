<script setup lang="ts">
import { getCurrentInstance, computed } from 'vue'

const { name } = defineProps<{
  name: string
}>()

const parent = getCurrentInstance()?.parent
const modelValue = computed(() => parent?.props.modelValue)
const isSelected = computed(() => modelValue.value === name)

const onClick = () => {
  const oldName = modelValue.value
  parent?.emit('update:modelValue', name)
  parent?.emit('change', name, oldName)
}

</script>
<template>
  <div class="tab" :class="{ 'selected': isSelected }" @click="onClick">
    <slot></slot>
  </div>  
</template>

<style lang="sass">
@use '../../assets/_colors' as colors
@use '../../assets/_sizes' as sizes

.tab
  padding: 8px 16px
  border-bottom: sizes.$border-width solid var(--panel-border)
  cursor: pointer
  min-width: fit-content
  font-size: sizes.$tab-text-size
  &.selected
    border-bottom: sizes.$border-width solid var(--data-accident-color)
    cursor: default
</style>
