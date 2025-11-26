<script setup lang="ts">
import { ref } from 'vue';
import type { TDropMenu, TDropMenuItem } from '../drop-menu/drop-menu'
import DropMenu from '../drop-menu/drop-menu.vue'

const { menu } = defineProps<{ menu: TDropMenu, selected?: boolean, disabledMenu?: boolean, title: string }>()
const emit = defineEmits<{'menu-click': [item: TDropMenuItem]}>()
const show = ref(false)
const onTriggerClick = () => { show.value = !show.value}
const onMenuClick = (name: string) => { 
  emit('menu-click', menu.items.find(p => p.name === name)!)
  show.value = false 
}

</script>

<template>
  <div class="dropdownbutton">
    <button :title="title" :class="{ selected: selected }"><slot></slot></button>
    <button @click.stop="onTriggerClick" class="dropdownbutton-toggle" title="Options" :disabled="disabledMenu"><i class="fa fa-chevron-down"></i></button>
    <DropMenu v-if="show" :menu="menu" :target="{}" :index="-1" :count="-1" @click="onMenuClick"  />
  </div>
</template>

<style lang="sass">
@use '../../assets'

.dropdownbutton
  position: relative
  display: flex
  button
    margin: 0
    border: 0
    &:first-of-type
      border-right: 0
      border-top-right-radius: 0
      border-bottom-right-radius: 0
      &.selected
        background-color: var(--data-accident-color)
    &:last-of-type
      border-left: 0
      border-top-left-radius: 0
      border-bottom-left-radius: 0
      max-width: 24px !important

  .drop-menu 
    top: 32px
</style>