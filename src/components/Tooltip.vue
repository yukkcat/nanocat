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
      class="ui-tooltip"
      :style="tooltipStyle"
    >
      {{ text }}
      <span class="ui-tooltip-arrow"></span>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'

const props = defineProps<{
  text: string
  offset?: number
}>()

const triggerRef = ref<HTMLElement | null>(null)
const visible = ref(false)
const tooltipStyle = ref<Record<string, string>>({})

const showTooltip = () => {
  visible.value = true
  nextTick(() => {
    if (!triggerRef.value) return
    const rect = triggerRef.value.getBoundingClientRect()
    const offset = props.offset ?? 8
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
