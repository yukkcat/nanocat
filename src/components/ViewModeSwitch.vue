<template>
  <div class="flex items-center gap-2">
    <button
      type="button"
      class="flex h-8 w-8 items-center justify-center rounded-full border transition-colors"
      :class="modelValue === 'list'
        ? 'border-primary bg-primary/10 text-primary'
        : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'"
      title="列表视图"
      aria-label="列表视图"
      @click="emit('update:modelValue', 'list')"
    >
      <svg viewBox="0 0 20 20" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round">
        <path d="M4 5.5h12" />
        <path d="M4 10h12" />
        <path d="M4 14.5h12" />
      </svg>
    </button>

    <button
      type="button"
      class="flex h-8 w-8 items-center justify-center rounded-full border transition-colors"
      :class="modelValue === 'cards'
        ? 'border-primary bg-primary/10 text-primary'
        : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'"
      title="卡片视图"
      aria-label="卡片视图"
      @click="emit('update:modelValue', 'cards')"
    >
      <svg viewBox="0 0 20 20" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3.5" y="3.5" width="5.5" height="5.5" rx="1" />
        <rect x="11" y="3.5" width="5.5" height="5.5" rx="1" />
        <rect x="3.5" y="11" width="5.5" height="5.5" rx="1" />
        <rect x="11" y="11" width="5.5" height="5.5" rx="1" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: 'list' | 'cards'
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: 'list' | 'cards'): void
}>()
</script>
