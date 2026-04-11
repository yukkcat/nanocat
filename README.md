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

Default theme:

```ts
import 'nanocat-ui/styles.css'
```

Equivalent explicit import:

```ts
import 'nanocat-ui/themes/default.css'
```

Use the shared dashboard host theme:

```ts
import 'nanocat-ui/themes/dashboard.css'
```

Do not import multiple themes in the same entry.
`dashboard.css` already includes the default theme.

Advanced:

```ts
import 'nanocat-ui/styles/base.css'
```

Use `styles/base.css` only when you want the shared component primitives without any theme entry.

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

## Localization

`nanocat-ui` now supports runtime locale configuration. Defaults are `en-US`.

```ts
import { setNanocatLocale, nanocatZhCN } from 'nanocat-ui'

// Call once in your app entry.
setNanocatLocale(nanocatZhCN)
```

You can also pass your own language pack:

```ts
setNanocatLocale({
  selectMenuPlaceholder: 'Seleziona',
  formFieldRequiredText: 'Obbligatorio',
})
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
- Input
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
- CalloutBox
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
- ValueSurface
- CodeBlock
- ModalShell
- ConfirmDialog
- HoverCard

### Switch / actions
- Button
- SegmentedTabs
- ViewModeSwitch
- ActionMenu

Full component surface:
- [COMPONENTS.md](./COMPONENTS.md)

## Style layering

`nanocat-ui` is now split into two style layers:

- `styles.css`
  Default theme entry.
- `themes/default.css`
  Minimal theme that only includes the shared component base.
- `themes/dashboard.css`
  Host-level dashboard presentation such as fonts, page background, heading style and scrollbar skin.

Recommended rule:

- component structure belongs in the component package
- visual personality belongs in a theme
- page layout belongs in the app

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
