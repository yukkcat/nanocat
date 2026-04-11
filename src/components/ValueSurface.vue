<template>
  <component
    :is="tag"
    class="ui-value-surface"
    :class="[
      emphasisClass,
      sizeClass,
      breakClass,
      { 'ui-value-surface-mono': mono },
      resolvedRootClass,
    ]"
  >
    <slot>
      {{ value }}
    </slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { resolveRootClass } from '../presets'

const props = withDefaults(defineProps<{
  value?: string | number
  tag?: string
  mono?: boolean
  size?: 'sm' | 'md'
  emphasis?: 'default' | 'muted'
  breakMode?: 'normal' | 'words' | 'all'
  rootClass?: string
}>(), {
  value: '',
  tag: 'div',
  mono: false,
  size: 'sm',
  emphasis: 'muted',
  breakMode: 'words',
  rootClass: '',
})

const resolvedRootClass = computed(() => resolveRootClass(props.rootClass))

const emphasisClass = computed(() => (
  props.emphasis === 'default'
    ? 'text-foreground'
    : 'text-muted-foreground'
))

const sizeClass = computed(() => (
  props.size === 'md'
    ? 'px-4 py-3 text-sm'
    : ''
))

const breakClass = computed(() => {
  if (props.breakMode === 'all') return 'break-all'
  if (props.breakMode === 'words') return 'break-words'
  return ''
})
</script>
