# Components

This file lists the current public component surface for `nanocat-ui`.

Each section focuses on:

- Props
- Emits
- Slots
- Notes

---

## ActionMenu

### Props
- `label: string`
- `items: ActionMenuItem[]`
- `disabled?: boolean`
- `align?: "left" | "right"`
- `placement?: MenuPlacement` (default: `"auto"`)
- `size?: "xs" | "sm"`
- `triggerVariant?: "button" | "input"`
- `triggerClass?: string`
- `buttonClass?: string`
- `contentClass?: string`
- `menuClass?: string`
- `menuMinWidth?: number`
- `triggerMinWidth?: number`
- `triggerWidth?: number`

### Emits
- `select`

### Slots
- none

### Notes
- Best for compact action dropdowns in toolbars, cards and table rows.
- Supports headings, active items, nested action groups, keyboard navigation, viewport-safe positioning, and one active floating surface at a time.

---

## Button

### Props
- `tag?: string | object`
- `type?: "button" | "submit" | "reset"`
- `size?: "xs" | "sm" | "md"`
- `variant?: "outline" | "primary" | "danger"`
- `disabled?: boolean`
- `iconOnly?: boolean`
- `block?: boolean`
- `rootClass?: string`

### Emits
- native button events

### Slots
- `default`

### Notes
- Core action button component for primary, outline and danger actions.
- Prefer this over hand-writing `ui-btn ui-btn-*` combinations.
- `tag` lets the same button styles render as `a`, `RouterLink`, or another component while keeping one visual source of truth.

---

## CardHeader

### Props
- `title: string`
- `description?: string`
- `variant?: "divider" | "plain"`
- `size?: "sm" | "md"`
- `compact?: boolean`

### Emits
- none

### Slots
- `actions`

### Notes
- Small section header for cards and panels.

---

## ChartCard

### Props
- `title: string`
- `description?: string`
- `variant?: "soft" | "outline"`
- `size?: "sm" | "md"`
- `rootClass?: string`
- `panelClass?: string`

### Emits
- none

### Slots
- `actions`
- `default`

### Notes
- Panel wrapper for charts, metrics and rich data blocks.

---

## Checkbox

### Props
- `modelValue: boolean`
- `disabled?: boolean`
- `indeterminate?: boolean`
- `ariaLabel?: string`

### Emits
- `update:modelValue`

### Slots
- `default`

### Notes
- Uses semantic primary tokens for selected and partial states, so the check mark or partial indicator remains visible in both light and dark themes. Includes a keyboard-visible focus ring. `indeterminate` maps to the native checkbox's mixed state and exposes `aria-checked="mixed"`.

---

## Skeleton

### Props
- `width?: string` (default: `"100%"`)
- `height?: string` (default: `"1rem"`)
- `rounded?: "sm" | "md" | "lg" | "full"`
- `animate?: boolean` (default: `true`)

### Emits
- none

### Slots
- none

### Notes
- Neutral loading placeholder. It uses the active theme's muted token and disables motion when the operating system requests reduced motion.

---

## CodeBlock

### Props
- `code?: string`
- `rootClass?: string`

### Emits
- none

### Slots
- none

### Notes
- Lightweight monospace code/output block surface.

---

## CalloutBox

### Props
- `tone?: "neutral" | "success" | "warning" | "error" | "info"`
- `variant?: "soft" | "outline"`
- `size?: "sm" | "md"`
- `rootClass?: string`

### Emits
- none

### Slots
- `default`

### Notes
- Compact inline notice / explanation block.

---

## ConfirmDialog

### Props
- `open: boolean`
- `title: string`
- `message: string`
- `confirmText: string`
- `cancelText: string`
- `zIndex?: number` (default: `300`)
- `closeOnOverlay?: boolean` (default: `true`)
- `closeOnEscape?: boolean` (defaults to `closeOnOverlay`)

### Emits
- `confirm`
- `cancel`

### Slots
- none

### Notes
- Simple confirmation dialog for destructive or important actions. It layers above standard modals by default. Set `closeOnOverlay` or `closeOnEscape` to `false` when the decision must be explicit; enabled dismissal emits `cancel`.

---

## EmptyState

### Props
- `title: string`
- `description?: string`
- `tone?: "neutral" | "success" | "warning" | "error" | "info"`
- `variant?: "soft" | "outline"`
- `size?: "sm" | "md"`
- `plain?: boolean`
- `rootClass?: string`

