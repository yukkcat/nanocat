<template>
  <Teleport to="body">
    <Transition :name="motionName" :css="Boolean(motionName)" appear>
      <div
        v-if="open"
        class="fixed inset-0 overflow-y-auto overscroll-contain px-3 py-4"
        :class="overlayClass"
        :style="overlayStyle"
        @click.self="handleClose('overlay')"
      >
        <div
          class="flex min-h-full"
          :class="[alignmentClass, placementClass]"
          @click.self="handleClose('overlay')"
        >
          <div
            ref="panel"
            class="ui-modal-panel"
            :class="[
              bare ? '' : 'flex max-h-[calc(100dvh-2rem)] flex-col',
              sizeClass,
              resolvedRootClass,
            ]"
            :style="panelStyle"
            role="dialog"
            :aria-modal="modal ? 'true' : undefined"
            :aria-label="resolvedAriaLabel || undefined"
            :aria-labelledby="title ? titleId : undefined"
            :aria-describedby="description ? descriptionId : undefined"
            tabindex="-1"
            @keydown="handleKeydown"
          >
            <template v-if="bare">
              <slot />
            </template>
            <template v-else>
              <div
                v-if="$slots.header || title || description || showClose"
                class="flex items-start justify-between gap-4 border-b border-border px-5 py-3"
                :class="headerClass"
              >
                <slot name="header">
                  <div class="min-w-0">
                    <h4 v-if="title" :id="titleId" class="ui-section-title">{{ title }}</h4>
                    <p v-if="description" :id="descriptionId" class="mt-1 text-sm text-muted-foreground">{{ description }}</p>
                  </div>
                </slot>

                <Button
                  v-if="showClose"
                  size="xs"
                  variant="outline"
                  root-class="min-w-14 justify-center text-muted-foreground"
                  @click="handleClose('button')"
                >
                  {{ resolvedCloseText }}
                </Button>
              </div>

              <div class="min-h-0 overflow-y-auto px-4 py-3" :class="bodyClass">
                <slot />
              </div>

              <div
                v-if="$slots.footer"
                class="flex items-center justify-end gap-2 border-t border-border px-5 py-3"
                :class="footerClass"
              >
                <slot name="footer" />
              </div>
            </template>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import type { CSSProperties } from 'vue'
import { getTabbableElements } from '../focus'
import { useNanocatLocale } from '../i18n'
import { OVERLAY_LAYER } from '../layers'
import { resolveRootClass } from '../presets'
import Button from './Button.vue'

type ScrollState = {
  overflow: string
  paddingRight: string
}

type ActiveModal = {
  owner: symbol
  getPanel: () => HTMLElement | null
  getZIndex: () => number
}

const bodyScrollLockOwners = new Set<symbol>()
const activeModals: ActiveModal[] = []
let bodyScrollState: ScrollState | null = null

function lockBodyScroll(owner: symbol) {
  if (bodyScrollLockOwners.has(owner) || typeof document === 'undefined') return

  const body = document.body
  if (!body) return

  if (!bodyScrollLockOwners.size) {
    bodyScrollState = {
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    }

    const scrollbarWidth = Math.max(0, window.innerWidth - document.documentElement.clientWidth)
    if (scrollbarWidth) {
      const currentPadding = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0
      body.style.paddingRight = `${currentPadding + scrollbarWidth}px`
    }
    body.style.overflow = 'hidden'
  }

  bodyScrollLockOwners.add(owner)
}

function unlockBodyScroll(owner: symbol) {
  if (!bodyScrollLockOwners.delete(owner) || bodyScrollLockOwners.size || typeof document === 'undefined') return

  const body = document.body
  if (body && bodyScrollState) {
    body.style.overflow = bodyScrollState.overflow
    body.style.paddingRight = bodyScrollState.paddingRight
  }
  bodyScrollState = null
}

function activateModal(owner: symbol, getPanel: () => HTMLElement | null, getZIndex: () => number) {
  const previousIndex = activeModals.findIndex((modal) => modal.owner === owner)
  if (previousIndex >= 0) activeModals.splice(previousIndex, 1)
  activeModals.push({ owner, getPanel, getZIndex })
}

function deactivateModal(owner: symbol) {
  const index = activeModals.findIndex((modal) => modal.owner === owner)
  if (index >= 0) activeModals.splice(index, 1)
}

function getTopModal() {
  return activeModals.reduce<ActiveModal | null>((top, modal) => {
    if (!top || modal.getZIndex() >= top.getZIndex()) return modal
    return top
  }, null)
}

