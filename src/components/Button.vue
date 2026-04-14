<template>
  <component
    :is="tag"
    class="ui-btn"
    :class="[sizeClass, variantClass, layoutClass, stateClass, resolvedRootClass]"
    v-bind="mergedAttrs"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { resolveRootClass } from '../presets'
import type { ButtonSize, ButtonVariant } from '../types'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  tag?: string | object
  type?: 'button' | 'submit' | 'reset'
  size?: ButtonSize
  variant?: ButtonVariant
  disabled?: boolean
  iconOnly?: boolean
  block?: boolean
  rootClass?: string
}>(), {
  tag: 'button',
  type: 'button',
  size: 'sm',
  variant: 'outline',
  disabled: false,
  iconOnly: false,
  block: false,
  rootClass: '',
})

const attrs = useAttrs()
const isNativeButton = computed(() => props.tag === 'button')

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

const stateClass = computed(() => (
  !isNativeButton.value && props.disabled
    ? 'pointer-events-none cursor-not-allowed opacity-60'
    : ''
))

const componentProps = computed(() => ({
  type: isNativeButton.value ? props.type : undefined,
  disabled: isNativeButton.value ? props.disabled : undefined,
  'aria-disabled': !isNativeButton.value && props.disabled ? 'true' : undefined,
  tabindex: !isNativeButton.value && props.disabled ? -1 : undefined,
}))

const mergedAttrs = computed(() => ({
  ...attrs,
  ...componentProps.value,
}))

const resolvedRootClass = computed(() => resolveRootClass(props.rootClass))

function handleClick(event: MouseEvent) {
  if (!isNativeButton.value && props.disabled) {
    event.preventDefault()
    event.stopPropagation()
  }
}
</script>
