<template>
  <div
    class="relative"
    :class="block ? 'block w-full' : 'inline-block'"
  >
    <button
      ref="trigger"
      type="button"
      class="ui-input-sm ui-select-trigger grouped-select-trigger"
      :class="block ? 'grouped-select-trigger--block' : ''"
      :title="currentLabel"
      :aria-label="ariaLabel || currentLabel"
      :aria-controls="menuId"
      aria-haspopup="listbox"
      :aria-expanded="open"
      :disabled="disabled"
      @click="toggle"
      @keydown="keyboard.handleTriggerKeydown"
    >
      <span class="min-w-0 flex-1 truncate" :class="valueAlignmentClass">{{ currentLabel }}</span>
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
      class="ui-floating-panel ui-menu-panel grouped-select-menu fixed"
      :style="menuStyle"
      role="listbox"
      :aria-multiselectable="multiple ? 'true' : undefined"
      @keydown="keyboard.handleMenuKeydown"
    >
      <div v-for="group in resolvedGroups" :key="groupKey(group)" class="grouped-select-section">
        <div
          v-if="showGroupLabels && group.label"
          class="grouped-select-heading"
          :class="`grouped-select-heading--${groupLabelAlign}`"
        >
          <i v-if="groupLabelAlign !== 'left'" aria-hidden="true" />
          <span>{{ group.label }}</span>
          <i v-if="groupLabelAlign !== 'right'" aria-hidden="true" />
        </div>
        <button
          v-for="option in group.options"
          :key="option.value"
          type="button"
          class="ui-menu-item grouped-select-option"
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
          <svg
            v-if="isSelected(option.value) && selectedIndicator === 'check'"
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
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import type { CSSProperties } from 'vue'
import { useFloatingPanel } from '../composables/useFloatingPanel'
import { useMenuKeyboard } from '../composables/useMenuKeyboard'
import { useNanocatLocale } from '../i18n'
import { OVERLAY_LAYER } from '../layers'
import type { GroupedSelectGroup, GroupedSelectOption, MenuPlacement } from '../types'

const props = withDefaults(defineProps<{
  modelValue: string | string[]
  groups?: GroupedSelectGroup[]
  options?: GroupedSelectOption[]
  multiple?: boolean
  placeholder?: string
  disabled?: boolean
  ariaLabel?: string
  maxVisibleLabels?: number
  selectedCountText?: string
  selectedIndicator?: 'check' | 'none'
  showGroupLabels?: boolean
  groupLabelAlign?: 'left' | 'center' | 'right'
  valueAlign?: 'left' | 'center' | 'right'
  placement?: MenuPlacement
  block?: boolean
}>(), {
  groups: () => [],
  options: () => [],
  multiple: false,
  placeholder: '',
  disabled: false,
  ariaLabel: '',
  maxVisibleLabels: 3,
  selectedCountText: '',
  selectedIndicator: 'check',
  showGroupLabels: true,
  groupLabelAlign: 'left',
  valueAlign: 'left',
  placement: 'auto',
  block: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | string[]): void
}>()

const open = ref(false)
const trigger = ref<HTMLButtonElement | null>(null)
const menu = ref<HTMLElement | null>(null)
const menuId = `nanocat-grouped-select-menu-${useId()}`
const locale = useNanocatLocale()

const resolvedGroups = computed<GroupedSelectGroup[]>(() => {
  if (props.groups?.length) return props.groups
  if (props.options?.length) return [{ options: props.options }]
  return []
})

const flatOptions = computed(() => resolvedGroups.value.flatMap((group) => group.options))
const resolvedPlaceholder = computed(() => props.placeholder || locale.selectMenuPlaceholder)
const resolvedSelectedCountText = computed(() => props.selectedCountText || locale.selectMenuSelectedCountText)
const valueAlignmentClass = computed(() => {
  if (props.valueAlign === 'center') return 'text-center'
  if (props.valueAlign === 'right') return 'text-right'
  return 'text-left'
})

const currentLabel = computed(() => {
  if (props.multiple) {
    const values = Array.isArray(props.modelValue) ? props.modelValue : []
    if (!values.length) return resolvedPlaceholder.value
    if (values.length <= props.maxVisibleLabels) {
      return values
        .map((value) => flatOptions.value.find((option) => option.value === value)?.label || value)
        .join(' / ')
    }
    return `${values.length} ${resolvedSelectedCountText.value}`
  }

  const rawValue = props.modelValue == null ? '' : String(props.modelValue)
  const match = flatOptions.value.find((option) => option.value === rawValue)
  if (match) return match.label
  return rawValue || resolvedPlaceholder.value
})

const floating = useFloatingPanel(open, trigger, menu, {
  placement: () => props.placement,
})
const menuStyle = computed<CSSProperties>(() => ({
  ...floating.panelStyle.value,
  zIndex: OVERLAY_LAYER.menu,
  minWidth: `${Math.min(floating.position.value.triggerWidth, floating.position.value.maxWidth ?? floating.position.value.triggerWidth)}px`,
}))
const keyboard = useMenuKeyboard({
  open,
  trigger,
  panel: menu,
  openMenu,
  closeMenu,
})

function groupKey(group: GroupedSelectGroup) {
  return group.label || group.options.map((option) => option.value).join('|')
}

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
  const option = flatOptions.value.find((item) => item.value === value)
  if (option?.disabled) return

  if (props.multiple) {
    const current = Array.isArray(props.modelValue) ? props.modelValue : []
    const exists = current.includes(value)
    emit('update:modelValue', exists ? current.filter((item) => item !== value) : [...current, value])
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

<style scoped>
.grouped-select-trigger {
  display: flex;
  width: auto;
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  color: hsl(var(--foreground));
}

.grouped-select-trigger:hover {
  border-color: hsl(var(--primary));
}

.grouped-select-trigger--block {
  width: 100%;
}

.grouped-select-menu {
  max-height: min(30rem, calc(100vh - 16px));
  overflow-y: auto;
  overscroll-behavior: contain;
}

.grouped-select-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.grouped-select-section + .grouped-select-section {
  margin-top: 6px;
}

.grouped-select-heading {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 18px;
  padding: 2px 6px 0;
  color: hsl(var(--muted-foreground) / 0.6);
  font-size: 11px;
  font-weight: 500;
  line-height: 1;
}

.grouped-select-heading--center {
  justify-content: center;
}

.grouped-select-heading--right {
  justify-content: flex-end;
}

.grouped-select-heading i {
  height: 1px;
  flex: 1 1 auto;
  background: hsl(var(--border));
}
</style>
