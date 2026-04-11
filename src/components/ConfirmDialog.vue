<template>
  <ModalShell
    :open="open"
    :title="title"
    size-class="max-w-sm"
    root-class="shadow-[var(--shadow-floating)]"
    header-class="border-b-0 pb-0"
    body-class="px-5 pt-3 pb-5"
    footer-class="border-t-0 pt-0"
    :show-close="false"
    @close="$emit('cancel')"
  >
    <p class="ui-dialog-body">{{ message }}</p>

    <template #footer>
      <Button
        size="xs"
        variant="outline"
        root-class="min-w-14 justify-center text-muted-foreground"
        @click="$emit('cancel')"
      >
        {{ cancelText }}
      </Button>
      <Button
        size="xs"
        variant="primary"
        root-class="min-w-14 justify-center"
        @click="$emit('confirm')"
      >
        {{ confirmText }}
      </Button>
    </template>
  </ModalShell>
</template>

<script setup lang="ts">
import Button from './Button.vue'
import ModalShell from './ModalShell.vue'

defineProps<{
  open: boolean
  title: string
  message: string
  confirmText: string
  cancelText: string
}>()

defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()
</script>
