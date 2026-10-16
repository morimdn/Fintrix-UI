# Phase 3 documentation refinement

This refinement updates existing PR #5 on `feat/phase-three-release-readiness`.
It preserves the library APIs, Ant Design architecture, themes, financial display
components, icon gallery, CRM and independent app-shell scrolling.

## Current status

Phase 2 is merged and publicly deployed at
[the Live Showcase](https://morimdn.github.io/Fintrix-UI/). Phase 3 remains in
[PR #5](https://github.com/morimdn/Fintrix-UI/pull/5), not merged or deployed.
The private `fintrix-ui-preview@0.2.0` library is installable from its generated
tarball. No public npm package, GitHub Release or editable Figma UI Kit exists.
Historical reports retain their dated observations; README and releases.md now
state the current status explicitly.

## Documentation and onboarding

The 14 existing topics remain, grouped into Start here, Foundations, Components,
FinTech, Accessibility, and Contribution & release. Repeated decorative labels
were removed. Native section permalinks, active navigation, keyboard-focusable
code blocks, copy success/failure feedback and cross-tab links make the content
navigable. Hash deep links, browser Back and reload restore the requested section
after its tab becomes visible. Inline prose links use underlines and semantic
foreground colors in both themes.

Getting Started now separates prerequisites, cloning, locked dependency install,
library build, tarball creation, separate consumer install, styles/fonts, provider,
rendering and mode switching. The main README distinguishes the example CRM from
the reusable package, lists Phase 3 APIs, links to installation/components/icons,
and shows two real screenshots. Package README links are converted to stable
main URLs (and raw image URLs) so they do not depend on absent archive directories.
New files linked on main will become available there when PR #5 merges.

Core guidance distinguishes Ant re-exports from Fintrix wrappers and explains
control selection, variants, accessibility and appropriate boundaries. Modal,
Drawer and full-page workflows use brokerage/KYC examples. Foundations describe
actual typography, spacing, density, motion and semantic token contracts.

DataGrid guidance covers typed/controlled columns, resizing, fixed columns,
filter/sort, pagination, selection, keyboard access and responsive scrolling.
The 10,000-record demo still renders 25 rows per page; it is not a virtualization
benchmark. Balance cells now use CurrencyAmount. Hiding currency is explicitly a
generic visibility example; production reconciliation must preserve currency
context. The runnable example hides a noncritical note column instead.
Financial examples distinguish direction, workflow status and risk, use synthetic
decimal strings and perform no accounting or trade execution.

## Example validation

Eight complete TypeScript modules in `examples/documentation` are the source for
public code examples. The Markdown onboarding and customization examples are
synchronized from those files by `npm run docs:sync`; `npm run docs:check` detects
drift and is run in CI. `validate:consumer` copies the same modules into a fresh
external tarball installation, where TypeScript and Vite compile them without
source aliases. Browser routes exercise onboarding and all seven component examples.
Other JSX fragments are explicitly identified as fragments needing surrounding
application context; the icon-gallery fragment links to a complete tested example.

The documented Vite bootstrap was exercised with create-vite 9.2.1, Node 24 and
npm: scaffold React/TypeScript outside the repository, install the packed artifact
with React/React DOM 19.3.1 and Ant 6.6.6, replace App.tsx, remove the starter's
index.css import, and build successfully. The guide uses create-vite@latest, so
future scaffolding versions may require a fresh validation.

## Validation and evidence

- Library and Showcase production builds / TypeScript: passed.
- Storybook production build: passed.
- Unit suite: 120 passed; no accessibility rules or contrast thresholds reduced.
- Full Chromium regression suite: 40 passed, including all prior CRM/grid/shell checks.
- Documentation/iconography targeted Chromium suite: 11 passed, covering desktop,
  tablet and mobile in Light/Dark, reduced motion, deep links, Back/reload, code
  keyboard access, copy fallback, tooltip states and axe checks.
- External consumers: React 18.3.1 and 19.3.1 with Ant 6.6.6 each passed typecheck,
  production build and all 10 browser checks, including the complete onboarding App.
- CI retains all four React 18/19 × Ant 6.0.0/6.6.6 combinations and now includes
  documentation regressions in Firefox/WebKit. The current PR checks are the
  authoritative final full-suite and cross-engine result.

Screenshots captured from Chromium, not generated mockups:

| Layout | Light | Dark |
| --- | --- | --- |
| Desktop | [Image](screenshots/docs-desktop-light-chromium.png) | [Image](screenshots/docs-desktop-dark-chromium.png) |
| Tablet | [Image](screenshots/docs-tablet-light-chromium.png) | [Image](screenshots/docs-tablet-dark-chromium.png) |
| Mobile | [Image](screenshots/docs-mobile-light-chromium.png) | [Image](screenshots/docs-mobile-dark-chromium.png) |

## Limits and publication boundary

Manual screen-reader, high-contrast, zoom/localization and native Firefox scrollbar
appearance review remain release work; automated axe checks are not certification.
Clipboard permissions differ by browser, so actual clipboard readback remains
Chromium-specific; recovery behavior is tested across engines. CommonJS and SSR
hydration are not newly claimed. Some existing Ant-heavy application chunks still
trigger Vite size warnings; no component-library catalog import was added.

No branch or PR was created for this refinement. No merge, Pages deployment,
package rename, removal of private:true, npm publication or GitHub Release was
performed. The first public npm release remains a separate owner-approved action.
