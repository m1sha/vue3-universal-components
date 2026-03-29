<script setup lang="ts">
import { ref } from 'vue';
export type UploadFileTrigger = { open: () => void }

defineProps<{multiple?: boolean}>()

const emit = defineEmits<{ change: [files: File[]] }>()
const fileUpload = ref<HTMLInputElement>()

function onChange () {
  if (!fileUpload.value) return
  if (!fileUpload.value.files) return
  const files: File[] = []
  
  for (let i = 0; i < fileUpload.value.files.length; i++) 
    files.push(fileUpload.value.files[i])
  
  emit('change', files)
}

defineExpose({
  open: () => fileUpload.value?.click()
})


</script>

<template>
<input type="file" :multiple="multiple" class="vue3-uui__upload-file" @change="onChange" ref="fileUpload"/>
</template>

<style lang="sass">
  .vue3-uui__upload-file
    display: none
    margin: 0
    padding: 0
    width: 0
    height: 0

</style>