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
      :class="['ui-tooltip', `ui-tooltip--${tooltipPlacement}`]"
      :style="tooltipStyle"
    >
      {{ text }}
      <span :class="['ui-tooltip-arrow', `ui-tooltip-arrow--${tooltipPlacement}`]"></span>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'

type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left'

const props = defineProps<{
  text: string
  offset?: number
  placement?: TooltipPlacement
}>()

const triggerRef = ref<HTMLElement | null>(null)
const visible = ref(false)
const tooltipStyle = ref<Record<string, string>>({})
const tooltipPlacement = computed(() => props.placement ?? 'top')

const showTooltip = () => {
  visible.value = true
  nextTick(() => {
    if (!triggerRef.value) return
    const rect = triggerRef.value.getBoundingClientRect()
    const offset = props.offset ?? 8
    const currentPlacement = tooltipPlacement.value

    if (currentPlacement === 'right') {
      tooltipStyle.value = {
        left: `${rect.right + offset}px`,
        top: `${rect.top + rect.height / 2}px`,
      }
      return
    }

    if (currentPlacement === 'bottom') {
      tooltipStyle.value = {
        left: `${rect.left + rect.width / 2}px`,
        top: `${rect.bottom + offset}px`,
      }
      return
    }

    if (currentPlacement === 'left') {
      tooltipStyle.value = {
        left: `${rect.left - offset}px`,
        top: `${rect.top + rect.height / 2}px`,
      }
      return
    }

    tooltipStyle.value = {
      left: `${rect.left + rect.width / 2}px`,
      top: `${rect.top - offset}px`,
    }
  })
}

const hideTooltip = () => {
  visible.value = false
}
</script>
