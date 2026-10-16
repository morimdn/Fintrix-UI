import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, StatusIndicator, RangeController } from "./components";
import { Showcase } from "../../../apps/showcase/src/demo/Showcase";
import { CRM } from "../../../apps/showcase/src/demo/CRM";
import { useState } from "react";
const meta = {
  title: "Fintrix/Foundations",
  component: Button,
  args: { children: "Primary action", type: "primary" },
} satisfies Meta<typeof Button>;
export default meta;
export const Primary: StoryObj<typeof meta> = {};
export const Disabled: StoryObj<typeof meta> = { args: { disabled: true } };
export const Gallery = { render: () => <Showcase /> };
export const ClientManagement = { render: () => <CRM /> };
export const Statuses = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <StatusIndicator label="Verified" tone="success" />
      <StatusIndicator label="In review" tone="warning" />
      <StatusIndicator label="Restricted" tone="danger" />
    </div>
  ),
};
export const Controller = {
  render: function Controller() {
    const [value, setValue] = useState<[number, number]>([20, 80]);
    return (
      <RangeController
        label="Allocation"
        value={value}
        onChange={setValue}
        max={100}
      />
    );
  },
};
