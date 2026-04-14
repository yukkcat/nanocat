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
- `size?: "sm" | "md"`
- `triggerClass?: string`
- `buttonClass?: string`
- `contentClass?: string`
- `menuClass?: string`

### Emits
- `select`

### Slots
- none

### Notes
- Best for compact action dropdowns in toolbars, cards and table rows.

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

### Emits
- `update:modelValue`

### Slots
- `default`

### Notes
- Lightweight checkbox with label slot support.

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

### Emits
- `confirm`
- `cancel`

### Slots
- none

### Notes
- Simple confirmation dialog for destructive or important actions.

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
- `placement?: "up" | "down"`
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

### Emits
- none

### Slots
- `default`
- `content`

### Notes
- Floating content card with automatic top/bottom placement.

---

## Input

### Props
- `modelValue?: string | number`
- `type?: "text" | "password" | "email" | "url" | "search" | "number"`
- `placeholder?: string`
- `size?: "sm" | "md"`
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
- `size?: "sm" | "md"`
- `toneClass?: string`
- `chipClass?: string`

### Emits
- none

### Slots
- `default`

### Notes
- Small metadata chip for labels and compact inline status markers.

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

### Emits
- `close`

### Slots
- `default`
- `header`
- `footer`

### Notes
- General-purpose modal wrapper with optional header and footer slots.
- `closeText` falls back to global locale (`setNanocatLocale`).

---

## ResultState

### Props
- `title: string`
- `description?: string`
- `tone?: "neutral" | "success" | "warning" | "error" | "info"`
- `variant?: "soft" | "outline"`
- `size?: "sm" | "md"`
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

### Emits
- `update:modelValue`

### Slots
- none

### Notes
- Segmented switch for compact tabs and state toggles.

---

## SelectMenu

### Props
- `modelValue: string | string[]`
- `options: Array<string | SelectOption>`
- `multiple?: boolean`
- `placeholder?: string`
- `placement?: "up" | "down"`
- `autoWidth?: boolean`
- `width?: "full" | "trigger"`
- `variant?: "default" | "toolbar"`
- `selectedIndicator?: "check" | "text" | "none"`
- `disabled?: boolean`
- `ariaLabel?: string`
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
- `size?: "sm" | "md"`
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
- `title`, `detailLabel`, and `rawErrorLabel` fall back to global locale.

---

## StatusPill

### Props
- `label: string`
- `tone?: "neutral" | "success" | "warning" | "error" | "info"`
- `variant?: "soft" | "outline" | "solid"`
- `size?: "sm" | "md"`
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
- Status chip with hover content support.

---

## TableShell

### Props
- `showEmpty?: boolean`
- `emptyColspan?: number`
- `emptyTitle?: string`
- `emptyDescription?: string`
- `variant?: "soft" | "outline"`
- `size?: "sm" | "md"`
- `rootClass?: string`
- `wrapperClass?: string`
- `tableClass?: string`
- `headClass?: string`
- `bodyClass?: string`

### Emits
- none

### Slots
- `head`
- `empty`
- default row content

### Notes
- Scroll-safe table wrapper with built-in empty-state support.
- `emptyTitle` falls back to global locale (`setNanocatLocale`).

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

### Emits
- none

### Slots
- `default`

### Notes
- Small floating text tooltip.

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
