<template>
  <HoverCard :card-class="cardClass">
    <span class="ui-pill" :class="[toneClass, pillClass]">
      {{ label }}
    </span>
    <template #content>
      <slot name="content">
        <div v-if="title" class="mb-1 text-xs font-medium text-foreground">{{ title }}</div>
        <div v-if="detail" class="text-xs leading-5 text-muted-foreground">
          {{ detail }}
        </div>
      </slot>
    </template>
  </HoverCard>
</template>

<script setup lang="ts">
import HoverCard from './HoverCard.vue'

withDefaults(
  defineProps<{
    label: string
    toneClass: string
    title?: string
    detail?: string
    cardClass?: string
    pillClass?: string
  }>(),
  {
    title: '',
    detail: '',
    cardClass: 'w-72',
    pillClass: '',
  }
)
</script>
