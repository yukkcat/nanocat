<template>
  <HoverCard :card-class="cardClass">
    <span class="ui-pill" :class="['gap-1.5', toneClasses, sizeClasses.text, sizeClasses.pill, toneClass, pillClass]">
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getSizeClasses, getToneClasses } from '../presets'
import HoverCard from './HoverCard.vue'

const props = withDefaults(
  defineProps<{
    label: string
    tone?: 'neutral' | 'success' | 'warning' | 'error' | 'info'
    variant?: 'soft' | 'outline' | 'solid'
    size?: 'sm' | 'md'
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
    toneClass: '',
    title: '',
    detail: '',
    cardClass: 'w-72',
    pillClass: '',
  }
)

const toneClasses = computed(() => getToneClasses(props.tone, props.variant))
const sizeClasses = computed(() => getSizeClasses(props.size))
</script>
