<template>
  <button
    :type="type"
    class="ui-btn"
    :class="[sizeClass, variantClass, layoutClass, resolvedRootClass]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { resolveRootClass } from '../presets'
import type { ButtonSize, ButtonVariant } from '../types'

const props = withDefaults(defineProps<{
  type?: 'button' | 'submit' | 'reset'
  size?: ButtonSize
  variant?: ButtonVariant
  disabled?: boolean
  iconOnly?: boolean
  block?: boolean
  rootClass?: string
}>(), {
  type: 'button',
  size: 'sm',
  variant: 'outline',
  disabled: false,
  iconOnly: false,
  block: false,
  rootClass: '',
})

const sizeClass = computed(() => {
  if (props.iconOnly) {
    return props.size === 'xs' ? 'ui-btn-icon-sm' : 'ui-btn-icon'
  }

  if (props.size === 'xs') return 'ui-btn-xs'
  if (props.size === 'md') return 'ui-btn-md'
  return 'ui-btn-sm'
})

const variantClass = computed(() => {
  if (props.variant === 'primary') return 'ui-btn-primary'
  if (props.variant === 'danger') return 'ui-btn-danger'
  return 'ui-btn-outline'
})

const layoutClass = computed(() => [
  props.block ? 'w-full' : '',
  props.iconOnly ? 'p-0' : '',
])

const resolvedRootClass = computed(() => resolveRootClass(props.rootClass))
</script>