### Emits
- none

### Slots
- `icon`
- `actions`

### Notes
- Use for empty pages, empty cards or empty sections.

---

## FieldGrid

### Props
- `columns?: 1 | 2 | 3 | 4`

### Emits
- none

### Slots
- `default`

### Notes
- Responsive layout helper for field groups.

---

## FilterSelect

### Props
- `modelValue: string | string[]`
- `options: Array<string | SelectOption>`
- `multiple?: boolean`
- `placeholder?: string`
- `placement?: MenuPlacement` (default: `"down"`)
- `size?: "sm" | "md"`
- `selectedIndicator?: "check" | "text" | "none"`
- `selectedIndicatorText?: string`
- `selectedCountText?: string`
- `disabled?: boolean`
- `ariaLabel?: string`

### Emits
- `update:modelValue`

### Slots
- none

### Notes
- Convenience wrapper around `SelectMenu` for compact toolbar filters.

---

## FormField

### Props
- `label: string`
- `hint?: string`
- `required?: boolean`
- `requiredText?: string`

### Emits
- none

### Slots
- `default`
- `label-extra`

### Notes
- Small label wrapper for inputs, controls and grouped field content.
- `requiredText` falls back to global locale (`setNanocatLocale`).

---

## FormSection

### Props
- `title?: string`
- `description?: string`
- `bodyClass?: string`
- `variant?: "soft" | "outline"`
- `size?: "sm" | "md"`
- `rootClass?: string`
- `panelClass?: string`

### Emits
- none

### Slots
- `default`
- `title-extra`

### Notes
- Section wrapper for grouped form blocks.

---

## GroupedSelectMenu

### Props
- `modelValue: string | string[]`
- `groups?: GroupedSelectGroup[]`
- `options?: GroupedSelectOption[]`
- `multiple?: boolean`
- `placeholder?: string`
- `disabled?: boolean`
- `ariaLabel?: string`
- `maxVisibleLabels?: number`
- `selectedCountText?: string`
- `selectedIndicator?: "check" | "none"`
- `showGroupLabels?: boolean`
- `groupLabelAlign?: "left" | "center" | "right"`
- `valueAlign?: "left" | "center" | "right"` (default: `"left"`)
- `placement?: MenuPlacement` (default: `"auto"`)
- `block?: boolean`

### Emits
- `update:modelValue`

### Slots
- none

### Notes
- Dropdown select for grouped filters.
- Group labels render as a small caption with a horizontal divider line.
- `showGroupLabels` can hide captions; `groupLabelAlign` controls whether captions sit left, centered, or right. `valueAlign` controls the selected value in the trigger without changing menu-item alignment.
- Supports multi-select without checkbox boxes; selected items use a compact check indicator.
- Menu density follows `SelectMenu`: 8px floating-panel padding, 4px item gap, and pill-shaped item hover/selected states. Arrow keys, Home/End, Escape, click-outside, and viewport changes are handled by the shared floating-panel runtime.
- Supports the same keyboard navigation and viewport-safe positioning as `SelectMenu`.

---

## HelpTip

### Props
- `text: string`

### Emits
- none

### Slots
- none

### Notes
- Compact inline help marker built on top of `Tooltip`.

---

## HoverCard

### Props
- `cardClass?: string`
- `offset?: number`
- `focusable?: boolean`

### Emits
- none

### Slots
- `default`
- `content`

### Notes
- Floating content card with automatic top/bottom placement. Set `focusable` when the trigger needs keyboard access; Enter and Space toggle the card, Escape closes it.

---

## Input

### Props
- `modelValue?: string | number`
- `type?: "text" | "password" | "email" | "url" | "search" | "number"`
- `placeholder?: string`
- `size?: "xs" | "sm" | "md"`
- `radius?: "pill" | "rounded"`
- `bordered?: boolean`
- `strong?: boolean`
- `disabled?: boolean`
- `readonly?: boolean`
- `block?: boolean`
- `rootClass?: string`

### Emits
- `update:modelValue`

### Slots
- none

### Notes
- Core compact text input component for forms, toolbars and settings panels.
- Prefer this over hand-writing `ui-input-*` classes.

---

## KeyValueList

### Props
- `items: KeyValueItem[]`
- `columns?: 1 | 2 | 3`
- `variant?: "soft" | "outline"`
- `size?: "sm" | "md"`
- `rootClass?: string`

### Emits
- none

### Slots
- none

### Notes
- Display helper for compact metadata and detail lists.

