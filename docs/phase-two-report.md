# Phase 2 delivery report

Started from latest main `a4c8580`, including merged PR #1 and its visual refinement
commit `e0129f4`. Work is isolated on `feat/phase-two-library`.

## Architecture and components

npm workspaces separate the native ESM library (`packages/fintrix-ui`) from the
public showcase/CRM (`apps/showcase`). A separate tarball consumer lives in
`examples/consumer-app`. Typed root and token exports, declarations, CSS entries
and optional self-hosted fonts are built without bundling React or Ant Design.
The private provisional name `fintrix-ui-preview` is not a registry ownership claim.

Preserved core wrappers, Ant control APIs and the CRM workflow. Added generic
controlled DataGrid visibility/width APIs, CurrencyAmount, PnLIndicator,
WalletBalanceCard, AccountSummary, FinancialKPICard, KYCStatus, ClientStatus,
TransactionStatus, RiskLevelIndicator, SymbolPriceDisplay and BidAskDisplay.
All financial examples are synthetic and display-only.

Centralized TypeScript tokens drive Ant theme configuration, scoped CSS variables
and generated DTCG-style JSON. Light/dark and comfortable/compact axes remain
independent. The compact algorithm no longer shrinks an already compact height.

## Documentation and visual evidence

The public gallery retains foundations, core and financial tabs and adds 14
working documentation sections with native anchor navigation, copyable React,
financial examples and an interactive 10k dataset. Focused Storybook stories cover
Button, Forms, FormModal, DataGrid, WalletBalanceCard and KYCStatus alongside the
existing composition stories. README embeds real running-app screenshots; assets
and capture commands are documented in `docs/screenshots/README.md`.

Figma naming/variants/token correspondence are documented. No editable Figma
library is claimed. MIT is preserved, with contribution, conduct, change/release,
accessibility and third-party attribution documentation.

## Verification

- TypeScript, ESM library, showcase production and Storybook builds pass locally.
- 53 unit/interaction/contrast checks pass, preserving all 48 previous checks.
- All 14 showcase browser tests pass together: existing 10 CRM/showcase checks
  plus four public-docs/grid/responsive/axe checks.
- Packed consumer installs outside the workspace, typechecks and builds; its
  browser test verifies CSS, fonts, large decimal display, validation, both theme
  axes, compact sizing and targeted axe checks.
- CI runs these checks including the tarball consumer; remote status is reported
  in the PR/checks, not inferred from local success.
- Pages production base `/Fintrix-UI/` is prepared; workflow is manual-only.
  No merge, npm publication or Pages deployment is performed in this task.

## Performance and limitations

See `grid-benchmark.json` for measured Chromium development-server mount and
sort timings on a synthetic 10,000-row dataset with 25 rendered rows. Timings
include Playwright action/readiness overhead, vary by machine and are not an
unpaginated or virtualized rendering benchmark. Ant Table remains the foundation.
Use server pagination for larger remote datasets; evaluate Ant's virtual option
before unpaginated use. No headless replacement was justified by this experiment.

`package-metrics.json` records approximately 21.5KB of unminified own JavaScript.
A minified CurrencyAmount-only probe is about 0.8KB (0.5KB gzip) and retains no Ant
Design import; token-only also retains no Ant import. Peers are external in these
probes, so these are not total application costs. Fonts, declarations and JSON
increase the packed artifact to roughly 240KB. The showcase/Storybook still have
large React/Ant application chunks and Vite size warnings. They are not embedded
in the distributable library.

React 18 peer compatibility is not separately tested. Automated accessibility
checks are targeted, not certification. Cross-browser/manual screen-reader,
zoom/high-contrast and localization reviews remain. Intl decimal-string support
is required to preserve large display precision. Generic DataGrid currently
accepts leaf columns; use DataTable for Ant grouped-column definitions. The
legacy MetricCard retains its decorative synthetic sparkline for visual continuity.

## Recommended Phase 3

Add a React/browser compatibility matrix, manual accessibility audit, dedicated
per-component visual regression baselines and more individual stories. Expand
financial composition with a configurable watchlist and richer trading account
summary when supported by actual consumer requirements. Improve documentation
search/deep linking and the application chunk split. Measure production grid
pagination, virtualization and server data against realistic device budgets.
Verify the final package name and complete a release review before publication.

## App shell follow-up

The sidebar and header now stay stationary while main content scrolls independently.
Only overflowing sidebar navigation scrolls, with a thin semantic scrollbar and
keyboard focus. Brand/workspace and profile stay anchored; mobile drawer behavior
is preserved. Documentation tab and code-example keyboard access were also refined.
See [shell details and responsive evidence](shell-refinement.md).

Local verification: 53 unit tests, all 25 showcase browser checks (11 new shell
regressions), the independent consumer browser test, library/showcase/Pages builds,
packed consumer installation/build and Storybook build pass. Real light/dark
captures cover five viewport sizes and portrait/landscape mobile drawers.
