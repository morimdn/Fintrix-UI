import type { Meta, StoryObj } from "@storybook/react-vite";
import { KYCStatus } from "./financial";
const meta = {
  title: "Finance/KYCStatus",
  component: KYCStatus,
  tags: ["autodocs"],
  args: { status: "verified" },
  argTypes: {
    status: {
      control: "select",
      options: ["unverified", "pending", "verified", "rejected"],
    },
  },
} satisfies Meta<typeof KYCStatus>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Pending: Story = { args: { status: "pending" } };
export const Error: Story = { args: { status: "rejected" } };
export const Unverified: Story = { args: { status: "unverified" } };
export const Dark: Story = { globals: { mode: "dark" } };
export const Compact: Story = { globals: { density: "compact" } };
