<script setup lang="ts" generic="T extends { id: string }">
defineProps<{
  headers?: string[],
  columnCount?: number,
  noHeaders?: boolean,
  rows: T[]
}>()
</script>

<template>
<div class="grid-table" :style="{ gridTemplateColumns: `repeat(${headers?.length ?? columnCount ?? 0}, 1fr)`}">
  <div v-if="noHeaders !== true" class="grid-table-header" v-for="header, columnIndex in headers">
    <slot :header :columnIndex>
      {{ header }}
    </slot>
  </div>

  <template v-for="row, rowIndex in rows">
    <div class="grid-table-cell" v-for="header, columnIndex in headers ?? columnCount">
      <slot name="row" :row :header :rowIndex :columnIndex></slot>
    </div>
  </template>
</div>
</template>

<style lang="sass" scoped>
.grid-table
  display: grid

  .grid-table-header, .grid-table-cell
    padding: 2px

  .grid-table-header
    border-bottom: 1px solid #444
    color: #aaa
</style>