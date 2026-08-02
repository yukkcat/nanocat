<template>
  <span
    ref="triggerRef"
    class="inline-flex"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    @focusin="showTooltip"
    @focusout="hideTooltip"
  >
    <slot />
  </span>
  <Teleport to="body">
    <div
      v-if="visible"
      :id="tooltipId"
      ref="tooltipRef"
      role="tooltip"
      :class="['ui-tooltip', `ui-tooltip--${resolvedPlacement}`]"
      :style="[tooltipStyle, tooltipLayerStyle]"
    >
      {{ text }}
      <span :class="['ui-tooltip-arrow', `ui-tooltip-arrow--${resolvedPlacement}`]"></span>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import type { CSSProperties } from 'vue'
import { useAnchoredOverlay } from '../composables/useAnchoredOverlay'
import { OVERLAY_LAYER } from '../layers'

type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left'

const props = defineProps<{
  text: string
  offset?: number
  placement?: TooltipPlacement
}>()

const triggerRef = ref<HTMLElement | null>(null)
const tooltipRef = ref<HTMLElement | null>(null)
const visible = ref(false)
const tooltipLayerStyle = { zIndex: OVERLAY_LAYER.tooltip }
const tooltipPlacement = computed(() => props.placement ?? 'top')
const tooltipId = `nanocat-tooltip-${useId()}`
const tooltipTrigger = computed<Element | null>(() => {
  const trigger = triggerRef.value
  if (!trigger) return null

  const slottedElement = trigger.childElementCount === 1
    ? trigger.firstElementChild
    : null

  return slottedElement ?? trigger
})
const floating = useAnchoredOverlay(visible, tooltipTrigger, tooltipRef, {
  placement: () => tooltipPlacement.value,
  align: () => 'center',
  horizontalAlign: () => 'center',
  gap: () => props.offset ?? 8,
  fallbackStrategy: 'opposite-if-fit',
  constrainWidth: false,
  clampMainAxis: false,
})
const resolvedPlacement = computed<TooltipPlacement>(() => floating.position.value.placement)
const tooltipStyle = computed<CSSProperties>(() => ({
  ...floating.panelStyle.value,
  transform: 'none',
}))

const showTooltip = async () => {
  if (visible.value) return
  await floating.present()
}

const hideTooltip = () => {
  floating.dismiss()
}
</script>
