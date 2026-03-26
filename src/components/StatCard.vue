<template>
  <div class="ui-panel !p-4">
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0 flex-1">
        <p class="ui-section-kicker">{{ label }}</p>
        <p class="mt-2 text-2xl font-semibold text-foreground tabular-nums">{{ value }}</p>
        <p v-if="caption" class="mt-1.5 text-xs leading-relaxed text-muted-foreground">{{ caption }}</p>
      </div>
      <div
        v-if="icon"
        class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
        :class="iconBg"
      >
        <Icon :icon="icon" class="h-4 w-4" :class="iconColor" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

withDefaults(
  defineProps<{
    label: string
    value: string | number
    caption?: string
    icon?: string
    iconBg?: string
    iconColor?: string
  }>(),
  {
    caption: '',
    icon: '',
    iconBg: '',
    iconColor: '',
  }
)
</script>
