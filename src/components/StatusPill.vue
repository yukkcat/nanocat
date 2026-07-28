<template>
  <HoverCard v-if="hasDetails" :card-class="cardClass" focusable>
    <span class="ui-pill" :class="pillClasses">
      {{ label }}
    </span>
    <template #content>
      <slot name="content">
        <div v-if="title" class="ui-status-title mb-1">{{ title }}</div>
        <div v-if="detail" class="ui-status-body">
          {{ detail }}
        </div>
      </slot>
    </template>
  </HoverCard>
  <span v-else class="ui-pill" :class="pillClasses">
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { getChipRadiusClass, getChipSizeClasses, getToneClasses } from '../presets'
import HoverCard from './HoverCard.vue'
import type { ChipRadius, ChipSize } from '../types'

const props = withDefaults(
  defineProps<{
    label: string
    tone?: 'neutral' | 'success' | 'warning' | 'error' | 'info'
    variant?: 'soft' | 'outline' | 'solid'
    size?: ChipSize
    radius?: ChipRadius
    bordered?: boolean
    toneClass?: string
    title?: string
    detail?: string
    cardClass?: string
    pillClass?: string
  }>(),
  {
    tone: 'neutral',
    variant: 'soft',
    size: 'sm',
    radius: 'pill',
    bordered: true,
    toneClass: '',
    title: '',
    detail: '',
    cardClass: 'w-72',
    pillClass: '',
  }
)

const toneClasses = computed(() => getToneClasses(props.tone, props.variant))
const sizeClasses = computed(() => getChipSizeClasses(props.size))
const radiusClass = computed(() => getChipRadiusClass(props.radius))
const slots = useSlots()
const hasDetails = computed(() => Boolean(props.title || props.detail || slots.content))
const pillClasses = computed(() => [
  'gap-1.5',
  toneClasses.value,
  sizeClasses.value.text,
  sizeClasses.value.pill,
  radiusClass.value,
  props.bordered ? '' : '!border-transparent',
  props.toneClass,
  props.pillClass,
])
</script>
