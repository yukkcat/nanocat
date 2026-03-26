<template>
  <div class="grid gap-2.5" :class="gridClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    columns?: 1 | 2 | 3 | 4
  }>(),
  {
    columns: 1,
  }
)

const gridClass = computed(() => {
  if (props.columns === 4) return 'grid-cols-2 md:grid-cols-4'
  if (props.columns === 3) return 'grid-cols-1 md:grid-cols-3'
  if (props.columns === 2) return 'grid-cols-1 md:grid-cols-2'
  return 'grid-cols-1'
})
</script>
