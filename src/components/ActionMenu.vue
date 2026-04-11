<template>
  <div ref="root" class="relative inline-flex">
    <Button
      variant="outline"
      :size="sizeClasses.menuButton === 'ui-btn-xs' ? 'xs' : 'sm'"
      :disabled="disabled"
      :root-class="`justify-between gap-2 ${resolvedTriggerClass}`.trim()"
      @click="toggle"
    >
      <span>{{ label }}</span>
      <svg
        viewBox="0 0 20 20"
        class="h-3.5 w-3.5 transition-transform"
        :class="open ? 'rotate-180' : ''"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M5 7l5 6 5-6H5z" />
      </svg>
    </Button>

    <div
      v-if="open && !disabled"
      class="ui-floating-panel absolute bottom-full mb-2 !rounded-2xl !p-1.5"
      :class="[align === 'left' ? 'left-0' : 'right-0', resolvedContentClass]"
    >
      <template v-for="item in items" :key="item.key">
        <div
          v-if="item.dividerBefore"
          class="my-1 border-t border-border"
        ></div>
        <button
          type="button"
          class="ui-menu-item"
          :class="item.danger ? 'ui-menu-item-danger' : ''"
          :disabled="item.disabled"
          @click="handleSelect(item.key)"
        >
          {{ item.label }}
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Button from './Button.vue'
import { getToolbarSizeClasses } from '../presets'
import type { ActionMenuItem, UiSize } from '../types'

const props = withDefaults(defineProps<{
  label: string
  items: ActionMenuItem[]
  disabled?: boolean
  align?: 'left' | 'right'
  size?: UiSize
  triggerClass?: string
  buttonClass?: string
  contentClass?: string
  menuClass?: string
}>(), {
  disabled: false,
  align: 'right',
  size: 'sm',
  triggerClass: '',
  buttonClass: '',
  contentClass: '',
  menuClass: 'min-w-max',
})

const emit = defineEmits<{
  (e: 'select', key: string): void
}>()

const open = ref(false)
const root = ref<HTMLElement | null>(null)
const sizeClasses = computed(() => getToolbarSizeClasses(props.size))
const resolvedTriggerClass = computed(() => props.triggerClass || props.buttonClass)
const resolvedContentClass = computed(() => props.contentClass || props.menuClass)

function close() {
  open.value = false
}

function toggle() {
  if (props.disabled) return
  open.value = !open.value
}

function handleSelect(key: string) {
  close()
  emit('select', key)
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as Node | null
  if (!target) return
  if (root.value?.contains(target)) return
  close()
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>
