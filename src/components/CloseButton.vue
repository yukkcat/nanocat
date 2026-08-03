<template>
  <button
    v-bind="$attrs"
    type="button"
    class="ui-close-button"
    :class="[
      `ui-close-button--${tone}`,
      `ui-close-button--${size}`,
      rootClass,
    ]"
    :disabled="disabled"
    :aria-label="label"
    :title="label"
    @click="emit('click', $event)"
  >
    <Icon icon="lucide:x" :class="size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'" />
  </button>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineOptions({ inheritAttrs: false })

withDefaults(defineProps<{
  label?: string
  disabled?: boolean
  tone?: 'default' | 'dark'
  size?: 'sm' | 'md'
  rootClass?: string
}>(), {
  label: 'Close',
  disabled: false,
  tone: 'default',
  size: 'md',
  rootClass: '',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<style scoped>
.ui-close-button {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: calc(var(--radius, 16px) - 2px);
  background: transparent;
  color: hsl(var(--muted-foreground));
  cursor: pointer;
  transition: background 150ms, border-color 150ms, color 150ms, opacity 150ms;
}

.ui-close-button--md {
  width: 2rem;
  height: 2rem;
}

.ui-close-button--sm {
  width: 1.75rem;
  height: 1.75rem;
}

.ui-close-button--default:hover,
.ui-close-button--default:focus-visible {
  border-color: hsl(var(--border) / 0.72);
  background: hsl(var(--muted) / 0.72);
  color: hsl(var(--foreground));
}

.ui-close-button--dark {
  border-color: rgb(255 255 255 / 0.18);
  background: rgb(255 255 255 / 0.12);
  color: white;
}

.ui-close-button--dark:hover,
.ui-close-button--dark:focus-visible {
  border-color: rgb(255 255 255 / 0.32);
  background: rgb(255 255 255 / 0.22);
  color: white;
}

.ui-close-button:focus-visible {
  outline: 2px solid hsl(var(--ring) / 0.45);
  outline-offset: 2px;
}

.ui-close-button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}
</style>