---

## MetaChip

### Props
- `tone?: "neutral" | "success" | "warning" | "error" | "info"`
- `variant?: "soft" | "outline" | "solid"`
- `size?: "xs" | "sm" | "md"`
- `radius?: "pill" | "rounded"`
- `bordered?: boolean` (default: `true`)
- `strong?: boolean` (default: `false`)
- `toneClass?: string`
- `chipClass?: string`

### Emits
- none

### Slots
- `default`

### Notes
- Small metadata chip for labels and compact inline status markers.
- Use `size="xs"` for dense table metadata, `radius="rounded"` for non-pill labels, and `strong` only when the value needs emphasis. `bordered` can remove the tone border without changing the fill.

---

## LoadingState

### Props
- `title?: string`
- `description?: string`
- `compact?: boolean`
- `align?: "center" | "start"` (default: `"center"`)
- `flush?: boolean` (default: `false`)

### Emits
- none

### Slots
- none

### Notes
- One stable loading status for pages, tables, dialogs, and operation progress.
- Use the centered default for initial page, table, and detail loading.
- Use `align="start"` with `flush` for progress streams that begin at the top of an existing content region.

---

## CloseButton

### Props
- `label?: string` (accessible name and tooltip)
- `icon?: string` (default: `"lucide:x"`)
- `disabled?: boolean`
- `tone?: "default" | "dark"`
- `size?: "sm" | "md"`
- `rootClass?: string`

### Emits
- `click`

### Slots
- none

### Notes
- Shared close control for dialogs, drawers, previews, and compact panels.
- `ModalShell` uses the same Module for its built-in close action.

---

## SideDock

### Props
- `open: boolean`
- `ariaLabel: string`
- `ariaDescribedby?: string`
- `zIndex?: number`
- `width?: string` (default: `"11rem"`)
- `rootClass?: string`

### Emits
- `click`

### Slots
- `default`

### Notes
- Teleported, non-modal entry docked to the right viewport edge for reopening minimized panels.
- Owns edge positioning, responsive mobile placement, focus treatment, shadow, and enter/leave motion; callers own all business content.

---

## DrawerShell

### Props
- `open: boolean`
- `title?: string`
- `description?: string`
- `maxWidth?: string` (default: `"32rem"`)
- `zIndex?: number`
- `closeText?: string`
- `showClose?: boolean`
- `closeOnOverlay?: boolean`
- `closeOnEscape?: boolean`
- `showBackdrop?: boolean` (default: `true`; set `false` for a detached, non-modal operation drawer that leaves the page interactive)
- `ariaLabel?: string`
- `bare?: boolean`
- `rootClass?: string`
- `overlayClass?: string`
- `headerClass?: string`
- `bodyClass?: string`
- `footerClass?: string`

### Emits
- `close`

### Slots
- `default`
- `header`
- `footer`

### Notes
- Right-side, viewport-bounded dialog built on `ModalShell`.
- Owns responsive height, edge spacing, and one subtle drawer transition. With a backdrop it also owns focus management and scroll locking; detached drawers leave the page interactive.
- Use `bare` when the application supplies its own header/body/footer layout; the drawer still owns geometry and motion.

---

## ModalShell

### Props
- `open: boolean`
- `title?: string`
- `description?: string`
- `sizeClass?: string`
- `rootClass?: string`
- `panelClass?: string`
- `overlayClass?: string`
- `headerClass?: string`
- `bodyClass?: string`
- `footerClass?: string`
- `closeText?: string`
- `showClose?: boolean`
- `closeOnOverlay?: boolean`
- `closeOnEscape?: boolean`
- `ariaLabel?: string`
- `bare?: boolean`
- `maxWidth?: string`
- `zIndex?: number`
- `align?: "center" | "start"`
- `placement?: "center" | "end"`
- `motion?: "none" | "drawer"` (default: `"none"`)
- `modal?: boolean` (default: `true`; set `false` only for non-blocking surfaces that must leave the page interactive)

### Emits
- `close`

### Slots
- `default`
- `header`
- `footer`

### Notes
- General-purpose modal wrapper with optional header and footer slots.
- `closeText` falls back to global locale (`setNanocatLocale`).
- Opening a modal shell with `modal=true` locks page scrolling, moves focus into the dialog, and keeps
  `Tab` focus inside it. Closing restores focus to the element that opened it.
