<template>
  <span
    class="nanocat-skeleton"
    :class="[
      `nanocat-skeleton--${rounded}`,
      animate ? 'nanocat-skeleton--animate' : '',
    ]"
    :style="skeletonStyle"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'

const props = withDefaults(defineProps<{
  width?: string
  height?: string
  rounded?: 'sm' | 'md' | 'lg' | 'full'
  animate?: boolean
}>(), {
  width: '100%',
  height: '1rem',
  rounded: 'md',
  animate: true,
})

const skeletonStyle = computed<CSSProperties>(() => ({
  width: props.width,
  height: props.height,
}))
</script>

<style scoped>
.nanocat-skeleton {
  display: block;
  max-width: 100%;
  background: hsl(var(--muted));
}

.nanocat-skeleton--sm {
  border-radius: 0.25rem;
}

.nanocat-skeleton--md {
  border-radius: 0.5rem;
}

.nanocat-skeleton--lg {
  border-radius: 0.75rem;
}

.nanocat-skeleton--full {
  border-radius: 999px;
}

.nanocat-skeleton--animate {
  animation: nanocat-skeleton-pulse 1.5s ease-in-out infinite;
}

@keyframes nanocat-skeleton-pulse {
  50% {
    opacity: 0.55;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nanocat-skeleton--animate {
    animation: none;
  }
}
</style>
