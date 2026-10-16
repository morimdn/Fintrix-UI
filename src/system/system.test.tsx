import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FintrixProvider, useFintrixTheme } from "./ThemeProvider";
import { cssVariables, palettes } from "./tokens";
import { clients, filterClients } from "../demo/data";
import { ClientModal } from "../demo/ClientModal";
import { vi } from "vitest";
describe("semantic tokens", () => {
  it("maintains parity and density independent of mode", () => {
    expect(Object.keys(palettes.light)).toEqual(Object.keys(palettes.dark));
    expect(cssVariables("dark", "compact")["--fx-control"]).toBe("30px");
    expect(cssVariables("light", "comfortable")["--fx-primary"]).toBe(
      palettes.light.primary,
    );
  });
  it("switches both theme axes", () => {
    function Controls() {
      const { setMode, setDensity } = useFintrixTheme();
      return (
        <button
          onClick={() => {
            setMode("dark");
            setDensity("compact");
          }}
        >
          Switch
        </button>
      );
    }
    const { container } = render(
      <FintrixProvider>
        <Controls />
      </FintrixProvider>,
    );
    fireEvent.click(screen.getByText("Switch"));
    expect(container.querySelector(".fintrix-root")).toHaveAttribute(
      "data-theme",
      "dark",
    );
    expect(container.querySelector(".fintrix-root")).toHaveAttribute(
      "data-density",
      "compact",
    );
  });
});
describe("client filtering", () => {
  it("combines search, status, KYC and range without mutating source", () => {
    const result = filterClients(
      clients,
      "olivia",
      "Active",
      "Verified",
      [0, 20000],
    );
    expect(result.map((c) => c.id)).toEqual(["FX-10021"]);
    expect(clients).toHaveLength(48);
    expect(
      filterClients(clients, "missing", "All statuses", "All KYC", [0, 100000]),
    ).toEqual([]);
  });
});
it("blocks invalid client submissions", async () => {
  const save = vi.fn();
  render(
    <FintrixProvider>
      <ClientModal open onClose={() => {}} onSave={save} />
    </FintrixProvider>,
  );
  fireEvent.click(screen.getByText("Create client"));
  expect(await screen.findByText("Enter a full name")).toBeInTheDocument();
  expect(save).not.toHaveBeenCalled();
});
