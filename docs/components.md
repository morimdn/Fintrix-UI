# Component usage

| Need             | API                                                         | Guidance                                                                  |
| ---------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------- |
| Main action      | `Button type="primary"`                                     | One main decision per region                                              |
| Alternative      | `Button`                                                    | Secondary action                                                          |
| Low emphasis     | `Button type="text"`                                        | Tertiary navigation or optional action                                    |
| Destructive      | `Button danger`                                             | Name the consequence, confirm critical changes                            |
| Icon action      | `IconButton label="…" icon={…}`                             | Label required; tooltip supplements the accessible name                   |
| Related actions  | `ButtonGroup label="…"`                                     | Group related actions; use Radio for exclusive selections                 |
| Text/selection   | `Input`, `Select`, `Checkbox`, `Radio`, `Switch`            | Standard Ant Design typed APIs                                            |
| Numeric range    | `RangeController`                                           | Controlled tuple and numeric input alternatives                           |
| Status/category  | `StatusIndicator`, `Chip`                                   | Status describes state; chips categorize or remove selections             |
| Tabular records  | `DataGrid<T>`, `DataTable<T>`                               | Stable rowKey; sort, filter, select and paginate through Ant TableProps   |
| Focused decision | `FormModal`, `Modal`                                        | Short decision or confirmation; verify focus restoration                  |
| Context details  | `Drawer`                                                    | Inspect/edit while retaining underlying context                           |
| Complex workflow | Full application page                                       | Extensive history or multi-step work                                      |
| Context hints    | `Tooltip`, `Popover`                                        | Tooltip for short nonessential labels; popover for richer content         |
| Navigation       | `Tabs`, `Breadcrumb`, `Menu`, `Dropdown`, `Pagination`      | Visible radio choices for short exclusive sets; dropdown for longer lists |
| Feedback         | `Alert`, `Progress`, `Skeleton`, `Empty`                    | Expose progress and meaningful empty-state text                           |
| Form/date        | `Form`, `DatePicker`, `TimePicker`, `Slider`, `InputNumber` | Visible labels, specific validation and keyboard alternatives             |
| Notification     | `notification`, `message`                                   | Prefer Ant `App.useApp()` inside the provider for theme-aware instances   |
| Dashboard        | `FinancialKPICard`, `WalletBalanceCard`, `AccountSummary`   | Cards summarize; a grid compares records                                  |

Interaction states are independent of hierarchy: **hover** identifies an available
action, **focus** identifies the keyboard target, **active** acknowledges pressing,
**disabled** prevents use (provide a reason nearby), and **loading** signals work.
Do not use loading indefinitely or treat it as a disabled-state explanation.

Use semantic icons with visible labels or an accessible name. Decorative icons
are hidden from assistive technology. Color must accompany text, signs or icons.

## Financial interfaces

`CurrencyAmount` / `formatCurrency` accept `{ value: string | number | bigint,
currency, locale?, maximumFractionDigits? }`. Use decimal strings for money.
Numbers outside the safe magnitude range and nonfinite/malformed values throw.
A JavaScript number may already have lost fractional precision before reaching
this API. Formatting rounds for display using Intl, never for settlement or
accounting. Modern ECMA-402 decimal-string support is required (validated in Node
24 and the Chromium test environment). Test target browsers before adoption.

`PnLIndicator` adds explicit direction and a label; signed zero stays neutral.
`WalletBalanceCard` adds a title and optional detail. `AccountSummary` accepts a
name, reference, balance props and optional status. `FinancialKPICard` accepts
label, value and detail without inventing changes or charts.

`KYCStatus`: unverified/pending/verified/rejected.
`ClientStatus`: active/inactive/restricted.
`TransactionStatus`: pending/processing/completed/failed.
`RiskLevelIndicator`: low/medium/high/unknown. Each renders descriptive text.
`SymbolPriceDisplay` displays a supplied price and optional direction;
`BidAskDisplay` displays supplied bid/ask/spread strings without arithmetic.
No payment execution, financial ledger, brokerage integration or live data exists.

Legacy `MetricCard` retains the Phase 1 decorative synthetic sparkline for CRM
visual continuity. Use `FinancialKPICard` for arbitrary production metrics.

See individual Storybook stories for actions, forms, wallet, KYC, grid and modal.
Toolbar globals select theme/density. The public Showcase retains the full
foundations/core/financial galleries and adds a 14-section documentation view.

The library includes `TechosoulIcon`, optional `iconTone` on IconButton/MetricCard/financial
cards, and provider color overrides. See [customization](customization.md) for
copyable examples and supported extension points.

## Practical examples and selection

The local Showcase Documentation tab keeps 14 topics with runnable examples,
component decision guidance and direct section anchors. Start with [Getting Started](getting-started.md), then render
these exported examples inside TechosoulProvider:

| Example                                              | What it demonstrates                                                                |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [Actions](../examples/documentation/Actions.tsx)     | Primary/secondary/text actions, ButtonGroup and labeled IconButton                  |
| [Forms](../examples/documentation/Forms.tsx)         | Input/TextArea, multi-select, Radio, Switch, Checkbox and precise range entry       |
| [Overlays](../examples/documentation/Overlays.tsx)   | Controlled Modal/Drawer and Tooltip/Popover                                         |
| [Feedback](../examples/documentation/Feedback.tsx)   | Ant contextual notification, Alert, Chip, StatusIndicator, Tabs, Skeleton and Empty |
| [Grid](../examples/documentation/Grid.tsx)           | Typed columns, visibility, resizing, sorting/filtering, selection and pagination    |
| [Financial](../examples/documentation/Financial.tsx) | All financial display/status components with synthetic decimal strings              |
| [Icons](../examples/documentation/Icons.tsx)         | Decorative/meaningful icons and semantic component icon overrides                   |

Modal suits a focused decision or critical transaction confirmation; Drawer suits
client details, quick edits and advanced filters. Use a full page for multi-step
KYC, extensive audit histories or complex product configuration. Preserve focus
containment, Escape behavior and return to the trigger in either overlay.

Use Radio for a short exclusive choice and Select for longer lists. Tooltip is a
brief, nonessential hint; Popover supports richer contextual content. Keep essential
help visible outside either. Chip labels a category/filter; StatusIndicator labels
a workflow state. Card summarizes one record, whereas DataGrid compares many.
Use one primary decision, secondary alternatives and tertiary low-emphasis help.
Prefer visible button text where an icon's meaning might be unfamiliar.

Standard controls are Ant Design re-exports, including Chip (Tag). Techosoul owns
ButtonGroup grouping semantics, IconButton labeling/tooltip, RangeController's
numeric alternatives, DataTable/Grid extensions, FormModal defaults and financial
formatting/status wrappers. Light/Dark appearance comes from TechosoulProvider;
Ant Design supplies native control interactions and most typed props.
