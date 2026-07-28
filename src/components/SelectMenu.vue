<template>
  <div ref="root" class="relative" :class="usesTriggerWidth ? 'inline-block' : ''">
    <button
      ref="trigger"
      type="button"
      class="flex items-center justify-between gap-2 text-foreground hover:border-primary"
      :class="triggerClass"
      :title="currentLabel"
      :aria-label="ariaLabel || currentLabel"
      :aria-controls="menuId"
      aria-haspopup="listbox"
      :aria-expanded="open"
      :disabled="disabled"
      @click="toggle"
      @keydown="keyboard.handleTriggerKeydown"
    >
      <span class="min-w-0 flex-1 truncate">{{ currentLabel }}</span>
      <svg aria-hidden="true" viewBox="0 0 20 20" class="h-4 w-4 shrink-0" fill="currentColor">
        <path d="M5 7l5 6 5-6H5z" />
      </svg>
    </button>
  </div>

  <Teleport to="body">
    <div
      v-if="open"
      :id="menuId"
      ref="menu"
      class="ui-floating-panel ui-menu-panel fixed z-[1000] space-y-1"
      :style="menuStyle"
      role="listbox"
      :aria-multiselectable="multiple ? 'true' : undefined"
      @keydown="keyboard.handleMenuKeydown"
    >
      <button
        v-for="option in normalizedOptions"
        :key="option.value"
        type="button"
        class="ui-menu-item"
        :class="[
          isSelected(option.value) ? 'ui-menu-item-active' : 'text-muted-foreground',
          option.disabled ? 'cursor-not-allowed opacity-50' : '',
        ]"
        :disabled="option.disabled"
        :aria-selected="isSelected(option.value)"
        data-menu-item
        role="option"
        @click="select(option.value)"
        @keydown.enter.prevent="select(option.value)"
        @keydown.space.prevent="select(option.value)"
      >
        <span class="min-w-0 flex-1 truncate">{{ option.label }}</span>
        <span v-if="isSelected(option.value) && indicatorMode === 'text'" class="shrink-0 text-xs">{{ selectedIndicatorText }}</span>
        <svg
          v-else-if="isSelected(option.value) && indicatorMode === 'check'"
          aria-hidden="true"
          viewBox="0 0 20 20"
          class="h-3.5 w-3.5 shrink-0"
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
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import type { CSSProperties } from 'vue'
import { useFloatingPanel } from '../composables/useFloatingPanel'
import { useMenuKeyboard } from '../composables/useMenuKeyboard'
import { useNanocatLocale } from '../i18n'
import type { MenuPlacement, SelectOption } from '../types'

const props = withDefaults(defineProps<{
  modelValue: string | string[]
  options: Array<string | SelectOption>
  multiple?: boolean
  placeholder?: string
  placement?: MenuPlacement
  autoWidth?: boolean
  width?: 'full' | 'trigger'
  variant?: 'default' | 'toolbar'
  size?: 'sm' | 'md'
  selectedIndicator?: 'check' | 'text' | 'none'
  disabled?: boolean
  ariaLabel?: string
  maxVisibleLabels?: number
  selectedIndicatorText?: string
  selectedCountText?: string
}>(), {
  multiple: false,
  placement: 'down',
  autoWidth: false,
  width: 'full',
  variant: 'default',
  size: 'sm',
  selectedIndicator: undefined,
  disabled: false,
  ariaLabel: '',
  maxVisibleLabels: 3,
  selectedIndicatorText: '',
  selectedCountText: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | string[]): void
}>()

const open = ref(false)
const root = ref<HTMLElement | null>(null)
const trigger = ref<HTMLButtonElement | null>(null)
const menu = ref<HTMLElement | null>(null)
const menuId = `nanocat-select-menu-${useId()}`
const locale = useNanocatLocale()

const normalizedOptions = computed<SelectOption[]>(() =>
  props.options.map((option) =>
    typeof option === 'string' ? { label: option, value: option } : option
  )
)

const variant = computed(() => props.variant || 'default')
const usesTriggerWidth = computed(() => props.width === 'trigger' || props.autoWidth || variant.value === 'toolbar')
const triggerBaseClass = computed(() => props.size === 'md' ? 'ui-input-md' : 'ui-input-sm')
const triggerClass = computed(() => [
  triggerBaseClass.value,
  usesTriggerWidth.value ? 'w-auto min-w-0' : 'w-full',
  props.disabled ? 'cursor-not-allowed opacity-60 hover:border-input hover:text-foreground' : '',
])
const indicatorMode = computed(() => {
  if (props.selectedIndicator) return props.selectedIndicator
  return variant.value === 'toolbar' ? 'none' : 'check'
})
const visibleLabelLimit = computed(() => props.maxVisibleLabels ?? 3)
const selectedIndicatorText = computed(() => props.selectedIndicatorText || locale.selectMenuSelectedIndicatorText)
const selectedCountText = computed(() => props.selectedCountText || locale.selectMenuSelectedCountText)
const defaultPlaceholder = computed(() => locale.selectMenuPlaceholder)

const currentLabel = computed(() => {
  if (props.multiple) {
    const values = Array.isArray(props.modelValue) ? props.modelValue : []
    if (!values.length) return props.placeholder || defaultPlaceholder.value
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
  if (!rawValue.trim()) return props.placeholder || defaultPlaceholder.value
  return rawValue
})

const floating = useFloatingPanel(open, trigger, menu, {
  placement: () => props.placement,
})
const menuStyle = computed<CSSProperties>(() => ({
  ...floating.panelStyle.value,
  ...(usesTriggerWidth.value
    ? { minWidth: `${Math.min(floating.position.value.triggerWidth, floating.position.value.maxWidth ?? floating.position.value.triggerWidth)}px` }
    : { width: `${Math.min(floating.position.value.triggerWidth, floating.position.value.maxWidth ?? floating.position.value.triggerWidth)}px` }),
}))
const keyboard = useMenuKeyboard({
  open,
  trigger,
  panel: menu,
  openMenu,
  closeMenu,
})

async function openMenu() {
  await floating.present()
}

function closeMenu() {
  floating.dismiss()
}

function toggle() {
  if (props.disabled) return
  if (open.value) {
    closeMenu()
    return
  }
  void openMenu()
}

function isSelected(value: string) {
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.includes(value)
  }
  return props.modelValue === value
}

function select(value: string) {
  const option = normalizedOptions.value.find((item) => item.value === value)
  if (option?.disabled) return

  if (props.multiple) {
    const current = Array.isArray(props.modelValue) ? props.modelValue : []
    const exists = current.includes(value)
    const next = exists ? current.filter((item) => item !== value) : [...current, value]
    emit('update:modelValue', next)
    return
  }

  keyboard.closeAndRestoreFocus()
  emit('update:modelValue', value)
}

function handlePointerDown(event: PointerEvent) {
  if (!open.value || floating.containsTarget(event.target as Node | null)) return
  closeMenu()
}

watch(() => props.disabled, (disabled) => {
  if (disabled && open.value) closeMenu()
})

onMounted(() => {
  document.addEventListener('pointerdown', handlePointerDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handlePointerDown)
})
</script>
