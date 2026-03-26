# nanocat-ui

A lightweight Vue 3 UI component library for dashboards, admin panels and AI tools.

## What it is

`nanocat-ui` is the standalone UI package extracted from a real project.
The goal is simple:

- keep common UI pieces reusable
- keep styles consistent
- stay lightweight
- make it easy to use in other Vue 3 projects

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

More props:
- [COMPONENTS.md](./COMPONENTS.md)

## Local development

```bash
npm install
npm run check
npm run build
```

## Version

Current public version:
- `0.1.0`

## Roadmap

Next steps:
- improve docs
- add demo pages
- add more reusable components
- make external integration even easier

## Changelog

- [CHANGELOG.md](./CHANGELOG.md)

## License

[MIT](./LICENSE)
