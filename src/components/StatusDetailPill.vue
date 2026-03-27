<template>
  <StatusPill
    :label="label"
    :tone-class="toneClass"
    :title="title"
    :card-class="cardClass"
  >
    <template #content>
      <div class="space-y-2 text-xs leading-5">
        <div>
          <div class="mb-1 font-medium text-foreground">{{ detailLabel }}</div>
          <div class="text-muted-foreground">{{ detail }}</div>
        </div>
        <div v-if="rawError">
          <div class="mb-1 font-medium text-foreground">{{ rawErrorLabel }}</div>
          <div class="break-all font-mono text-[11px] text-muted-foreground">
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
  toneClass: string
  title?: string
  detailLabel?: string
  detail: string
  rawError?: string
  rawErrorLabel?: string
  cardClass?: string
}>(), {
  title: '',
  detailLabel: '',
  rawError: '',
  rawErrorLabel: '',
  cardClass: 'w-72',
})

const { label, toneClass, detail, rawError, cardClass } = toRefs(props)
const locale = useNanocatLocale()
const title = computed(() => props.title || locale.statusDetailTitle)
const detailLabel = computed(() => props.detailLabel || locale.statusDetailLabel)
const rawErrorLabel = computed(() => props.rawErrorLabel || locale.statusDetailRawErrorLabel)
</script>
