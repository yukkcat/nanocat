<template>
  <Tooltip :text="text">
    <span
      class="ui-help-dot"
      aria-hidden="true"
    >
      ?
    </span>
  </Tooltip>
</template>

<script setup lang="ts">
import Tooltip from './Tooltip.vue'

defineProps<{
  text: string
}>()
</script>
