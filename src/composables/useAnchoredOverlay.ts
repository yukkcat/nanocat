import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import type { CSSProperties, Ref } from 'vue'

export type AnchoredPlacement = 'top' | 'right' | 'bottom' | 'left'
export type AnchoredPlacementPreference = AnchoredPlacement | 'auto'

type AnchoredAlign = 'start' | 'center' | 'end'
type FallbackStrategy = 'largest-space' | 'opposite-if-fit' | 'opposite-on-overflow'
type NumericOption = number | (() => number)

type AnchoredOverlayOptions = {
  placement: () => AnchoredPlacementPreference
  align?: () => AnchoredAlign
  horizontalAlign?: () => AnchoredAlign
  gap?: NumericOption
  viewportPadding?: NumericOption
  fallbackStrategy?: FallbackStrategy
  matchTriggerWidth?: boolean
  constrainWidth?: boolean
  constrainHeight?: boolean
  clampMainAxis?: boolean
  arrowPadding?: number
}

export type AnchoredOverlayPosition = {
  placement: AnchoredPlacement
  top: number
  left: number
  triggerWidth: number
  panelWidth: number
  panelHeight: number
  arrowOffset: number | null
  maxHeight: number | null
  maxWidth: number | null
}

type AvailableSpace = Record<AnchoredPlacement, number>

function optionValue(option: NumericOption | undefined, fallback: number) {
  if (typeof option === 'function') return option()
  return option ?? fallback
}

function oppositePlacement(placement: AnchoredPlacement): AnchoredPlacement {
  if (placement === 'top') return 'bottom'
  if (placement === 'bottom') return 'top'
  if (placement === 'left') return 'right'
  return 'left'
}

function requiredSize(placement: AnchoredPlacement, panelWidth: number, panelHeight: number) {
  return placement === 'top' || placement === 'bottom' ? panelHeight : panelWidth
}

function resolvePlacement(
  preference: AnchoredPlacementPreference,
  available: AvailableSpace,
  panelWidth: number,
  panelHeight: number,
  fallbackStrategy: FallbackStrategy,
): AnchoredPlacement {
  if (preference === 'auto') {
    const order: AnchoredPlacement[] = ['bottom', 'top', 'right', 'left']
    const fitting = order.find((placement) =>
      requiredSize(placement, panelWidth, panelHeight) <= available[placement]
    )
    if (fitting) return fitting
    return available.bottom >= available.top ? 'bottom' : 'top'
  }

  const opposite = oppositePlacement(preference)
  const fits = requiredSize(preference, panelWidth, panelHeight) <= available[preference]
  if (fits) return preference

  if (fallbackStrategy === 'opposite-on-overflow') return opposite

  const oppositeFits = requiredSize(opposite, panelWidth, panelHeight) <= available[opposite]
  if (fallbackStrategy === 'opposite-if-fit') return oppositeFits ? opposite : preference
  return oppositeFits || available[opposite] > available[preference] ? opposite : preference
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max))
}

