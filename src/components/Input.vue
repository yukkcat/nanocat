<template>
  <input
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :class="[baseClass, block ? 'w-full' : '', resolvedRootClass]"
    @input="handleInput"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { resolveRootClass } from '../presets'

const props = withDefaults(defineProps<{
  modelValue?: string | number
  type?: 'text' | 'password' | 'email' | 'url' | 'search' | 'number'
  placeholder?: string
  size?: 'sm' | 'md'
  disabled?: boolean
  readonly?: boolean
  block?: boolean
  rootClass?: string
}>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  size: 'sm',
  disabled: false,
  readonly: false,
  block: false,
  rootClass: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const baseClass = computed(() => props.size === 'md' ? 'ui-input-md' : 'ui-input-sm')
const resolvedRootClass = computed(() => resolveRootClass(props.rootClass))

function handleInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>
