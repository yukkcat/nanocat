<template>
  <div
    class="rounded-2xl px-4 py-6 text-center"
    :class="wrapperClass"
  >
    <div v-if="$slots.icon" class="mb-3 flex justify-center text-muted-foreground">
      <slot name="icon" />
    </div>
    <p class="text-sm font-medium text-foreground">{{ title }}</p>
    <p v-if="description" class="mt-1 text-sm text-muted-foreground">{{ description }}</p>
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
    textClass?: string
    plain?: boolean
  }>(),
  {
    description: '',
    textClass: '',
    plain: false,
  }
)

const wrapperClass = computed(() => (
  props.plain
    ? ''
    : 'border border-border bg-secondary/30'
))
</script>
