<template>
  <div class="shrink-0">
    <SelectMenu
      :model-value="modelValue"
      :options="options"
      :multiple="multiple"
      :placeholder="placeholder"
      :placement="placement"
      auto-width
      :selected-indicator="selectedIndicator"
      @update:model-value="emit('update:modelValue', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import SelectMenu from './SelectMenu.vue'

type Option = { label: string; value: string }

withDefaults(defineProps<{
  modelValue: string | string[]
  options: Array<string | Option>
  multiple?: boolean
  placeholder?: string
  placement?: 'up' | 'down'
  selectedIndicator?: 'check' | 'text' | 'none'
}>(), {
  multiple: false,
  placeholder: '',
  placement: 'down',
  selectedIndicator: 'none',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | string[]): void
}>()
</script>
