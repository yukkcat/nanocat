<template>
  <div ref="root" class="relative" :class="usesTriggerWidth ? 'inline-block' : ''">
    <button
      ref="trigger"
      type="button"
      class="ui-input-sm flex items-center justify-between gap-2 text-foreground hover:border-primary"
      :class="triggerClass"
      :title="currentLabel"
      :aria-label="ariaLabel || currentLabel"
      :disabled="disabled"
      @click="toggle"
    >
      <span class="truncate">{{ currentLabel }}</span>
      <svg aria-hidden="true" viewBox="0 0 20 20" class="h-4 w-4" fill="currentColor">
        <path d="M5 7l5 6 5-6H5z" />
      </svg>
    </button>
  </div>

  <Teleport to="body">
    <div
      v-if="open"
      ref="menu"
      class="ui-floating-panel fixed z-[1000] space-y-1"
      :style="menuStyle"
    >
      <button
        v-for="option in normalizedOptions"
        :key="option.value"
        type="button"
        class="ui-menu-item"
        :class="[
          isSelected(option.value) ? 'bg-accent text-accent-foreground' : 'text-muted-foreground',
          option.disabled ? 'cursor-not-allowed opacity-50' : '',
        ]"
        :disabled="option.disabled"
        @click="select(option.value)"
      >
        <span>{{ option.label }}</span>
        <span v-if="isSelected(option.value) && indicatorMode === 'text'" class="text-xs">{{ selectedIndicatorText }}</span>
        <svg
          v-else-if="isSelected(option.value) && indicatorMode === 'check'"
          aria-hidden="true"
          viewBox="0 0 20 20"
          class="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5 10.5l3 3 7-7" />
        </svg>
      </button>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import type { SelectOption } from '../types'

/**
 * SelectMenu has two intended layouts:
 * 1) default/full-width for forms and grid filters
 * 2) toolbar-style trigger width for short compact filters
 * `variant="toolbar"` is the preferred public API.
 * `autoWidth` is kept as a compatibility alias.
 * In trigger-width mode, the button follows content width and the popup is at least as wide as the trigger.
 * selectedIndicator controls whether the selected option shows a marker:
 * - check: compact checkmark, good default for labeled controls
 * - none: cleaner for toolbar filters
 * - text: explicit OK text when a stronger confirmation style is desired
 */
const props = defineProps<{
  modelValue: string | string[]
  options: Array<string | SelectOption>
  multiple?: boolean
  placeholder?: string
  placement?: 'up' | 'down'
  autoWidth?: boolean
  width?: 'full' | 'trigger'
  variant?: 'default' | 'toolbar'
  selectedIndicator?: 'check' | 'text' | 'none'
  disabled?: boolean
  ariaLabel?: string
  maxVisibleLabels?: number
  selectedIndicatorText?: string
  selectedCountText?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | string[]): void
}>()

const open = ref(false)
const root = ref<HTMLElement | null>(null)
const trigger = ref<HTMLButtonElement | null>(null)
const menu = ref<HTMLElement | null>(null)
const menuPosition = ref({ top: 0, left: 0, width: 0 })

const normalizedOptions = computed<SelectOption[]>(() =>
  props.options.map((option) =>
    typeof option === 'string' ? { label: option, value: option } : option
  )
)
const variant = computed(() => props.variant || 'default')
const usesTriggerWidth = computed(() => props.width === 'trigger' || props.autoWidth || variant.value === 'toolbar')
const triggerClass = computed(() => [
  usesTriggerWidth.value ? 'w-auto min-w-0' : 'w-full',
  props.disabled ? 'cursor-not-allowed opacity-60 hover:border-input hover:text-foreground' : '',
])
const indicatorMode = computed(() => {
  if (props.selectedIndicator) return props.selectedIndicator
  return variant.value === 'toolbar' ? 'none' : 'check'
})
const visibleLabelLimit = computed(() => props.maxVisibleLabels ?? 3)
const selectedIndicatorText = computed(() => props.selectedIndicatorText || 'Selected')
const selectedCountText = computed(() => props.selectedCountText || 'selected')

const defaultPlaceholder = 'Select'

const currentLabel = computed(() => {
  if (props.multiple) {
    const values = Array.isArray(props.modelValue) ? props.modelValue : []
    if (!values.length) return props.placeholder || defaultPlaceholder
    if (values.length <= visibleLabelLimit.value) {
      return values
        .map((value) => normalizedOptions.value.find((option) => option.value === value)?.label || value)
        .join(' / ')
    }
    return `${values.length} ${selectedCountText.value}`
  }

  const rawValue = props.modelValue == null ? '' : String(props.modelValue)
  const match = normalizedOptions.value.find((option) => String(option.value) === rawValue)
  if (match) return match.label
  if (!rawValue.trim()) return props.placeholder || defaultPlaceholder
  return rawValue
})

const menuStyle = computed(() => ({
  top: `${menuPosition.value.top}px`,
  left: `${menuPosition.value.left}px`,
  ...(usesTriggerWidth.value
    ? { minWidth: `${menuPosition.value.width}px` }
    : { width: `${menuPosition.value.width}px` }),
}))

const updateMenuPosition = () => {
  if (!trigger.value) return

  const rect = trigger.value.getBoundingClientRect()
  const width = rect.width
  const spacing = 8
  const padding = 8

  let left = rect.left
  let top = rect.bottom + spacing

  if (props.placement === 'up' && menu.value) {
    top = rect.top - menu.value.offsetHeight - spacing
  }

  const maxLeft = window.innerWidth - width - padding
  left = Math.min(Math.max(left, padding), Math.max(padding, maxLeft))

  if (menu.value) {
    const maxTop = window.innerHeight - menu.value.offsetHeight - padding
    top = Math.min(Math.max(top, padding), Math.max(padding, maxTop))
  } else {
    top = Math.max(top, padding)
  }

  menuPosition.value = { top, left, width }
}

const openMenu = async () => {
  open.value = true
  await nextTick()
  updateMenuPosition()
  requestAnimationFrame(updateMenuPosition)
}

const closeMenu = () => {
  open.value = false
}

const toggle = () => {
  if (props.disabled) return
  if (open.value) {
    closeMenu()
    return
  }
  void openMenu()
}

const isSelected = (value: string) => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.includes(value)
  }
  return props.modelValue === value
}

const select = (value: string) => {
  const option = normalizedOptions.value.find((item) => item.value === value)
  if (option?.disabled) return

  if (props.multiple) {
    const current = Array.isArray(props.modelValue) ? props.modelValue : []
    const exists = current.includes(value)
    const next = exists ? current.filter((item) => item !== value) : [...current, value]
    emit('update:modelValue', next)
    return
  }

  emit('update:modelValue', value)
  closeMenu()
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node
  if (root.value?.contains(target)) return
  if (menu.value?.contains(target)) return
  closeMenu()
}

const handleViewportChange = () => {
  if (!open.value) return
  updateMenuPosition()
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeyDown)
  window.addEventListener('resize', handleViewportChange)
  window.addEventListener('scroll', handleViewportChange, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('resize', handleViewportChange)
  window.removeEventListener('scroll', handleViewportChange, true)
})
</script>