export function useAnchoredOverlay(
  open: Ref<boolean>,
  trigger: Readonly<Ref<Element | null>>,
  panel: Ref<HTMLElement | null>,
  options: AnchoredOverlayOptions,
) {
  const initialPlacement = options.placement()
  const positioned = ref(false)
  const position = ref<AnchoredOverlayPosition>({
    placement: initialPlacement === 'auto' ? 'bottom' : initialPlacement,
    top: 0,
    left: 0,
    triggerWidth: 0,
    panelWidth: 0,
    panelHeight: 0,
    arrowOffset: null,
    maxHeight: null,
    maxWidth: null,
  })
  let listenersBound = false
  let positionFrame: number | null = null

  const panelStyle = computed<CSSProperties>(() => ({
    top: `${position.value.top}px`,
    left: `${position.value.left}px`,
    maxHeight: position.value.maxHeight === null ? undefined : `${position.value.maxHeight}px`,
    maxWidth: position.value.maxWidth === null ? undefined : `${position.value.maxWidth}px`,
    visibility: positioned.value ? undefined : 'hidden',
  }))

  function updatePosition() {
    const triggerElement = trigger.value
    const panelElement = panel.value
    if (!triggerElement || !panelElement) return

    const triggerRect = triggerElement.getBoundingClientRect()
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0
    const viewportPadding = optionValue(options.viewportPadding, 8)
    const gap = optionValue(options.gap, 8)
    const measuredPanelWidth = panelElement.offsetWidth || panelElement.getBoundingClientRect().width
    const measuredPanelHeight = panelElement.offsetHeight || panelElement.getBoundingClientRect().height
    const panelWidth = Math.max(measuredPanelWidth, options.matchTriggerWidth ? triggerRect.width : 0)
    const panelHeight = measuredPanelHeight
    const available: AvailableSpace = {
      top: Math.max(0, triggerRect.top - viewportPadding - gap),
      right: Math.max(0, viewportWidth - viewportPadding - triggerRect.right - gap),
      bottom: Math.max(0, viewportHeight - viewportPadding - triggerRect.bottom - gap),
      left: Math.max(0, triggerRect.left - viewportPadding - gap),
    }
    const placement = resolvePlacement(
      options.placement(),
      available,
      panelWidth,
      panelHeight,
      options.fallbackStrategy ?? 'largest-space',
    )
    const verticalPlacement = placement === 'top' || placement === 'bottom'
    const maxWidth = options.constrainWidth === false
      ? null
      : Math.max(0, viewportWidth - viewportPadding * 2)
    const maxHeight = options.constrainHeight
      ? verticalPlacement
        ? available[placement]
        : Math.max(0, viewportHeight - viewportPadding * 2)
      : null
    const visiblePanelWidth = Math.min(panelWidth, maxWidth ?? panelWidth)
    const visiblePanelHeight = Math.min(panelHeight, maxHeight ?? panelHeight)
    const align = verticalPlacement
      ? options.align?.() ?? 'start'
      : options.horizontalAlign?.() ?? options.align?.() ?? 'start'

    let left = triggerRect.left
    let top = triggerRect.bottom + gap

    if (verticalPlacement) {
      if (align === 'center') left = triggerRect.left + (triggerRect.width - visiblePanelWidth) / 2
      if (align === 'end') left = triggerRect.right - visiblePanelWidth
      top = placement === 'top'
        ? triggerRect.top - gap - visiblePanelHeight
        : triggerRect.bottom + gap
    } else {
      if (align === 'center') top = triggerRect.top + (triggerRect.height - visiblePanelHeight) / 2
      if (align === 'end') top = triggerRect.bottom - visiblePanelHeight
      left = placement === 'left'
        ? triggerRect.left - gap - visiblePanelWidth
        : triggerRect.right + gap
    }

    const maxLeft = Math.max(viewportPadding, viewportWidth - viewportPadding - visiblePanelWidth)
    const maxTop = Math.max(viewportPadding, viewportHeight - viewportPadding - visiblePanelHeight)
    if (verticalPlacement || options.clampMainAxis !== false) {
      left = clamp(left, viewportPadding, maxLeft)
    }
    if (!verticalPlacement || options.clampMainAxis !== false) {
      top = clamp(top, viewportPadding, maxTop)
    }

    const arrowPadding = Math.min(options.arrowPadding ?? 0, visiblePanelWidth / 2)
    const arrowOffset = verticalPlacement
      ? clamp(
          triggerRect.left + triggerRect.width / 2 - left,
          arrowPadding,
          visiblePanelWidth - arrowPadding,
        )
      : null

    position.value = {
      placement,
      top,
      left,
      triggerWidth: triggerRect.width,
      panelWidth: visiblePanelWidth,
      panelHeight: visiblePanelHeight,
      arrowOffset,
      maxHeight: maxHeight === null ? null : Math.floor(maxHeight),
      maxWidth: maxWidth === null ? null : Math.floor(maxWidth),
    }
    positioned.value = true
  }

  function handleViewportChange() {
    if (!open.value) return
    updatePosition()
  }

  function bindViewportListeners() {
    if (listenersBound) return
    window.addEventListener('resize', handleViewportChange)
    window.addEventListener('scroll', handleViewportChange, true)
    listenersBound = true
  }

  function unbindViewportListeners() {
    if (!listenersBound) return
    window.removeEventListener('resize', handleViewportChange)
    window.removeEventListener('scroll', handleViewportChange, true)
    listenersBound = false
  }

  function cancelScheduledPosition() {
    if (positionFrame === null) return
    cancelAnimationFrame(positionFrame)
    positionFrame = null
  }

  async function present() {
    const wasOpen = open.value
    open.value = true
    if (!wasOpen) positioned.value = false
    bindViewportListeners()
    cancelScheduledPosition()
    await nextTick()
    if (!open.value) return
    updatePosition()
    cancelScheduledPosition()
    positionFrame = requestAnimationFrame(() => {
      positionFrame = null
      if (open.value) updatePosition()
    })
  }

  function dismiss() {
    open.value = false
    positioned.value = false
    cancelScheduledPosition()
    unbindViewportListeners()
  }

  function containsTarget(target: Node | null) {
    if (!target) return false
    return Boolean(trigger.value?.contains(target) || panel.value?.contains(target))
  }

  onBeforeUnmount(() => {
    cancelScheduledPosition()
    unbindViewportListeners()
  })

  return {
    containsTarget,
    dismiss,
    panelStyle,
    position,
    present,
    updatePosition,
  }
}
