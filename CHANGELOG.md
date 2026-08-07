# Changelog

## Unreleased

## v0.1.9 - 2026-08-07

### Added
- allowed users to drag `SideDock` vertically while it remains anchored to the viewport edge

### Improved
- upgraded the development toolchain to Vue 3.5.41 and Vite 8
- updated package repository metadata for `nanocat-ui`

## v0.1.8 - 2026-08-02

### Added
- shared `CloseButton` for modal, drawer, preview, and compact panel headers
- selected-value alignment for `SelectMenu` and `GroupedSelectMenu`
- explicit top, right, bottom, and left placement for `Tooltip`
- reusable responsive `DrawerShell` with a subtle reduced-motion-aware transition
- centered and start-aligned layout presets for `LoadingState`

### Improved
- changed the built-in `ModalShell` close action to the same accessible icon control used by custom headers
- unified floating-menu padding and item spacing, with pill-shaped hover and selected states
- kept active segmented tabs visually stable on hover
- preserved semantic chip tones over neutral primitive defaults
- positioned tooltips from the actual slotted trigger and kept them inside the viewport while scrolling or resizing
- aligned action-menu trigger labels consistently
- kept teleported select and action menus in trigger-relative Tab order, including inside modals
- restored the documented ConfirmDialog Escape fallback when `closeOnEscape` is omitted, including when focus falls back to `document.body`
- preserved the 0.1.7 `TableShell.wrapperClass` root-class fallback while adding `scrollClass` for the scrolling layer
- expanded `TableShell` with constrained scrolling, sticky headers, a compact non-skeleton loading status, integrated empty states, a fixed footer slot, and unobtrusive narrow-screen scrolling
- moved drawer placement, viewport sizing, and motion out of individual console pages

### Verified
- `npm run test:e2e`
- `npm run check`
- `npm run build`

## v0.1.7 - 2026-07-28

### Added
- shared `GroupedSelectMenu` and floating-panel keyboard/viewport positioning primitives
- first-level submenus, headings, active states, and input-style triggers for `ActionMenu`
- `Skeleton` and expanded examples for menus, tags, dialogs, and bare modals in the Playground

### Improved
- unified dropdown spacing, selection indicators, placement, and exclusive open behavior
- unified `MetaChip`, `StatusPill`, and `StatusDetailPill` tone, size, radius, and border controls
- added modal focus trapping, scroll locking, intentional z-index layering, and configurable overlay/Escape closing
- fixed checkbox selected and indeterminate colors through theme tokens, including dark mode
- expanded component contracts and usage documentation

### Verified
- `npm run check`
- `npm run build`

## v0.1.6 - 2026-04-15

### Fixed
- restored comfortable default spacing, color, and background for shared `ui-chip`, `ui-pill`, and `ui-meta-chip` primitives
- prevented compact metadata labels from looking squeezed when used for versions, counts, and file sizes

### Verified
- `npm run check`
- `npm run build`

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
