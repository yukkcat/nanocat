<template>
  <StatusPill
    :label="label"
    :tone="tone"
    :variant="variant"
    :size="size"
    :tone-class="toneClass"
    :title="title"
    :card-class="cardClass"
  >
    <template #content>
      <div class="space-y-2 text-xs leading-5">
        <div>
          <div class="ui-status-title mb-1">{{ detailLabel }}</div>
          <div class="ui-status-body">{{ detail }}</div>
        </div>
        <div v-if="rawError">
          <div class="ui-status-title mb-1">{{ rawErrorLabel }}</div>
          <div class="ui-status-body break-all font-mono text-[11px]">
            {{ rawError }}
          </div>
        </div>
      </div>
    </template>
  </StatusPill>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useNanocatLocale } from '../i18n'
import StatusPill from './StatusPill.vue'

const props = withDefaults(defineProps<{
  label: string
  tone?: 'neutral' | 'success' | 'warning' | 'error' | 'info'
  variant?: 'soft' | 'outline' | 'solid'
  size?: 'sm' | 'md'
  toneClass?: string
  title?: string
  detailLabel?: string
  detail: string
  rawError?: string
  rawErrorLabel?: string
  cardClass?: string
}>(), {
  tone: 'neutral',
  variant: 'soft',
  size: 'sm',
  toneClass: '',
  title: '',
  detailLabel: '',
  rawError: '',
  rawErrorLabel: '',
  cardClass: 'w-72',
})

const { label, tone, variant, size, toneClass, detail, rawError, cardClass } = toRefs(props)
const locale = useNanocatLocale()
const title = computed(() => props.title || locale.statusDetailTitle)
const detailLabel = computed(() => props.detailLabel || locale.statusDetailLabel)
const rawErrorLabel = computed(() => props.rawErrorLabel || locale.statusDetailRawErrorLabel)
</script>
