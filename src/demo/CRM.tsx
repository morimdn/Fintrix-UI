import { useMemo, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  InputNumber,
  Grid,
  Empty,
  Input,
  Select,
  Space,
  Popover,
  Progress,
  Tooltip,
  type TableColumnsType,
} from "antd";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Users,
  Wallet,
  ShieldCheck,
  UserPlus,
  Search,
  SlidersHorizontal,
  Columns3,
  ChevronRight,
  ArrowLeftRight,
} from "lucide-react";
import {
  DataTable,
  MetricCard,
  StatusIndicator,
  RangeController,
  ResizableHeaderCell,
} from "../system";
import { clients, filterClients, money, type Client } from "./data";
import { ClientModal } from "./ClientModal";
const fieldNames = [
  "name",
  "country",
  "status",
  "kyc",
  "balance",
  "tier",
  "manager",
];
export function CRM() {
  const [rows, setRows] = useState(clients),
    [search, setSearch] = useState(""),
    [status, setStatus] = useState("All statuses"),
    [kyc, setKyc] = useState("All KYC"),
    [range, setRange] = useState<[number, number]>([0, 100000]),
    [visible, setVisible] = useState(fieldNames),
    [order, setOrder] = useState(fieldNames),
    [selected, setSelected] = useState<React.Key[]>([]),
    [editing, setEditing] = useState<Client>(),
    [open, setOpen] = useState(false),
    [page, setPage] = useState(1);
  const screens = Grid.useBreakpoint();
  const narrow = !screens.md;
  const [widths, setWidths] = useState<Record<string, number>>({});
  const filtered = useMemo(
    () => filterClients(rows, search, status, kyc, range),
    [rows, search, status, kyc, range],
  );
  const definitions: Record<string, TableColumnsType<Client>[number]> = {
    name: {
      title: "Client",
      width: 270,
      fixed: "left",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, c) => (
        <button
          className="client-link"
          onClick={() => {
            setEditing(c);
            setOpen(true);
          }}
        >
          <Avatar className="client-avatar">{c.initials}</Avatar>
          <span>
            <strong>{c.name}</strong>
            <small>{c.email}</small>
          </span>
        </button>
      ),
    },
    country: {
      title: "Country",
      dataIndex: "country",
      width: 175,
      sorter: (a, b) => a.country.localeCompare(b.country),
    },
    status: {
      title: "Status",
      dataIndex: "status",
      width: 135,
      render: (value) => (
        <StatusIndicator
          label={value}
          tone={
            value === "Active"
              ? "success"
              : value === "Pending"
                ? "warning"
                : "neutral"
          }
        />
      ),
    },
    kyc: {
      title: "KYC status",
      dataIndex: "kyc",
      width: 145,
      render: (value) => (
        <StatusIndicator
          label={value}
          tone={
            value === "Verified"
              ? "success"
              : value === "In review"
                ? "warning"
                : "danger"
          }
        />
      ),
    },
    balance: {
      title: "Wallet balance",
      dataIndex: "balance",
      width: 180,
      align: "right",
      sorter: (a, b) => a.balance - b.balance,
      render: (value) => (
        <strong className="money">
          {money(value)}
          <small>USD</small>
        </strong>
      ),
    },
    tier: { title: "Account tier", dataIndex: "tier", width: 145 },
    manager: { title: "Manager", dataIndex: "manager", width: 145 },
  };
  function columnWidth(key: string) {
    const max = key === "name" && narrow ? 240 : key === "name" ? 320 : 380;
    const min = key === "name" ? 220 : 120;
    return Math.max(
      min,
      Math.min(
        max,
        widths[key] ??
          (key === "name" && narrow ? 220 : Number(definitions[key].width)),
      ),
    );
  }
  const columns: TableColumnsType<Client> = order
    .filter((key) => visible.includes(key))
    .map((key) => ({
      ...definitions[key],
      key,
      width: columnWidth(key),
      onHeaderCell: () => ({
        className: "resizable-header",
        resize: {
          label: key,
          value: columnWidth(key),
          min: key === "name" ? 220 : 120,
          max: key === "name" && narrow ? 240 : key === "name" ? 320 : 380,
          onChange: (width: number) =>
            setWidths((previous) => ({ ...previous, [key]: width })),
        },
      }),
    }));
  function exportCsv() {
    const csv = [
      "Client,Email,Status,KYC,Balance USD",
      ...filtered.map((c) =>
        [c.name, c.email, c.status, c.kyc, c.balance]
          .map((v) => `"${String(v).replaceAll('"', '""')}"`)
          .join(","),
      ),
    ].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "fintrix-demo-clients.csv";
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">BROKERAGE WORKSPACE</span>
          <h1>
            Client management <span className="count-badge">{rows.length}</span>
          </h1>
          <p>A clear view of your clients. Every relationship, in focus.</p>
        </div>
        <Space>
          <Button icon={<ArrowDownToLine size={16} />} onClick={exportCsv}>
            Export
          </Button>
          <Button
            type="primary"
            icon={<UserPlus size={16} />}
            onClick={() => {
              setEditing(undefined);
              setOpen(true);
            }}
          >
            Add client
          </Button>
        </Space>
      </div>
      <div className="metrics">
        <MetricCard
          label="Total clients"
          value={rows.length.toLocaleString()}
          change="+8.2%"
          detail="vs. last month"
          icon={<Users size={18} />}
        />
        <MetricCard
          label="Active clients"
          value={String(rows.filter((c) => c.status === "Active").length)}
          change="+6.4%"
          detail="vs. last month"
          icon={<UserPlus size={18} />}
        />
        <MetricCard
          label="Total wallet balance"
          value={money(rows.reduce((s, c) => s + c.balance, 0))}
          change="+12.8%"
          detail="vs. last month"
          icon={<Wallet size={18} />}
        />
        <MetricCard
          label="KYC verified"
          value={`${Math.round((rows.filter((c) => c.kyc === "Verified").length / rows.length) * 100)}%`}
          change="+4.1%"
          detail="vs. last month"
          icon={<ShieldCheck size={18} />}
        />
      </div>
      <div className="section-caption">
        <div>
          <h2>Client directory</h2>
          <p>
            Manage accounts, review compliance, and keep relationships moving.
          </p>
        </div>
        <span className="live-indicator">
          <i /> Synthetic data · Session only
        </span>
      </div>
      <Card className="directory" styles={{ body: { padding: 0 } }}>
        <div className="table-toolbar">
          <Input
            className="search"
            prefix={<Search size={17} />}
            placeholder="Search name, email or client ID…"
            aria-label="Search clients"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            allowClear
          />
          <Select
            aria-label="Filter status"
            value={status}
            onChange={(v) => {
              setStatus(v);
              setPage(1);
            }}
            options={["All statuses", "Active", "Pending", "Inactive"].map(
              (value) => ({ value, label: value }),
            )}
          />
          <Select
            aria-label="Filter KYC"
            value={kyc}
            onChange={(v) => {
              setKyc(v);
              setPage(1);
            }}
            options={["All KYC", "Verified", "In review", "Required"].map(
              (value) => ({ value, label: value }),
            )}
          />
          <Popover
            trigger="click"
            title="Wallet balance (USD)"
            content={
              <div className="filter-panel">
                <RangeController
                  label="Balance range"
                  value={range}
                  onChange={(v) => {
                    setRange(v);
                    setPage(1);
                  }}
                />
                <Button onClick={() => setRange([0, 100000])}>
                  Reset range
                </Button>
              </div>
            }
          >
            <Button icon={<SlidersHorizontal size={16} />}>
              Filters{range[0] > 0 || range[1] < 100000 ? " •" : ""}
            </Button>
          </Popover>
          <Popover
            trigger="click"
            placement="bottomRight"
            title="Customize columns"
            content={
              <div className="column-options">
                {order.map((key, index) => (
                  <div key={key}>
                    <Checkbox
                      checked={visible.includes(key)}
                      disabled={key === "name"}
                      onChange={(e) =>
                        setVisible(
                          e.target.checked
                            ? [...visible, key]
                            : visible.filter((v) => v !== key),
                        )
                      }
                    >
                      {definitions[key].title as string}
                    </Checkbox>
                    <Button
                      size="small"
                      disabled={index <= 1 || key === "name"}
                      aria-label={`Move ${key} left`}
                      onClick={() => {
                        const next = [...order];
                        [next[index - 1], next[index]] = [
                          next[index],
                          next[index - 1],
                        ];
                        setOrder(next);
                      }}
                    >
                      ↑
                    </Button>
                    <InputNumber
                      aria-label={`${key} column width`}
                      size="small"
                      min={key === "name" ? 220 : 120}
                      max={
                        key === "name" && narrow
                          ? 240
                          : key === "name"
                            ? 320
                            : 380
                      }
                      value={columnWidth(key)}
                      onChange={(width) => {
                        if (width !== null)
                          setWidths((previous) => ({
                            ...previous,
                            [key]: width,
                          }));
                      }}
                    />
                  </div>
                ))}
                <small>
                  Client stays pinned. Drag column edges or use arrow keys to
                  resize.
                </small>
              </div>
            }
          >
            <Tooltip title="Show, hide and reorder columns">
              <Button
                aria-label="Customize columns"
                icon={<Columns3 size={16} />}
              />
            </Tooltip>
          </Popover>
        </div>
        {selected.length > 0 && (
          <div className="selection-bar">
            {selected.length} clients selected{" "}
            <Button type="link" onClick={() => setSelected([])}>
              Clear selection
            </Button>
          </div>
        )}
        <div className="table-scroll-hint">
          <ArrowLeftRight size={16} />
          <span>
            Scroll horizontally to explore columns. Client identity stays
            pinned.
          </span>
        </div>
        <DataTable<Client>
          components={{ header: { cell: ResizableHeaderCell } }}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <div>
                    <strong>No matching clients</strong>
                    <p>Try a different search or reset your filters.</p>
                    <Button
                      onClick={() => {
                        setSearch("");
                        setStatus("All statuses");
                        setKyc("All KYC");
                        setRange([0, 100000]);
                        setPage(1);
                      }}
                    >
                      Reset filters
                    </Button>
                  </div>
                }
              />
            ),
          }}
          columns={columns}
          dataSource={filtered}
          scroll={{
            x: order
              .filter((key) => visible.includes(key))
              .reduce((total, key) => total + columnWidth(key), 48),
          }}
          tableLayout="fixed"
          rowSelection={{
            fixed: true,
            columnWidth: 48,
            selectedRowKeys: selected,
            onChange: setSelected,
            preserveSelectedRowKeys: true,
          }}
          pagination={{
            current: page,
            onChange: setPage,
            pageSize: 6,
            responsive: true,
            showSizeChanger: false,
            showTotal: (total) => `${total} clients`,
            placement: ["bottomStart"],
          }}
        />
        <div className="table-footnote">
          Balances shown in USD · Demo figures for interface evaluation only
        </div>
      </Card>
      <div className="widgets">
        <Card>
          <div className="widget-heading">
            <span className="metric-icon">
              <ShieldCheck size={19} />
            </span>
            <h3>Compliance overview</h3>
            <StatusIndicator label="This month" tone="neutral" />
          </div>
          <div className="compliance">
            <div>
              <strong>
                {rows.filter((c) => c.kyc === "Verified").length}
                <small>Verified clients</small>
              </strong>
            </div>
            <div className="compliance-bars">
              {["Verified", "In review", "Required"].map((label, i) => (
                <div key={label}>
                  <span>{label}</span>
                  <Progress
                    aria-label={`${label} clients`}
                    percent={Math.round(
                      (rows.filter((c) => c.kyc === label).length /
                        rows.length) *
                        100,
                    )}
                    strokeColor={`var(--fx-${["success", "warning", "danger"][i]})`}
                    size="small"
                  />
                </div>
              ))}
            </div>
          </div>
        </Card>
        <Card>
          <div className="widget-heading">
            <span className="metric-icon">
              <Users size={19} />
            </span>
            <h3>Needs your attention</h3>
          </div>
          {rows
            .filter((c) => c.kyc === "In review")
            .slice(0, 2)
            .map((c) => (
              <button
                className="attention-row"
                key={c.id}
                onClick={() => {
                  setEditing(c);
                  setOpen(true);
                }}
              >
                <Avatar className="client-avatar">{c.initials}</Avatar>
                <span>
                  <strong>{c.name}</strong>
                  <small>Identity verification pending</small>
                </span>
                <ArrowUpRight size={17} />
              </button>
            ))}
        </Card>
      </div>
      <footer>
        <span>
          FINTRIX UI <b> / </b> Built for financial clarity.
        </span>
        <span>
          Phase 1 POC <ChevronRight size={12} /> Client management
        </span>
      </footer>
      <ClientModal
        client={editing}
        open={open}
        onClose={() => setOpen(false)}
        onSave={(values) => {
          if (editing)
            setRows(
              rows.map((c) => (c.id === editing.id ? { ...c, ...values } : c)),
            );
          else {
            const name = values.name!;
            setRows([
              {
                ...values,
                id: `FX-${Date.now()}`,
                initials: name
                  .split(" ")
                  .map((s) => s[0])
                  .join(""),
              } as Client,
              ...rows,
            ]);
          }
          setPage(1);
        }}
      />
    </>
  );
}
