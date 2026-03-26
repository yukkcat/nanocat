<template>
  <div class="ui-panel !p-5">
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
  }>(),
  {
    description: '',
  }
)
</script>
