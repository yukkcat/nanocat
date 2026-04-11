<template>
  <div class="scrollbar-slim overflow-x-auto" :class="[variantClasses.wrapper, resolvedRootClass]">
    <table class="min-w-full text-left text-sm" :class="tableClass">
      <thead
        v-if="$slots.head"
        class="text-xs uppercase tracking-[0.18em]"
        :class="[variantClasses.head, headClass]"
      >
        <slot name="head" />
      </thead>
      <tbody class="text-sm text-foreground" :class="bodyClass">
        <tr v-if="showEmpty">
          <td :colspan="emptyColspan" :class="variantClasses.empty">
            <slot name="empty">
              <ResultState
                :title="resolvedEmptyTitle"
                :description="emptyDescription"
                :size="size"
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
import { computed } from 'vue'
import { useNanocatLocale } from '../i18n'
import { getTableShellVariantClasses, resolveRootClass } from '../presets'
import ResultState from './ResultState.vue'
import type { UiSize, UiSurfaceVariant } from '../types'

const props = withDefaults(defineProps<{
  showEmpty?: boolean
  emptyColspan?: number
  emptyTitle?: string
  emptyDescription?: string
  variant?: UiSurfaceVariant
  size?: UiSize
  rootClass?: string
  wrapperClass?: string
  tableClass?: string
  headClass?: string
  bodyClass?: string
}>(), {
  showEmpty: false,
  emptyColspan: 1,
  emptyTitle: '',
  emptyDescription: '',
  variant: 'soft',
  size: 'sm',
  rootClass: '',
  wrapperClass: '',
  tableClass: '',
  headClass: '',
  bodyClass: '',
})

const locale = useNanocatLocale()
const variantClasses = computed(() => getTableShellVariantClasses(props.variant || 'soft'))
const resolvedRootClass = computed(() => resolveRootClass(props.rootClass, props.wrapperClass))
const resolvedEmptyTitle = computed(() => props.emptyTitle || locale.tableShellEmptyTitle)
</script>
