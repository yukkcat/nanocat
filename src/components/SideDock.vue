<template>
  <Teleport to="body">
    <Transition name="ui-side-dock" appear>
      <button
        v-if="open"
        ref="dockRef"
        type="button"
        :class="[
          'ui-side-dock',
          {
            'ui-side-dock--draggable': draggable,
            'ui-side-dock--dragging': dragging,
          },
          rootClass,
        ]"
        :style="dockStyle"
        :aria-label="ariaLabel"
        :aria-describedby="ariaDescribedby || undefined"
        @click="handleClick"
        @pointerdown="handlePointerDown"
        @pointermove="handlePointerMove"
        @pointerup="handlePointerEnd"
        @pointercancel="handlePointerEnd"
      >
        <slot />
      </button>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { OVERLAY_LAYER } from '../layers'

const props = withDefaults(defineProps<{
  open: boolean
  ariaLabel: string
  ariaDescribedby?: string
  zIndex?: number
  width?: string
  rootClass?: string
  draggable?: boolean
}>(), {
  ariaDescribedby: '',
  zIndex: () => OVERLAY_LAYER.confirm - 1,
  width: '11rem',
  rootClass: '',
  draggable: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const EDGE_GAP = 8
const DRAG_THRESHOLD = 4
const dockRef = ref<HTMLButtonElement | null>(null)
const draggedTop = ref<number | null>(null)
const dragging = ref(false)
let activePointerId: number | null = null
let pointerStartY = 0
let dockStartTop = 0
let suppressClick = false

const dockStyle = computed(() => ({
  zIndex: props.zIndex,
  '--ui-side-dock-width': props.width,
  ...(draggedTop.value === null
    ? {}
    : { top: `${draggedTop.value}px`, bottom: 'auto' }),
}))

function isDesktop() {
  return window.innerWidth > 640
}

function clampTop(value: number, height: number) {
  return Math.min(
    Math.max(EDGE_GAP, value),
    Math.max(EDGE_GAP, window.innerHeight - height - EDGE_GAP),
  )
}

function handlePointerDown(event: PointerEvent) {
  if (!props.draggable || !isDesktop() || (event.pointerType === 'mouse' && event.button !== 0)) return
  const dock = dockRef.value
  if (!dock) return
  const bounds = dock.getBoundingClientRect()
  activePointerId = event.pointerId
  pointerStartY = event.clientY
  dockStartTop = bounds.top
  dragging.value = false
  dock.setPointerCapture(event.pointerId)
}

function handlePointerMove(event: PointerEvent) {
  if (activePointerId !== event.pointerId) return
  const dock = dockRef.value
  if (!dock) return
  const delta = event.clientY - pointerStartY
  if (!dragging.value && Math.abs(delta) < DRAG_THRESHOLD) return
  dragging.value = true
  event.preventDefault()
  draggedTop.value = clampTop(dockStartTop + delta, dock.getBoundingClientRect().height)
}

function handlePointerEnd(event: PointerEvent) {
  if (activePointerId !== event.pointerId) return
  const dock = dockRef.value
  if (dock?.hasPointerCapture(event.pointerId)) dock.releasePointerCapture(event.pointerId)
  if (dragging.value) {
    suppressClick = true
    window.setTimeout(() => { suppressClick = false }, 0)
  }
  activePointerId = null
  dragging.value = false
}

function handleClick(event: MouseEvent) {
  if (suppressClick) {
    event.preventDefault()
    event.stopPropagation()
    suppressClick = false
    return
  }
  emit('click', event)
}

function handleResize() {
  if (!isDesktop()) {
    draggedTop.value = null
    return
  }
  const dock = dockRef.value
  if (dock && draggedTop.value !== null) {
    draggedTop.value = clampTop(draggedTop.value, dock.getBoundingClientRect().height)
  }
}

onMounted(() => window.addEventListener('resize', handleResize))
onBeforeUnmount(() => window.removeEventListener('resize', handleResize))
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

.ui-side-dock--draggable {
  cursor: grab;
  touch-action: none;
}

.ui-side-dock--dragging {
  cursor: grabbing;
  user-select: none;
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

  .ui-side-dock--draggable {
    cursor: pointer;
    touch-action: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ui-side-dock-enter-active,
  .ui-side-dock-leave-active {
    transition: none;
  }
}
</style>
