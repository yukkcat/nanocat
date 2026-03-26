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
          <div class="mb-1 font-medium text-foreground">原始报错</div>
          <div class="break-all font-mono text-[11px] text-muted-foreground">
            {{ rawError }}
          </div>
        </div>
      </div>
    </template>
  </StatusPill>
</template>

<script setup lang="ts">
import StatusPill from './StatusPill.vue'

withDefaults(defineProps<{
  label: string
  toneClass: string
  title?: string
  detailLabel?: string
  detail: string
  rawError?: string
  cardClass?: string
}>(), {
  title: '详情',
  detailLabel: '说明',
  rawError: '',
  cardClass: 'w-72',
})
</script>
