<script setup lang="ts" generic="T">
import { computed } from 'vue'
import type { TDropMenu } from './drop-menu'

const props = defineProps<{ menu: TDropMenu, target: T, index: number, count: number }>()
const emit = defineEmits<{click: [ name: string ]}>()

const items = computed(() => props.menu.filter ? props.menu.filter(props.target, props.index, props.count) : props.menu.items) 
</script>

<template>
  <div class="drop-menu">
    <div class="content">
      <ul>
        <li v-for="item in items"  @click.stop="emit('click', item.name)" :key="item.name" :title="item.title">
          
          <a v-if="!item.type || item.type === 'link'" href="javascript:void(0)">
            <i v-if="item.icon" :class="'fa fa-'+item.icon"></i>
            <span>{{ item.text }}</span>
          </a>

          <template v-else-if="item.type === 'checkbox'">
            <div class="checkbox-block">
              <input type="checkbox" :checked="item.selected" />
              <label>{{ item.text }}</label>
            </div>
            
          </template>

          
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="sass">
@use '../../assets/_colors' 

$menu-item-font-size: 0.75rem

.drop-menu 
  position: absolute
  z-index: 1
  right: 0
  .content
    width: clamp(6vw, 120px, 10vw) 
    border: 1px solid var(--panel-border)
    background-color: var(--panel-color)
    padding: 4px
    box-shadow: 0px 1px 12px #111
  ul
    list-style: none
    padding: 0
    margin: 0
    li
      padding: 2px
      &:not(:last-child)
        border-bottom: 1px solid var(--panel-border)
      
      a
        color: var(--btn-color)
        text-decoration: none
        font-size: $menu-item-font-size
        display: flex
        gap: 8px
        align-items: center
        padding: 2px
        border-radius: 4px
      .checkbox-block
        display: flex
        align-items: center
        gap: 2px
        label
          color: var(--btn-color)
          font-size: $menu-item-font-size
      &:hover
        background-color: var(--data-accident-color)
</style>