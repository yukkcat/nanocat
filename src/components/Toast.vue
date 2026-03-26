<template>
  <Teleport to="body">
    <div class="fixed right-4 top-4 z-[200] flex max-w-[min(420px,90vw)] flex-col gap-3">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="toast-card"
          :class="toastClass(toast.type)"
        >
          <div class="toast-icon-wrap">
            <svg
              v-if="toast.type === 'success'"
              class="toast-icon text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <svg
              v-else-if="toast.type === 'error'"
              class="toast-icon text-rose-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <svg
              v-else-if="toast.type === 'warning'"
              class="toast-icon text-amber-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <svg
              v-else
              class="toast-icon text-sky-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <div class="toast-body">
            <p v-if="toast.title" class="toast-title">{{ toast.title }}</p>
            <p class="toast-message">
              {{ toast.message }}
            </p>
          </div>

          <button
            class="toast-close"
            @click="emit('remove', toast.id)"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { ToastItem } from '../types'

defineProps<{
  toasts: ToastItem[]
}>()

const emit = defineEmits<{
  (e: 'remove', id: string): void
}>()

const toastClass = (type: string) => {
  switch (type) {
    case 'success':
      return 'toast-card--success'
    case 'error':
      return 'toast-card--error'
    case 'warning':
      return 'toast-card--warning'
    default:
      return 'toast-card--info'
  }
}
</script>

<style scoped>
.toast-card {
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 12px;
  overflow: hidden;
  border: 1px solid hsl(var(--border));
  border-radius: 18px;
  background: hsl(var(--card) / 0.98);
  padding: 14px 14px 14px 12px;
  box-shadow:
    0 12px 30px rgba(15, 23, 42, 0.08),
    0 3px 10px rgba(15, 23, 42, 0.05);
  backdrop-filter: blur(10px);
}

.toast-card--success {
  border-color: rgba(16, 185, 129, 0.28);
  background: linear-gradient(180deg, rgba(16, 185, 129, 0.08), rgba(255, 255, 255, 0.985));
  box-shadow:
    0 12px 30px rgba(16, 185, 129, 0.06),
    0 3px 10px rgba(15, 23, 42, 0.05);
}

.toast-card--error {
  border-color: rgba(244, 63, 94, 0.28);
  background: linear-gradient(180deg, rgba(244, 63, 94, 0.085), rgba(255, 255, 255, 0.985));
  box-shadow:
    0 12px 30px rgba(244, 63, 94, 0.06),
    0 3px 10px rgba(15, 23, 42, 0.05);
}

.toast-card--warning {
  border-color: rgba(245, 158, 11, 0.3);
  background: linear-gradient(180deg, rgba(245, 158, 11, 0.09), rgba(255, 255, 255, 0.985));
  box-shadow:
    0 12px 30px rgba(245, 158, 11, 0.06),
    0 3px 10px rgba(15, 23, 42, 0.05);
}

.toast-card--info {
  border-color: rgba(14, 165, 233, 0.28);
  background: linear-gradient(180deg, rgba(14, 165, 233, 0.08), rgba(255, 255, 255, 0.985));
  box-shadow:
    0 12px 30px rgba(14, 165, 233, 0.06),
    0 3px 10px rgba(15, 23, 42, 0.05);
}

.toast-icon-wrap {
  display: flex;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: hsl(var(--secondary) / 0.7);
}

.toast-icon {
  width: 16px;
  height: 16px;
}

.toast-body {
  display: flex;
  min-width: 0;
  flex: 1 1 auto;
  align-items: center;
  gap: 8px;
  line-height: 1.35;
}

.toast-title {
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 600;
  color: hsl(var(--foreground));
  white-space: nowrap;
}

.toast-message {
  font-size: 12px;
  color: hsl(var(--muted-foreground));
  word-break: break-word;
}

.toast-close {
  display: inline-flex;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: hsl(var(--muted-foreground));
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.toast-close:hover {
  background: hsl(var(--secondary));
  color: hsl(var(--foreground));
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.22s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(-4px) scale(0.985);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.985);
}

.toast-move {
  transition: transform 0.22s ease;
}
</style>
