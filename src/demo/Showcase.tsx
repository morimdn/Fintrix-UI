import { useState } from "react";
import { Card, Input, Select, Space, Popover, Typography, Divider } from "antd";
import { Plus, Settings2, ArrowUpRight } from "lucide-react";
import {
  Button,
  ButtonGroup,
  IconButton,
  StatusIndicator,
  RangeController,
  useFintrixTheme,
  palettes,
} from "../system";
export function Showcase() {
  const { mode } = useFintrixTheme();
  const [range, setRange] = useState<[number, number]>([20, 80]);
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">THE FINTRIX LANGUAGE</span>
          <h1>Designed for clarity.</h1>
          <p>A considered foundation for the way finance works.</p>
        </div>
        <StatusIndicator label="Phase 1 · Proof of concept" tone="info" />
      </div>
      <div className="showcase-grid">
        <Card title="Semantic color">
          <p className="muted">
            Purpose before pigment. Adaptable across light and dark.
          </p>
          <div className="swatches">
            {Object.entries(palettes[mode])
              .filter(([key]) =>
                [
                  "primary",
                  "success",
                  "warning",
                  "danger",
                  "surface",
                  "text",
                ].includes(key),
              )
              .map(([key, value]) => (
                <div key={key}>
                  <div style={{ background: value }} />
                  <strong>{key}</strong>
                  <code>{value}</code>
                </div>
              ))}
          </div>
        </Card>
        <Card title="Typography">
          <span className="eyebrow">PRECISE. HUMAN. EVERYDAY.</span>
          <h1>Make every number count.</h1>
          <p>Readable interfaces for confident decisions.</p>
          <Typography.Text code>USD 128,450.00 · +12.8%</Typography.Text>
          <Divider />
          <p className="muted">
            System sans · 14px body · 28px heading · tabular numerals
          </p>
        </Card>
        <Card title="Actions & controls">
          <Space wrap>
            <Button type="primary" icon={<Plus size={16} />}>
              Create account
            </Button>
            <Button>Secondary</Button>
            <Button type="text">Text action</Button>
            <Button danger>Restrict</Button>
            <Button disabled>Disabled</Button>
            <IconButton label="Settings" icon={<Settings2 size={16} />} />
          </Space>
          <Divider />
          <ButtonGroup>
            <Button>Day</Button>
            <Button type="primary">Week</Button>
            <Button>Month</Button>
          </ButtonGroup>
          <Divider />
          <Space wrap>
            <Input
              placeholder="Account reference"
              aria-label="Account reference"
            />
            <Select
              defaultValue="USD"
              options={["USD", "EUR", "GBP"].map((value) => ({
                value,
                label: value,
              }))}
            />
          </Space>
        </Card>
        <Card title="Status & contextual guidance">
          <Space wrap>
            <StatusIndicator tone="success" label="Verified" />
            <StatusIndicator tone="warning" label="In review" />
            <StatusIndicator tone="danger" label="Restricted" />
            <StatusIndicator tone="neutral" label="Inactive" />
          </Space>
          <Divider />
          <RangeController
            label="Allocation range"
            value={range}
            onChange={setRange}
            max={100}
          />
          <Divider />
          <Popover
            title="A little more context"
            content="Contextual information stays close to the decision."
            trigger="click"
          >
            <Button icon={<ArrowUpRight size={16} />}>Open popover</Button>
          </Popover>
        </Card>
      </div>
    </>
  );
}
