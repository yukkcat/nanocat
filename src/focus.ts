type FocusQueryOptions = {
  exclude?: (element: HTMLElement) => boolean
}

const tabbableSelector = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export function getTabbableElements(root: ParentNode | null, options: FocusQueryOptions = {}) {
  if (!root) return []

  return Array.from(root.querySelectorAll<HTMLElement>(tabbableSelector)).filter((element) => {
    return element.tabIndex >= 0
      && element.getClientRects().length > 0
      && element.getAttribute('aria-hidden') !== 'true'
      && !element.hasAttribute('inert')
      && !element.closest('[inert]')
      && !options.exclude?.(element)
  })
}
