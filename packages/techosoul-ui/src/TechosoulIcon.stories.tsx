import type { Meta, StoryObj } from "@storybook/react-vite";
import { Wallet } from "lucide-react";
import { TechosoulIcon } from "./TechosoulIcon";
import { WalletBalanceCard } from "./financial";
import { TechosoulProvider } from "./ThemeProvider";
const meta = {
  title: "Foundations/TechosoulIcon",
  component: TechosoulIcon,
  args: { icon: Wallet, size: 24, strokeWidth: 2, tone: "neutral" },
  argTypes: {
    tone: {
      control: "select",
      options: ["neutral", "primary", "success", "warning", "danger", "info"],
    },
    icon: { control: false },
  },
} satisfies Meta<typeof TechosoulIcon>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Decorative: Story = {};
export const Named: Story = { args: { label: "Wallet", tone: "primary" } };
export const SemanticTones: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 24 }}>
      {(
        ["neutral", "primary", "success", "warning", "danger", "info"] as const
      ).map((tone) => (
        <TechosoulIcon {...args} key={tone} tone={tone} label={tone} />
      ))}
    </div>
  ),
};
export const CustomizedWallet: Story = {
  render: () => (
    <TechosoulProvider
      initialMode="dark"
      initialDensity="compact"
      colorOverrides={{ dark: { primary: "#c4b5fd" } }}
    >
      <WalletBalanceCard
        value="12500.25"
        currency="EUR"
        icon={<Wallet />}
        iconTone="primary"
      />
    </TechosoulProvider>
  ),
};
