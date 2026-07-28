export type ActionMenuItem = {
  key: string
  label: string
  danger?: boolean
  disabled?: boolean
  dividerBefore?: boolean
  active?: boolean
  heading?: boolean
  children?: ActionMenuItem[]
}

export type MenuPlacement = 'auto' | 'top' | 'bottom' | 'left' | 'right' | 'up' | 'down'

export type SelectOption = {
  label: string
  value: string
  disabled?: boolean
}

export type GroupedSelectOption = SelectOption

export type GroupedSelectGroup = {
  label?: string
  options: GroupedSelectOption[]
}

export type SegmentedValue = string | number

export type SegmentedFit = 'content' | 'stretch'

export type SegmentedOption = {
  label: string
  value: SegmentedValue
  count?: string | number
  disabled?: boolean
}

export type ToastItem = {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration?: number
}

export type KeyValueItem = {
  label: string
  value: string
  hint?: string
  key?: string
  mono?: boolean
  badge?: string
  badgeClass?: string
}

export type StatCardIconTone = 'neutral' | 'success' | 'warning' | 'error' | 'info'
export type ButtonSize = 'xs' | 'sm' | 'md'
export type ButtonVariant = 'outline' | 'primary' | 'danger'

export type { ChipRadius, ChipSize, UiSize, UiTone, UiVariant, UiSurfaceVariant } from './presets'
