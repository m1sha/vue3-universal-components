<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, reactive, ref } from 'vue'
import type { DroplistOption } from './option'
import { DropDownList } from './drop-down-list'
import { type LabelProps } from '../label-props'
import { uuidv4 } from '../../utils/uuidv4'

export type DropDownListProps = {
  items: DroplistOption[]
} & LabelProps

const model = defineModel<string>()
const props = defineProps<DropDownListProps>()
const list = reactive(new DropDownList(props, model))
const elements = ref<Element[]>([])
const controlId = ref('ddl_' + uuidv4())

list.onOpen = async () => {
await nextTick()
  elements.value.forEach((el, i) => {
    if (!el.classList.contains('selected')) return
    const e = el as HTMLDivElement
    e.scrollIntoView({
      behavior: 'instant',
      block: 'start'
    })
  })
}

onMounted(() => {
  list.init()
})
onUnmounted (() => list.dispose())

</script>
<template>
  <div class="dropdown">

    <label :for="controlId" v-if="caption">{{ caption }}</label>
    
    <select v-model="model">
      <option v-for="item in items" :value="item.id" :key="item.id">{{ item.name }}</option>
    </select>
    
    <div class="dropdown-input">
      <button @click.stop="list.tigger()" class="dropdown-caption">
        <div class="caption">
            <template v-if="list.selected">
            <img v-if="list.selected.image" :src="'data:image/png;base64,' + list.selected.image" height="18" width="auto" />
            <span>{{ list.selected.name }}</span>
          </template>
          <i v-else></i>
        </div>
        <i class="fa fa-chevron-down dropdown-trigger" :style="{ transform: list.isOpen ? 'rotateX(180deg)' : '' }"></i>
      </button>
    </div>

    <div class="dropdown-list-wrapper" :style="{ display: list.isOpen ? 'block': 'none' }">
      <div class="abs">
        <div class="dropdown-list">
          <div class="dropdown-list-item" :ref="el => {if (el) elements.push(el as Element) }" :class="{ selected: item.id === model }" v-for="item in items" :key="item.id" @click="list.select(item.id)">
            <div class="image-block" v-if="item.image" >
              <img :src="'data:image/png;base64,' + item.image" height="18" width="auto" />
            </div>
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>  
    </div>
    
  </div>
</template>
<style lang="sass">

@use '../../assets' as *

.dropdown
  @include flex-container()
  .dropdown-input
    button.dropdown-caption
      outline-style: none
      display: flex
      justify-content: space-between
      gap: 4px
      color: var(--text-color)
      background-color: var(--background-color)
      border: 1px solid var(--panel-border)
      border-radius: 0
      padding: 4px
      margin: 0
      width: 100%
      height: 26px
      
      &:active
        transform: scale(1)
      .caption
        display: flex
        gap: 8px
        align-items: center
      .dropdown-trigger
        transition: transform 0.3s ease-in-out
      


  .dropdown-list-wrapper
    position: relative
    
    .abs
      width: 100%
      position: absolute
      z-index: 1
      
    .dropdown-list
      background-color: var(--panel-color)
      border: 1px solid var(--panel-border)
      max-height: 200px
      overflow-y: auto
      scroll-margin-top: 8px
      box-shadow: 0 10px 30px 12px #333
      .dropdown-list-item
        padding: 4px 2px
        cursor: pointer
        border-bottom: 1px dashed color-mix(in srgb, var(--panel-border), #2f2f2f)
        display: flex
        gap: 8px
        font-size: .8em
        &.selected
          background-color: color-mix(in srgb, var(--data-accident-color), #3f3f3f)
        &:hover
          background-color: color-mix(in srgb, var(--panel-color), #2f2f2f)
        .image-block
          display: flex
          justify-content: center
          align-items: center
          min-width: 18px
          img
            opacity: 0.8

        

  select
    display: none
    
</style>