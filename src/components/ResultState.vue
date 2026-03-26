<template>
  <div
    class="rounded-2xl border px-4 py-6 text-center"
    :class="toneClasses.wrapper"
  >
    <div v-if="$slots.icon" class="mb-3 flex justify-center" :class="toneClasses.icon">
      <slot name="icon" />
    </div>
    <p class="text-sm font-medium" :class="toneClasses.title">{{ title }}</p>
    <p v-if="description" class="mt-1 text-sm" :class="toneClasses.description">{{ description }}</p>
    <div v-if="$slots.actions" class="mt-4 flex justify-center">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    title: string
    description?: string
    tone?: 'neutral' | 'success' | 'warning' | 'error'
  }>(),
  {
    description: '',
    tone: 'neutral',
  }
)

const toneClasses = computed(() => {
  if (props.tone === 'success') {
    return {
      wrapper: 'border-emerald-200 bg-emerald-50/70',
      icon: 'text-emerald-600',
      title: 'text-emerald-900',
      description: 'text-emerald-700',
    }
  }
  if (props.tone === 'warning') {
    return {
      wrapper: 'border-amber-200 bg-amber-50/70',
      icon: 'text-amber-600',
      title: 'text-amber-900',
      description: 'text-amber-700',
    }
  }
  if (props.tone === 'error') {
    return {
      wrapper: 'border-rose-200 bg-rose-50/70',
      icon: 'text-rose-600',
      title: 'text-rose-900',
      description: 'text-rose-700',
    }
  }
  return {
    wrapper: 'border-border bg-secondary/30',
    icon: 'text-muted-foreground',
    title: 'text-foreground',
    description: 'text-muted-foreground',
  }
})
</script>
