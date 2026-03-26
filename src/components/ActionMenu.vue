<template>
  <div ref="root" class="relative inline-flex">
    <button
      type="button"
      class="ui-btn ui-btn-xs ui-btn-outline justify-between gap-2"
      :class="buttonClass"
      :disabled="disabled"
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
    </button>

    <div
      v-if="open && !disabled"
      class="absolute bottom-full mb-2 rounded-2xl border border-border bg-card p-1.5 shadow-2xl"
      :class="[align === 'left' ? 'left-0' : 'right-0', menuClass]"
    >
      <template v-for="item in items" :key="item.key">
        <div
          v-if="item.dividerBefore"
          class="my-1 border-t border-border"
        ></div>
        <button
          type="button"
          class="ui-menu-item"
          :class="item.danger ? 'text-red-500 hover:bg-red-500/10 hover:text-red-500' : ''"
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
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { ActionMenuItem } from '../types'

const props = withDefaults(defineProps<{
  label: string
  items: ActionMenuItem[]
  disabled?: boolean
  align?: 'left' | 'right'
  buttonClass?: string
  menuClass?: string
}>(), {
  disabled: false,
  align: 'right',
  buttonClass: '',
  menuClass: 'min-w-max',
})

const emit = defineEmits<{
  (e: 'select', key: string): void
}>()

const open = ref(false)
const root = ref<HTMLElement | null>(null)

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
