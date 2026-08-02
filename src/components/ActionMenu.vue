<template>
  <div ref="root" class="relative inline-flex" :style="rootStyle">
    <Button
      v-if="triggerVariant === 'button'"
      variant="outline"
      :size="size === 'xs' ? 'xs' : 'sm'"
      :disabled="disabled"
      :root-class="triggerRootClass"
      :aria-controls="menuId"
      aria-haspopup="menu"
      :aria-expanded="open"
      @click="toggle"
      @keydown="keyboard.handleTriggerKeydown"
    >
      <span class="min-w-0 flex-1 truncate">{{ label }}</span>
      <svg
        viewBox="0 0 20 20"
        class="h-3.5 w-3.5 shrink-0 transition-transform"
        :class="open ? 'rotate-180' : ''"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M5 7l5 6 5-6H5z" />
      </svg>
    </Button>
    <button
      v-else
      type="button"
      class="ui-input-sm ui-select-trigger flex min-w-0 items-center justify-between gap-2"
      :class="triggerRootClass"
      :disabled="disabled"
      :aria-controls="menuId"
      aria-haspopup="menu"
      :aria-expanded="open"
      @click="toggle"
      @keydown="keyboard.handleTriggerKeydown"
    >
      <span class="min-w-0 flex-1 truncate text-left">{{ label }}</span>
      <svg
        viewBox="0 0 20 20"
        class="h-4 w-4 shrink-0 transition-transform"
        :class="open ? 'rotate-180' : ''"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M5 7l5 6 5-6H5z" />
      </svg>
    </button>
  </div>

  <Teleport to="body">
    <div
      v-if="open && !disabled"
      :id="menuId"
      ref="menu"
      class="ui-floating-panel ui-menu-panel fixed !p-1.5"
      :class="resolvedContentClass"
      :style="panelStyle"
      role="menu"
      @keydown="handleMainMenuKeydown"
    >
      <template v-for="item in items" :key="item.key">
        <div v-if="item.dividerBefore" class="my-1 border-t border-border" role="separator" />
        <div v-if="item.heading" class="ui-menu-heading">
          {{ item.label }}
        </div>
        <button
          v-else-if="item.children?.length"
          type="button"
          class="ui-menu-item ui-menu-item-parent"
          :class="[
            item.danger ? 'ui-menu-item-danger' : '',
            activeParentKey === item.key ? 'ui-menu-item-active' : '',
          ]"
          :disabled="item.disabled"
          :aria-expanded="activeParentKey === item.key"
          aria-haspopup="menu"
          :data-menu-key="item.key"
          data-menu-item
          role="menuitem"
          @mouseenter="openSubmenu(item, $event)"
          @focusin="openSubmenu(item, $event)"
          @click="openSubmenu(item, $event)"
          @keydown.enter.prevent="openSubmenu(item, $event, true)"
          @keydown.space.prevent="openSubmenu(item, $event, true)"
        >
          <span class="min-w-0 flex-1 truncate">{{ item.label }}</span>
          <svg
            viewBox="0 0 20 20"
            class="h-3.5 w-3.5 shrink-0 transition-transform"
            :class="activeParentKey === item.key ? 'translate-x-0.5' : ''"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="M8 5l5 5-5 5" />
          </svg>
        </button>
        <button
          v-else
          type="button"
          class="ui-menu-item"
          :class="[
            item.danger ? 'ui-menu-item-danger' : '',
            item.active ? 'ui-menu-item-active' : '',
          ]"
          :disabled="item.disabled"
          :data-menu-key="item.key"
          data-menu-item
          role="menuitem"
          @mouseenter="closeSubmenu"
          @focusin="closeSubmenu"
          @click="selectItem(item)"
          @keydown.enter.prevent="selectItem(item)"
          @keydown.space.prevent="selectItem(item)"
        >
          <span class="min-w-0 flex-1 truncate">{{ item.label }}</span>
          <svg
            v-if="item.active"
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
      </template>
    </div>

    <div
      v-if="open && submenuOpen && activeChildren.length"
      ref="submenu"
      class="ui-floating-panel ui-menu-panel fixed !p-1.5"
      :class="resolvedContentClass"
      :style="submenuStyle"
      role="menu"
      @keydown="handleSubmenuKeydown"
    >
      <template v-for="item in activeChildren" :key="item.key">
        <div v-if="item.dividerBefore" class="my-1 border-t border-border" role="separator" />
        <div v-if="item.heading" class="ui-menu-heading">
          {{ item.label }}
        </div>
        <button
          v-else
          type="button"
          class="ui-menu-item"
          :class="[
            item.danger ? 'ui-menu-item-danger' : '',
            item.active ? 'ui-menu-item-active' : '',
          ]"
          :disabled="item.disabled"
          :data-menu-key="item.key"
          data-menu-item
          role="menuitem"
          @click="selectItem(item)"
          @keydown.enter.prevent="selectItem(item)"
          @keydown.space.prevent="selectItem(item)"
        >
          <span class="min-w-0 flex-1 truncate">{{ item.label }}</span>
          <svg
            v-if="item.active"
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
      </template>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import type { CSSProperties } from 'vue'
