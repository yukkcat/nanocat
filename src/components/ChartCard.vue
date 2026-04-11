<template>
  <div :class="[panelVariantClass, sizeClasses.panel, resolvedRootClass]">
    <CardHeader :title="title" :description="description" :size="size">
      <template v-if="$slots.actions" #actions>
        <slot name="actions" />
      </template>
    </CardHeader>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getPanelSizeClasses, getPanelVariantClasses, resolveRootClass } from '../presets'
import CardHeader from './CardHeader.vue'
import type { UiSize, UiSurfaceVariant } from '../types'

const props = withDefaults(
  defineProps<{
    title: string
    description?: string
    variant?: UiSurfaceVariant
    size?: UiSize
    rootClass?: string
    panelClass?: string
  }>(),
  {
    description: '',
    variant: 'soft',
    size: 'sm',
    rootClass: '',
    panelClass: '!p-5',
  }
)

const panelVariantClass = computed(() => getPanelVariantClasses(props.variant))
const sizeClasses = computed(() => getPanelSizeClasses(props.size))
const resolvedRootClass = computed(() => resolveRootClass(props.rootClass, props.panelClass))
</script>
