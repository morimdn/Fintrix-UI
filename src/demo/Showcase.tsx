import { useState } from "react";
import {
  Card,
  Input,
  Select,
  Space,
  Popover,
  Divider,
  Tabs,
  Tag,
  Segmented,
  Form,
  Switch,
  Empty,
  Skeleton,
} from "antd";
import {
  Plus,
  Settings2,
  ArrowUpRight,
  ArrowRight,
  Wallet,
  ShieldCheck,
  TrendingUp,
  Info,
  Copy,
  Check,
  ArrowDownRight,
  Users,
} from "lucide-react";
import {
  Button,
  ButtonGroup,
  IconButton,
  StatusIndicator,
  RangeController,
  MetricCard,
  DataTable,
  FormModal,
  useFintrixTheme,
  palettes,
  foundations,
} from "../system";
import type { StatusTone } from "../system";
const tokensByRole = {
  Surfaces: ["canvas", "sidebar", "surface", "elevated", "subtle"],
  Interaction: ["primary", "primarySoft", "action", "focus"],
  Status: ["success", "warning", "danger", "info"],
} as const;
function ExampleCard({
  title,
  description,
  children,
  className = "",
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card
      className={`example-card ${className}`}
      title={
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      }
    >
      {children}
    </Card>
  );
}
export function Showcase({ onOpenCRM = () => {} }: { onOpenCRM?: () => void }) {
  const { mode, density, setDensity } = useFintrixTheme();
  const color = palettes[mode];
  const [range, setRange] = useState<[number, number]>([20, 80]),
    [period, setPeriod] = useState("Week"),
    [modal, setModal] = useState<"form" | "dialog" | null>(null),
    [motion, setMotion] = useState(false),
    [saved, setSaved] = useState(false),
    [loading, setLoading] = useState(false),
    [copied, setCopied] = useState(false);
  const tones: StatusTone[] = [
    "success",
    "warning",
    "danger",
    "info",
    "neutral",
  ];
  const foundationsView = (
    <div className="showcase-grid foundations-grid">
      <ExampleCard
        title="Semantic color"
        description="One contract. Two considered palettes."
        className="palette-card"
      >
        <div className="palette-groups">
          {Object.entries(tokensByRole).map(([role, keys]) => (
            <section key={role}>
              <h3>{role}</h3>
              <div className="swatches">
                {keys.map((key) => (
                  <div key={key}>
                    <div
                      className="swatch-sample"
                      style={{ background: color[key] }}
                    />
                    <strong>{key}</strong>
                    <code>{color[key]}</code>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
        <div className="token-note">
          <Info size={16} />
          <span>
            Use semantic roles in product code: <code>var(--fx-primary)</code>
          </span>
        </div>
      </ExampleCard>
      <ExampleCard
        title="Typography"
        description="Inter Variable · locally hosted · 400–750 weight"
      >
        <div className="type-display">
          Make every
          <br />
          number count.
        </div>
        <p className="type-body">
          Clear hierarchy keeps complex financial workflows understandable.
          Readable labels make everyday decisions easier.
        </p>
        <div className="type-specimen">
          <h3>Account overview</h3>
          <span>Section · {foundations.typography.section}px / 650</span>
        </div>
        <div className="type-specimen">
          <span className="type-body">Every client, in focus.</span>
          <span>Body · 14px / 400</span>
        </div>
        <div className="type-specimen">
          <span className="type-caption">Last updated just now</span>
          <span>Caption · 12px / 400</span>
        </div>
        <div className="number-specimen">
          <span>Tabular figures</span>
          <strong>$128,450.00</strong>
          <span className="financial-positive">
            +2.48% <TrendingUp size={16} />
          </span>
        </div>
      </ExampleCard>
      <ExampleCard title="Spacing" description="A consistent 4px rhythm.">
        <div className="space-scale">
          {Object.entries(foundations.space).map(([name, value]) => (
            <div key={name}>
              <code>{name}</code>
              <span style={{ width: value * 3 }} />
              <strong>{value}px</strong>
            </div>
          ))}
        </div>
      </ExampleCard>
      <ExampleCard
        title="Radius & elevation"
        description="Soft edges. Restrained depth."
      >
        <div className="radius-scale">
          {Object.entries(foundations.radius).map(([key, value]) => (
            <div key={key}>
              <span style={{ borderRadius: value }} />
              <code>{key}</code>
              <small>{value}px</small>
            </div>
          ))}
        </div>
        <div className="elevation-scale">
          <div>Surface</div>
          <div>Elevated</div>
        </div>
      </ExampleCard>
      <ExampleCard
        title="Layout & density"
        description="Keep the data. Adjust the rhythm."
      >
        <div
          className="layout-diagram"
          aria-label="Layout: sidebar, header and content"
        >
          <div>248</div>
          <div>
            <span>Header</span>
            <span>Content · max 1600px</span>
          </div>
        </div>
        <Segmented
          aria-label="Showcase density"
          value={density}
          onChange={(value) => setDensity(value as typeof density)}
          options={["comfortable", "compact"]}
        />
        <p className="caption">
          {density === "compact"
            ? "32px controls · 10px cell padding"
            : "40px controls · 16px cell padding"}
          . Text stays readable in both modes.
        </p>
      </ExampleCard>
      <ExampleCard title="Motion" description="Feedback without distraction.">
        <div className="motion-track">
          <span className={motion ? "moved" : ""} />
        </div>
        <Button onClick={() => setMotion(!motion)}>
          Preview transition <ArrowRight size={16} />
        </Button>
        <dl className="token-facts">
          <div>
            <dt>Fast feedback</dt>
            <dd>120ms</dd>
          </div>
          <div>
            <dt>Standard transition</dt>
            <dd>200ms</dd>
          </div>
          <div>
            <dt>Reduced motion</dt>
            <dd>Respected</dd>
          </div>
        </dl>
      </ExampleCard>
    </div>
  );
  const coreView = (
    <div className="showcase-grid">
      <ExampleCard
        title="Actions"
        description="A clear priority for every decision."
      >
        <Space wrap>
          <Button
            type="primary"
            icon={<Plus size={18} />}
            onClick={() => {
              setSaved(true);
            }}
          >
            Create account
          </Button>
          <Button onClick={() => setSaved(true)}>Secondary</Button>
          <Button type="text" onClick={() => setSaved(true)}>
            Text action
          </Button>
          <Button danger onClick={() => setModal("dialog")}>
            Restrict
          </Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
          <IconButton
            label="Component settings"
            icon={<Settings2 size={18} />}
            onClick={() => setModal("form")}
          />
        </Space>
        <Divider />
        <ButtonGroup label="Reporting period">
          {["Day", "Week", "Month"].map((value) => (
            <Button
              key={value}
              type={period === value ? "primary" : "default"}
              aria-pressed={period === value}
              onClick={() => setPeriod(value)}
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
        <p className="caption" role="status">
          {saved
            ? "Demo action received."
            : "Focus any control with Tab to see its focus ring."}
        </p>
      </ExampleCard>
      <ExampleCard
        title="Inputs & selection"
        description="Labels first. Helpful, specific feedback."
      >
        <Form layout="vertical">
          <div className="form-grid">
            <Form.Item name="reference" label="Account reference">
              <Input placeholder="e.g. FX-10241" />
            </Form.Item>
            <Form.Item name="currency" label="Base currency" initialValue="USD">
              <Select
                options={["USD", "EUR", "GBP"].map((value) => ({
                  value,
                  label: value,
                }))}
              />
            </Form.Item>
            <Form.Item
              name="email"
              initialValue="alex@"
              label="Email address"
              validateStatus="error"
              help="Enter a valid email address."
            >
              <Input aria-invalid="true" />
            </Form.Item>
            <Form.Item
              name="readonly"
              label="Read-only reference"
              initialValue="Assigned on creation"
            >
              <Input disabled />
            </Form.Item>
          </div>
        </Form>
      </ExampleCard>
      <ExampleCard
        title="Chips & status"
        description="Meaning is expressed in text and color."
      >
        <div className="sample-stack">
          <Space wrap>
            {tones.map((tone, i) => (
              <StatusIndicator
                key={tone}
                tone={tone}
                label={
                  [
                    "Verified",
                    "In review",
                    "Restricted",
                    "Processing",
                    "Inactive",
                  ][i]
                }
              />
            ))}
          </Space>
          <Space wrap>
            <Tag closable>Professional</Tag>
            <Tag closable>USD wallet</Tag>
            <Tag>Standard</Tag>
          </Space>
          <p className="caption">
            Financial direction uses separate positive, negative and neutral
            roles.
          </p>
        </div>
      </ExampleCard>
      <ExampleCard
        title="Sliders & controllers"
        description="Precise numeric input alongside direct adjustment."
      >
        <RangeController
          label="Allocation range"
          value={range}
          onChange={setRange}
          max={100}
        />
        <p className="caption">
          {range[0]}%–{range[1]}% allocation · controlled value / onChange API.
        </p>
      </ExampleCard>
      <ExampleCard
        title="Table"
        description="Aligned figures, readable rows and native sort behavior."
        className="full-span"
      >
        <DataTable<{
          id: string;
          asset: string;
          balance: number;
          status: string;
        }>
          size={density === "compact" ? "small" : "middle"}
          scroll={{ x: 620 }}
          pagination={false}
          columns={[
            {
              title: "Account",
              dataIndex: "asset",
              key: "asset",
              sorter: (a, b) => a.asset.localeCompare(b.asset),
            },
            {
              title: "Status",
              dataIndex: "status",
              key: "status",
              render: (value) => (
                <StatusIndicator label={value} tone="success" />
              ),
            },
            {
              title: "Available balance",
              dataIndex: "balance",
              key: "balance",
              align: "right",
              sorter: (a, b) => a.balance - b.balance,
              render: (value) => (
                <span className="money">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(value)}
                </span>
              ),
            },
          ]}
          dataSource={[
            {
              id: "1",
              asset: "Primary USD wallet",
              balance: 128450,
              status: "Active",
            },
            {
              id: "2",
              asset: "Settlement account",
              balance: 42800.5,
              status: "Active",
            },
          ]}
        />
      </ExampleCard>
      <ExampleCard
        title="Modal & contextual help"
        description="Keep complex interactions close to their context."
      >
        <Space wrap>
          <Button onClick={() => setModal("form")}>Open form modal</Button>
          <Button onClick={() => setModal("dialog")}>Open confirmation</Button>
          <IconButton label="About contextual help" icon={<Info size={18} />} />
          <Popover
            trigger="click"
            title="Available balance"
            content="Synthetic funds available in this demonstration account."
          >
            <Button>Open popover</Button>
          </Popover>
        </Space>
        <p className="caption">
          Dialogs use Ant Design focus management and explicit cancel actions.
        </p>
      </ExampleCard>
      <ExampleCard
        title="Navigation & feedback"
        description="Recognizable wayfinding and intentional empty states."
      >
        <Segmented
          aria-label="Example navigation"
          defaultValue="Overview"
          options={["Overview", "Activity", "Settings"]}
        />
        <Divider />
        <Space wrap>
          <Button onClick={() => setLoading(!loading)}>
            {loading ? "Show empty state" : "Show loading state"}
          </Button>
        </Space>
        <div className="feedback-sample">
          {loading ? (
            <div aria-label="Loading example" role="status">
              <Skeleton active paragraph={{ rows: 2 }} />
            </div>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No activity yet"
            />
          )}
        </div>
      </ExampleCard>
    </div>
  );
  const financialView = (
    <div className="financial-showcase">
      <div className="metrics">
        <MetricCard
          label="Net deposits"
          value="$128,450"
          change="+12.8%"
          detail="illustrative comparison"
          icon={<Wallet size={20} />}
        />
        <MetricCard
          label="Active clients"
          value="1,248"
          change="+6.4%"
          detail="illustrative comparison"
          icon={<Users size={20} />}
        />
        <MetricCard
          label="Exposure change"
          value="−$4,280"
          change="−2.4%"
          detail="illustrative comparison"
          tone="negative"
          icon={<ArrowDownRight size={20} />}
        />
        <MetricCard
          label="KYC coverage"
          value="96.8%"
          change="+1.2%"
          detail="illustrative comparison"
          icon={<ShieldCheck size={20} />}
        />
      </div>
      <div className="showcase-grid">
        <ExampleCard
          title="Wallet balance"
          description="Currency and direction remain explicit."
        >
          <div className="wallet-demo">
            <span className="eyebrow">AVAILABLE · USD</span>
            <strong>$128,450.00</strong>
            <span className="financial-positive">
              <TrendingUp size={18} /> +$2,840.50 (+2.26%)
            </span>
            <Divider />
            <div>
              <span>Reserved</span>
              <strong>$4,280.00</strong>
            </div>
            <div>
              <span>Account reference</span>
              <Button
                type="text"
                icon={copied ? <Check size={16} /> : <Copy size={16} />}
                onClick={async () => {
                  await navigator.clipboard.writeText("FX-DEMO-10241");
                  setCopied(true);
                }}
              >
                {copied ? "Copied" : "FX-DEMO-10241"}
              </Button>
            </div>
          </div>
        </ExampleCard>
        <ExampleCard
          title="Compliance & financial states"
          description="Keep compliance separate from market direction."
        >
          <dl className="token-facts status-facts">
            <div>
              <dt>Identity verification</dt>
              <dd>
                <StatusIndicator label="Verified" tone="success" />
              </dd>
            </div>
            <div>
              <dt>Source of funds</dt>
              <dd>
                <StatusIndicator label="In review" tone="warning" />
              </dd>
            </div>
            <div>
              <dt>Account access</dt>
              <dd>
                <StatusIndicator label="Restricted" tone="danger" />
              </dd>
            </div>
          </dl>
          <Divider />
          <Space wrap>
            <span className="financial-positive">+1.28% Positive</span>
            <span className="financial-negative">−0.64% Negative</span>
            <span className="muted">0.00% Neutral</span>
          </Space>
          <p className="caption">
            Direction is a display state, never a recommendation.
          </p>
        </ExampleCard>
        <ExampleCard
          title="Brokerage CRM composition"
          description="The system at work in a complete client workflow."
          className="full-span"
        >
          <div className="composition-preview">
            <span className="composition-icon">
              <Users size={32} />
            </span>
            <div>
              <h3>Every relationship, in focus.</h3>
              <p>
                Search, filter, review KYC, and edit a client in the working
                demonstration.
              </p>
            </div>
            <Button type="primary" onClick={onOpenCRM}>
              Open client workspace <ArrowRight size={18} />
            </Button>
          </div>
        </ExampleCard>
      </div>
    </div>
  );
  return (
    <>
      <div className="showcase-hero">
        <div>
          <span className="eyebrow">FINTRIX UI · DESIGN SYSTEM</span>
          <h1>Precision with a human perspective.</h1>
          <p>
            A practical visual language for financial software.
            <br />
            Built for clear decisions, from a single control to a complete
            workspace.
          </p>
        </div>
        <div className="hero-meta">
          <StatusIndicator label="Phase 1 · Open source" tone="info" />
          <span>React + Ant Design</span>
          <span>Inter Variable · Semantic tokens</span>
        </div>
      </div>
      <Tabs
        className="showcase-tabs"
        defaultActiveKey="foundations"
        items={[
          {
            key: "foundations",
            label: "Foundations",
            children: foundationsView,
          },
          { key: "components", label: "Core components", children: coreView },
          { key: "financial", label: "Financial UI", children: financialView },
        ]}
      />
      <FormModal
        title={
          modal === "form"
            ? "Notification preferences"
            : "Restrict demo account?"
        }
        open={modal !== null}
        onCancel={() => setModal(null)}
        onOk={() => {
          setSaved(true);
          setModal(null);
        }}
        okText={modal === "form" ? "Save preferences" : "Confirm restriction"}
        okButtonProps={{ danger: modal === "dialog" }}
      >
        {modal === "form" ? (
          <Form layout="vertical">
            <Form.Item
              name="contact"
              label="Contact email"
              initialValue="emma@example.com"
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item label="Compliance notifications">
              <Switch defaultChecked aria-label="Compliance notifications" />
            </Form.Item>
          </Form>
        ) : (
          <p>
            This is a component demonstration. No account access will change.
          </p>
        )}
      </FormModal>
    </>
  );
}
