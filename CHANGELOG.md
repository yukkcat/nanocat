# Changelog

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