const props = withDefaults(defineProps<{
  open: boolean
  title?: string
  description?: string
  sizeClass?: string
  rootClass?: string
  panelClass?: string
  overlayClass?: string
  headerClass?: string
  bodyClass?: string
  footerClass?: string
  closeText?: string
  showClose?: boolean
  closeOnOverlay?: boolean
  closeOnEscape?: boolean
  ariaLabel?: string
  bare?: boolean
  maxWidth?: string
  zIndex?: number
  align?: 'center' | 'start'
  placement?: 'center' | 'end'
  motion?: 'none' | 'drawer'
  modal?: boolean
}>(), {
  title: '',
  description: '',
  sizeClass: 'max-w-[44rem]',
  rootClass: '',
  panelClass: '',
  overlayClass: 'ui-overlay-backdrop',
  headerClass: '',
  bodyClass: '',
  footerClass: '',
  closeText: '',
  showClose: true,
  closeOnOverlay: true,
  closeOnEscape: undefined,
  ariaLabel: '',
  bare: false,
  maxWidth: '',
  zIndex: OVERLAY_LAYER.modal,
  align: 'center',
  placement: 'center',
  motion: 'none',
  modal: true,
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const locale = useNanocatLocale()
const panel = ref<HTMLElement | null>(null)
const owner = Symbol('nanocat-modal')
const titleId = `nanocat-modal-title-${useId()}`
const descriptionId = `nanocat-modal-description-${useId()}`
const previouslyFocusedElement = ref<HTMLElement | null>(null)
let modalActive = false
let openedAsModal = false
const resolvedRootClass = computed(() => resolveRootClass(props.rootClass, props.panelClass))
const resolvedCloseText = computed(() => props.closeText || locale.modalCloseText)
const resolvedAriaLabel = computed(() => props.ariaLabel)
const canCloseOnEscape = computed(() => props.closeOnEscape ?? props.closeOnOverlay)
const overlayStyle = computed<CSSProperties>(() => ({ zIndex: props.zIndex }))
const alignmentClass = computed(() => props.align === 'start' ? 'items-start' : 'items-center')
const placementClass = computed(() => props.placement === 'end' ? 'justify-end' : 'justify-center')
const motionName = computed(() => props.motion === 'drawer' ? 'ui-drawer-motion' : '')
const panelStyle = computed<CSSProperties>(() => (
  props.maxWidth ? { maxWidth: props.maxWidth } : {}
))

function focusInitialElement(target = panel.value) {
  if (!target) return

  const autofocusElement = target.querySelector<HTMLElement>('[data-autofocus], [autofocus]')
  const nextFocusTarget = autofocusElement && autofocusElement.getClientRects().length > 0
    ? autofocusElement
    : getTabbableElements(target)[0] ?? target
  nextFocusTarget.focus({ preventScroll: true })
}

async function openModal() {
  if (modalActive || typeof document === 'undefined') return
  modalActive = true
  openedAsModal = props.modal

  if (!openedAsModal) return

  previouslyFocusedElement.value = document.activeElement instanceof HTMLElement
    ? document.activeElement
    : null
  activateModal(owner, () => panel.value, () => props.zIndex)
  lockBodyScroll(owner)
  document.addEventListener('keydown', handleDocumentKeydown)

  await nextTick()
  if (!modalActive || !props.open) return
  focusInitialElement()
}

async function closeModal({ restoreFocus = true }: { restoreFocus?: boolean } = {}) {
  if (!modalActive) return
  modalActive = false
  const wasModal = openedAsModal
  openedAsModal = false

  if (!wasModal) return

  deactivateModal(owner)
  unlockBodyScroll(owner)
  document.removeEventListener('keydown', handleDocumentKeydown)

  if (!restoreFocus) return
  const previous = previouslyFocusedElement.value
  previouslyFocusedElement.value = null
  await nextTick()

  const topModal = getTopModal()
  if (topModal) {
    const topPanel = topModal.getPanel()
    if (previous && topPanel?.contains(previous)) {
      previous.focus({ preventScroll: true })
    } else {
      focusInitialElement(topPanel)
    }
    return
  }

  if (previous?.isConnected) previous.focus({ preventScroll: true })
}

function handleKeydown(event: KeyboardEvent) {
  if (props.modal && getTopModal()?.owner !== owner) return

  if (event.key === 'Escape') {
    if (!canCloseOnEscape.value) return
    event.preventDefault()
    event.stopPropagation()
    handleClose('escape')
    return
  }

  if (!props.modal) return

  if (event.key !== 'Tab') return

  const focusableElements = getTabbableElements(panel.value)
  if (!focusableElements.length) {
    event.preventDefault()
    panel.value?.focus({ preventScroll: true })
    return
  }

  const first = focusableElements[0]
  const last = focusableElements.at(-1)!
  const activeElement = document.activeElement

  if (event.shiftKey && (activeElement === first || !panel.value?.contains(activeElement))) {
    event.preventDefault()
    last.focus({ preventScroll: true })
  } else if (!event.shiftKey && activeElement === last) {
    event.preventDefault()
    first.focus({ preventScroll: true })
  }
}

function handleDocumentKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && !event.cancelBubble) handleKeydown(event)
}

function handleClose(source: 'overlay' | 'button' | 'escape') {
  if (source === 'overlay' && !props.closeOnOverlay) {
    return
  }
  emit('close')
}

watch(() => props.open, (open) => {
  if (open) {
    void openModal()
  } else {
    void closeModal()
  }
}, { flush: 'post' })

watch(() => props.modal, () => {
  if (!props.open || !modalActive) return
  void closeModal({ restoreFocus: false }).then(openModal)
}, { flush: 'post' })

onMounted(() => {
  if (props.open) void openModal()
})

onBeforeUnmount(() => {
  void closeModal()
})
</script>

<style>
.ui-drawer-motion-enter-active,
.ui-drawer-motion-leave-active {
  transition: opacity 120ms ease-out;
}

.ui-drawer-motion-enter-active .ui-modal-panel,
.ui-drawer-motion-leave-active .ui-modal-panel {
  transition: transform 160ms cubic-bezier(0.22, 1, 0.36, 1);
}

.ui-drawer-motion-enter-from,
.ui-drawer-motion-leave-to {
  opacity: 0;
}

.ui-drawer-motion-enter-from .ui-modal-panel,
.ui-drawer-motion-leave-to .ui-modal-panel {
  transform: translateX(10px);
}

@media (prefers-reduced-motion: reduce) {
  .ui-drawer-motion-enter-active,
  .ui-drawer-motion-leave-active,
  .ui-drawer-motion-enter-active .ui-modal-panel,
  .ui-drawer-motion-leave-active .ui-modal-panel {
    transition: none;
  }
}
</style>
