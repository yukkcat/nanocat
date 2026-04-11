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
          class="ui-modal-panel"
          :class="[sizeClass, resolvedRootClass]"
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

            <Button
              v-if="showClose"
              size="xs"
              variant="outline"
              root-class="min-w-14 justify-center text-muted-foreground"
              @click="handleClose('button')"
            >
              {{ resolvedCloseText }}
            </Button>
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
import { computed } from 'vue'
import { useNanocatLocale } from '../i18n'
import { resolveRootClass } from '../presets'
import Button from './Button.vue'

const props = withDefaults(defineProps<{
  open: boolean
  title?: string
  description?: string
  sizeClass?: string
  rootClass?: string
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
  rootClass: '',
  panelClass: '',
  overlayClass: 'ui-overlay-backdrop',
  headerClass: '',
  bodyClass: '',
  footerClass: '',
  closeText: '',
  showClose: true,
  closeOnOverlay: true,
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const locale = useNanocatLocale()
const resolvedRootClass = computed(() => resolveRootClass(props.rootClass, props.panelClass))
const resolvedCloseText = computed(() => props.closeText || locale.modalCloseText)

function handleClose(source: 'overlay' | 'button') {
  if (source === 'overlay' && !props.closeOnOverlay) {
    return
  }
  emit('close')
}
</script>
