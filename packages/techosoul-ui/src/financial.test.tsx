import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {
  CurrencyAmount,
  formatCurrency,
  PnLIndicator,
  KYCStatus,
  WalletBalanceCard,
} from "./financial";
import { DataGrid } from "./DataGrid";
import { TechosoulProvider } from "./ThemeProvider";
describe("financial display contract", () => {
  it("preserves decimal text beyond floating point precision", () => {
    expect(
      formatCurrency({ value: "9007199254740993.25", currency: "USD" }),
    ).toBe("$9,007,199,254,740,993.25");
    expect(
      formatCurrency({ value: 123n, currency: "EUR", locale: "de-DE" }),
    ).toContain("123,00");
  });
  it("rejects unsafe numbers and malformed input", () => {
    for (const value of [
      NaN,
      Infinity,
      Number.MAX_SAFE_INTEGER + 1,
      "Infinity",
      "1e3",
      "",
    ])
      expect(() => formatCurrency({ value, currency: "USD" })).toThrow();
    expect(() => formatCurrency({ value: "10", currency: "US" })).toThrow();
  });
  it("communicates direction and workflow state in text", () => {
    render(
      <TechosoulProvider>
        <PnLIndicator value="-24.50" currency="USD" />
        <KYCStatus status="pending" />
        <WalletBalanceCard value="128.00" currency="USD" />
      </TechosoulProvider>,
    );
    expect(screen.getByText("KYC: pending")).toBeVisible();
    expect(screen.getByText(/P&L:/)).toHaveClass("financial-negative");
    expect(
      screen.getByRole("region", { name: "Wallet balance" }),
    ).toHaveTextContent("$128.00");
  });
  it("keeps signed zero neutral", () => {
    render(<PnLIndicator value="-0.00" currency="USD" />);
    expect(screen.getByText(/P&L:/)).toHaveClass("financial-neutral");
  });
});
describe("reusable grid contract", () => {
  it("retains fixed identity and exposes keyboard resizing", () => {
    const onChange = vi.fn();
    render(
      <TechosoulProvider>
        <DataGrid
          columns={[
            {
              key: "name",
              title: "Name",
              dataIndex: "name",
              fixed: "left",
              width: 220,
            },
            { key: "currency", title: "Currency", dataIndex: "currency" },
          ]}
          hiddenColumnKeys={["name", "currency"]}
          onColumnWidthChange={onChange}
          dataSource={[{ id: 1, name: "Synthetic client", currency: "USD" }]}
          pagination={false}
        />
      </TechosoulProvider>,
    );
    expect(screen.getByText("Synthetic client")).toBeVisible();
    expect(screen.queryByText("Currency")).not.toBeInTheDocument();
    fireEvent.keyDown(
      screen.getByRole("slider", { name: "Resize Name column" }),
      { key: "ArrowRight" },
    );
    expect(onChange).toHaveBeenCalledWith("name", 230);
  });
});
