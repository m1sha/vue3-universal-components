<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ title?: string }>()

const emit = defineEmits<{ 
  (e: 'change', file: File ): void }
>()

const uploadFile = ref<HTMLInputElement>()
const onClick = () => {
  uploadFile.value?.click()
}
const onFileChoose = () => {
  if (!uploadFile.value) return
  if (!uploadFile.value.files) return
  const file = uploadFile.value.files[0]
  if (!file) return
  emit('change', file)
}

</script>

<template>
  <button :title="title" @click="onClick"><slot></slot></button>
  <input type="file" ref="uploadFile" style="display: none;" @change="onFileChoose" />
</template>