import Button from './Button.vue'
import { useFloatingPanel } from '../composables/useFloatingPanel'
import { useMenuKeyboard } from '../composables/useMenuKeyboard'
import { OVERLAY_LAYER } from '../layers'
import type { ActionMenuItem, ButtonSize, MenuPlacement } from '../types'

type TriggerVariant = 'button' | 'input'

const props = withDefaults(defineProps<{
  label: string
  items: ActionMenuItem[]
  disabled?: boolean
  align?: 'left' | 'right'
  placement?: MenuPlacement
  size?: ButtonSize
  triggerVariant?: TriggerVariant
  triggerClass?: string
  buttonClass?: string
  contentClass?: string
  menuClass?: string
  menuMinWidth?: number
  triggerMinWidth?: number
  triggerWidth?: number
}>(), {
  disabled: false,
  align: 'right',
  placement: 'auto',
  size: 'sm',
  triggerVariant: 'button',
  triggerClass: '',
  buttonClass: '',
  contentClass: '',
  menuClass: 'min-w-max',
  menuMinWidth: 0,
  triggerMinWidth: 0,
  triggerWidth: 0,
})

const emit = defineEmits<{
  (e: 'select', key: string): void
}>()

const open = ref(false)
const submenuOpen = ref(false)
const root = ref<HTMLElement | null>(null)
const menu = ref<HTMLElement | null>(null)
const submenu = ref<HTMLElement | null>(null)
const activeParentKey = ref('')
const activeParentTrigger = ref<HTMLElement | null>(null)
const trigger = computed<HTMLElement | null>(() => root.value?.querySelector('button') ?? null)
const menuId = `nanocat-action-menu-${useId()}`
const resolvedTriggerClass = computed(() => props.triggerClass || props.buttonClass)
const resolvedContentClass = computed(() => props.contentClass || props.menuClass)
const activeParent = computed(() => props.items.find((item) => item.key === activeParentKey.value))
const activeChildren = computed(() => activeParent.value?.children ?? [])
const rootStyle = computed<CSSProperties>(() => {
  if (props.triggerWidth) return { width: `${props.triggerWidth}px` }
  if (props.triggerMinWidth) return { minWidth: `${props.triggerMinWidth}px` }
  return {}
})
const triggerRootClass = computed(() => [
  'justify-between gap-2',
  props.triggerWidth || props.triggerMinWidth ? 'w-full' : '',
  open.value ? 'border-primary' : '',
  resolvedTriggerClass.value,
].filter(Boolean).join(' '))

