<script setup lang="ts">
import { PushButton } from '../push-button';

defineProps<{ buttons: { name: string, title: string, icon?: string }[] }>()
const modelValue = defineModel<string>()
const emit = defineEmits<{ click: [name: string ]}>()
</script>

<template>
  <div class="vue3-uui__radio-group">
    <template v-for="button in buttons">
      
      <PushButton :title="button.title" :class="{ selected: modelValue === button.name }" @click="modelValue = button.name; emit('click', button.name)">
        <i v-if="button.icon" :class="button.icon"></i>
        <span v-else>{{ button.name }}</span>
        <input type="radio" v-model="modelValue" style="display: none;">
      </PushButton>
    </template>
  </div>
</template>

<style lang="sass">
.vue3-uui__radio-group
  display: flex
  gap: 4px
  flex-wrap: wrap
  width: 100%
</style>