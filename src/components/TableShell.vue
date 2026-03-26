<template>
  <div class="scrollbar-slim overflow-x-auto" :class="wrapperClass">
    <table class="min-w-full text-left text-sm" :class="tableClass">
      <thead
        v-if="$slots.head"
        class="text-xs uppercase tracking-[0.2em] text-muted-foreground"
        :class="headClass"
      >
        <slot name="head" />
      </thead>
      <tbody class="text-sm text-foreground" :class="bodyClass">
        <tr v-if="showEmpty">
          <td :colspan="emptyColspan" class="py-6">
            <slot name="empty">
              <ResultState
                :title="emptyTitle"
                :description="emptyDescription"
              />
            </slot>
          </td>
        </tr>
        <slot v-else />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import ResultState from './ResultState.vue'

withDefaults(defineProps<{
  showEmpty?: boolean
  emptyColspan?: number
  emptyTitle?: string
  emptyDescription?: string
  wrapperClass?: string
  tableClass?: string
  headClass?: string
  bodyClass?: string
}>(), {
  showEmpty: false,
  emptyColspan: 1,
  emptyTitle: 'No data',
  emptyDescription: '',
  wrapperClass: '',
  tableClass: '',
  headClass: '',
  bodyClass: '',
})
</script>
