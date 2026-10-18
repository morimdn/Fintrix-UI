import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Wallet } from "lucide-react";
import { TechosoulIcon } from "./TechosoulIcon";
import { IconButton } from "./IconButton";
import { TechosoulProvider } from "./ThemeProvider";
import { getTokens, cssVariables, palettes } from "./tokens";
describe("icon semantics and customization", () => {
  it("hides decorative SVGs and names meaningful images", () => {
    const { container } = render(
      <>
        <TechosoulIcon icon={Wallet} />
        <TechosoulIcon
          icon={Wallet}
          label="Wallet balance"
          tone="success"
          size={32}
          strokeWidth={1.5}
        />
      </>,
    );
    expect(container.querySelector('svg[aria-hidden="true"]')).toBeTruthy();
    const icon = screen.getByRole("img", { name: "Wallet balance" });
    expect(icon).toHaveAttribute("width", "32");
    expect(icon).toHaveAttribute("stroke-width", "1.5");
    expect(icon).toHaveStyle({ color: "var(--techosoul-success)" });
  });
  it("names actions once and preserves button semantics", () => {
    render(
      <TechosoulProvider>
        <IconButton label="Open wallet" icon={<Wallet />} iconTone="primary" />
      </TechosoulProvider>,
    );
    expect(screen.getByRole("button", { name: "Open wallet" })).toBeEnabled();
    expect(screen.queryByRole("img")).toBeNull();
  });
  it("scopes overrides by mode without mutating defaults", () => {
    const overrides = { dark: { primary: "#c4b5fd" } };
    expect(getTokens("dark", "compact", overrides).color.primary).toBe(
      "#c4b5fd",
    );
    expect(
      cssVariables("dark", "compact", overrides)["--techosoul-primary"],
    ).toBe("#c4b5fd");
    expect(getTokens("light", "comfortable", overrides).color.primary).toBe(
      palettes.light.primary,
    );
    expect(palettes.dark.primary).toBe("#91b5ff");
  });
});
