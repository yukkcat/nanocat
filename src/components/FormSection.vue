<template>
  <div :class="[panelClassName, resolvedRootClass]">
    <div v-if="title || description || $slots['title-extra']" class="mb-2.5">
      <div v-if="title || $slots['title-extra']" class="flex items-center justify-between gap-2">
        <p v-if="title" class="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{{ title }}</p>
        <slot name="title-extra" />
      </div>
      <p v-if="description" class="mt-1 text-xs text-muted-foreground">{{ description }}</p>
    </div>
    <div :class="bodyClass">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { resolveRootClass } from '../presets'
import type { UiSize, UiSurfaceVariant } from '../types'

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    bodyClass?: string
    variant?: UiSurfaceVariant
    size?: UiSize
    rootClass?: string
    panelClass?: string
  }>(),
  {
    title: '',
    description: '',
    bodyClass: 'space-y-3',
    variant: 'soft',
    size: 'sm',
    rootClass: '',
    panelClass: '',
  }
)

const panelClassName = computed(() => {
  if (props.variant === 'outline') {
    return props.size === 'md'
      ? 'rounded-2xl border border-border bg-transparent p-4'
      : 'rounded-xl border border-border bg-transparent p-3'
  }

  return props.size === 'md'
    ? 'rounded-2xl border border-border bg-card p-4'
    : 'rounded-xl border border-border bg-card p-3'
})
const resolvedRootClass = computed(() => resolveRootClass(props.rootClass, props.panelClass))
</script>
