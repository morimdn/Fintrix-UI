# Research & Design Decisions

**Techosoul UI — FinTech-first. Built for modern software.**

This document explains the design system's implemented foundations and the
engineering evidence behind them. Its origins in financial-product requirements
inform the priorities, while the components remain reusable across enterprise,
CRM, ERP, SaaS and other React applications.

## Evidence and interpretation

**Recorded decisions** below refer to existing project records or implementation.
**Interpretation** explains how those choices support the product's positioning;
it does not introduce a historical claim about why a decision was originally made.

The evidence is a working prototype, engineering evaluations, synthetic datasets,
automated tests and browser captures. It is not an external market study,
competitive platform comparison, interview programme or usability study. No such
research is claimed. The original reports retain their dates, package names,
measurements and limitations; current behavior is checked against source and tests.

## Ant Design 6 as the foundation

**Recorded decision.** The [Phase 1 evaluation](antd-evaluation.md) found that Ant
Design's tables, forms, overlays and theming supported the prototype's needs.
It documented gaps such as column resizing and ordering rather than treating all
requirements as built in. [Refinement](refinement.md) retained one complete UI
framework, with a small header adapter and semantic mapping layer. The
[Phase 2 report](phase-two-report.md) then separated the library from the Showcase
and added controlled DataGrid and financial APIs.

The [current architecture](architecture.md) keeps React, React DOM and Ant Design
as peers. Standard controls are re-exports; Techosoul owns the documented wrappers,
tokens and extensions. `DataGrid<T>` builds on Ant Table rather than replacing it.

**Interpretation.** A shared control foundation makes interaction conventions and
typed APIs easier to keep consistent. Product-specific additions can stay small
and explicit. This is a project-level architectural choice, not evidence that
one framework is universally superior. Ant-specific adapters, including the
inert table-measurement row, need review when dependencies change.

## Semantic tokens and color roles

**Recorded decision.** [Refinement](refinement.md) separated solid actions from
link/selection foregrounds and made financial/status roles explicit. The
[token contract](tokens.md) now derives scoped `--techosoul-*` CSS variables,
provider settings and token JSON from
[`tokens.ts`](../packages/techosoul-ui/src/tokens.ts). There is no independently
maintained JSON palette or numbered brand scale.

The following are the actual implemented values; this document changes none of them:

| Role                   | Light     | Dark      | Intended use                              |
| ---------------------- | --------- | --------- | ----------------------------------------- |
| `primary`              | `#2159d6` | `#91b5ff` | Links and selected foregrounds            |
| `primaryHover`         | `#1744ae` | `#bdd2ff` | Hovered primary foregrounds               |
| `action`               | `#2159d6` | `#3268dc` | Filled primary actions                    |
| `actionHover`          | `#1744ae` | `#285ac5` | Hovered action fills                      |
| `onAction`             | `#ffffff` | `#ffffff` | Text on action fills                      |
| `positive` / `success` | `#087651` | `#70dfb2` | Positive direction / successful state     |
| `negative` / `danger`  | `#b92e44` | `#ff9baa` | Negative direction / danger state         |
| `warning`              | `#875c00` | `#f2cd7e` | Attention or pending states               |
| `info`                 | `#425bb0` | `#becaff` | Informational states                      |
| `neutral` / `muted`    | `#52647e` | `#adbad0` | Neutral financial values / secondary text |
| `canvas`               | `#f3f6fb` | `#0e1623` | Application background                    |
| `surface`              | `#ffffff` | `#19263a` | Content surfaces                          |
| `text`                 | `#192941` | `#edf2fb` | Main content foreground                   |

[`TechosoulProvider`](../packages/techosoul-ui/src/ThemeProvider.tsx) maps Ant's
`colorPrimary` to `action`, while links, selected tabs, pagination and table sort
foregrounds use `primary`. The distinction matters in Dark mode: the lighter link
blue is a foreground, while the deeper action blue supports white button text.

**Interpretation.** Blue primary actions identify what a person can do without
using the green/red cues that communicate financial direction. A main CTA should
not imply profit or loss. Status and financial roles can share a value today while
remaining separate semantic contracts: a completed transaction and a positive P&L
are different facts. Use words, signs and icons alongside color, as the financial
components do; direction is never a sufficient action label.

## Light/Dark architecture

**Recorded decision.** One resolved token set drives Ant `ConfigProvider` and
scoped CSS variables. Providers support per-mode typed color overrides; nested
providers keep variables and popup ancestry within their theme scope. The mode
and density axes are independent. The build emits token JSON for all four
combinations; [customization](customization.md) shows supported extension points.

Current [Documentation tests](../tests/documentation.spec.ts) check computed
foreground/background pairs and contrast through theme changes. They also cover
an independently stale ancestor color, reflecting a real browser integration
issue. Theme correctness therefore includes inherited colors, portals and update
readiness, not just palette values. The original
[validation report](validation.md) records the earlier contrast and overlay work.

**Interpretation.** Dark mode needs coordinated surfaces, borders and foregrounds,
not a simple inversion. Keeping components on the same semantic source helps a
product retain hierarchy across themes. Custom palettes still require contrast
and state testing; a typed override is not an accessibility guarantee.

## DataGrid, information density and responsive behavior

**Recorded decision.** The [evaluation](antd-evaluation.md) kept identity columns
pinned, preserved horizontal scrolling and added resizing/ordering controls.
Current `DataGrid<T>` exposes controlled widths and visibility; Ant Table props
provide sorting, filtering, selection, pagination and optional virtualization.
Consumers own business queries and persistence. Grouped column definitions belong
to `DataTable`, not the convenience DataGrid API.

