<template>
  <div
    class="flex"
    :class="[sizeClasses.gap, stackOnMobile ? 'flex-col xl:flex-row xl:items-center xl:justify-between' : 'items-center justify-between']"
  >
    <div
      v-if="$slots.start"
      class="ui-toolbar"
      :class="[sizeClasses.groupGap, startClass]"
    >
      <slot name="start" />
    </div>
    <div
      v-if="$slots.end"
      class="ui-toolbar"
      :class="[sizeClasses.groupGap, endClass]"
    >
      <slot name="end" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getToolbarSizeClasses } from '../presets'

const props = withDefaults(defineProps<{
  stackOnMobile?: boolean
  size?: 'sm' | 'md'
  startClass?: string
  endClass?: string
}>(), {
  stackOnMobile: false,
  size: 'sm',
  startClass: '',
  endClass: 'justify-end',
})

const sizeClasses = computed(() => getToolbarSizeClasses(props.size))
</script>
