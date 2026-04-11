<template>
  <label class="block">
    <div class="mb-1 flex items-center gap-2">
      <span class="ui-field-label" :class="labelClass">{{ label }}</span>
      <span v-if="required" class="text-[10px] font-semibold text-[hsl(var(--tone-error-strong))]">{{ requiredText }}</span>
      <slot name="label-extra" />
    </div>
    <slot />
    <p v-if="hint" class="mt-2 text-muted-foreground" :class="hintClass">{{ hint }}</p>
  </label>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useNanocatLocale } from '../i18n'
import { getSectionSizeClasses } from '../presets'

const props = withDefaults(
  defineProps<{
    label: string
    hint?: string
    required?: boolean
    requiredText?: string
    size?: 'sm' | 'md'
  }>(),
  {
    hint: '',
    required: false,
    requiredText: '',
    size: 'sm',
  }
)

const { label, hint, required } = toRefs(props)
const locale = useNanocatLocale()
const requiredText = computed(() => props.requiredText || locale.formFieldRequiredText)
const sizeClasses = computed(() => getSectionSizeClasses(props.size))
const labelClass = computed(() => props.size === 'md' ? 'text-sm' : '')
const hintClass = computed(() => sizeClasses.value.description)
</script>
