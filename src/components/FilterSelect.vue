<template>
  <div class="shrink-0">
    <SelectMenu
      :model-value="modelValue"
      :options="options"
      :multiple="multiple"
      :placeholder="placeholder"
      :placement="placement"
      variant="toolbar"
      :size="size"
      :selected-indicator="selectedIndicator"
      :selected-indicator-text="selectedIndicatorText"
      :selected-count-text="selectedCountText"
      :disabled="disabled"
      :aria-label="ariaLabel"
      @update:model-value="emit('update:modelValue', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import SelectMenu from './SelectMenu.vue'
import type { SelectOption } from '../types'

withDefaults(defineProps<{
  modelValue: string | string[]
  options: Array<string | SelectOption>
  multiple?: boolean
  placeholder?: string
  placement?: 'up' | 'down'
  size?: 'sm' | 'md'
  selectedIndicator?: 'check' | 'text' | 'none'
  selectedIndicatorText?: string
  selectedCountText?: string
  disabled?: boolean
  ariaLabel?: string
}>(), {
  multiple: false,
  placeholder: '',
  placement: 'down',
  size: 'sm',
  selectedIndicator: 'none',
  selectedIndicatorText: '',
  selectedCountText: '',
  disabled: false,
  ariaLabel: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | string[]): void
}>()
</script>
