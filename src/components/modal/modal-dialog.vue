<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  show: boolean,
  title?: string,
  icon?: string,
  size?: 'full-screen' | 'normal',
  hiddenHeader?: boolean
  footerAlignCenter?: boolean
  overflow?: 'scroll' | 'auto' }>(), {
    show: false,
    title: 'Modal Window',
    overflow: 'auto',
    size: 'normal',
    hiddenHeader: false,
    footerAlignCenter: false
  })
const emit = defineEmits(['closed', 'opening'])
const dialog = ref<HTMLDialogElement | null>()

onMounted(() => toggle())
watch(() => props.show, () => { toggle() })

const toggle = () => {
  if (!dialog.value) return

  if (props.show) {
    emit('opening')
    dialog.value.showModal()
    return
  }

  dialog.value.close()
}
</script>

<template>
  <Teleport to="body">
<dialog ref="dialog" class="modal-dialog" :class="size">
    <div class="modal-header" v-if="!hiddenHeader">
      <div class="caption">
        <i v-if="icon" :class="icon"></i>
       <span>{{ title }}</span>
      </div>
      <div class="close-button">
        <button class="link" @click="emit('closed')"><i class="fa fa-times"></i></button>
      </div>
    </div>

    <div class="modal-body" :class="size">
      <div class="modal-body-content" :class="overflow">
        <slot name="body"></slot>
      </div>

    </div>


    <div class="modal-footer" :class="footerAlignCenter ? 'center': 'right'">
      <slot name="footer"></slot>
    </div>

  </dialog>
</Teleport>
</template>

<style lang="sass">
@use '../../assets/_colors' as colors
.modal-dialog
  padding: 8px
  border-radius: 8px
  background-color: var(--data-page-bg-color)
  border: 1px solid #303030
  box-shadow: 1px 2px 20px #1a1a1a
  color: #f0f0f0
  position: relative
  overflow: visible

  &.full-screen
    width: 95vw
    height: 90vh

  .modal-header
    padding: 12px 0
    font-size: 21px
    color: #e0e0e0
    border-bottom: 1px solid #434343
    display: flex
    justify-content: space-between
    .caption
      i
        margin-right: 8px

  .modal-body
    flex: 1
    &.full-screen
      height: calc(100% - 112px)
      .modal-body-content
        height: calc(100% - 19px)
        &.scroll
          overflow-y: scroll

  .modal-footer
    display: flex
    
    margin-top: 12px
    &.right
      justify-content: right
    &.center 
      justify-content: center
    *
      margin-left: 8px

    button
      min-width: 80px
      &.success
        background-color: var(--data-accident-color)
        border-color: color-mix(in srgb, var(--data-accident-color), #111)
        &:disabled
          background-color: color-mix(in srgb, var(--data-accident-color), #666)
          color: color-mix(in srgb, var(--text-color), #888)

  .modal-alert-message
    max-width: 20vw
    padding: 18px
    text-align: center
    font-size: 1.2em
    line-height: 1.5em

dialog::backdrop
  background-color: rgba($color: #333, $alpha: 0.9)

</style>