- `Escape` follows `closeOnOverlay` unless `closeOnEscape` is explicitly set.
- Provide `title` or `ariaLabel`. `title` automatically wires the dialog name
  and `description` automatically wires the dialog description.
- In the default layout, the panel is bounded to the viewport and its body scrolls independently when content is taller than the available space.
- `bare` preserves the consumer-owned body layout while retaining overlay, focus, stacking, and scroll-lock behavior. It does not impose the standard flex/max-height panel layout.
- Use `zIndex` to define intentional layers (for example, confirmations at `300` above regular dialogs at `120`). The runtime resolves the active top modal by layer and then opening order, so nested dialogs keep focus and Escape behavior predictable.
- `bare` is appropriate for drawers, import surfaces, and other layouts that own their scrolling; the consumer must provide the content overflow behavior in that slot.
- Prefer `DrawerShell` over assembling `align="start"`, `placement="end"`, viewport height, and drawer motion at the call site.

---

## ResultState

### Props
- `title: string`
- `description?: string`
- `tone?: "neutral" | "success" | "warning" | "error" | "info"`
- `variant?: "soft" | "outline"`
- `size?: "xs" | "sm" | "md"`
- `radius?: "pill" | "rounded"`
- `bordered?: boolean`
- `rootClass?: string`

### Emits
- none

### Slots
- `icon`
- `actions`

### Notes
- Stronger result feedback block than `EmptyState`.

---

## SegmentedTabs

### Props
- `modelValue: SegmentedValue`
- `options: SegmentedOption[]`
- `ariaLabel?: string`
- `fit?: "content" | "stretch"` (default: `"content"`)

### Emits
- `update:modelValue`

### Slots
- none

### Notes
- Segmented switch for compact tabs and state toggles.
- `content` keeps labels at their natural width; `stretch` fills the parent. Overflow scrolls horizontally instead of wrapping controls onto a second line.

---

## SelectMenu

### Props
- `modelValue: string | string[]`
- `options: Array<string | SelectOption>`
- `multiple?: boolean`
- `placeholder?: string`
- `placement?: MenuPlacement` (default: `"down"`)
- `autoWidth?: boolean`
- `width?: "full" | "trigger"`
- `variant?: "default" | "toolbar"`
- `selectedIndicator?: "check" | "text" | "none"`
- `disabled?: boolean`
- `ariaLabel?: string`
- `valueAlign?: "left" | "center" | "right"` (default: `"left"`)
- `maxVisibleLabels?: number`
- `selectedIndicatorText?: string`
- `selectedCountText?: string`

### Emits
- `update:modelValue`

### Slots
- none

### Notes
- Core selection dropdown for forms and filters.
- Prefer `variant="toolbar"` instead of relying on `autoWidth` directly.
- Placeholder and selected text fall back to global locale.
- `MenuPlacement` accepts `"up"`, `"down"`, `"top"`, `"bottom"`, `"left"`, `"right"`, and `"auto"`.

---

## StatCard

### Props
- `label: string`
- `value: string | number`
- `caption?: string`
- `icon?: string`
- `iconTone?: "neutral" | "success" | "warning" | "error" | "info"`
- `iconBg?: string`
- `iconColor?: string`
- `variant?: "soft" | "outline"`
- `size?: "sm" | "md"`
- `rootClass?: string`
- `panelClass?: string`

### Emits
- none

### Slots
- none

### Notes
- Compact metric card for summary values and highlights.

---

## StatusDetailPill

### Props
- `label: string`
- `tone?: "neutral" | "success" | "warning" | "error" | "info"`
- `variant?: "soft" | "outline" | "solid"`
- `size?: "xs" | "sm" | "md"`
- `radius?: "pill" | "rounded"`
- `bordered?: boolean` (default: `true`)
- `toneClass?: string`
- `title?: string`
- `detailLabel?: string`
- `detail: string`
- `rawError?: string`
- `rawErrorLabel?: string`
- `cardClass?: string`

### Emits
- none

### Slots
- inherited content layout from `StatusPill`

### Notes
- Extended status chip with extra detail and raw error support.
- Use `size="xs"` and `radius="rounded"` for dense diagnostics tables; `bordered` controls the tone border independently from the fill.
- `title`, `detailLabel`, and `rawErrorLabel` fall back to global locale.

---

## StatusPill

