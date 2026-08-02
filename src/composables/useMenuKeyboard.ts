import { nextTick } from 'vue'
import type { Ref } from 'vue'
import { getTabbableElements } from '../focus'

type MenuKeyboardOptions = {
  open: Ref<boolean>
  trigger: Readonly<Ref<HTMLElement | null>>
  panel: Ref<HTMLElement | null>
  openMenu: () => Promise<void>
  closeMenu: () => void
}

type Boundary = 'first' | 'last'

export function useMenuKeyboard(options: MenuKeyboardOptions) {
  function getItems() {
    return Array.from(
      options.panel.value?.querySelectorAll<HTMLElement>('[data-menu-item]:not([disabled])') ?? [],
    ).filter((item) => item.getAttribute('aria-disabled') !== 'true')
  }

  function focusItem(index: number) {
    const items = getItems()
    if (!items.length) return
    const nextIndex = ((index % items.length) + items.length) % items.length
    const item = items[nextIndex]
    item.focus({ preventScroll: true })
    item.scrollIntoView({ block: 'nearest' })
  }

  async function focusBoundary(boundary: Boundary) {
    if (!options.open.value) await options.openMenu()
    await nextTick()
    const items = getItems()
    if (!items.length) return
    focusItem(boundary === 'first' ? 0 : items.length - 1)
  }

  function focusRelative(offset: number) {
    const items = getItems()
    if (!items.length) return
    const currentIndex = items.findIndex((item) => item === document.activeElement)
    focusItem(currentIndex < 0 ? (offset > 0 ? 0 : items.length - 1) : currentIndex + offset)
  }

  function restoreTriggerFocus() {
    void nextTick(() => {
      options.trigger.value?.focus({ preventScroll: true })
    })
  }

  function closeAndRestoreFocus() {
    options.closeMenu()
    restoreTriggerFocus()
  }

  function resolveAdjacentTriggerTarget(backward: boolean) {
    const trigger = options.trigger.value
    if (!trigger || typeof document === 'undefined') return null

    const modal = trigger.closest<HTMLElement>('[role="dialog"][aria-modal="true"]')
    const scope: ParentNode = modal ?? document
    const candidates = getTabbableElements(scope, {
      exclude: (element) => Boolean(element.closest('[role="menu"], [role="listbox"]')),
    })
    const triggerIndex = candidates.indexOf(trigger)
    if (triggerIndex < 0 || !candidates.length) return null

    const offset = backward ? -1 : 1
    let targetIndex = triggerIndex + offset
    if (modal) {
      targetIndex = (targetIndex + candidates.length) % candidates.length
    } else if (targetIndex < 0 || targetIndex >= candidates.length) {
      return null
    }
    return candidates[targetIndex] ?? null
  }

  function closeAndContinueTab(event: KeyboardEvent) {
    const target = resolveAdjacentTriggerTarget(event.shiftKey)
    options.closeMenu()
    if (!target) return

    event.preventDefault()
    void nextTick(() => {
      if (target.isConnected) target.focus({ preventScroll: true })
    })
  }

  async function handleTriggerKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && options.open.value) {
      event.preventDefault()
      closeAndRestoreFocus()
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      await focusBoundary('first')
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      await focusBoundary('last')
    } else if (event.key === 'Home') {
      event.preventDefault()
      await focusBoundary('first')
    } else if (event.key === 'End') {
      event.preventDefault()
      await focusBoundary('last')
    }
  }

  function handleMenuKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      focusRelative(1)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      focusRelative(-1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      focusItem(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      const items = getItems()
      focusItem(items.length - 1)
    } else if (event.key === 'Escape') {
      event.preventDefault()
      closeAndRestoreFocus()
    } else if (event.key === 'Tab') {
      closeAndContinueTab(event)
    }
  }

  return {
    closeAndRestoreFocus,
    handleMenuKeydown,
    handleTriggerKeydown,
  }
}
