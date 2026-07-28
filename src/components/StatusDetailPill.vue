<template>
  <StatusPill
    :label="label"
    :tone="tone"
    :variant="variant"
    :size="size"
    :radius="radius"
    :bordered="bordered"
    :tone-class="toneClass"
    :title="title"
    :card-class="cardClass"
  >
    <template #content>
      <div class="space-y-2 text-xs leading-5">
        <div>
          <div class="ui-status-title mb-1">{{ detailLabel }}</div>
          <div class="ui-status-body whitespace-pre-line">{{ detail }}</div>
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
import type { ChipRadius, ChipSize } from '../types'

const props = withDefaults(defineProps<{
  label: string
  tone?: 'neutral' | 'success' | 'warning' | 'error' | 'info'
  variant?: 'soft' | 'outline' | 'solid'
  size?: ChipSize
  radius?: ChipRadius
  bordered?: boolean
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
  radius: 'pill',
  bordered: true,
  toneClass: '',
  title: '',
  detailLabel: '',
  rawError: '',
  rawErrorLabel: '',
  cardClass: 'w-72',
})

const { label, tone, variant, size, radius, bordered, toneClass, detail, rawError, cardClass } = toRefs(props)
const locale = useNanocatLocale()
const title = computed(() => props.title || locale.statusDetailTitle)
const detailLabel = computed(() => props.detailLabel || locale.statusDetailLabel)
const rawErrorLabel = computed(() => props.rawErrorLabel || locale.statusDetailRawErrorLabel)
</script>
