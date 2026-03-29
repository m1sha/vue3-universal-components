<script setup lang="ts" generic="T extends { id: string, name: string, icon?: string }">
import { ref } from 'vue';
import { type TDropMenu, DropMenu } from '../drop-menu'
import { removeItem } from '../../utils/array';

const { multiselect, deselectOnNextClick } =  defineProps<{ items: T[], menu?: TDropMenu, multiselect?: boolean, deselectOnNextClick?: boolean }>()
const model = defineModel<string | string[] | null>()
const emit = defineEmits<{
  click: [item: T, selected: boolean],
  'menu-click': [itemId: string, menuItemName: string]
}>()

const showMenuIndex = ref(-1)

const onMenuClick = (itemId: string, menuItemName: string) => {
  emit('menu-click', itemId, menuItemName)
  showMenuIndex.value = -1
}

const onClick = (item: T, ev: MouseEvent) => {
  if (Array.isArray(model.value)){
    if (multiselect) {
      if (ev.ctrlKey) {
        if (deselectOnNextClick && removeItem(model.value, p => p === item.id)) {
          emit('click', item, false)
          return
        }
        
        model.value.push(item.id)
        emit('click', item, true)
        return
      }

      if (deselectOnNextClick && removeItem(model.value, p => p === item.id)) {
        emit('click', item, false)
        return
      }

      model.value = [item.id]
      emit('click', item, true)
      return
    }
  }

  if (deselectOnNextClick &&  model.value === item.id) {
    model.value = null
    emit('click', item, false)
    return
  }

  model.value = item.id
  emit('click', item, true)
}

const isSelected = (item: T) => {
  if (Array.isArray(model.value)) {
    return model.value.includes(item.id)
  }

  return model.value === item.id
}

</script>

<template>
<ul class="list">
  <li v-for="item, index in items" :key="item.id">
    <div class="list-item" :class="{ selected: isSelected(item) }">
      <div class="list-item-title" @click="onClick(item, $event);">
        <slot name="list-item-title" :item="item">
          <i v-if="item.icon" :class="'fa fa-' + item.icon"></i>
          <span>{{ item.name }}</span>
        </slot>
      </div>
      <div class="list-item-buttons">
        <button 
          v-if="menu"
          @click="showMenuIndex === -1 ? showMenuIndex = index: showMenuIndex = -1">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </button>
        <DropMenu 
          v-if="showMenuIndex === index && menu" 
          :target="item"
          :index="index"
          :count="items.length"
          :menu="menu" 
          @click="name => onMenuClick(item.id, name)"
          />
      </div>
    </div>
    <div class="list-content">
      <slot name="content" :item="item"></slot>
    </div>
  </li>
</ul>
</template>

<style lang="sass">
@use '../../assets/_sizes' as size
@use '../../assets/_colors' 

$list-item-font-size: 12px

.list
  list-style: none
  margin: 0
  padding: 0
.list-item
  display: flex
  gap: 8px
  justify-content: space-between
  align-items: center
  border-radius: 3px
  min-height: 20px
  &:not(:last-child)
    border-bottom: 1px solid var(--panel-border)
  .list-item-title
    display: flex
    gap: 6px
    font-size: $list-item-font-size
    cursor: pointer
    padding-left: 4px
    width: 100%
    //background-color: #889900
  .list-item-buttons
    position: relative
    button
      font-size: $list-item-font-size
      padding: 2px 0px
      background-color: inherit
      border: none
      &:hover
        color: var(--btn-color-hover)
        cursor: pointer

  &.selected
    background-color: var(--data-accident-color)
    .list-item-title
      cursor: default
</style>