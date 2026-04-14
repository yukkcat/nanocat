# Changelog

## v0.1.5 - 2026-04-13

### Added
- `Button` now supports `tag`, so the same component can render as `button`, `a`, `RouterLink`, or another host component without losing Nanocat styling

### Improved
- package scripts now call local `vite` and `vue-tsc` binaries explicitly for more reliable Windows builds and publish checks

### Verified
- `npm run check`
- `npm run build`

## v0.1.4 - 2026-04-11

### Added
- `Button` for shared primary / outline / danger actions
- `Input` for compact text and number controls
- `CalloutBox` for inline notices and explanations
- `CodeBlock` for compact log, payload, and command display
- `ValueSurface` for compact read-only value, endpoint, token and metadata blocks
- public `nanocat-ui/styles/base.css` export for advanced consumers that only want component primitives

### Improved
- expanded public docs so the exported surface matches the package entry
- clarified style layer docs so base / theme entry points are no longer mixed together

## v0.1.3 - 2026-03-27

Localization release for `nanocat-ui`.

### Added
- runtime locale helpers: `setNanocatLocale`, `resetNanocatLocale`, `useNanocatLocale`
- built-in locale presets: `nanocatEnUS` and `nanocatZhCN`

### Improved
- `FormField`, `SelectMenu`, `StatusDetailPill`, and `ViewModeSwitch` now fall back to locale text instead of hard-coded defaults
- public docs now explain localization setup and locale-driven props

### Verified
- `npm run check`
- `npm run build`

## v0.1.2 - 2026-03-27

Packaging and compatibility release for `nanocat-ui`.

### Fixed
- preserved shared `ui-*` style classes in published CSS output
- restored compact button and card helper classes for host apps
- aligned default Chinese labels used by shared select and status components

### Verified
- `npm run check`
- `npm run build`

## v0.1.1 - 2026-03-27

Stability and cleanup release for `nanocat-ui`.

### Improved
- cleaned up public docs and component surface notes
- made more default labels configurable for reuse across projects
- aligned `FilterSelect` with the newer `SelectMenu` API
- reduced project-specific wording in source comments and docs
- added small style extension props for card and pill wrappers

### Verified
- `npm run check`
- `npm run build`

## v0.1.0 - 2026-03-26

First public release of `nanocat-ui`.

### Included
- standalone Vue 3 package structure
- shared styles
- Tailwind preset
- reusable UI components
- TypeScript declarations
- npm publish setup