### Props
- `label: string`
- `tone?: "neutral" | "success" | "warning" | "error" | "info"`
- `variant?: "soft" | "outline" | "solid"`
- `size?: "xs" | "sm" | "md"`
- `radius?: "pill" | "rounded"`
- `bordered?: boolean`
- `toneClass?: string`
- `title?: string`
- `detail?: string`
- `cardClass?: string`
- `pillClass?: string`

### Emits
- none

### Slots
- `content`

### Notes
- Status chip with hover content support. A hover card is only created when a title, detail, or `content` slot is present.

---

## TableShell

### Props
- `loading?: boolean`
- `loadingColspan?: number` (defaults to `emptyColspan`)
- `loadingTitle?: string`
- `loadingDescription?: string`
- `showEmpty?: boolean`
- `emptyColspan?: number`
- `emptyTitle?: string`
- `emptyDescription?: string`
- `variant?: "soft" | "outline"`
- `size?: "sm" | "md"`
- `fill?: boolean`
- `scrollMode?: "auto" | "contained" | "page"` (default: `"auto"`)
- `hoverRows?: boolean`
- `stickyHeader?: boolean`
- `footerBorder?: boolean`
- `unframed?: boolean`
- `rootClass?: string`
- `wrapperClass?: string`
- `scrollClass?: string`
- `tableClass?: string`
- `headClass?: string`
- `bodyClass?: string`
- `footerClass?: string`

### Emits
- none

### Slots
- `colgroup`
- `head`
- `loading`
- `empty`
- `footer`
- default row content

### Notes
- Scroll-safe table wrapper with built-in loading and empty states. Loading takes precedence over the empty state and uses a compact status spinner instead of skeleton rows.
- `fill` makes the shell consume the available height of a constrained flex parent and moves horizontal and vertical scrolling into the table body region.
- `scrollMode="contained"` selects that constrained scrolling layout explicitly. `scrollMode="page"` lets table rows expand with the page and overrides the legacy `fill` flag; `auto` preserves the existing `fill` behavior.
- `hoverRows` adds the shared data-row hover treatment. Rows marked with `aria-selected="true"` keep their selected surface instead of being covered by hover.
- `stickyHeader` keeps the table header visible inside the scroll region. It is normally paired with `fill`.
- On narrow Chromium/WebKit viewports, the table keeps its horizontal scrollbar and hides the redundant inner vertical thumb.
- `wrapperClass` remains the 0.1.7 compatibility alias for `rootClass`; when both are set, `rootClass` wins. Use `scrollClass` for scrolling-layer customizations.
- The `footer` remains outside the scroll region; `footerBorder` adds its top divider.
- The default empty state is visually integrated into the table without adding a nested surface.
- Loading and empty content follow the width of the table's scroll container and wrap long text, including when the table itself has a larger minimum width. In a constrained `fill` layout, the state is centered in the available table region.
- In `fill` layouts, horizontal overscroll stays inside the table, while vertical wheel scrolling returns to the page at an empty state or a scroll boundary.
- `loadingTitle` and `emptyTitle` fall back to the global locale (`setNanocatLocale`).

---

## Toast

### Props
- `toasts: ToastItem[]`

### Emits
- `remove`

### Slots
- none

### Notes
- Toast stack renderer with built-in tone styling.

---

## ToolbarShell

### Props
- `stackOnMobile?: boolean`
- `startClass?: string`
- `endClass?: string`

### Emits
- none

### Slots
- `start`
- `end`

### Notes
- Flexible toolbar layout helper for filters, actions and summaries.

---

## Tooltip

### Props
- `text: string`
- `offset?: number`
- `placement?: "top" | "right" | "bottom" | "left"` (default: `"top"`)

### Emits
- none

### Slots
- `default`

### Notes
- Small floating text tooltip with opposite-side fallback, viewport clamping, and scroll/resize repositioning.

---

## ValueSurface

### Props
- `value?: string | number`
- `tag?: string`
- `mono?: boolean`
- `size?: "sm" | "md"`
- `emphasis?: "default" | "muted"`
- `breakMode?: "normal" | "words" | "all"`
- `rootClass?: string`

### Emits
- none

### Slots
- `default`

### Notes
- Minimal value / code / endpoint surface for read-only text blocks.
- Useful for API endpoints, tokens, ids and compact metadata displays.

---

## ViewModeSwitch

### Props
- `modelValue: "list" | "cards"`
- `listLabel?: string`
- `cardsLabel?: string`

### Emits
- `update:modelValue`

### Slots
- none

### Notes
- Compact toggle for list / card presentation modes.
- Labels fall back to global locale.
