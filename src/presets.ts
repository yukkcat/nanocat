export type UiSize = 'sm' | 'md'
export type UiTone = 'neutral' | 'success' | 'warning' | 'error' | 'info'
export type UiVariant = 'soft' | 'outline' | 'solid'
export type UiSurfaceVariant = Extract<UiVariant, 'soft' | 'outline'>

const toneClassMap: Record<UiTone, Record<UiVariant, string>> = {
  neutral: {
    soft: 'border-border/70 bg-background/80 text-foreground/80',
    outline: 'border-border/80 bg-card/45 text-foreground/85',
    solid: 'border-foreground/10 bg-foreground text-background',
  },
  success: {
    soft: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-700',
    outline: 'border-emerald-500/35 bg-emerald-500/[0.03] text-emerald-700',
    solid: 'border-emerald-500/20 bg-emerald-500 text-white',
  },
  warning: {
    soft: 'border-amber-500/22 bg-amber-500/10 text-amber-700',
    outline: 'border-amber-500/35 bg-amber-500/[0.03] text-amber-700',
    solid: 'border-amber-500/20 bg-amber-500 text-white',
  },
  error: {
    soft: 'border-rose-500/20 bg-rose-500/10 text-rose-700',
    outline: 'border-rose-500/35 bg-rose-500/[0.03] text-rose-700',
    solid: 'border-rose-500/20 bg-rose-500 text-white',
  },
  info: {
    soft: 'border-sky-500/20 bg-sky-500/10 text-sky-700',
    outline: 'border-sky-500/35 bg-sky-500/[0.03] text-sky-700',
    solid: 'border-sky-500/20 bg-sky-500 text-white',
  },
}

const sizeClassMap: Record<UiSize, {
  control: string
  iconButton: string
  indicatorSlot: string
  triggerMinWidth: string
  triggerMinWidthToolbar: string
  text: string
  pill: string
  chip: string
  menuItem: string
}> = {
  sm: {
    control: 'h-8 px-3 text-xs',
    iconButton: 'h-8 w-8',
    indicatorSlot: 'w-10',
    triggerMinWidth: 'min-w-[12rem]',
    triggerMinWidthToolbar: 'min-w-[8.75rem]',
    text: 'text-[11px]',
    pill: 'px-3.5 py-1.5',
    chip: 'px-3.5 py-1.5',
    menuItem: 'h-9 px-3.5 text-[11px]',
  },
  md: {
    control: 'h-9 px-3.5 text-sm',
    iconButton: 'h-9 w-9',
    indicatorSlot: 'w-12',
    triggerMinWidth: 'min-w-[13rem]',
    triggerMinWidthToolbar: 'min-w-[9.5rem]',
    text: 'text-xs',
    pill: 'px-4 py-2',
    chip: 'px-4 py-2',
    menuItem: 'h-10 px-4 text-xs',
  },
}

export function getToneClasses(tone: UiTone = 'neutral', variant: UiVariant = 'soft') {
  return toneClassMap[tone][variant]
}

export function getSizeClasses(size: UiSize = 'sm') {
  return sizeClassMap[size]
}

const stateToneClassMap: Record<Exclude<UiTone, 'info'> | 'info', Record<UiSurfaceVariant, {
  wrapper: string
  icon: string
  title: string
  description: string
}>> = {
  neutral: {
    soft: {
      wrapper: 'border-border/80 bg-card/80',
      icon: 'text-muted-foreground',
      title: 'text-foreground',
      description: 'text-muted-foreground',
    },
    outline: {
      wrapper: 'border-border/90 bg-transparent',
      icon: 'text-muted-foreground',
      title: 'text-foreground',
      description: 'text-muted-foreground',
    },
  },
  success: {
    soft: {
      wrapper: 'border-[hsl(var(--tone-success-border)/0.9)] bg-[hsl(var(--tone-success-bg)/0.8)]',
      icon: 'text-[hsl(var(--tone-success-strong))]',
      title: 'text-[hsl(var(--tone-success-foreground))]',
      description: 'text-[hsl(var(--tone-success-foreground))]',
    },
    outline: {
      wrapper: 'border-[hsl(var(--tone-success-border))] bg-transparent',
      icon: 'text-[hsl(var(--tone-success-strong))]',
      title: 'text-[hsl(var(--tone-success-foreground))]',
      description: 'text-[hsl(var(--tone-success-foreground))]',
    },
  },
  warning: {
    soft: {
      wrapper: 'border-[hsl(var(--tone-warning-border)/0.9)] bg-[hsl(var(--tone-warning-bg)/0.8)]',
      icon: 'text-[hsl(var(--tone-warning-strong))]',
      title: 'text-[hsl(var(--tone-warning-foreground))]',
      description: 'text-[hsl(var(--tone-warning-foreground))]',
    },
    outline: {
      wrapper: 'border-[hsl(var(--tone-warning-border))] bg-transparent',
      icon: 'text-[hsl(var(--tone-warning-strong))]',
      title: 'text-[hsl(var(--tone-warning-foreground))]',
      description: 'text-[hsl(var(--tone-warning-foreground))]',
    },
  },
  error: {
    soft: {
      wrapper: 'border-[hsl(var(--tone-error-border)/0.9)] bg-[hsl(var(--tone-error-bg)/0.8)]',
      icon: 'text-[hsl(var(--tone-error-strong))]',
      title: 'text-[hsl(var(--tone-error-foreground))]',
      description: 'text-[hsl(var(--tone-error-foreground))]',
    },
    outline: {
      wrapper: 'border-[hsl(var(--tone-error-border))] bg-transparent',
      icon: 'text-[hsl(var(--tone-error-strong))]',
      title: 'text-[hsl(var(--tone-error-foreground))]',
      description: 'text-[hsl(var(--tone-error-foreground))]',
    },
  },
  info: {
    soft: {
      wrapper: 'border-[hsl(var(--tone-info-border)/0.9)] bg-[hsl(var(--tone-info-bg)/0.8)]',
      icon: 'text-[hsl(var(--tone-info-strong))]',
      title: 'text-[hsl(var(--tone-info-foreground))]',
      description: 'text-[hsl(var(--tone-info-foreground))]',
    },
    outline: {
      wrapper: 'border-[hsl(var(--tone-info-border))] bg-transparent',
      icon: 'text-[hsl(var(--tone-info-strong))]',
      title: 'text-[hsl(var(--tone-info-foreground))]',
      description: 'text-[hsl(var(--tone-info-foreground))]',
    },
  },
}

