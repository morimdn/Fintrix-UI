import { useMemo, useState } from "react";
import {
  Button,
  Checkbox,
  DataGrid,
  KYCStatus,
  RiskLevelIndicator,
  TransactionStatus,
  WalletBalanceCard,
  PnLIndicator,
  BidAskDisplay,
  SymbolPriceDisplay,
  FinancialKPICard,
  AccountSummary,
} from "fintrix-ui-preview";
const quickstart = `import { FintrixProvider, WalletBalanceCard } from 'fintrix-ui-preview';
import 'fintrix-ui-preview/styles.css';
import 'fintrix-ui-preview/fonts.css';

<FintrixProvider initialMode="dark" initialDensity="compact">
  <WalletBalanceCard value="128450.00" currency="USD" />
</FintrixProvider>`;
const sections = [
  [
    "overview",
    "Introduction / Overview",
    "Fintrix UI is an independent MIT React design system for financial software teams. Use semantic financial direction, explicit statuses and readable data. All examples use synthetic data.",
  ],
  [
    "getting-started",
    "Getting Started",
    "Build locally, pack packages/fintrix-ui, then install the generated tarball in your React application. The provisional package name is not published or reserved. Install React, React DOM and Ant Design 6 as peers.",
  ],
  [
    "principles",
    "Design Principles",
    "Clarity before decoration. Preserve context, make amounts and currencies explicit, and communicate status through text as well as color.",
  ],
  [
    "tokens",
    "Color Palette & Tokens",
    "Foundations shows the complete semantic palette. getTokens(mode, density), scoped --fx-* CSS variables and fintrix-ui-preview/tokens.json share one source. Positive/negative represent direction; success/danger represent workflow states.",
  ],
  [
    "typography",
    "Typography",
    "Self-hosted Inter Variable. Display 36, title 28, section 20, body and label 14, table 13, caption 12px. Use tabular figures for numeric comparison.",
  ],
  [
    "layout",
    "Spacing, Grid and Layout",
    "Use a 4px rhythm: 4, 8, 12, 16, 24, 32, 40px. Controls are 40px comfortable and 32px compact. Keep narrow screens scrollable within data tables; never hide critical financial context.",
  ],
  [
    "core",
    "Core Components",
    "Use one Primary action per decision. Secondary supports alternatives; Text is low emphasis. Destructive actions need explicit wording and confirmation. IconButton requires an accessible label. ButtonGroup groups related actions. Hover signals availability, focus signals keyboard position, active confirms pressing, disabled explains unavailability, loading signals progress. Try these states in Core components.",
  ],
  [
    "forms",
    "Forms and Controls",
    "Use persistent visible labels, specific validation feedback and input types matching the data. Prefer radio buttons for a few visible exclusive choices, dropdowns for longer choices, multi-select for multiple choices. RangeController includes numeric alternatives to dragging.",
  ],
  [
    "navigation",
    "Navigation and Feedback",
    "Modal: short focused decisions and confirmations. Drawer: contextual inspection, filters and quick edits. Full page: complex multi-step work with history. Tooltip: brief nonessential labels. Popover: richer contextual information. Chips describe categories or removable selections; badges describe status.",
  ],
  [
    "grid",
    "Data Grid",
    "Use cards for a summary and DataGrid for comparing records. Ant Design retains sorting, filtering, pagination and selection. Fintrix adds controlled visibility and keyboard/pointer resizing. Fixed columns remain visible. Try the synthetic 10,000-row dataset below; only one page renders at a time.",
  ],
  [
    "financial",
    "FinTech Components",
    "Amounts accept decimal text to preserve display precision. P&L, KYC, transaction and risk states remain separate. Quotes and spreads are supplied values; no trading or accounting calculations occur.",
  ],
  [
    "dashboards",
    "Dashboard Examples",
    "Compose FinancialKPICard, AccountSummary and WalletBalanceCard with standard layout components. The Brokerage CRM remains a working example with search, filters, selection, resizing and client editing.",
  ],
  [
    "accessibility",
    "Accessibility",
    "Use semantic names and visible focus rings. Never rely on color alone. Support keyboard resizing, form errors and horizontal table navigation. Reduced motion is respected. Automated checks cover selected workflows and do not establish WCAG certification.",
  ],
  [
    "developers",
    "Developer Documentation",
    "The ESM package preserves modules and excludes React and Ant Design from its output. Import typed components from the root, tokens from /tokens and opt into /styles.css and /fonts.css. See repository docs for architecture, release guidelines and design-to-code mapping.",
  ],
] as const;
export function Documentation() {
  const [copied, setCopied] = useState("Copy React example");
  const [hidden, setHidden] = useState(false);
  const [widths, setWidths] = useState<Record<string, number>>({});
  const rows = useMemo(
    () =>
      Array.from({ length: 10000 }, (_, id) => ({
        id,
        name: `Synthetic account ${String(id).padStart(5, "0")}`,
        currency: id % 2 ? "EUR" : "USD",
        balance: String(1000 + id) + ".25",
      })),
    [],
  );
  return (
    <div className="documentation-layout">
      <nav aria-label="Documentation sections" className="documentation-nav">
        {sections.map(([id, title]) => (
          <a href={`#docs-${id}`} key={id}>
            {title}
          </a>
        ))}
      </nav>
      <div className="documentation-content">
        {sections.map(([id, title, text]) => (
          <section id={`docs-${id}`} key={id} className="documentation-section">
            <span className="eyebrow">FINTRIX UI / DOCUMENTATION</span>
            <h2>{title}</h2>
            <p>{text}</p>
            {id === "getting-started" && (
              <>
                <pre>
                  <code>
                    npm install ./fintrix-ui-preview-0.2.0.tgz antd react
                    react-dom
                  </code>
                </pre>
                <pre>
                  <code>{quickstart}</code>
                </pre>
                <Button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(quickstart);
                      setCopied("Copied");
                    } catch {
                      setCopied("Select and copy the example above");
                    }
                  }}
                >
                  {copied}
                </Button>
              </>
            )}
            {id === "grid" && (
              <>
                <Checkbox
                  checked={hidden}
                  onChange={(event) => setHidden(event.target.checked)}
                >
                  Hide currency column
                </Checkbox>
                <DataGrid
                  rowKey="id"
                  dataSource={rows}
                  pagination={{ pageSize: 25, showSizeChanger: false }}
                  hiddenColumnKeys={hidden ? ["currency"] : []}
                  columnWidths={widths}
                  onColumnWidthChange={(key, width) =>
                    setWidths((previous) => ({
                      ...previous,
                      [String(key)]: width,
                    }))
                  }
                  columns={[
                    {
                      key: "name",
                      title: "Account",
                      dataIndex: "name",
                      fixed: "left",
                      sorter: (a, b) => a.name.localeCompare(b.name),
                      width: 260,
                    },
                    {
                      key: "currency",
                      title: "Currency",
                      dataIndex: "currency",
                      filters: [
                        { text: "USD", value: "USD" },
                        { text: "EUR", value: "EUR" },
                      ],
                      onFilter: (value, row) => row.currency === value,
                    },
                    {
                      key: "balance",
                      title: "Illustrative balance",
                      dataIndex: "balance",
                      align: "right",
                    },
                  ]}
                  scroll={{ x: 720 }}
                />
              </>
            )}
            {id === "financial" && (
              <div className="documentation-examples">
                <WalletBalanceCard
                  value="128450.00"
                  currency="USD"
                  detail={<PnLIndicator value="-24.50" currency="USD" />}
                />
                <div>
                  <KYCStatus status="verified" />
                  <TransactionStatus status="processing" />
                  <RiskLevelIndicator level="medium" />
                  <p>
                    <SymbolPriceDisplay
                      symbol="EUR/USD"
                      price="1.08342"
                      direction="positive"
                    />
                  </p>
                  <BidAskDisplay
                    symbol="EUR/USD"
                    bid="1.08340"
                    ask="1.08345"
                    spread="0.00005"
                  />
                </div>
              </div>
            )}
            {id === "dashboards" && (
              <div className="documentation-examples">
                <FinancialKPICard
                  label="Synthetic active accounts"
                  value="1,248"
                  detail="Illustrative snapshot"
                />
                <AccountSummary
                  name="Demo trading account"
                  reference="DEMO-1042 · synthetic"
                  balance={{ value: "42800.50", currency: "EUR" }}
                  status={<KYCStatus status="pending" />}
                />
              </div>
            )}
            {id === "developers" && (
              <a href="https://github.com/morimdn/Fintrix-UI/tree/feat/phase-two-library/docs">
                Read repository documentation
              </a>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
