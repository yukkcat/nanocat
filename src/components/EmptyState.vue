<template>
  <div
    class="rounded-3xl text-center"
    :class="[sizeClasses.wrapper, wrapperClass, resolvedRootClass]"
  >
    <div v-if="$slots.icon" class="mb-3 flex justify-center text-muted-foreground">
      <slot name="icon" />
    </div>
    <p class="font-semibold text-foreground" :class="sizeClasses.title">{{ title }}</p>
    <p v-if="description" class="mx-auto mt-1.5 max-w-[34rem] leading-6 text-muted-foreground" :class="sizeClasses.description">{{ description }}</p>
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
    plain?: boolean
    rootClass?: string
  }>(),
  {
    description: '',
    tone: 'neutral',
    variant: 'soft',
    size: 'sm',
    plain: false,
    rootClass: '',
  }
)

const toneClasses = computed(() => getStateToneClasses(props.tone, props.variant))
const sizeClasses = computed(() => getStateSizeClasses(props.size))
const resolvedRootClass = computed(() => resolveRootClass(props.rootClass))
const wrapperClass = computed(() => (
  props.plain
    ? ''
    : `${toneClasses.value.wrapper} border border-dashed shadow-[var(--shadow-inset-soft)]`
))
</script>
