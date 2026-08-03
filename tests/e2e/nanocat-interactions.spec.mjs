import { expect, test } from '@playwright/test'

test('ConfirmDialog closes with Escape when closeOnEscape is omitted', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('open-confirm').click()

  await expect(page.getByRole('dialog', { name: 'Delete item' })).toBeVisible()
  await page.keyboard.press('Escape')

  await expect(page.getByRole('dialog', { name: 'Delete item' })).toBeHidden()
  await expect(page.getByTestId('confirm-cancel-count')).toHaveText('1')
})

test('top ConfirmDialog closes with Escape after focus falls back to document body', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('open-confirm').click()

  const dialog = page.getByRole('dialog', { name: 'Delete item' })
  await expect(dialog).toBeVisible()

  await page.evaluate(() => {
    document.body.tabIndex = -1
    document.body.focus()
  })
  await expect.poll(() => page.evaluate(() => document.activeElement === document.body)).toBe(true)

  await page.keyboard.press('Escape')

  await expect(dialog).toBeHidden()
  await expect(page.getByTestId('confirm-cancel-count')).toHaveText('1')
})

test('SelectMenu Tab order continues from its trigger', async ({ page }) => {
  await page.goto('/')
  const trigger = page.getByRole('button', { name: 'Choose select' })

  await trigger.focus()
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('option', { name: 'Alpha' })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.getByTestId('select-after')).toBeFocused()
  await expect(page.getByRole('listbox')).toBeHidden()

  await trigger.focus()
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('option', { name: 'Alpha' })).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(page.getByTestId('select-before')).toBeFocused()
  await expect(page.getByRole('listbox')).toBeHidden()
})

test('GroupedSelectMenu Tab order continues from its trigger', async ({ page }) => {
  await page.goto('/')
  const trigger = page.getByRole('button', { name: 'Choose grouped select' })

  await trigger.focus()
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('option', { name: 'One' })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.getByTestId('grouped-after')).toBeFocused()
  await expect(page.getByRole('listbox')).toBeHidden()

  await trigger.focus()
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('option', { name: 'One' })).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(page.getByTestId('grouped-before')).toBeFocused()
  await expect(page.getByRole('listbox')).toBeHidden()
})

test('ActionMenu Tab order continues from its trigger', async ({ page }) => {
  await page.goto('/')
  const trigger = page.getByRole('button', { name: 'Choose action' })

  await trigger.focus()
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('menuitem', { name: 'Edit' })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.getByTestId('action-after')).toBeFocused()
  await expect(page.getByRole('menu')).toBeHidden()

  await trigger.focus()
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('menuitem', { name: 'Edit' })).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(page.getByTestId('action-before')).toBeFocused()
  await expect(page.getByRole('menu')).toBeHidden()
})

test('floating menus and hover cards cast the shared floating shadow', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: 'Choose action' }).click()
  await expect(page.getByRole('menu')).not.toHaveCSS('box-shadow', 'none')

  await page.getByText('Credential status').click()
  const hoverCard = page.locator('.ui-floating-panel').filter({ hasText: 'Credential details' })
  await expect(hoverCard).not.toHaveCSS('box-shadow', 'none')
})

test('floating menus use consistent spacing and pill items without changing hover card geometry', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('button', { name: 'Choose action' }).click()
  await expect(page.getByRole('menu')).toHaveCSS('padding-left', '8px')
  await expect(page.getByRole('menu')).toHaveCSS('border-radius', '16px')
  await expect(page.getByRole('menu')).toHaveCSS('row-gap', '4px')
  await expect(page.getByRole('menuitem', { name: 'Edit' })).toHaveCSS('border-radius', '9999px')

  await page.keyboard.press('Escape')
  await page.getByRole('button', { name: 'Choose select' }).click()
  await expect(page.getByRole('listbox')).toHaveCSS('row-gap', '4px')
  await expect(page.getByRole('option', { name: 'Alpha' })).toHaveCSS('border-radius', '9999px')

  await page.keyboard.press('Escape')
  await page.getByRole('button', { name: 'Choose grouped select' }).click()
  await expect(page.getByRole('listbox')).toHaveCSS('row-gap', '4px')
  await expect(page.getByRole('option', { name: 'One' })).toHaveCSS('border-radius', '9999px')

  await page.getByText('Credential status').click()
  const hoverCard = page.locator('.ui-floating-panel').filter({ hasText: 'Credential details' })
  await expect(hoverCard).toHaveCSS('padding-left', '12px')
  await expect(hoverCard).toHaveCSS('padding-right', '12px')
  await expect(hoverCard).toHaveCSS('border-radius', '16px')
})

