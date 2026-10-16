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