const stateSizeClassMap: Record<UiSize, {
  wrapper: string
  title: string
  description: string
}> = {
  sm: {
    wrapper: 'px-5 py-7',
    title: 'text-sm',
    description: 'text-sm',
  },
  md: {
    wrapper: 'px-6 py-8',
    title: 'text-base',
    description: 'text-[15px]',
  },
}

const sectionSizeClassMap: Record<UiSize, {
  title: string
  description: string
  spacing: string
}> = {
  sm: {
    title: 'text-sm',
    description: 'text-xs leading-5',
    spacing: 'mb-4 pb-3',
  },
  md: {
    title: 'text-base',
    description: 'text-sm leading-6',
    spacing: 'mb-5 pb-4',
  },
}

const dataBlockSizeClassMap: Record<UiSize, {
  wrapper: string
  label: string
  value: string
  hint: string
  badge: string
}> = {
  sm: {
    wrapper: 'px-4 py-3.5',
    label: 'text-[11px]',
    value: 'text-sm',
    hint: 'text-xs leading-5',
    badge: 'px-2.5 py-1 text-[10px]',
  },
  md: {
    wrapper: 'px-4.5 py-4',
    label: 'text-xs',
    value: 'text-[15px]',
    hint: 'text-sm leading-6',
    badge: 'px-3 py-1 text-[11px]',
  },
}

const tableShellVariantMap: Record<UiSurfaceVariant, {
  wrapper: string
  head: string
  empty: string
}> = {
  soft: {
    wrapper: 'rounded-3xl border border-border/80 bg-card/90 shadow-[var(--shadow-inset-soft)]',
    head: 'bg-muted/25 text-muted-foreground',
    empty: 'px-4 py-6',
  },
  outline: {
    wrapper: 'rounded-3xl border border-border/90 bg-transparent',
    head: 'bg-transparent text-muted-foreground',
    empty: 'px-4 py-6',
  },
}

export function getStateToneClasses(tone: UiTone = 'neutral', variant: UiSurfaceVariant = 'soft') {
  return stateToneClassMap[tone][variant]
}

export function getStateSizeClasses(size: UiSize = 'sm') {
  return stateSizeClassMap[size]
}

export function getSectionSizeClasses(size: UiSize = 'sm') {
  return sectionSizeClassMap[size]
}

export function getDataBlockSizeClasses(size: UiSize = 'sm') {
  return dataBlockSizeClassMap[size]
}

const dataBlockVariantMap: Record<UiSurfaceVariant, {
  wrapper: string
  badge: string
}> = {
  soft: {
    wrapper: 'border-border/80 bg-card/85',
    badge: 'border-border/80 bg-card',
  },
  outline: {
    wrapper: 'border-border/90 bg-transparent',
    badge: 'border-border/90 bg-transparent',
  },
}

export function getDataBlockVariantClasses(variant: UiSurfaceVariant = 'soft') {
  return dataBlockVariantMap[variant]
}

export function getTableShellVariantClasses(variant: UiSurfaceVariant = 'soft') {
  return tableShellVariantMap[variant]
}

const panelVariantMap: Record<UiSurfaceVariant, string> = {
  soft: 'border border-border bg-card',
  outline: 'border border-border bg-transparent',
}

const panelSizeMap: Record<UiSize, {
  panel: string
  title: string
  description: string
  statValue: string
  statCaption: string
}> = {
  sm: {
    panel: 'rounded-xl p-3',
    title: 'text-sm',
    description: 'text-xs leading-5',
    statValue: 'text-2xl',
    statCaption: 'text-xs leading-relaxed',
  },
  md: {
    panel: 'rounded-2xl p-4',
    title: 'text-base',
    description: 'text-sm leading-6',
    statValue: 'text-[1.75rem]',
    statCaption: 'text-sm leading-6',
  },
}

const toolbarSizeMap: Record<UiSize, {
  gap: string
  groupGap: string
  menuButton: string
}> = {
  sm: {
    gap: 'gap-3',
    groupGap: 'gap-2',
    menuButton: 'ui-btn-xs',
  },
  md: {
    gap: 'gap-4',
    groupGap: 'gap-2.5',
    menuButton: 'ui-btn-sm',
  },
}

export function getPanelVariantClasses(variant: UiSurfaceVariant = 'soft') {
  return panelVariantMap[variant]
}

export function getPanelSizeClasses(size: UiSize = 'sm') {
  return panelSizeMap[size]
}

export function getToolbarSizeClasses(size: UiSize = 'sm') {
  return toolbarSizeMap[size]
}

export function resolveRootClass(rootClass = '', legacyClass = '') {
  return rootClass || legacyClass
}