The [Phase 2](phase-two-report.md) and [Phase 3](phase-three-report.md) experiments
used 10,000 synthetic records with **25 rendered rows per page**. They did not
measure 10,000 simultaneous DOM rows or establish a virtualization benchmark.
Their recorded timings include development-server and test-action overhead and
are not production performance guarantees.

**Interpretation.** Trading interfaces commonly bring comparable values, position
or account context and status indicators into dense views. These general visual
conventions motivate stable columns, aligned values and explicit hierarchy; they
are not findings from a named-platform comparison. Retaining a scrollable table
can preserve context on narrow screens, but a card layout may suit other products.
Choose it through product-specific research rather than silently hiding key fields.

## Comfortable and Compact modes

**Recorded decision.** Current tokens set Comfortable controls to **40px** and
cell padding to **16px**; Compact uses **32px** and **10px**. Both keep the same text
sizes. The early evaluation explored Ant's compact algorithm; Phase 2 records the
correction for double reduction. The current provider maps explicit sizing values
without applying an additional compact algorithm.

The Showcase adapts to smaller screens with a navigation Drawer, wrapping filters,
single-column forms and larger touch controls. Phone column resizing uses numeric
inputs instead of potentially obscured edge handles. These are application
adaptations, not a promise that every Compact control is a 44px touch target.

**Interpretation.** Density changes should trade spacing for information capacity
before reducing legibility. Desktop comparison workflows and touch-first tasks
need different decisions; the two modes provide a starting point, not a substitute
for responsive product design.

## Financial formatting and decimal precision

**Recorded decision.** [`financial.tsx`](../packages/techosoul-ui/src/financial.tsx)
formats decimal strings, numbers and bigints through `Intl.NumberFormat`.
Decimal strings pass through without conversion to `Number`. Invalid decimal
strings, nonfinite numbers and numbers above the safe magnitude range are rejected.
`maximumFractionDigits` controls display rounding; a number may already have lost
fractional precision before the formatter receives it.

`PnLIndicator` reads direction from the supplied value and treats signed zero as
neutral. Currency values use tabular numerals. Bid/ask/spread displays accept
supplied strings without calculating prices or spreads. See
[financial component guidance](components.md#financial-interfaces) and the
[financial example](../examples/documentation/Financial.tsx).

**Interpretation.** Display precision should be explicit and kept separate from
calculation. These APIs format financial information; they do not implement a
ledger, settlement, risk engine or trading execution. Modern decimal-string
support in Intl is a runtime requirement, and consumers should verify their
target environments and locale requirements.

## Inter Variable typography

**Recorded decision.** [Refinement](refinement.md) introduced self-hosted Inter
Variable with **12px** captions/statuses, **13px** table text, **14px** body/form
labels, **20px** section headings and **28px** page titles. Current foundations
also define a **36px** display size, line height **1.55** and weights **400 / 500 /
650**. Fonts are optional through `@techosoul/ui/fonts.css`; the package carries
font assets and the Inter license. Financial values use tabular numerals.

**Interpretation.** A consistent text hierarchy and aligned digits help readers
compare dense records without relying only on borders or color. Self-hosting gives
consumers control over font delivery. This is an implementation rationale, not a
claim that a comparative typography study selected Inter.

## Accessibility and interaction

**Recorded decision.** [Refinement](refinement.md) records fixes for labels,
contrast, table measurement controls, mobile navigation and column-resize input
alternatives. Current tests exercise keyboard resizing, dialogs and focus return,
responsive overflow, theme/density combinations, Documentation history navigation,
nested code-region Home/End behavior and tooltip focus/dismissal. Unit contrast
checks, axe scans and independent tarball-consumer tests provide complementary
coverage. See [accessibility guidance](accessibility.md) and
[the browser suites](../tests).

**Interpretation.** Keyboard access, descriptive state text and predictable focus
are part of efficient interaction, including in professional data workflows.
Automated checks cover specific tested states; they are not WCAG certification.
Manual screen-reader, zoom, high-contrast and target-device review remain necessary.

## Extensibility beyond FinTech

The reusable package contains controls, theme primitives, layout compositions,
data-grid extensions and display/status components. The illustrative brokerage
CRM lives in `apps/showcase`, with synthetic data and application-specific logic.
It is not part of the distributed component package.

**Interpretation.** Forms, record comparison, semantic status and theme/density
choices also serve CRM, ERP, SaaS and other enterprise applications. Compose them
with domain-specific vocabulary and data contracts; omit the financial wrappers
when they are irrelevant. This describes the foundations' scope, not a claim that
complete products for those sectors ship with Techosoul UI.

## Reading the evidence over time

- [Ant Design evaluation](antd-evaluation.md): prototype capabilities and deferred work.
- [Refinement](refinement.md) and [Phase 1 validation](validation.md): visual and interaction corrections, original test scope.
- [Phase 2 report](phase-two-report.md): library boundary, financial/grid APIs and initial consumer validation.
- [Phase 3 report](phase-three-report.md): icons, overrides, compatibility coverage and measurement limits.
- [Architecture](architecture.md), [tokens](tokens.md) and [components](components.md): current contracts.
- [Release guide](releases.md): current validation and owner-controlled publication gates.

Historical measurements and test counts belong to their original revisions. New
PRs supply their own CI evidence; this narrative does not rewrite past results.
