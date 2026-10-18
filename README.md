# Techosoul UI

A React design system for teams building brokerage CRMs, wallet interfaces and
risk dashboards. Techosoul UI is the React design system under the Techosoul umbrella brand.
It combines Ant Design 6 controls with financial display
components, semantic Light/Dark tokens, two density modes and Lucide icon conventions.
It extends Ant Design; it is not a standalone replacement for it.

[Live Showcase](https://morimdn.github.io/Techosoul-UI/) ·
[Component documentation](docs/components.md) ·
[Iconography](docs/customization.md#icons) ·
[Installation guide](docs/getting-started.md) ·
[GitHub repository](https://github.com/morimdn/Techosoul-UI)

## Current candidate

`@techosoul/ui@0.3.0` is independently buildable and packable, but remains
**private**. The monorepo root is also private and must stay private permanently.
The owner has registered **techosoul.com**; this does not establish control of the
npm `techosoul` organization, nor does it mean this site has been deployed there.
Owner control of the npm scope and publishing rights must be confirmed before
any registry write. No publication, staging, deployment or GitHub Release is
part of this rebrand.

The repository is [morimdn/Techosoul-UI](https://github.com/morimdn/Techosoul-UI).
The project-site URL is `https://morimdn.github.io/Techosoul-UI/`; deployment
remains manual. See [Pages deployment and future custom domain](docs/pages.md)
for owner instructions. `ui.techosoul.com` is a future UI host, while
`techosoul.com` remains reserved for the umbrella-brand website.
See the [migration checklist](docs/techosoul-rebrand.md),
[release guide](docs/releases.md) and [owner setup](docs/npm-owner-setup.md).

### Future registry installation (only after publication)

```sh
npm install @techosoul/ui antd
# In a new application, also install matching React peers and TypeScript types:
npm install react@19 react-dom@19
npm install --save-dev @types/react@19 @types/react-dom@19
```

Use the tarball method below until publication is confirmed.

## Install the current artifact

Use the latest merged `main` after cloning.

Use Node 24, npm and Git for repository development. Consumers use React/React DOM
18.3 or 19 and Ant Design 6 as peers. Independent validation covers React
18.3.1/19.3.1 × Ant 6.0.0/6.6.6; other versions in the peer ranges are not individually verified.

```sh
git clone https://github.com/morimdn/Techosoul-UI.git
cd Techosoul-UI
npm ci
npm run build:library
node -e "require('node:fs').mkdirSync('artifacts', { recursive: true })"
npm pack --workspace @techosoul/ui --pack-destination ./artifacts
```

In a separate React app, install the resulting tarball by its actual absolute path:

```sh
npm install /absolute/path/to/Techosoul-UI/artifacts/techosoul-ui-0.3.0.tgz antd@6.6.6 react@19.3.1 react-dom@19.3.1
```

Follow the [complete Getting Started guide](docs/getting-started.md) for a new
React/TypeScript app, CSS and optional local Inter fonts, TechosoulProvider, a wallet
and working theme/density controls. The [complete App example](examples/documentation/App.tsx)
is compiled against the installed artifact, along with the other documentation examples.

## Components and customization

| Area                | Available APIs                                                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Themes              | TechosoulProvider, useTechosoulTheme, typed colorOverrides, tokens/CSS variables, Comfortable/Compact density                              |
| Iconography         | TechosoulIcon; optional iconTone on IconButton, MetricCard, WalletBalanceCard and FinancialKPICard                                         |
| Actions             | Button, ButtonGroup, IconButton                                                                                                            |
| Forms               | Input / Input.TextArea, Select / multi-select, Checkbox, Radio, Switch, Slider, InputNumber, RangeController, Form, DatePicker, TimePicker |
| Data                | DataTable, DataGrid, ColumnResizeHandle, ResizableHeaderCell                                                                               |
| Navigation          | Tabs, Breadcrumb, Menu, Dropdown, Pagination                                                                                               |
| Feedback            | StatusIndicator, Chip, Alert, Progress, Skeleton, Empty, notification, message                                                             |
| Overlays            | Modal, FormModal, Drawer, Tooltip, Popover                                                                                                 |
| Financial summaries | CurrencyAmount, formatCurrency, PnLIndicator, WalletBalanceCard, AccountSummary, FinancialKPICard                                          |
| Financial states    | KYCStatus, ClientStatus, TransactionStatus, RiskLevelIndicator                                                                             |
| Supplied quotes     | SymbolPriceDisplay, BidAskDisplay                                                                                                          |
| Composition         | Card, Space, MetricCard (legacy decorative synthetic sparkline)                                                                            |

Standard controls are Ant Design re-exports; Techosoul wrappers add the documented
semantics and behavior. Use [component guidance](docs/components.md) to choose
between controls and [customization](docs/customization.md) for typed theme/icon
overrides. Financial values are display-only; decimal strings are preferred.
No ledger, trading engine, broker integration, payment system or live data feed is included.

## Explore the system

```sh
npm run build
npm run dev        # Local Techosoul UI Showcase
npm run storybook  # Local component stories
```

The public documentation retains 14 topics grouped for developers and designers.
Local deep links such as `/#docs-getting-started`, `/#docs-grid` and `/#iconography`
open the relevant section. Browse the Iconography tab to search
36 curated icons and copy size/stroke/tone examples; Lucide remains usable directly.

Historical visual evidence is retained in [the screenshot archive](docs/screenshots/README.md);
it predates the rebrand. Fresh screenshots are produced under `artifacts/screenshots`
and uploaded by CI.

The **brokerage CRM is an example application**, separate from the reusable
package. It demonstrates synthetic clients, filters, selection, resizing and
record editing. The header and sidebar stay fixed while main content scrolls;
mobile navigation uses a Drawer.

The CRM uses illustrative records, not live customer or market data.

More [real screenshots](docs/screenshots/README.md),
[financial examples](examples/documentation/Financial.tsx) and
[DataGrid example](examples/documentation/Grid.tsx).

## Validate and contribute

```sh
npm run build
npm run docs:check
npm run test:scripts
npm run inspect:package
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

Open focused GitHub pull requests targeting main. Follow [Contributing](CONTRIBUTING.md),
include relevant test evidence, and preserve semantic tokens and synthetic data.
See [architecture](docs/architecture.md), [token contract](docs/tokens.md),
[Phase 3 validation](docs/phase-three-report.md),
[documentation refinement validation](docs/documentation-refinement.md), and
[release checklist](docs/releases.md). Older validation reports describe their
original test dates, not current deployment status.

MIT licensed. See [LICENSE](LICENSE) and [third-party attribution](docs/third-party-notices.md).
Techosoul UI is independent and has no implied affiliation with MetaTrader,
cTrader or Ant Design. The editable Figma UI Kit and official npm release remain future deliverables.
