import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./components";
const meta = {
  title: "Core/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Create account", type: "primary" },
  argTypes: {
    type: {
      control: "select",
      options: ["primary", "default", "text", "link", "dashed"],
    },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Secondary: Story = { args: { type: "default" } };
export const Text: Story = { args: { type: "text" } };
export const Destructive: Story = {
  args: { danger: true, children: "Restrict account" },
};
export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true } };
export const Dark: Story = { globals: { mode: "dark" } };
export const Compact: Story = { globals: { density: "compact" } };
