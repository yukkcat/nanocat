export type ActionMenuItem = {
  key: string
  label: string
  danger?: boolean
  disabled?: boolean
  dividerBefore?: boolean
}

export type SegmentedValue = string | number

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
