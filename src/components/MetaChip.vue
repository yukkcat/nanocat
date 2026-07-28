<template>
  <span
    class="ui-meta-chip"
    :class="[
      toneClasses,
      sizeClasses.text,
      sizeClasses.chip,
      radiusClass,
      strong ? '!font-semibold' : '',
      bordered ? '' : '!border-transparent',
      toneClass,
      chipClass,
    ]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getChipRadiusClass, getChipSizeClasses, getToneClasses } from '../presets'
import type { ChipRadius, ChipSize } from '../types'

const props = withDefaults(defineProps<{
  tone?: 'neutral' | 'success' | 'warning' | 'error' | 'info'
  variant?: 'soft' | 'outline' | 'solid'
  size?: ChipSize
  radius?: ChipRadius
  bordered?: boolean
  strong?: boolean
  toneClass?: string
  chipClass?: string
}>(), {
  tone: 'neutral',
  variant: 'soft',
  size: 'sm',
  radius: 'pill',
  bordered: true,
  strong: false,
  toneClass: '',
  chipClass: '',
})

const toneClasses = computed(() => getToneClasses(props.tone, props.variant))
const sizeClasses = computed(() => getChipSizeClasses(props.size))
const radiusClass = computed(() => getChipRadiusClass(props.radius))
</script>
