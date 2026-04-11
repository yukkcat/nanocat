<template>
  <div class="flex items-center justify-between gap-3" :class="wrapperClass">
    <div class="min-w-0">
      <p class="ui-card-title" :class="sizeClasses.title">{{ title }}</p>
      <p v-if="description" class="ui-card-description mt-1" :class="sizeClasses.description">{{ description }}</p>
    </div>
    <div v-if="$slots.actions" class="flex shrink-0 items-center gap-2">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getSectionSizeClasses } from '../presets'

const props = withDefaults(
  defineProps<{
    title: string
    description?: string
    variant?: 'divider' | 'plain'
    size?: 'sm' | 'md'
    compact?: boolean
  }>(),
  {
    description: '',
    variant: 'divider',
    size: 'sm',
    compact: false,
  }
)

const sizeClasses = computed(() => getSectionSizeClasses(props.size))
const wrapperClass = computed(() => {
  if (props.compact || props.variant === 'plain') return ''
  return `${sizeClasses.value.spacing} border-b border-border/70`
})
</script>
