<template>
  <div class="flex items-center justify-between gap-3" :class="compact ? '' : 'mb-4'">
    <div class="min-w-0">
      <p class="ui-subsection-title">{{ title }}</p>
      <p v-if="description" class="mt-1 text-xs text-muted-foreground">{{ description }}</p>
    </div>
    <div v-if="$slots.actions" class="flex shrink-0 items-center gap-2">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    description?: string
    compact?: boolean
  }>(),
  {
    description: '',
    compact: false,
  }
)
</script>
