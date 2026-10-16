# Fintrix UI

A React design system for teams building brokerage CRMs, wallet interfaces and
risk dashboards. Fintrix combines Ant Design 6 controls with financial display
components, semantic Light/Dark tokens, two density modes and Lucide icon conventions.
It extends Ant Design; it is not a standalone replacement for it.

[Live Showcase](https://morimdn.github.io/Fintrix-UI/) ·
[Component documentation](https://github.com/morimdn/Fintrix-UI/blob/main/docs/components.md) ·
[Iconography](https://github.com/morimdn/Fintrix-UI/blob/main/docs/customization.md#icons) ·
[Installation guide](https://github.com/morimdn/Fintrix-UI/blob/main/docs/getting-started.md) ·
[GitHub repository](https://github.com/morimdn/Fintrix-UI)

## What is available today?

| Deliverable | Current status |
| --- | --- |
| Phase 2 | Merged and publicly deployed at the Live Showcase |
| Phase 3 | Implemented in [PR #5](https://github.com/morimdn/Fintrix-UI/pull/5); not yet merged or deployed |
| React library | Independently buildable, packable and installable from a local tarball |
| npm package | **Not published**; provisional `fintrix-ui-preview@0.2.0` remains private |
| GitHub Release | Not created |
| Editable Figma UI Kit | Not created; future work |

The live site currently shows Phase 2. Phase 3 screenshots and APIs below describe
the reviewed branch, not a deployed update. No `npm install fintrix-ui` command is
available. Release naming, ownership and publication require separate owner approval.

## Install the current artifact

Use Node 24, npm and Git for repository development. Consumers use React/React DOM
18.3 or 19 and Ant Design 6 as peers. Independent validation covers React
18.3.1/19.3.1 × Ant 6.0.0/6.6.6; other versions in the peer ranges are not individually verified.

```sh
git clone https://github.com/morimdn/Fintrix-UI.git
cd Fintrix-UI
npm ci
npm run build:library
mkdir -p artifacts
npm pack --workspace fintrix-ui-preview --pack-destination ./artifacts
```

These commands build the checked-out source. Until PR #5 merges, use its reviewed
checkout (`gh pr checkout 5`) **before building** to try the Phase 3 APIs. In a
separate React app, install the resulting tarball by its actual absolute path:

```sh
npm install /absolute/path/to/Fintrix-UI/artifacts/fintrix-ui-preview-0.2.0.tgz antd@6.6.6 react@19.3.1 react-dom@19.3.1
```

Follow the [complete Getting Started guide](https://github.com/morimdn/Fintrix-UI/blob/main/docs/getting-started.md) for a new
React/TypeScript app, CSS and optional local Inter fonts, FintrixProvider, a wallet
and working theme/density controls. The [complete App example](https://github.com/morimdn/Fintrix-UI/blob/main/examples/documentation/App.tsx)
is compiled against the installed artifact, along with the other documentation examples.

## Components and customization

| Area | Available APIs |
| --- | --- |
| Themes | FintrixProvider, useFintrixTheme, typed colorOverrides, tokens/CSS variables, Comfortable/Compact density |
| Iconography | FintrixIcon; optional iconTone on IconButton, MetricCard, WalletBalanceCard and FinancialKPICard |
| Actions | Button, ButtonGroup, IconButton |
| Forms | Input / Input.TextArea, Select / multi-select, Checkbox, Radio, Switch, Slider, InputNumber, RangeController, Form, DatePicker, TimePicker |
| Data | DataTable, DataGrid, ColumnResizeHandle, ResizableHeaderCell |
| Navigation | Tabs, Breadcrumb, Menu, Dropdown, Pagination |
| Feedback | StatusIndicator, Chip, Alert, Progress, Skeleton, Empty, notification, message |
| Overlays | Modal, FormModal, Drawer, Tooltip, Popover |
| Financial summaries | CurrencyAmount, formatCurrency, PnLIndicator, WalletBalanceCard, AccountSummary, FinancialKPICard |
| Financial states | KYCStatus, ClientStatus, TransactionStatus, RiskLevelIndicator |
| Supplied quotes | SymbolPriceDisplay, BidAskDisplay |
| Composition | Card, Space, MetricCard (legacy decorative synthetic sparkline) |

Standard controls are Ant Design re-exports; Fintrix wrappers add the documented
semantics and behavior. Use [component guidance](https://github.com/morimdn/Fintrix-UI/blob/main/docs/components.md) to choose
between controls and [customization](https://github.com/morimdn/Fintrix-UI/blob/main/docs/customization.md) for typed theme/icon
overrides. Financial values are display-only; decimal strings are preferred.
No ledger, trading engine, broker integration, payment system or live data feed is included.

## Explore the system

```sh
npm run build
npm run dev        # Local Showcase, including unreleased Phase 3 on this branch
npm run storybook  # Local component stories
```

The public documentation retains 14 topics grouped for developers and designers.
Local deep links such as `/#docs-getting-started`, `/#docs-grid` and `/#iconography`
open the relevant section. These navigation improvements reach the live site only
after an approved merge and deployment. Browse the Iconography tab to search
36 curated icons and copy size/stroke/tone examples; Lucide remains usable directly.

![Phase 3 searchable Iconography in dark mode](https://raw.githubusercontent.com/morimdn/Fintrix-UI/main/docs/screenshots/iconography-dark-chromium.png)
_Real browser capture from the Phase 3 branch; not yet deployed._

The **brokerage CRM is an example application**, separate from the reusable
package. It demonstrates synthetic clients, filters, selection, resizing and
record editing. The header and sidebar stay fixed while main content scrolls;
mobile navigation uses a Drawer.

![Example brokerage CRM](https://raw.githubusercontent.com/morimdn/Fintrix-UI/main/docs/screenshots/crm-light.png)
_Illustrative records, not live customer or market data._

More [real screenshots](https://github.com/morimdn/Fintrix-UI/blob/main/docs/screenshots/README.md),
[financial examples](https://github.com/morimdn/Fintrix-UI/blob/main/examples/documentation/Financial.tsx) and
[DataGrid example](https://github.com/morimdn/Fintrix-UI/blob/main/examples/documentation/Grid.tsx).

## Validate and contribute

```sh
npm run build
npm run docs:check
npm test
npm run build-storybook
npm run validate:consumer
npx playwright install --with-deps chromium
npm run test:e2e
npm run test:consumer
```

Consumer validation uses a fresh directory outside the workspace, the actual
packed library, and the exact documentation example sources. CI also checks
React 18/19 with Ant 6 endpoints and selected Firefox/WebKit workflows.
Automated accessibility checks do not establish WCAG certification; manual
assistive-technology testing remains part of release review.

Open focused GitHub pull requests targeting main. Follow [Contributing](https://github.com/morimdn/Fintrix-UI/blob/main/CONTRIBUTING.md),
include relevant test evidence, and preserve semantic tokens and synthetic data.
See [architecture](https://github.com/morimdn/Fintrix-UI/blob/main/docs/architecture.md), [token contract](https://github.com/morimdn/Fintrix-UI/blob/main/docs/tokens.md),
[Phase 3 validation](https://github.com/morimdn/Fintrix-UI/blob/main/docs/phase-three-report.md),
[documentation refinement validation](https://github.com/morimdn/Fintrix-UI/blob/main/docs/documentation-refinement.md), and
[release checklist](https://github.com/morimdn/Fintrix-UI/blob/main/docs/releases.md). Older validation reports describe their
original test dates, not current deployment status.

MIT licensed. See [LICENSE](https://github.com/morimdn/Fintrix-UI/blob/main/LICENSE) and [third-party attribution](https://github.com/morimdn/Fintrix-UI/blob/main/docs/third-party-notices.md).
Fintrix UI is independent and has no implied affiliation with MetaTrader,
cTrader or Ant Design. The editable Figma UI Kit and official npm release remain future deliverables.