test('ActionMenu submenu Tab order still continues from the top-level trigger', async ({ page }) => {
  await page.goto('/')
  const trigger = page.getByRole('button', { name: 'Choose action' })

  await trigger.focus()
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('End')
  await expect(page.getByRole('menuitem', { name: 'More' })).toBeFocused()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('menuitem', { name: 'Duplicate' })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.getByTestId('action-after')).toBeFocused()

  await trigger.focus()
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('End')
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('menuitem', { name: 'Duplicate' })).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(page.getByTestId('action-before')).toBeFocused()
})

test('teleported menu Tab navigation remains trapped in its ModalShell', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('open-menu-modal').click()

  const trigger = page.getByRole('button', { name: 'Choose modal select' })
  await trigger.focus()
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('option', { name: 'Alpha' })).toBeFocused()
  await page.keyboard.press('Tab')

  await expect(page.getByTestId('modal-first')).toBeFocused()
  await expect(page.getByTestId('outside-after-modal')).not.toBeFocused()
})

test('TableShell keeps legacy wrapperClass as a root-class fallback', async ({ page }) => {
  await page.goto('/')

  const modern = page.getByTestId('table-shell-modern')
  const legacy = page.getByTestId('table-shell-legacy')
  const scroll = modern.locator('.table-shell__scroll')
  const footer = modern.locator('.table-shell__footer')
  await expect(modern).toHaveClass(/new-root-marker/)
  await expect(scroll).toHaveClass(/new-scroll-marker/)
  await expect(legacy).toHaveClass(/legacy-root-marker/)
  await expect(scroll).toHaveCSS('scrollbar-gutter', 'stable')
  await expect(footer).toContainText('Table footer')
  await expect(footer.evaluate(node => node.parentElement?.classList.contains('table-shell'))).resolves.toBe(true)
})

test('TableShell can hover data rows without covering selected rows', async ({ page }) => {
  await page.goto('/')

  const hoverRow = page.getByTestId('table-shell-hover-row')
  const hoverCell = hoverRow.locator('td')
  const hoverBefore = await hoverCell.evaluate((cell) => getComputedStyle(cell).backgroundColor)
  await hoverRow.hover()
  const hoverAfter = await hoverCell.evaluate((cell) => getComputedStyle(cell).backgroundColor)
  expect(hoverAfter).not.toBe(hoverBefore)

  const selectedRow = page.getByTestId('table-shell-selected-row')
  const selectedCell = selectedRow.locator('td')
  const selectedBefore = await selectedCell.evaluate((cell) => getComputedStyle(cell).backgroundColor)
  await selectedRow.hover()
  const selectedAfter = await selectedCell.evaluate((cell) => getComputedStyle(cell).backgroundColor)
  expect(selectedAfter).toBe(selectedBefore)
})

test('TableShell loading state uses a concise status instead of skeleton bars', async ({ page }) => {
  await page.goto('/')

  const table = page.getByTestId('table-shell-loading')
  await expect(table.locator('table')).toHaveAttribute('aria-busy', 'true')
  await expect(table.getByRole('status')).toContainText('Loading data')
  await expect(table.getByRole('status')).toContainText('Reading the latest table rows.')
  const stateLayout = await table.evaluate((root) => ({
    rootHeight: root.clientHeight,
    tableHeight: root.querySelector('table')?.getBoundingClientRect().height || 0,
  }))
  expect(Math.abs(stateLayout.rootHeight - stateLayout.tableHeight)).toBeLessThanOrEqual(2)
  await expect(table.locator('.nanocat-skeleton')).toHaveCount(0)
})

test('TableShell empty fill state returns vertical wheel scrolling to the page', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 })
  await page.goto('/')

  const table = page.getByTestId('table-shell-empty')
  await table.scrollIntoViewIfNeeded()
  await table.hover()
  const scroll = table.locator('.table-shell__scroll')
  await expect(scroll).toHaveCSS('overflow-y', 'auto')
  await expect(scroll).toHaveCSS('overscroll-behavior-y', 'auto')

  const before = await page.evaluate(() => window.scrollY)
  await page.mouse.wheel(0, 320)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(before)
})

test('LoadingState exposes one stable status without skeleton bars', async ({ page }) => {
  await page.goto('/')

  const loading = page.getByTestId('standalone-loading-state')
  await expect(loading).toHaveAttribute('role', 'status')
  await expect(loading).toContainText('Loading records')
  await expect(loading).toContainText('Reading the latest data.')
  await expect(loading.locator('.loading-state__spinner')).toHaveCount(1)
  await expect(loading.locator('.nanocat-skeleton')).toHaveCount(0)
})

