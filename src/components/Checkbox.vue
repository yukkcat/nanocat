<template>
  <label
    class="relative inline-flex items-center gap-2"
    :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
  >
    <input
      ref="inputRef"
      type="checkbox"
      class="sr-only peer"
      :checked="modelValue"
      :disabled="disabled"
      :aria-label="ariaLabel || undefined"
      :aria-checked="ariaChecked"
      @change="onChange"
    />
    <span
      class="relative flex h-4 w-4 shrink-0 items-center justify-center rounded border border-border bg-background text-transparent transition-colors
             peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground
             peer-indeterminate:border-primary peer-indeterminate:bg-primary peer-indeterminate:text-primary-foreground
             peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background
             peer-disabled:opacity-50"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 20 20"
        class="absolute h-3.5 w-3.5"
        :class="modelValue ? 'opacity-100' : 'opacity-0'"
        fill="currentColor"
      >
        <path d="M7.6 13.2 4.4 10l1.2-1.2 2 2 6-6 1.2 1.2-7.2 7.2z" />
      </svg>
      <svg
        viewBox="0 0 20 20"
        class="absolute h-3.5 w-3.5"
        :class="isIndeterminate ? 'opacity-100' : 'opacity-0'"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-width="2"
      >
        <path d="M5.5 10h9" />
      </svg>
    </span>
    <span v-if="$slots.default" class="text-xs text-muted-foreground peer-disabled:opacity-50">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: boolean
  disabled?: boolean
  indeterminate?: boolean
  ariaLabel?: string
}>(), {
  disabled: false,
  indeterminate: false,
  ariaLabel: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const isIndeterminate = computed(() => props.indeterminate && !props.modelValue)
const ariaChecked = computed<'mixed' | boolean>(() => (
  isIndeterminate.value ? 'mixed' : props.modelValue
))

function syncIndeterminate() {
  if (inputRef.value) inputRef.value.indeterminate = isIndeterminate.value
}

onMounted(syncIndeterminate)
watch(isIndeterminate, syncIndeterminate, { flush: 'post' })

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  target.indeterminate = false
  emit('update:modelValue', target.checked)
}
</script>
