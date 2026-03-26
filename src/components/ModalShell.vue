<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[120] overflow-y-auto px-3 py-4"
      :class="overlayClass"
      @click.self="handleClose('overlay')"
    >
      <div class="flex min-h-full items-center justify-center">
        <div
          class="ui-surface w-full overflow-hidden shadow-lg"
          :class="[sizeClass, panelClass]"
          role="dialog"
          aria-modal="true"
        >
          <div
            v-if="$slots.header || title || description || showClose"
            class="flex items-start justify-between gap-4 border-b border-border px-5 py-3"
            :class="headerClass"
          >
            <slot name="header">
              <div class="min-w-0">
                <h4 v-if="title" class="ui-section-title">{{ title }}</h4>
                <p v-if="description" class="mt-1 text-sm text-muted-foreground">{{ description }}</p>
              </div>
            </slot>

            <button
              v-if="showClose"
              type="button"
              class="ui-btn ui-btn-xs ui-btn-outline min-w-14 justify-center text-muted-foreground"
              @click="handleClose('button')"
            >
              {{ closeText }}
            </button>
          </div>

          <div class="px-4 py-3" :class="bodyClass">
            <slot />
          </div>

          <div
            v-if="$slots.footer"
            class="flex items-center justify-end gap-2 border-t border-border px-5 py-3"
            :class="footerClass"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  open: boolean
  title?: string
  description?: string
  sizeClass?: string
  panelClass?: string
  overlayClass?: string
  headerClass?: string
  bodyClass?: string
  footerClass?: string
  closeText?: string
  showClose?: boolean
  closeOnOverlay?: boolean
}>(), {
  title: '',
  description: '',
  sizeClass: 'max-w-[44rem]',
  panelClass: '',
  overlayClass: 'bg-black/40',
  headerClass: '',
  bodyClass: '',
  footerClass: '',
  closeText: 'Close',
  showClose: true,
  closeOnOverlay: true,
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

function handleClose(source: 'overlay' | 'button') {
  if (source === 'overlay' && !props.closeOnOverlay) {
    return
  }
  emit('close')
}
</script>
