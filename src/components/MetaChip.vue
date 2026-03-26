<template>
  <span class="ui-meta-chip" :class="toneClass">
    <slot />
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  toneClass?: string
}>(), {
  toneClass: '',
})
</script>
