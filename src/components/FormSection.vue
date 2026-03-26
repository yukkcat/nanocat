<template>
  <div class="rounded-xl border border-border bg-card p-3">
    <div v-if="title || description || $slots['title-extra']" class="mb-2.5">
      <div v-if="title || $slots['title-extra']" class="flex items-center justify-between gap-2">
        <p v-if="title" class="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{{ title }}</p>
        <slot name="title-extra" />
      </div>
      <p v-if="description" class="mt-1 text-xs text-muted-foreground">{{ description }}</p>
    </div>
    <div :class="bodyClass">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    description?: string
    bodyClass?: string
  }>(),
  {
    title: '',
    description: '',
    bodyClass: 'space-y-3',
  }
)
</script>
