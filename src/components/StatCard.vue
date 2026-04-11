<template>
  <div :class="[panelVariantClass, sizeClasses.panel, resolvedRootClass]">
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0 flex-1">
        <p class="ui-section-kicker" :class="sizeClasses.description">{{ label }}</p>
        <p class="mt-2 font-semibold text-foreground tabular-nums" :class="sizeClasses.statValue">{{ value }}</p>
        <p v-if="caption" class="mt-1.5 text-muted-foreground" :class="sizeClasses.statCaption">{{ caption }}</p>
      </div>
      <div
        v-if="icon"
        class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
        :class="resolvedIconBg"
      >
        <Icon :icon="icon" class="h-4 w-4" :class="resolvedIconColor" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { getPanelSizeClasses, getPanelVariantClasses, resolveRootClass } from '../presets'
import type { StatCardIconTone, UiSize, UiSurfaceVariant } from '../types'

const props = withDefaults(
  defineProps<{
    label: string
    value: string | number
    caption?: string
    icon?: string
    iconTone?: StatCardIconTone
    iconBg?: string
    iconColor?: string
    variant?: UiSurfaceVariant
    size?: UiSize
    rootClass?: string
    panelClass?: string
  }>(),
  {
    caption: '',
    icon: '',
    iconTone: 'neutral',
    iconBg: '',
    iconColor: '',
    variant: 'soft',
    size: 'sm',
    rootClass: '',
    panelClass: '!p-4',
  }
)

const panelVariantClass = computed(() => getPanelVariantClasses(props.variant))
const sizeClasses = computed(() => getPanelSizeClasses(props.size))
const resolvedRootClass = computed(() => resolveRootClass(props.rootClass, props.panelClass))
const iconToneMap: Record<StatCardIconTone, { bg: string; color: string }> = {
  neutral: {
    bg: 'bg-secondary/70',
    color: 'text-foreground',
  },
  success: {
    bg: 'bg-[hsl(var(--tone-success-bg)/0.95)]',
    color: 'text-[hsl(var(--tone-success-strong))]',
  },
  warning: {
    bg: 'bg-[hsl(var(--tone-warning-bg)/0.95)]',
    color: 'text-[hsl(var(--tone-warning-strong))]',
  },
  error: {
    bg: 'bg-[hsl(var(--tone-error-bg)/0.95)]',
    color: 'text-[hsl(var(--tone-error-strong))]',
  },
  info: {
    bg: 'bg-[hsl(var(--tone-info-bg)/0.95)]',
    color: 'text-[hsl(var(--tone-info-strong))]',
  },
}
const resolvedIconBg = computed(() => props.iconBg || iconToneMap[props.iconTone].bg)
const resolvedIconColor = computed(() => props.iconColor || iconToneMap[props.iconTone].color)
</script>
