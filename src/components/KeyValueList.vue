<template>
  <div class="grid gap-3" :class="[columnsClass, resolvedRootClass]">
    <div
      v-for="item in items"
      :key="item.key ?? item.label"
      class="rounded-2xl border shadow-[var(--shadow-inset-soft)]"
      :class="[variantClasses.wrapper, sizeClasses.wrapper]"
    >
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <p class="font-medium tracking-[0.02em] text-muted-foreground" :class="sizeClasses.label">{{ item.label }}</p>
          <p
            class="mt-1.5 break-words font-semibold text-foreground"
            :class="[sizeClasses.value, { 'font-mono text-[13px]': item.mono }]"
          >
            {{ item.value }}
          </p>
        </div>
        <span
          v-if="item.badge"
          class="rounded-full border font-semibold leading-none"
          :class="[variantClasses.badge, sizeClasses.badge, item.badgeClass || 'text-foreground']"
        >
          {{ item.badge }}
        </span>
      </div>
      <p v-if="item.hint" class="mt-2 text-muted-foreground" :class="sizeClasses.hint">{{ item.hint }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getDataBlockSizeClasses, getDataBlockVariantClasses, resolveRootClass } from '../presets'
import type { KeyValueItem, UiSize, UiSurfaceVariant } from '../types'

const props = withDefaults(
  defineProps<{
    items: KeyValueItem[]
    columns?: 1 | 2 | 3
    variant?: UiSurfaceVariant
    size?: UiSize
    rootClass?: string
  }>(),
  {
    columns: 1,
    variant: 'soft',
    size: 'sm',
    rootClass: '',
  }
)

const sizeClasses = computed(() => getDataBlockSizeClasses(props.size))
const variantClasses = computed(() => getDataBlockVariantClasses(props.variant))
const resolvedRootClass = computed(() => resolveRootClass(props.rootClass))

const columnsClass = computed(() => {
  if (props.columns === 3) return 'md:grid-cols-2 xl:grid-cols-3'
  if (props.columns === 2) return 'md:grid-cols-2'
  return ''
})
</script>
