# nanocat-ui Roadmap

This file defines the maturity plan for `nanocat-ui`.

The goal is not to make the library look big too early.
The goal is to make it stable, reusable, predictable, and easy to grow.

---

## Current status

What is already done:

- standalone npm package
- public GitHub repository
- published package structure
- shared style entry
- Tailwind preset
- first group of reusable Vue 3 components
- basic README / CHANGELOG / component list

What is true right now:

- the package is already usable
- the package is not yet a fully mature component system
- the next step is refinement, not random expansion

---

## Main direction

`nanocat-ui` should grow in this order:

1. foundation
2. primitive components
3. pattern components
4. convenience / scenario components
5. docs site and demos

This order matters.

If the lower layers are unstable, the higher layers will keep getting reworked.

---

## Layer model

### 1. Foundation

The foundation layer includes:

- design tokens
- radius / spacing / color rules
- shared style entry
- Tailwind preset
- common utility class patterns
- default language and naming rules

Priority:
- very high

Why it matters:
- this is the base for every other component

Current direction:
- keep public package language in English
- keep app-specific styling outside the package
- reduce accidental business styling leakage

---

### 2. Primitive components

These are the core reusable building blocks.

Examples:

- Checkbox
- SelectMenu
- ModalShell
- Tooltip
- HoverCard
- EmptyState
- ResultState
- Toast

Priority:
- highest component priority

Main goal:
- stable API
- semantic props
- predictable defaults
- clean emits / slots

---

### 3. Pattern components

These are reusable UI structures built on top of primitives.

Examples:

- ToolbarShell
- TableShell
- CardHeader
- StatCard
- KeyValueList
- SegmentedTabs
- ViewModeSwitch

Priority:
- high, after primitives are more stable

Main goal:
- solve common layout problems
- stay reusable across dashboards and admin tools

---

### 4. Convenience / scenario components

These are still public components, but they are more scenario-oriented.

Examples:

- FilterSelect
- StatusPill
- StatusDetailPill
- future dashboard-oriented helpers

Priority:
- medium, after the lower layers are solid

Main goal:
- provide faster building blocks for real products
- become a strength of the library, not a source of API chaos

Rule:
- keep them only if the scenario is broad enough
- do not add wrappers that only make sense for one project

---

### 5. Docs and demos

This comes later.

Includes:

- docs site
- live examples
- demo pages
- usage recipes

Priority:
- important, but not first

Reason:
- the package API must be stable enough first

---

## Maturity rules

These rules should guide future work.

### Rule 1: public package uses English

`nanocat-ui`:
- default text in English
- docs in English
- component naming in English

Business apps can still use any language they want.

---

### Rule 2: prefer semantic props over class-driven API

Less ideal:

- `toneClass`
- `cardClass`
- `buttonClass`

More mature direction:

- `tone="success"`
- `variant="soft"`
- `size="sm"`

Notes:
- escape hatches are still useful
- full refactor is not required immediately
- move in this direction gradually

---

### Rule 3: every public component should have clear API surface

Each component should eventually define clearly:

- props
- emits
- slots
- defaults
- intended usage

---

### Rule 4: do not expand too fast

A bigger library is not automatically a better library.

Prefer:
- fewer stable components

Over:
- many inconsistent components

---

## Immediate priorities

### Priority A — stabilize primitive APIs

Focus first on:

1. `SelectMenu`
2. `ModalShell`
3. `Tooltip`
4. `HoverCard`
5. `EmptyState`
6. `ResultState`
7. `Toast`

Questions to answer for each:

- is the default text correct?
- is the API semantic enough?
- are props and emits easy to understand?
- are slots clear?
- does the component feel reusable outside the original app?

---

### Priority B — document public API better

Upgrade `COMPONENTS.md` so that components include:

- Props
- Emits
- Slots
- Notes

This is one of the easiest ways to make the package feel more mature.

---

### Priority C — reduce local-project smell

Keep checking for:

- business-specific defaults
- app-specific comments
- project-specific assumptions
- unclear placeholder strings

---

## Refactor direction by component group

### Group 1 — should become more semantic first

- `StatusPill`
- `StatusDetailPill`
- `MetaChip`

Target direction:

- replace some class-driven customization with semantic variants

Example future direction:

- `tone`
- `variant`
- `size`

---

### Group 2 — keep as strong reusable layout helpers

- `ToolbarShell`
- `TableShell`
- `CardHeader`
- `StatCard`
- `KeyValueList`

Target direction:

- clearer usage docs
- stable slot contracts
- fewer surprises

---

### Group 3 — keep as scenario helpers, but gate carefully

- `FilterSelect`
- future filter / panel / dashboard helpers

Target direction:

- keep only if the scenario is common enough
- avoid wrappers that exist only for one product page

---

## When to return focus to gemini2api

It is fine to continue product work in `gemini2api`.

Recommended rule:

- if a UI need is generic enough, improve `nanocat-ui`
- if a UI need is specific to reverse proxy product logic, keep it in `gemini2api`

Practical balance:

- stabilize the `nanocat-ui` base first
- then continue app features
- pull shared UI improvements back into the package in small batches

---

## Near-term milestone

The next good milestone is not “make it huge”.

The next good milestone is:

### `0.1.1`

Suggested meaning:

- public package cleanup
- better docs
- more consistent English defaults
- cleaner component API surface

Not required yet:
- docs site
- large demo system
- major API redesign

---

## Long-term goal

`nanocat-ui` should become:

- lightweight
- reusable
- fast to adopt
- pleasant for AI-assisted development
- strong in dashboard / admin / AI-tool patterns

That means:

- a solid foundation first
- a coherent API second
- a useful ecosystem third
