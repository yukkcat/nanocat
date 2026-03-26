# Components

This file lists the main public props for the current components.

## ActionMenu
- `label: string`
- `items: ActionMenuItem[]`
- `disabled?: boolean`
- `align?: "left" | "right"`
- `buttonClass?: string`
- `menuClass?: string`

## CardHeader
- `title: string`
- `description?: string`
- `compact?: boolean`

## ChartCard
- `title: string`
- `description?: string`

## Checkbox
- `modelValue: boolean`
- `disabled?: boolean`

## ConfirmDialog
- `open: boolean`
- `title: string`
- `message: string`
- `confirmText: string`
- `cancelText: string`

## EmptyState
- `title: string`
- `description?: string`
- `textClass?: string`
- `plain?: boolean`

## FieldGrid
- `columns?: 1 | 2 | 3 | 4`

## FilterSelect
- `modelValue: string | string[]`
- `options: Array<string | { label: string; value: string }>`
- `multiple?: boolean`
- `placeholder?: string`
- `placement?: "up" | "down"`
- `selectedIndicator?: "check" | "text" | "none"`

## FormField
- `label: string`
- `hint?: string`
- `required?: boolean`

## FormSection
- `title?: string`
- `description?: string`
- `bodyClass?: string`

## HelpTip
- `text: string`

## HoverCard
- `cardClass?: string`
- `offset?: number`

## KeyValueList
- `items: KeyValueItem[]`
- `columns?: 1 | 2 | 3`

## MetaChip
- `toneClass?: string`

## ModalShell
- `open: boolean`
- `title?: string`
- `description?: string`
- `sizeClass?: string`
- `panelClass?: string`
- `overlayClass?: string`
- `headerClass?: string`
- `bodyClass?: string`
- `footerClass?: string`
- `closeText?: string`
- `showClose?: boolean`
- `closeOnOverlay?: boolean`

## ResultState
- `title: string`
- `description?: string`
- `tone?: "neutral" | "success" | "warning" | "error"`

## SegmentedTabs
- `modelValue: SegmentedValue`
- `options: SegmentedOption[]`
- `ariaLabel?: string`

## SelectMenu
- `modelValue: string | string[]`
- `options: Array<string | { label: string; value: string }>`
- `multiple?: boolean`
- `placeholder?: string`
- `placement?: "up" | "down"`
- `autoWidth?: boolean`
- `selectedIndicator?: "check" | "text" | "none"`

## StatCard
- `label: string`
- `value: string | number`
- `caption?: string`
- `icon?: string`
- `iconBg?: string`
- `iconColor?: string`

## StatusDetailPill
- `label: string`
- `toneClass: string`
- `title?: string`
- `detailLabel?: string`
- `detail: string`
- `rawError?: string`
- `cardClass?: string`

## StatusPill
- `label: string`
- `toneClass: string`
- `title?: string`
- `detail?: string`
- `cardClass?: string`

## TableShell
- `showEmpty?: boolean`
- `emptyColspan?: number`
- `emptyTitle?: string`
- `emptyDescription?: string`
- `wrapperClass?: string`
- `tableClass?: string`
- `headClass?: string`
- `bodyClass?: string`

## Toast
- `toasts: ToastItem[]`
- event: `remove`

## ToolbarShell
- `stackOnMobile?: boolean`
- `startClass?: string`
- `endClass?: string`

## Tooltip
- `text: string`
- `offset?: number`

## ViewModeSwitch
- `modelValue: "list" | "cards"`
