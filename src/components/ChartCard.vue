<template>
  <div class="ui-panel" :class="panelClass">
    <CardHeader :title="title" :description="description">
      <template v-if="$slots.actions" #actions>
        <slot name="actions" />
      </template>
    </CardHeader>
    <slot />
  </div>
</template>

<script setup lang="ts">
import CardHeader from './CardHeader.vue'

withDefaults(
  defineProps<{
    title: string
    description?: string
    panelClass?: string
  }>(),
  {
    description: '',
    panelClass: '!p-5',
  }
)
</script>
