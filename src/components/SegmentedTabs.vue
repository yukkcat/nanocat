<template>
  <div class="ui-segmented" :aria-label="ariaLabel">
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
import type { SegmentedOption, SegmentedValue } from '../types'

defineProps<{
  modelValue: SegmentedValue
  options: SegmentedOption[]
  ariaLabel?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: SegmentedValue): void
}>()
</script>
