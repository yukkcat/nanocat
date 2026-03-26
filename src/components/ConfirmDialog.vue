<template>
  <teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[300] flex items-center justify-center bg-black/30 px-4"
      @click.self="$emit('cancel')"
    >
      <div class="ui-overlay-panel w-full max-w-sm shadow-2xl">
        <p class="ui-dialog-title">{{ title }}</p>
        <p class="ui-dialog-body">{{ message }}</p>
        <div class="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            class="ui-btn ui-btn-xs ui-btn-outline min-w-14 justify-center text-muted-foreground hover:border-foreground hover:text-foreground"
            @click="$emit('cancel')"
          >
            {{ cancelText }}
          </button>
          <button
            type="button"
            class="ui-btn ui-btn-xs ui-btn-primary min-w-14 justify-center"
            @click="$emit('confirm')"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
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
