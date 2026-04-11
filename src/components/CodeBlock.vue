<template>
  <pre
    class="ui-code-block"
    :class="resolvedRootClass"
  ><code>{{ displayCode }}</code></pre>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { resolveRootClass } from '../presets'

const props = withDefaults(defineProps<{
  code?: string
  rootClass?: string
}>(), {
  code: '',
  rootClass: '',
})

const resolvedRootClass = computed(() => resolveRootClass(props.rootClass))
const displayCode = computed(() => props.code)
</script>
