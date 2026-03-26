<template>
  <div
    class="flex gap-3"
    :class="stackOnMobile ? 'flex-col xl:flex-row xl:items-center xl:justify-between' : 'items-center justify-between'"
  >
    <div
      v-if="$slots.start"
      class="ui-toolbar"
      :class="startClass"
    >
      <slot name="start" />
    </div>
    <div
      v-if="$slots.end"
      class="ui-toolbar"
      :class="endClass"
    >
      <slot name="end" />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  stackOnMobile?: boolean
  startClass?: string
  endClass?: string
}>(), {
  stackOnMobile: false,
  startClass: '',
  endClass: 'justify-end',
})
</script>
