import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import type { CSSProperties, Ref } from 'vue'
import type { MenuPlacement } from '../types'

type FloatingPanelAlign = 'start' | 'end'

type FloatingPanelOptions = {
  placement: () => MenuPlacement
  align?: () => FloatingPanelAlign
  gap?: number
  viewportPadding?: number
  exclusive?: boolean
}

type FloatingPanelPosition = {
  top: number
  left: number
  triggerWidth: number
  maxHeight: number | null
  maxWidth: number | null
}

const floatingPanelOpenEvent = 'nanocat:floating-panel-open'

function normalizePlacement(placement: MenuPlacement) {
  if (placement === 'up') return 'top'
  if (placement === 'down') return 'bottom'
  return placement
}

function resolvePlacement(
  placement: MenuPlacement,
  space: {
    panelWidth: number
    panelHeight: number
    availableBottom: number
    availableTop: number
    availableRight: number
    availableLeft: number
  },
) {
  const normalized = normalizePlacement(placement)
  if (normalized === 'top') {
    return space.panelHeight <= space.availableTop || space.availableTop >= space.availableBottom
      ? 'top'
      : 'bottom'
  }
  if (normalized === 'bottom') {
    return space.panelHeight <= space.availableBottom || space.availableBottom >= space.availableTop
      ? 'bottom'
      : 'top'
  }
  if (normalized === 'right') {
    return space.panelWidth <= space.availableRight || space.availableRight >= space.availableLeft
      ? 'right'
      : 'left'
  }
  if (normalized === 'left') {
    return space.panelWidth <= space.availableLeft || space.availableLeft >= space.availableRight
      ? 'left'
      : 'right'
  }
  if (normalized !== 'auto') return normalized
  if (space.panelHeight <= space.availableBottom) return 'bottom'
  if (space.panelHeight <= space.availableTop) return 'top'
  if (space.panelWidth <= space.availableRight) return 'right'
  if (space.panelWidth <= space.availableLeft) return 'left'
  return space.availableBottom >= space.availableTop ? 'bottom' : 'top'
}

export function useFloatingPanel(
  open: Ref<boolean>,
  trigger: Readonly<Ref<HTMLElement | null>>,
  panel: Ref<HTMLElement | null>,
  options: FloatingPanelOptions,
) {
  const instance = Symbol('nanocat-floating-panel')
  const positioned = ref(false)
  const position = ref<FloatingPanelPosition>({
    top: 0,
    left: 0,
    triggerWidth: 0,
    maxHeight: null,
    maxWidth: null,
  })
  const gap = options.gap ?? 8
  const viewportPadding = options.viewportPadding ?? 8

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

    const rect = triggerElement.getBoundingClientRect()
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight
    const panelWidth = Math.max(panelElement.offsetWidth || 0, rect.width)
    const panelHeight = panelElement.offsetHeight || 0
    const availableBottom = Math.max(0, viewportHeight - viewportPadding - rect.bottom - gap)
    const availableTop = Math.max(0, rect.top - viewportPadding - gap)
    const availableRight = Math.max(0, viewportWidth - viewportPadding - rect.right - gap)
    const availableLeft = Math.max(0, rect.left - viewportPadding - gap)
    const placement = resolvePlacement(options.placement(), {
      panelWidth,
      panelHeight,
      availableBottom,
      availableTop,
      availableRight,
      availableLeft,
    })
    const align = options.align?.() ?? 'start'
    let left = align === 'end' ? rect.right - panelWidth : rect.left
    let top = rect.bottom + gap
    let maxHeight = availableBottom

    if (placement === 'top') {
      maxHeight = availableTop
      top = rect.top - gap - Math.min(panelHeight, maxHeight)
    } else if (placement === 'left') {
      left = rect.left - gap - panelWidth
      top = rect.top
      maxHeight = Math.max(0, viewportHeight - viewportPadding * 2)
    } else if (placement === 'right') {
      left = rect.right + gap
      top = rect.top
      maxHeight = Math.max(0, viewportHeight - viewportPadding * 2)
    }

    const maxWidth = Math.max(0, viewportWidth - viewportPadding * 2)
    const visiblePanelWidth = Math.min(panelWidth, maxWidth)
    const visiblePanelHeight = Math.min(panelHeight, maxHeight)
    const maxLeft = Math.max(viewportPadding, viewportWidth - viewportPadding - visiblePanelWidth)
    const maxTop = Math.max(viewportPadding, viewportHeight - viewportPadding - visiblePanelHeight)

    position.value = {
      left: Math.min(maxLeft, Math.max(viewportPadding, left)),
      top: Math.min(maxTop, Math.max(viewportPadding, top)),
      triggerWidth: rect.width,
      maxHeight: Math.floor(maxHeight),
      maxWidth: Math.floor(maxWidth),
    }
    positioned.value = true
  }

  async function present() {
    if (options.exclusive !== false) {
      document.dispatchEvent(new CustomEvent(floatingPanelOpenEvent, { detail: instance }))
    }
    open.value = true
    positioned.value = false
    await nextTick()
    updatePosition()
    requestAnimationFrame(updatePosition)
  }

  function dismiss() {
    open.value = false
    positioned.value = false
  }

  function containsTarget(target: Node | null) {
    if (!target) return false
    return Boolean(trigger.value?.contains(target) || panel.value?.contains(target))
  }

  function handleViewportChange() {
    if (!open.value) return
    updatePosition()
  }

  function handleOtherPanelOpen(event: Event) {
    if (!(event instanceof CustomEvent) || event.detail === instance || !open.value) return
    dismiss()
  }

  onMounted(() => {
    if (options.exclusive !== false) {
      document.addEventListener(floatingPanelOpenEvent, handleOtherPanelOpen)
    }
    window.addEventListener('resize', handleViewportChange)
    window.addEventListener('scroll', handleViewportChange, true)
  })

  onBeforeUnmount(() => {
    if (options.exclusive !== false) {
      document.removeEventListener(floatingPanelOpenEvent, handleOtherPanelOpen)
    }
    window.removeEventListener('resize', handleViewportChange)
    window.removeEventListener('scroll', handleViewportChange, true)
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
