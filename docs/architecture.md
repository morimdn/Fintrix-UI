# Architecture decision record

## Scope and identity

Fintrix UI is an original, MIT-licensed POC for financial operations software. Blue actions, cool neutral surfaces, restrained elevation, labeled states, and tabular figures prioritize calm daily use. The visual identity and CSS were authored for this project. No proprietary terminal assets, fonts, charts, or trading-platform layouts are used. This is not an official Ant Design theme.

## Layers

- `src/system/tokens.ts`: typed foundations, semantic light/dark palettes, independent density values, CSS variable adapter.
- `src/system/ThemeProvider.tsx`: React context, Ant Design algorithms and component mappings, scoped variables and popup containers. Light/dark and comfortable/compact are orthogonal; dark + compact is supported.
- `src/system/components.tsx`: thin Ant Design exports plus specialized presentation primitives. `IconButton.tsx` is a small independent entry; `ColumnResizeHandle.tsx` supplies pointer/keyboard resizing and its header adapter. Native Ant Design prop contracts are retained. Controlled widgets accept value/onChange. `FormModal` provides a theme-scoped large modal shell; the demo composes it with Ant Form. `DataTable<T>` accepts Ant Design `TableProps<T>` and defaults to an `id` key; override `rowKey` for another identity.
- `src/demo`: synthetic client model, in-memory data operations and CRM-specific form. Business logic stays here. No backend, authentication, payments, or persistence.
- Storybook: isolated actions, states, controller, gallery and full CRM with theme/density toolbar controls.

Use `FintrixProvider` once at the application boundary and import system CSS. Portals must stay inside its variable scope: popovers/selects use the provider container; the demo modal renders inline. Imperative feedback uses Ant Design App context. Multiple independent provider roots are not a validated use case yet.

## Reuse example

```tsx
import {
  FintrixProvider,
  Button,
  StatusIndicator,
  RangeController,
} from "./system";
import "./styles.css";

<FintrixProvider initialMode="dark" initialDensity="compact">
  <Button type="primary">Create client</Button>
  <StatusIndicator label="Verified" tone="success" />
</FintrixProvider>;
```

`useFintrixTheme()` exposes `mode`, `density`, `setMode`, `setDensity`. Settings are session-local. `MetricCard` requires explicit text for change and comparison period. The POC trend figures are illustrative, not calculated historical analytics.

## Technology and delivery

React, TypeScript, Vite and Ant Design are the sole UI foundation. Lucide supplies icons. Vitest/RTL check token invariants, combined filters, provider state and form validation. Playwright verifies the real browser workflow and captures screenshots. Dependencies are pinned in package.json and package-lock.json. Node 24 is the validated runtime.

This repository remains an application POC, not an npm package. Phase 2 should extract system CSS from demo CSS, define a package build with peer dependencies, add individual component stories, perform accessibility and localization audits, and validate scale before release.

## Visual refinement

See [refinement decisions](refinement.md) for the surface contract, local Inter font, mobile drawer, accessible column resizing, measurement-row compatibility fix and lazy loading. The showcase provides Foundations, Core components and Financial UI documentation tabs. Density never reduces caption text below 12px.
