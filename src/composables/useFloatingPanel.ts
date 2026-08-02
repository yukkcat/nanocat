import { onBeforeUnmount, onMounted } from 'vue'
import type { Ref } from 'vue'
import { useAnchoredOverlay } from './useAnchoredOverlay'
import type { AnchoredPlacementPreference } from './useAnchoredOverlay'
import type { MenuPlacement } from '../types'

type FloatingPanelAlign = 'start' | 'end'

type FloatingPanelOptions = {
  placement: () => MenuPlacement
  align?: () => FloatingPanelAlign
  gap?: number
  viewportPadding?: number
  exclusive?: boolean
}

const floatingPanelOpenEvent = 'nanocat:floating-panel-open'

function normalizePlacement(placement: MenuPlacement): AnchoredPlacementPreference {
  if (placement === 'up') return 'top'
  if (placement === 'down') return 'bottom'
  return placement
}

export function useFloatingPanel(
  open: Ref<boolean>,
  trigger: Readonly<Ref<HTMLElement | null>>,
  panel: Ref<HTMLElement | null>,
  options: FloatingPanelOptions,
) {
  const instance = Symbol('nanocat-floating-panel')
  const anchored = useAnchoredOverlay(open, trigger, panel, {
    placement: () => normalizePlacement(options.placement()),
    align: options.align,
    horizontalAlign: () => 'start',
    gap: options.gap,
    viewportPadding: options.viewportPadding,
    fallbackStrategy: 'largest-space',
    matchTriggerWidth: true,
    constrainHeight: true,
  })

  async function present() {
    if (options.exclusive !== false) {
      document.dispatchEvent(new CustomEvent(floatingPanelOpenEvent, { detail: instance }))
    }
    await anchored.present()
  }

  function dismiss() {
    anchored.dismiss()
  }

  function handleOtherPanelOpen(event: Event) {
    if (!(event instanceof CustomEvent) || event.detail === instance || !open.value) return
    dismiss()
  }

  onMounted(() => {
    if (options.exclusive !== false) {
      document.addEventListener(floatingPanelOpenEvent, handleOtherPanelOpen)
    }
  })

  onBeforeUnmount(() => {
    if (options.exclusive !== false) {
      document.removeEventListener(floatingPanelOpenEvent, handleOtherPanelOpen)
    }
  })

  return {
    containsTarget: anchored.containsTarget,
    dismiss,
    panelStyle: anchored.panelStyle,
    position: anchored.position,
    present,
    updatePosition: anchored.updatePosition,
  }
}
