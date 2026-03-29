<script setup lang="ts">
import { PushButton } from '../push-button'

export type FromControlHeaderButton = {
  name: string
  caption?: string
  icon?: string
  title?: string
}

defineProps<{ 
  caption: string, 
  icon?: string, 
  boardless?: boolean, 
  collapsible?: boolean,
  buttons?: FromControlHeaderButton[]
}>()

const emit = defineEmits<{ headerButtonClick: [name: string] }>()

</script>
<template>
  <div class="vue3-uui__form-control">
    <div class="vue3-uui__form-control-header">
      <div class="vue3-uui__form-control-header__caption">
        <i v-if="collapsible" class="fa fa-chevron-down"></i>
        <span v-if="icon" :class="icon"></span>
        <span>{{ caption }}</span>
      </div>
      <div class="vue3-uui__form-control-header__buttons">
        <push-button v-for="butt in buttons" @click="emit('headerButtonClick', butt.name)" :title="butt.title">
          <span v-if="butt.icon" :class="butt.icon"></span>
          <span v-if="butt.caption">{{ butt.caption }}</span>
        </push-button>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="sass">
.vue3-uui__form-control
  display: flex
  flex-direction: column
  gap: 4px
  .vue3-uui__form-control-header
    display: flex
    align-items: center
    justify-content: space-between
    gap: 4px
    font-size: 14px
    color: var(--text-header)
    border: 1px solid var(--panel-border)
    background-color: var(--panel-color)
    padding: 4px 8px

    .vue3-uui__form-control-header__caption, .vue3-uui__form-control-header__buttons
      display: flex
      align-items: center
    .vue3-uui__form-control-header__buttons
      justify-content: end

      button
        font-size: 12px
        padding: 2px 4px
        min-width: 16px

</style>