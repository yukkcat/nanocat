<template>
  <div
    class="rounded-3xl border text-center shadow-[var(--shadow-inset-soft)]"
    :class="[sizeClasses.wrapper, toneClasses.wrapper, resolvedRootClass]"
  >
    <div v-if="$slots.icon" class="mb-3 flex justify-center" :class="toneClasses.icon">
      <slot name="icon" />
    </div>
    <p class="font-semibold" :class="[sizeClasses.title, toneClasses.title]">{{ title }}</p>
    <p v-if="description" class="mx-auto mt-1.5 max-w-[34rem] leading-6" :class="[sizeClasses.description, toneClasses.description]">{{ description }}</p>
    <div v-if="$slots.actions" class="mt-4 flex justify-center">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getStateSizeClasses, getStateToneClasses, resolveRootClass } from '../presets'

const props = withDefaults(
  defineProps<{
    title: string
    description?: string
    tone?: 'neutral' | 'success' | 'warning' | 'error' | 'info'
    variant?: 'soft' | 'outline'
    size?: 'sm' | 'md'
    rootClass?: string
  }>(),
  {
    description: '',
    tone: 'neutral',
    variant: 'soft',
    size: 'sm',
    rootClass: '',
  }
)

const toneClasses = computed(() => getStateToneClasses(props.tone, props.variant))
const sizeClasses = computed(() => getStateSizeClasses(props.size))
const resolvedRootClass = computed(() => resolveRootClass(props.rootClass))
</script>
