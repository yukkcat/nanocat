<template>
  <div class="ui-segmented" :class="`ui-segmented--${fit}`" :aria-label="ariaLabel">
    <button
      v-for="option in options"
      :key="String(option.value)"
      type="button"
      class="ui-segmented-btn"
      :class="modelValue === option.value ? 'ui-segmented-btn-active' : ''"
      :disabled="option.disabled"
      @click="emit('update:modelValue', option.value)"
    >
      <span>{{ option.label }}</span>
      <span v-if="option.count !== undefined" class="ui-segmented-count">
        {{ option.count }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { SegmentedFit, SegmentedOption, SegmentedValue } from '../types'

withDefaults(defineProps<{
  modelValue: SegmentedValue
  options: SegmentedOption[]
  ariaLabel?: string
  fit?: SegmentedFit
}>(), {
  fit: 'content',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: SegmentedValue): void
}>()
</script>
