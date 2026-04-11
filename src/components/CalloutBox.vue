<template>
  <div
    class="ui-callout"
    :class="[toneClasses.wrapper, textClass, resolvedRootClass]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getStateToneClasses, resolveRootClass } from '../presets'
import type { UiSurfaceVariant, UiTone } from '../types'

const props = withDefaults(defineProps<{
  tone?: UiTone
  variant?: UiSurfaceVariant
  size?: 'sm' | 'md'
  rootClass?: string
}>(), {
  tone: 'neutral',
  variant: 'soft',
  size: 'sm',
  rootClass: '',
})

const toneClasses = computed(() => getStateToneClasses(props.tone, props.variant))
const resolvedRootClass = computed(() => resolveRootClass(props.rootClass))
const textClass = computed(() => (
  props.size === 'md'
    ? 'text-sm leading-6'
    : 'text-xs leading-5'
))
</script>
