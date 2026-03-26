<template>
  <div class="grid gap-3" :class="columnsClass">
    <div
      v-for="item in items"
      :key="item.key ?? item.label"
      class="rounded-2xl border border-border bg-card/70 px-4 py-3"
    >
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <p class="text-xs text-muted-foreground">{{ item.label }}</p>
          <p
            class="mt-1 break-words text-sm font-medium text-foreground"
            :class="{ 'font-mono text-[13px]': item.mono }"
          >
            {{ item.value }}
          </p>
        </div>
        <span
          v-if="item.badge"
          class="rounded-md px-2 py-0.5 text-[11px] font-semibold"
          :class="item.badgeClass || 'bg-secondary text-foreground'"
        >
          {{ item.badge }}
        </span>
      </div>
      <p v-if="item.hint" class="mt-1 text-xs text-muted-foreground">{{ item.hint }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { KeyValueItem } from '../types'

const props = withDefaults(
  defineProps<{
    items: KeyValueItem[]
    columns?: 1 | 2 | 3
  }>(),
  {
    columns: 1,
  }
)

const columnsClass = computed(() => {
  if (props.columns === 3) return 'md:grid-cols-2 xl:grid-cols-3'
  if (props.columns === 2) return 'md:grid-cols-2'
  return ''
})
</script>
