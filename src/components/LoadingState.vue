<template>
  <div
    class="loading-state"
    :class="{
      'loading-state--compact': compact,
      'loading-state--start': align === 'start',
      'loading-state--flush': flush,
    }"
    role="status"
    aria-live="polite"
  >
    <span class="loading-state__spinner" aria-hidden="true" />
    <div class="loading-state__copy">
      <p class="loading-state__title">{{ title }}</p>
      <p v-if="description" class="loading-state__description">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  compact?: boolean
  align?: 'center' | 'start'
  flush?: boolean
}>(), {
  title: 'Loading',
  description: '',
  compact: false,
  align: 'center',
  flush: false,
})
</script>

<style scoped>
.loading-state {
  display: flex;
  min-height: 7rem;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.25rem;
  color: hsl(var(--muted-foreground));
  text-align: left;
}

.loading-state--compact {
  min-height: 5rem;
  padding: 1rem;
}

.loading-state--start {
  justify-content: flex-start;
}

.loading-state--flush {
  padding: 0;
}

.loading-state__spinner {
  width: 1.125rem;
  height: 1.125rem;
  flex: 0 0 auto;
  border: 2px solid hsl(var(--border));
  border-top-color: hsl(var(--foreground));
  border-radius: 999px;
  animation: loading-state-spin 1s linear infinite;
}

.loading-state__copy {
  min-width: 0;
}

.loading-state__title {
  color: hsl(var(--foreground));
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.4;
}

.loading-state__description {
  margin-top: 0.2rem;
  max-width: 32rem;
  color: hsl(var(--muted-foreground));
  font-size: 0.75rem;
  line-height: 1.5;
}

@keyframes loading-state-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .loading-state__spinner {
    animation: none;
  }
}
</style>
