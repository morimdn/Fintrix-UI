# Techosoul UI

**FinTech-first. Built for modern software.**

An open-source React design system for precise, accessible, data-intensive
interfaces. Techosoul UI combines Ant Design 6 controls with semantic tokens,
financial display components and consistent interaction patterns. Its reusable
foundations support financial products, enterprise software, CRM, ERP and SaaS
applications, with room for product-specific composition and extension.

[Live Showcase](https://morimdn.github.io/Techosoul-UI/) ·
[Documentation](https://morimdn.github.io/Techosoul-UI/#docs-getting-started) ·
[Component guide](https://github.com/morimdn/Techosoul-UI/blob/main/docs/components.md) ·
[Getting Started](https://github.com/morimdn/Techosoul-UI/blob/main/docs/getting-started.md) ·
[GitHub](https://github.com/morimdn/Techosoul-UI)

**Release status:** `@techosoul/ui@0.3.0` is a private, independently packable
candidate, not yet published to npm. Use the local tarball instructions below.

## Why FinTech First?

Techosoul UI grew from real-world financial-product development requirements.
Financial applications bring several interface challenges together: dense but
readable tables, precise financial-value display, clearly distinguished states,
efficient keyboard interaction, professional Light/Dark themes, Comfortable and
Compact layouts, and consistent forms, dashboards and status indicators.

These requirements informed the semantic token architecture, controlled grid
extensions and financial display components. They also apply to many other kinds
of modern software: comparing records, editing structured data and communicating
state are common needs across enterprise applications.

Founder Dr. Mirmorsal Madani brings experience developing and managing Forex CRM,
Risk Management, Social Trading, IB Platforms, Loyalty Clubs, Trading Plugins and
enterprise applications. This professional background informs the product's
focus; the package provides reusable interface components and formatting APIs.
The brokerage CRM in the Showcase is an illustrative application using synthetic
records, separate from the library.

## Research & Design Philosophy

Use semantic roles instead of scattered color values; distinguish an action from
its financial outcome; preserve readable typography as density changes; and give
keyboard users access to the same interactions. Techosoul extends Ant Design
rather than introducing a second complete control framework.

[Research & Design Decisions](https://github.com/morimdn/Techosoul-UI/blob/main/docs/design-rationale.md) connects these principles
to the original engineering evaluations, current tokens, implementation and tests.
It separates recorded decisions from interpretive rationale and states the limits
of the available evidence.

## Features & Components

- Light/Dark themes and independent Comfortable/Compact density modes.
- Typed semantic tokens, scoped CSS variables, generated token JSON and per-mode
  color overrides through `TechosoulProvider`.
- Optional self-hosted Inter Variable fonts and consistent Lucide icon usage.
- Native ESM and TypeScript declarations; React, React DOM and Ant Design remain peers.

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
semantics and behavior. Use [component guidance](https://github.com/morimdn/Techosoul-UI/blob/main/docs/components.md) to choose
between controls and [customization](https://github.com/morimdn/Techosoul-UI/blob/main/docs/customization.md) for typed theme/icon
overrides. Financial values are display-only; decimal strings are preferred.
No ledger, trading engine, broker integration, payment system or live data feed is included.

## Getting Started

Use Node 24, npm and Git for repository development. Consumers supply React/React
DOM 18.3 or 19 and Ant Design 6. Independent validation covers React
18.3.1/19.3.1 × Ant Design 6.0.0/6.6.6; other versions within the peer ranges are
not individually verified.

### Install the current private candidate

```sh
git clone https://github.com/morimdn/Techosoul-UI.git
cd Techosoul-UI
npm ci
npm run build:library
node -e "require('node:fs').mkdirSync('artifacts', { recursive: true })"
npm pack --workspace @techosoul/ui --pack-destination ./artifacts
```

In a separate React app, use the actual absolute path to the generated archive:

```sh
npm install /absolute/path/to/Techosoul-UI/artifacts/techosoul-ui-0.3.0.tgz antd@6.6.6 react@19.3.1 react-dom@19.3.1
```

The [Getting Started guide](https://github.com/morimdn/Techosoul-UI/blob/main/docs/getting-started.md) covers a new React/TypeScript
app, CSS and optional local fonts, `TechosoulProvider`, a wallet and working theme
and density controls. Its [complete App example](https://github.com/morimdn/Techosoul-UI/blob/main/examples/documentation/App.tsx)
is compiled against the installed tarball along with the other documentation examples.

### Registry installation — only after publication

```sh
npm install @techosoul/ui antd
# In a new app, also install matching React peers and TypeScript types:
npm install react@19 react-dom@19
npm install --save-dev @types/react@19 @types/react-dom@19
```

Both the library and monorepo root remain private; the root must stay private
permanently. Scope ownership, release authorization and final publication remain
owner-controlled. See the [release guide](https://github.com/morimdn/Techosoul-UI/blob/main/docs/releases.md),
[owner checklist](https://github.com/morimdn/Techosoul-UI/blob/main/docs/npm-owner-setup.md) and [migration notes](https://github.com/morimdn/Techosoul-UI/blob/main/docs/techosoul-rebrand.md).

## Examples & Showcase

```sh
npm run build
npm run dev        # Local Techosoul UI Showcase
npm run storybook  # Local component stories
```

Explore foundations, core controls, financial UI and 14 documentation topics.
The Iconography gallery offers 36 curated icons with size/stroke/tone examples;
Lucide also remains usable directly. Local links such as `/#docs-grid` and
`/#iconography` open the relevant section.

The **brokerage CRM example** demonstrates synthetic clients, filters, selection,
column resizing and record editing. It is application composition, not a bundled
CRM product. Its header and sidebar stay fixed while the content scrolls; mobile
navigation uses a Drawer. There is no live customer or market data.

### From the running application

![Techosoul UI Light Showcase with semantic foundations](https://raw.githubusercontent.com/morimdn/Techosoul-UI/main/docs/screenshots/brand-showcase-light.png)

![Techosoul UI Dark brokerage CRM example with synthetic client records](https://raw.githubusercontent.com/morimdn/Techosoul-UI/main/docs/screenshots/brand-crm-dark.png)

These are real Chromium captures of this revision, not mockups. See the
[capture record](https://github.com/morimdn/Techosoul-UI/blob/main/docs/brand-preview.md) for dimensions, a mobile view and the
README preview. The [historical screenshot archive](https://github.com/morimdn/Techosoul-UI/blob/main/docs/screenshots/README.md)
retains earlier versions without relabeling them as current.

Browse the [financial examples](https://github.com/morimdn/Techosoul-UI/blob/main/examples/documentation/Financial.tsx),
[DataGrid example](https://github.com/morimdn/Techosoul-UI/blob/main/examples/documentation/Grid.tsx) and
[customization guide](https://github.com/morimdn/Techosoul-UI/blob/main/docs/customization.md). The current Showcase uses the
[GitHub Pages project URL](https://morimdn.github.io/Techosoul-UI/); deployment
remains manual. Future `ui.techosoul.com` setup is documented in
[Pages instructions](https://github.com/morimdn/Techosoul-UI/blob/main/docs/pages.md) and is not activated by these changes.

## About Techosoul

**Techosoul — Technology with a Human Soul**

Techosoul is an emerging software product brand focused on intelligent software
engineering, agentic AI workflows and human-centered product design. It brings
together experienced professionals in Product Design, Product Management and
Software Engineering, with years of experience across different companies and
projects.

The brand combines technical expertise and intelligent automation with human
creativity, judgment and design craftsmanship. Its strengths include FinTech,
enterprise applications, CRM and data-intensive software, while its scope extends
beyond those sectors. Techosoul UI is one of its first public products.

The registered `techosoul.com` domain is reserved for a future umbrella-brand
website; it does not yet host an operational company website.

## Founder & Maintainer

**Dr. Mirmorsal Madani**

Founder of Techosoul · Creator & Lead Maintainer of Techosoul UI

Dr. Madani holds a Ph.D. in Computer Engineering — Software Systems. His background
spans academic research, data science, AI, product management and software
engineering, and he currently serves as a Chief Product Officer in the FinTech
industry. His work developing and managing financial and enterprise applications
provides the professional context for Techosoul UI's FinTech-first approach.

[GitHub](https://github.com/morimdn) ·
[LinkedIn](https://www.linkedin.com/in/mirmorsal-madani/)

## Validate & Contribute

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

Open focused GitHub pull requests targeting main. Follow [Contributing](https://github.com/morimdn/Techosoul-UI/blob/main/CONTRIBUTING.md),
include relevant test evidence, and preserve semantic tokens and synthetic data.
See [architecture](https://github.com/morimdn/Techosoul-UI/blob/main/docs/architecture.md), [token contract](https://github.com/morimdn/Techosoul-UI/blob/main/docs/tokens.md),
[Phase 3 validation](https://github.com/morimdn/Techosoul-UI/blob/main/docs/phase-three-report.md),
[documentation refinement validation](https://github.com/morimdn/Techosoul-UI/blob/main/docs/documentation-refinement.md), and
[release checklist](https://github.com/morimdn/Techosoul-UI/blob/main/docs/releases.md). Older validation reports describe their
original test dates, not current deployment status.

## License & Attribution

MIT licensed. Copyright © 2026 Mirmorsal Madani. See [LICENSE](https://github.com/morimdn/Techosoul-UI/blob/main/LICENSE) and
[third-party attribution](https://github.com/morimdn/Techosoul-UI/blob/main/docs/third-party-notices.md), including Ant Design,
Lucide and Inter. Techosoul UI is an independent project. An editable Figma UI
Kit remains a future deliverable.
