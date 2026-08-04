<template>
  <Teleport to="body">
    <Transition name="ui-side-dock" appear>
      <button
        v-if="open"
        type="button"
        :class="['ui-side-dock', rootClass]"
        :style="{ zIndex, '--ui-side-dock-width': width }"
        :aria-label="ariaLabel"
        :aria-describedby="ariaDescribedby || undefined"
        @click="emit('click', $event)"
      >
        <slot />
      </button>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { OVERLAY_LAYER } from '../layers'

withDefaults(defineProps<{
  open: boolean
  ariaLabel: string
  ariaDescribedby?: string
  zIndex?: number
  width?: string
  rootClass?: string
}>(), {
  ariaDescribedby: '',
  zIndex: () => OVERLAY_LAYER.confirm - 1,
  width: '11rem',
  rootClass: '',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<style scoped>
.ui-side-dock {
  position: fixed;
  top: clamp(5rem, 15vh, 8rem);
  right: 0;
  display: grid;
  width: min(var(--ui-side-dock-width), calc(100vw - 1rem));
  gap: 5px;
  overflow: hidden;
  border: 1px solid hsl(var(--border));
  border-right: 0;
  border-radius: var(--radius, 16px) 0 0 var(--radius, 16px);
  padding: 10px 12px;
  background: hsl(var(--card) / 0.96);
  box-shadow: -8px 8px 24px rgb(15 23 42 / 0.12);
  color: hsl(var(--foreground));
  font: inherit;
  text-align: left;
  backdrop-filter: blur(10px);
}

.ui-side-dock:hover {
  background: hsl(var(--accent));
}

.ui-side-dock:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

.ui-side-dock-enter-active,
.ui-side-dock-leave-active {
  transition: opacity 160ms ease, transform 160ms ease;
}

.ui-side-dock-enter-from,
.ui-side-dock-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

@media (max-width: 640px) {
  .ui-side-dock {
    top: auto;
    bottom: calc(1rem + env(safe-area-inset-bottom));
  }
}

@media (prefers-reduced-motion: reduce) {
  .ui-side-dock-enter-active,
  .ui-side-dock-leave-active {
    transition: none;
  }
}
</style>
