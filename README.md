# nanocat-ui

A lightweight Vue 3 UI component library for modern dashboards, admin panels and internal tools.

## What it is

`nanocat-ui` is a standalone UI package built from real application work.
The goal is simple:

- keep common UI pieces reusable
- keep styles consistent
- stay lightweight
- make it easy to drop into other Vue 3 projects

## Install

```bash
npm install nanocat-ui vue @iconify/vue
```

## Usage

### 1. Import styles

```ts
import 'nanocat-ui/styles.css'
```

### 2. Import components

```ts
import { SelectMenu, StatusPill, Toast } from 'nanocat-ui'
```

### 3. Use the Tailwind preset

```ts
import uiPreset from 'nanocat-ui/tailwind-preset'

export default {
  presets: [uiPreset],
}
```

### 4. Make sure Tailwind scans your app files

```ts
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  presets: [uiPreset],
}
```

## Quick example

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { SelectMenu } from 'nanocat-ui'
import 'nanocat-ui/styles.css'

const value = ref('all')
const options = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Paused', value: 'paused' },
]
</script>

<template>
  <SelectMenu v-model="value" :options="options" />
</template>
```

## Included components

### Form / select
- Checkbox
- SelectMenu
- FilterSelect
- FormField
- FormSection
- FieldGrid

### Status / feedback
- StatusPill
- StatusDetailPill
- MetaChip
- ResultState
- EmptyState
- Toast
- HelpTip
- Tooltip

### Layout / container
- CardHeader
- ChartCard
- StatCard
- ToolbarShell
- TableShell
- KeyValueList
- ModalShell
- ConfirmDialog
- HoverCard

### Switch / actions
- SegmentedTabs
- ViewModeSwitch
- ActionMenu

Full component surface:
- [COMPONENTS.md](./COMPONENTS.md)

## Local development

```bash
npm install
npm run check
npm run build
```

## Changelog

- [CHANGELOG.md](./CHANGELOG.md)

## License

[MIT](./LICENSE)
