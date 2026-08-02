<template>
  <span
    ref="triggerRef"
    class="inline-flex cursor-pointer"
    :tabindex="focusable ? 0 : undefined"
    :aria-describedby="visible ? cardId : undefined"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    @focusin="showTooltip"
    @focusout="hideTooltip"
    @click="toggleTooltip"
    @keydown.enter.prevent="toggleTooltip"
    @keydown.space.prevent="toggleTooltip"
    @keydown.escape="hideImmediately"
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
        :id="cardId"
        ref="cardRef"
        class="ui-floating-panel fixed !rounded-lg !p-3"
        :class="cardClass"
        :style="[tooltipStyle, tooltipLayerStyle]"
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
import { computed, onBeforeUnmount, ref, useId } from 'vue'
import { useAnchoredOverlay } from '../composables/useAnchoredOverlay'
import { OVERLAY_LAYER } from '../layers'

const props = withDefaults(
  defineProps<{
    cardClass?: string
    offset?: number
    focusable?: boolean
  }>(),
  {
    cardClass: 'w-64',
    offset: 8,
    focusable: false,
  }
)

const triggerRef = ref<HTMLElement | null>(null)
const cardRef = ref<HTMLElement | null>(null)
const cardId = `nanocat-hover-card-${useId()}`
const visible = ref(false)
const tooltipLayerStyle = { zIndex: OVERLAY_LAYER.tooltip }
let hideTimeout: ReturnType<typeof setTimeout> | null = null
const floating = useAnchoredOverlay(visible, triggerRef, cardRef, {
  placement: () => 'top',
  align: () => 'center',
  gap: () => props.offset,
  fallbackStrategy: 'opposite-on-overflow',
  arrowPadding: 12,
})
const placement = computed<'top' | 'bottom'>(() => {
  const resolved = floating.position.value.placement
  return resolved === 'bottom' ? 'bottom' : 'top'
})
const tooltipStyle = floating.panelStyle
const arrowStyle = computed(() => ({
  left: floating.position.value.arrowOffset === null
    ? '50%'
    : `${floating.position.value.arrowOffset}px`,
}))

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

const showTooltip = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
  void floating.present()
}

const hideTooltip = () => {
  hideTimeout = setTimeout(() => {
    hideTimeout = null
    floating.dismiss()
  }, 150)
}

const hideImmediately = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
  floating.dismiss()
}

const handleTooltipEnter = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
}

const handleTooltipLeave = () => {
  floating.dismiss()
}

const toggleTooltip = () => {
  if (visible.value) {
    floating.dismiss()
  } else {
    showTooltip()
  }
}

onBeforeUnmount(() => {
  if (hideTimeout) clearTimeout(hideTimeout)
})
</script>
