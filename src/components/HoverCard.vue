<template>
  <span
    ref="triggerRef"
    class="inline-flex cursor-pointer"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    @focusin="showTooltip"
    @focusout="hideTooltip"
    @click="toggleTooltip"
  >
    <slot />
  </span>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-150"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="visible"
        ref="cardRef"
        class="ui-floating-panel fixed z-[9999] !rounded-lg !p-3"
        :class="cardClass"
        :style="tooltipStyle"
        @mouseenter="handleTooltipEnter"
        @mouseleave="handleTooltipLeave"
      >
        <span
          class="absolute h-0 w-0 -translate-x-1/2 border-x-[6px] border-x-transparent"
          :class="arrowBorderClass"
          :style="arrowStyle"
        ></span>
        <span
          class="absolute h-0 w-0 -translate-x-1/2 border-x-[5px] border-x-transparent"
          :class="arrowFillClass"
          :style="arrowStyle"
        ></span>
        <slot name="content" />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    cardClass?: string
    offset?: number
  }>(),
  {
    cardClass: 'w-64',
    offset: 8,
  }
)

const triggerRef = ref<HTMLElement | null>(null)
const cardRef = ref<HTMLElement | null>(null)
const visible = ref(false)
const placement = ref<'top' | 'bottom'>('top')
const tooltipStyle = ref<Record<string, string>>({})
const arrowStyle = ref<Record<string, string>>({ left: '50%' })
let hideTimeout: ReturnType<typeof setTimeout> | null = null

const arrowBorderClass = computed(() =>
  placement.value === 'bottom'
    ? 'bottom-full border-b-[6px] border-b-border'
    : 'top-full border-t-[6px] border-t-border'
)

const arrowFillClass = computed(() =>
  placement.value === 'bottom'
    ? 'bottom-full translate-y-px border-b-[5px] border-b-card'
    : 'top-full -translate-y-px border-t-[5px] border-t-card'
)

const updatePosition = () => {
  if (!triggerRef.value) return

  const rect = triggerRef.value.getBoundingClientRect()
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0
  const viewportPadding = 8
  const fallbackWidth = Math.min(320, Math.max(220, viewportWidth - viewportPadding * 2))
  const cardWidth = cardRef.value?.offsetWidth || fallbackWidth
  const cardHeight = cardRef.value?.offsetHeight || 0
  const triggerCenter = rect.left + rect.width / 2
  const minCenter = viewportPadding + cardWidth / 2
  const maxCenter = Math.max(minCenter, viewportWidth - viewportPadding - cardWidth / 2)
  const clampedCenter = Math.min(maxCenter, Math.max(minCenter, triggerCenter))
  const arrowX = Math.min(Math.max(triggerCenter - (clampedCenter - cardWidth / 2), 12), Math.max(12, cardWidth - 12))
  const topAnchor = rect.top - props.offset
  const bottomAnchor = rect.bottom + props.offset
  const wouldOverflowTop = topAnchor - cardHeight < viewportPadding

  if (wouldOverflowTop) {
    placement.value = 'bottom'
    const maxTop = Math.max(viewportPadding, viewportHeight - viewportPadding - cardHeight)
    tooltipStyle.value = {
      left: `${clampedCenter}px`,
      top: `${Math.min(bottomAnchor, maxTop)}px`,
      transform: 'translate(-50%, 0)',
      maxWidth: `calc(100vw - ${viewportPadding * 2}px)`,
    }
  } else {
    placement.value = 'top'
    const minTopAnchor = viewportPadding + cardHeight
    tooltipStyle.value = {
      left: `${clampedCenter}px`,
      top: `${Math.max(topAnchor, minTopAnchor)}px`,
      transform: 'translate(-50%, -100%)',
      maxWidth: `calc(100vw - ${viewportPadding * 2}px)`,
    }
  }

  arrowStyle.value = { left: `${arrowX}px` }
}

const handleViewportChange = () => {
  if (!visible.value) return
  updatePosition()
}

const bindViewportListeners = () => {
  window.addEventListener('resize', handleViewportChange)
  window.addEventListener('scroll', handleViewportChange, true)
}

const unbindViewportListeners = () => {
  window.removeEventListener('resize', handleViewportChange)
  window.removeEventListener('scroll', handleViewportChange, true)
}

const showTooltip = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
  visible.value = true
  nextTick(() => {
    updatePosition()
    requestAnimationFrame(updatePosition)
  })
}

const hideTooltip = () => {
  hideTimeout = setTimeout(() => {
    visible.value = false
  }, 150)
}

const handleTooltipEnter = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
}

const handleTooltipLeave = () => {
  visible.value = false
}

const toggleTooltip = () => {
  if (visible.value) {
    visible.value = false
  } else {
    showTooltip()
  }
}

watch(visible, (nextVisible) => {
  if (nextVisible) {
    bindViewportListeners()
    return
  }
  unbindViewportListeners()
})

onBeforeUnmount(() => {
  unbindViewportListeners()
})
</script>
