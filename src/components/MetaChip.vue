<template>
  <span class="ui-meta-chip" :class="[toneClasses, sizeClasses.text, sizeClasses.chip, toneClass, chipClass]">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getSizeClasses, getToneClasses } from '../presets'

const props = withDefaults(defineProps<{
  tone?: 'neutral' | 'success' | 'warning' | 'error' | 'info'
  variant?: 'soft' | 'outline' | 'solid'
  size?: 'sm' | 'md'
  toneClass?: string
  chipClass?: string
}>(), {
  tone: 'neutral',
  variant: 'soft',
  size: 'sm',
  toneClass: '',
  chipClass: '',
})

const toneClasses = computed(() => getToneClasses(props.tone, props.variant))
const sizeClasses = computed(() => getSizeClasses(props.size))
</script>
