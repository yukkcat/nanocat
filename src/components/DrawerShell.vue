<template>
  <ModalShell
    :open="open"
    :title="bare ? '' : title"
    :description="bare ? '' : description"
    size-class=""
    :root-class="resolvedRootClass"
    :overlay-class="resolvedOverlayClass"
    :header-class="headerClass"
    :body-class="bodyClass"
    :footer-class="footerClass"
    :close-text="closeText"
    :show-close="showClose"
    :close-on-overlay="closeOnOverlay"
    :close-on-escape="closeOnEscape"
    :aria-label="resolvedAriaLabel"
    :bare="bare"
    :max-width="maxWidth"
    :z-index="zIndex"
    :modal="showBackdrop"
    :align="showBackdrop ? 'start' : 'center'"
    placement="end"
    motion="drawer"
    @close="emit('close')"
  >
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>

    <slot />

    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </ModalShell>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { OVERLAY_LAYER } from '../layers'
import ModalShell from './ModalShell.vue'

const props = withDefaults(defineProps<{
  open: boolean
  title?: string
  description?: string
  maxWidth?: string
  zIndex?: number
  closeText?: string
  showClose?: boolean
  closeOnOverlay?: boolean
  closeOnEscape?: boolean
  showBackdrop?: boolean
  ariaLabel?: string
  bare?: boolean
  rootClass?: string
  overlayClass?: string
  headerClass?: string
  bodyClass?: string
  footerClass?: string
}>(), {
  title: '',
  description: '',
  maxWidth: '32rem',
  zIndex: OVERLAY_LAYER.modal,
  closeText: '',
  showClose: true,
  closeOnOverlay: true,
  closeOnEscape: undefined,
  showBackdrop: true,
  ariaLabel: '',
  bare: false,
  rootClass: '',
  overlayClass: '',
  headerClass: '',
  bodyClass: '',
  footerClass: '',
})

const emit = defineEmits<{
  close: []
}>()

const resolvedRootClass = computed(() => [
  'ui-drawer-panel',
  !props.showBackdrop && 'ui-drawer-panel--detached',
  props.rootClass,
].filter(Boolean).join(' '))

const resolvedOverlayClass = computed(() => [
  'ui-overlay-backdrop ui-drawer-overlay',
  !props.showBackdrop && 'ui-drawer-overlay--transparent',
  props.overlayClass,
].filter(Boolean).join(' '))

const resolvedAriaLabel = computed(() => (
  props.ariaLabel || (props.bare ? props.title : '')
))
</script>

<style>
.ui-drawer-overlay {
  padding: 1rem 0.75rem;
}

.ui-drawer-overlay--transparent {
  background: transparent;
  pointer-events: none;
}

.ui-drawer-panel {
  display: flex;
  width: 100%;
  height: calc(100dvh - 2rem);
  max-height: calc(100dvh - 2rem);
  min-height: 0;
  flex-direction: column;
}

.ui-modal-panel.ui-drawer-panel--detached {
  height: 90dvh;
  max-height: 90dvh;
  pointer-events: auto;
  box-shadow:
    -20px 0 44px rgba(15, 23, 42, 0.14),
    -4px 0 14px rgba(15, 23, 42, 0.09);
}

@media (max-width: 640px) {
  .ui-drawer-overlay {
    padding: 0.5rem;
  }

  .ui-drawer-panel {
    height: calc(100dvh - 1rem);
    max-height: calc(100dvh - 1rem);
  }

  .ui-modal-panel.ui-drawer-panel--detached {
    height: calc(100dvh - 1rem);
    max-height: calc(100dvh - 1rem);
  }
}
</style>