const floating = useFloatingPanel(open, trigger, menu, {
  placement: () => props.placement,
  align: () => props.align === 'left' ? 'start' : 'end',
})
const submenuFloating = useFloatingPanel(submenuOpen, activeParentTrigger, submenu, {
  placement: () => 'right',
  gap: 6,
  exclusive: false,
})
const panelStyle = computed<CSSProperties>(() => ({
  ...floating.panelStyle.value,
  zIndex: OVERLAY_LAYER.menu,
  minWidth: resolvePanelMinWidth(floating.position.value.triggerWidth),
}))
const submenuStyle = computed<CSSProperties>(() => ({
  ...submenuFloating.panelStyle.value,
  zIndex: OVERLAY_LAYER.submenu,
  minWidth: resolvePanelMinWidth(activeParentTrigger.value?.getBoundingClientRect().width ?? 0),
}))
const keyboard = useMenuKeyboard({
  open,
  trigger,
  panel: menu,
  openMenu,
  closeMenu,
})
const submenuKeyboard = useMenuKeyboard({
  open: submenuOpen,
  trigger: activeParentTrigger,
  panel: submenu,
  openMenu: reopenSubmenu,
  closeMenu: closeSubmenu,
})

function resolvePanelMinWidth(triggerWidth: number) {
  const width = Math.max(triggerWidth, props.menuMinWidth || 0)
  const maxWidth = Math.max(0, window.innerWidth - 16)
  return width ? `${Math.min(width, maxWidth)}px` : undefined
}

async function openMenu() {
  await floating.present()
}

function closeSubmenu() {
  submenuFloating.dismiss()
  activeParentKey.value = ''
  activeParentTrigger.value = null
}

function closeMenu() {
  floating.dismiss()
  closeSubmenu()
}

function toggle() {
  if (props.disabled) return
  if (open.value) {
    closeMenu()
    return
  }
  void openMenu()
}

function findItemByKey(key: string) {
  return props.items.find((item) => item.key === key)
}

function resolveParentTrigger(item: ActionMenuItem, event?: Event) {
  if (event?.currentTarget instanceof HTMLElement) return event.currentTarget
  return menu.value?.querySelector<HTMLElement>(`[data-menu-key="${CSS.escape(item.key)}"]`) ?? null
}

async function openSubmenu(item: ActionMenuItem, event?: Event, focusFirst = false) {
  if (item.disabled || !item.children?.length) return
  activeParentKey.value = item.key
  activeParentTrigger.value = resolveParentTrigger(item, event)
  await submenuFloating.present()
  if (!focusFirst) return

  await nextTick()
  submenu.value?.querySelector<HTMLElement>('[data-menu-item]:not([disabled])')?.focus({ preventScroll: true })
}

async function reopenSubmenu() {
  const item = activeParent.value
  if (!item) return
  await openSubmenu(item)
}

function selectItem(item: ActionMenuItem) {
  if (item.disabled || item.heading || item.children?.length) return
  keyboard.closeAndRestoreFocus()
  emit('select', item.key)
}

async function handleMainMenuKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowRight') {
    const target = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const key = target?.dataset.menuKey
    const item = key ? findItemByKey(key) : undefined
    if (item?.children?.length) {
      event.preventDefault()
      await openSubmenu(item, undefined, true)
      return
    }
  }
  keyboard.handleMenuKeydown(event)
}

function handleSubmenuKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowLeft' || event.key === 'Escape') {
    event.preventDefault()
    const parent = activeParentTrigger.value
    closeSubmenu()
    void nextTick(() => parent?.focus({ preventScroll: true }))
    return
  }
  if (event.key === 'Tab') {
    keyboard.handleMenuKeydown(event)
    return
  }
  submenuKeyboard.handleMenuKeydown(event)
}

function handlePointerDown(event: PointerEvent) {
  if (!open.value) return
  const target = event.target as Node | null
  if (floating.containsTarget(target) || submenuFloating.containsTarget(target)) return
  closeMenu()
}

watch(open, (isOpen) => {
  if (!isOpen) closeSubmenu()
})

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
