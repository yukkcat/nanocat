# Style Layers

`nanocat-ui` uses three style layers:

## 1. Base layer

File:

- `src/styles/base.css`
- public import: `nanocat-ui/styles/base.css`

Owns:

- design tokens
- shared `ui-*` classes
- component-facing primitives

Does not own:

- app background mood
- product font pairing
- page layout

## 2. Theme layer

File:

- `src/themes/default.css`
- `src/themes/dashboard.css`
- public imports:
  - `nanocat-ui/themes/default.css`
  - `nanocat-ui/themes/dashboard.css`

Owns:

- base theme entry
- host font stack
- page background treatment
- heading typography
- scrollbar skin

Rule:

- themes may override tokens and host-level global presentation
- themes should not redefine component structure classes like `.ui-btn` or `.ui-panel`

## 3. App layer

Lives in the consuming app.

Owns:

- routes
- layouts
- dashboards
- product-specific feature styling

Examples:

- sidebars
- monitor cards
- log page grouping
- business-only helpers
