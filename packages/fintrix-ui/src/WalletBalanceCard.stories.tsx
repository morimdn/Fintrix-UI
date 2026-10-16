import type { Meta, StoryObj } from "@storybook/react-vite";
import { WalletBalanceCard, PnLIndicator } from "./financial";
const meta = {
  title: "Finance/WalletBalanceCard",
  component: WalletBalanceCard,
  tags: ["autodocs"],
  args: {
    value: "128450.00",
    currency: "USD",
    detail: <PnLIndicator value="-24.50" currency="USD" />,
  },
} satisfies Meta<typeof WalletBalanceCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const LargeDecimal: Story = { args: { value: "9007199254740993.25" } };
export const Euro: Story = { args: { currency: "EUR", locale: "de-DE" } };
export const Dark: Story = { globals: { mode: "dark" } };
export const Compact: Story = { globals: { density: "compact" } };
