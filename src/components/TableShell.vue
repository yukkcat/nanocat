<template>
  <div
    class="table-shell"
    :class="[
      unframed ? '' : variantClasses.wrapper,
      resolvedRootClass,
      {
        'table-shell--fill': fill,
        'table-shell--sticky-header': stickyHeader,
        'table-shell--unframed': unframed,
      },
    ]"
  >
    <div class="scrollbar-slim table-shell__scroll" :class="scrollClass">
      <table
        class="min-w-full text-left text-sm"
        :class="tableClass"
        :aria-busy="loading || undefined"
      >
        <colgroup v-if="$slots.colgroup">
          <slot name="colgroup" />
        </colgroup>
        <thead
          v-if="$slots.head"
          class="table-shell__head text-xs uppercase tracking-[0.18em]"
          :class="[variantClasses.head, headClass]"
        >
          <slot name="head" />
        </thead>
        <tbody class="text-sm text-foreground" :class="bodyClass">
          <tr v-if="loading">
            <td :colspan="resolvedLoadingColspan" :class="variantClasses.empty">
              <div class="table-shell__state">
                <slot name="loading">
                  <LoadingState compact :title="resolvedLoadingTitle" />
                </slot>
              </div>
            </td>
          </tr>
          <tr v-else-if="showEmpty">
            <td :colspan="emptyColspan" :class="variantClasses.empty">
              <div class="table-shell__state">
                <slot name="empty">
                  <ResultState
                    root-class="table-shell__empty-state"
                    :title="resolvedEmptyTitle"
                    :description="emptyDescription"
                    :size="size"
                  />
                </slot>
              </div>
            </td>
          </tr>
          <slot v-else />
        </tbody>
      </table>
    </div>

    <div
      v-if="$slots.footer"
      class="table-shell__footer"
      :class="[
        footerClass,
        { 'table-shell__footer--bordered': footerBorder },
      ]"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNanocatLocale } from '../i18n'
import { getTableShellVariantClasses, resolveRootClass } from '../presets'
import LoadingState from './LoadingState.vue'
import ResultState from './ResultState.vue'
import type { UiSize, UiSurfaceVariant } from '../types'

const props = withDefaults(defineProps<{
  loading?: boolean
  loadingColspan?: number
  loadingTitle?: string
  showEmpty?: boolean
  emptyColspan?: number
  emptyTitle?: string
  emptyDescription?: string
  variant?: UiSurfaceVariant
  size?: UiSize
  fill?: boolean
  stickyHeader?: boolean
  footerBorder?: boolean
  unframed?: boolean
  rootClass?: string
  wrapperClass?: string
  scrollClass?: string
  tableClass?: string
  headClass?: string
  bodyClass?: string
  footerClass?: string
}>(), {
  loading: false,
  loadingColspan: undefined,
  loadingTitle: '',
  showEmpty: false,
  emptyColspan: 1,
  emptyTitle: '',
  emptyDescription: '',
  variant: 'soft',
  size: 'sm',
  fill: false,
  stickyHeader: false,
  footerBorder: false,
  unframed: false,
  rootClass: '',
  wrapperClass: '',
  scrollClass: '',
  tableClass: '',
  headClass: '',
  bodyClass: '',
  footerClass: '',
})

const locale = useNanocatLocale()
const variantClasses = computed(() => getTableShellVariantClasses(props.variant || 'soft'))
const resolvedRootClass = computed(() => resolveRootClass(props.rootClass, props.wrapperClass))
const resolvedEmptyTitle = computed(() => props.emptyTitle || locale.tableShellEmptyTitle)
const resolvedLoadingTitle = computed(() => props.loadingTitle || locale.tableShellLoadingTitle || 'Loading data')
const resolvedLoadingColspan = computed(() => props.loadingColspan ?? props.emptyColspan)
</script>

<style scoped>
.table-shell {
  min-width: 0;
}

.table-shell__scroll {
  container-type: inline-size;
  overflow-x: auto;
  scrollbar-gutter: stable;
}

/* Keep horizontal scrolling usable on narrow screens without a second vertical thumb. */
@media (max-width: 767px) {
  .table-shell__scroll {
    scrollbar-gutter: auto;
  }

  .table-shell__scroll::-webkit-scrollbar {
    width: 0;
    height: 8px;
  }
}

.table-shell--fill {
  display: flex;
  min-height: 0;
  flex: 1 1 auto;
  flex-direction: column;
  overflow: hidden;
}

.table-shell--fill .table-shell__scroll {
  min-height: 0;
  flex: 1 1 auto;
  overflow: auto;
  overflow-anchor: none;
  overscroll-behavior: contain;
}

.table-shell--sticky-header .table-shell__head {
  position: sticky;
  top: 0;
  z-index: 2;
  background: hsl(var(--card));
  box-shadow: inset 0 -1px hsl(var(--border) / 0.8);
}

.table-shell__footer {
  padding: var(--table-shell-footer-padding, 12px 16px);
}

.table-shell__footer--bordered {
  border-top: 1px solid hsl(var(--border));
}

.table-shell__state {
  width: 100%;
  max-width: 100cqi;
  overflow-wrap: anywhere;
}

.table-shell__state :deep(.table-shell__empty-state) {
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

</style>
