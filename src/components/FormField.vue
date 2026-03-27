<template>
  <label class="block text-xs">
    <div class="mb-1 flex items-center gap-2">
      <span class="ui-field-label">{{ label }}</span>
      <span v-if="required" class="text-[10px] font-semibold text-rose-500">{{ requiredText }}</span>
      <slot name="label-extra" />
    </div>
    <slot />
    <p v-if="hint" class="mt-2 text-[11px] leading-4 text-muted-foreground">{{ hint }}</p>
  </label>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    hint?: string
    required?: boolean
    requiredText?: string
  }>(),
  {
    hint: '',
    required: false,
    requiredText: '必填',
  }
)
</script>