test('LoadingState can align operation progress at the start without local padding', async ({ page }) => {
  await page.goto('/')

  const loading = page.getByTestId('start-loading-state')
  await expect(loading).toHaveCSS('justify-content', 'flex-start')
  await expect(loading).toHaveCSS('padding', '0px')
})

test('DrawerShell opens as a full-height right-side dialog and closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 })
  await page.goto('/')
  await page.getByTestId('open-drawer').click()

  const drawer = page.getByRole('dialog', { name: 'Activity drawer' })
  await expect(drawer).toBeVisible()

  const bounds = await drawer.boundingBox()
  expect(bounds).not.toBeNull()
  expect(1280 - (bounds.x + bounds.width)).toBeLessThanOrEqual(16)
  expect(bounds.x).toBeGreaterThan(1280 / 2)
  expect(bounds.height).toBeGreaterThanOrEqual(680)

  await page.keyboard.press('Escape')
  await expect(drawer).toBeHidden()
})

test('ModalShell and DrawerShell use the shared accessible close control', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('open-drawer').click()

  const drawer = page.getByRole('dialog', { name: 'Activity drawer' })
  const closeButton = drawer.getByRole('button', { name: 'Close' })
  await expect(closeButton).toBeVisible()
  await expect(closeButton).toHaveClass(/ui-close-button/)
  await expect(closeButton).toHaveCSS('width', '32px')
  await expect(closeButton).toHaveCSS('height', '32px')

  await closeButton.click()
  await expect(drawer).toBeHidden()
})

test('DrawerShell uses one subtle panel transition when it opens', async ({ page }) => {
  await page.goto('/')
  const animationCount = await page.evaluate(async () => {
    document.querySelector('[data-testid="open-drawer"]')?.click()
    await new Promise(resolve => requestAnimationFrame(resolve))
    await new Promise(resolve => requestAnimationFrame(resolve))
    await new Promise(resolve => setTimeout(resolve, 40))
    const node = document.querySelector('[role="dialog"][aria-labelledby]')
    return node?.getAnimations({ subtree: true }).length ?? 0
  })

  expect(animationCount).toBeGreaterThan(0)
})

test('DrawerShell without a backdrop stays non-modal and casts a detached shadow', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 })
  await page.goto('/')
  await page.getByTestId('open-detached-drawer').click()

  const drawer = page.getByRole('dialog', { name: 'Detached activity drawer' })
  await expect(drawer).toBeVisible()
  await expect(drawer).not.toHaveAttribute('aria-modal', 'true')
  await expect(drawer).not.toHaveCSS('box-shadow', 'none')
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')

  const bounds = await drawer.boundingBox()
  expect(bounds).not.toBeNull()
  expect(bounds.height).toBeGreaterThanOrEqual(645)
  expect(bounds.height).toBeLessThanOrEqual(650)
  expect(Math.abs(bounds.y - (720 - bounds.height) / 2)).toBeLessThanOrEqual(2)

  await page.getByTestId('detached-drawer-background-action').click()
  await expect(page.getByTestId('background-action-count')).toHaveText('1')
})

test('TableShell keeps both scroll axes inside the body and its footer outside', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')

  const table = page.getByTestId('table-shell-scroll-layout')
  const scroll = table.locator('.table-shell__scroll')
  const footer = page.getByTestId('table-shell-scroll-footer')
  const layout = await scroll.evaluate((node, footerNode) => {
    const scrollRect = node.getBoundingClientRect()
    const footerRect = footerNode.getBoundingClientRect()
    return {
      hasHorizontalOverflow: node.scrollWidth > node.clientWidth,
      hasVerticalOverflow: node.scrollHeight > node.clientHeight,
      scrollBottom: scrollRect.bottom,
      footerTop: footerRect.top,
      gutter: getComputedStyle(node).scrollbarGutter,
      verticalScrollbarWidth: getComputedStyle(node, '::-webkit-scrollbar').width,
      horizontalScrollbarHeight: getComputedStyle(node, '::-webkit-scrollbar').height,
    }
  }, await footer.elementHandle())

  expect(layout.hasHorizontalOverflow).toBe(true)
  expect(layout.hasVerticalOverflow).toBe(true)
  expect(layout.footerTop).toBeGreaterThanOrEqual(layout.scrollBottom)
  expect(layout.gutter).toBe('auto')
  expect(layout.verticalScrollbarWidth).toBe('0px')
  expect(layout.horizontalScrollbarHeight).toBe('8px')
})
