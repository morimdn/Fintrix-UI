import { useEffect, useMemo, useState } from "react";
import {
  CurrencyAmount,
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
} from "@techosoul/ui";
import {
  topics,
  snippets,
  links,
  installCommands,
  decisions,
} from "./docs/content";
import { CodeExample } from "./docs/CodeExample";
export function Documentation({ visible = true }: { visible?: boolean }) {
  const [active, setActive] = useState("overview");
  useEffect(() => {
    if (!visible) return;
    const scroller = document.querySelector(".main-scroll");
    function openHash() {
      if (!window.location.hash.startsWith("#docs-")) return;
      const target = document.getElementById(window.location.hash.slice(1));
      if (target) {
        target.scrollIntoView({ block: "start" });
        target.querySelector<HTMLElement>("h2")?.focus({ preventScroll: true });
        setActive(target.id.replace("docs-", ""));
      }
    }
    function updateActive() {
      const top = (scroller?.getBoundingClientRect().top ?? 0) + 100;
      const current = topics
        .filter((topic) => {
          const el = document.getElementById(`docs-${topic.id}`);
          return el && el.getBoundingClientRect().top <= top;
        })
        .at(-1);
      if (current) setActive(current.id);
    }
    const frame = requestAnimationFrame(openHash);
    window.addEventListener("hashchange", openHash);
    scroller?.addEventListener("scroll", updateActive, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", openHash);
      scroller?.removeEventListener("scroll", updateActive);
    };
  }, [visible]);
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
        {Array.from(new Set(topics.map((topic) => topic.group))).map(
          (group) => (
            <div className="doc-nav-group" key={group}>
              <strong>{group}</strong>
              {topics
                .filter((topic) => topic.group === group)
                .map(({ id, title }) => (
                  <a
                    href={`#docs-${id}`}
                    key={id}
                    aria-current={active === id ? "location" : undefined}
                  >
                    {title}
                  </a>
                ))}
            </div>
          ),
        )}
      </nav>
      <div className="documentation-content">
        <p className="doc-intro">
          Developer and designer guides ·{" "}
          <a href="#iconography">Browse Iconography</a> ·{" "}
          <a href="#components">Try core components</a>
        </p>
        {topics.map(({ id, title, summary, paragraphs, bullets, snippet }) => (
          <section
            id={`docs-${id}`}
            key={id}
            className="documentation-section"
            aria-labelledby={`heading-${id}`}
          >
            <h2 id={`heading-${id}`} tabIndex={-1}>
              {title}{" "}
              <a
                className="doc-permalink"
                href={`#docs-${id}`}
                aria-label={`Link to ${title}`}
              >
                #
              </a>
            </h2>
            <p className="doc-summary">{summary}</p>
            {paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
            {bullets && (
              <ol>
                {bullets.map((text) => (
                  <li key={text}>{text.replace(/^\d+\.\s*/, "")}</li>
                ))}
              </ol>
            )}
            {id === "overview" && (
              <p>
                <a href={links.live}>Live Phase 2 Showcase</a> ·{" "}
                <a href={links.repository}>GitHub repository</a> ·{" "}
                <a href={links.installation}>Installation guide</a>
              </p>
            )}
            {id === "getting-started" && (
              <pre tabIndex={0} aria-label="Installation commands">
                <code>{installCommands}</code>
              </pre>
            )}
            {snippet && (
              <CodeExample
                title={title}
                code={snippets[snippet]}
                expanded={id === "getting-started"}
              />
            )}
            {id === "core" && (
              <>
                <h3>Iconography</h3>
                <p>
                  <a href="#iconography">Browse the 36-icon gallery</a>: search
                  a name or category, set size/stroke/tone, and copy the exact
                  React example. Use 16px for supporting detail, 20px for
                  controls and 24px for prominent card icons; these are
                  conventions, not fixed API constraints. The default stroke is
                  2; keep stroke widths consistent within a view.
                </p>
                <p>
                  Tones are neutral, primary, success, warning, danger and info.
                  Prefer neutral or inherited foregrounds. TechosoulIcon is
                  decorative by default; add label only when an image conveys
                  meaning without adjacent text. Put action names on IconButton.
                  Tones resolve through Light/Dark tokens and typed overrides,
                  not fixed icon colors.
                </p>
                <CodeExample title="Iconography" code={snippets.icons} />
                <a href="https://lucide.dev/icons/">
                  Complete official Lucide catalog
                </a>
              </>
            )}
            {id === "navigation" && (
              <>
                <div
                  className="doc-table-scroll"
                  role="region"
                  aria-label="Component selection guidance"
                  tabIndex={0}
                >
                  <table>
                    <caption>Choose a component for the task</caption>
                    <thead>
                      <tr>
                        <th scope="col">Surface</th>
                        <th scope="col">Use for</th>
                        <th scope="col">Boundary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {decisions.map(([name, use, avoid]) => (
                        <tr key={name}>
                          <th scope="row">{name}</th>
                          <td>{use}</td>
                          <td>{avoid}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <CodeExample
                  title="Feedback and tabs"
                  code={snippets.feedback}
                />
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
                      render: (_, row) => (
                        <CurrencyAmount
                          value={row.balance}
                          currency={row.currency}
                        />
                      ),
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
              <p>
                <a href={links.docs}>Read repository documentation</a> ·{" "}
                <a href={links.contributing}>Contribute through GitHub</a> ·{" "}
                <a href={links.releases}>Release checklist</a>
              </p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
