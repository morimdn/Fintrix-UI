import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync, writeFileSync } from "node:fs";
for (const mode of ["light", "dark"])
  test(`public documentation: ${mode}`, async ({ page }) => {
    await page.goto("/");
    if (mode === "dark")
      await page.getByRole("button", { name: "Switch to dark theme" }).click();
    await page.getByRole("tab", { name: "Documentation", exact: true }).click();
    const nav = page.getByRole("navigation", {
      name: "Documentation sections",
    });
    await expect(nav.getByRole("link")).toHaveCount(14);
    for (const link of await nav.getByRole("link").all()) {
      const href = await link.getAttribute("href");
      await expect(page.locator(href!)).toHaveCount(1);
    }
    await expect(
      page.locator("#docs-financial").getByText("$128,450.00", { exact: true }),
    ).toBeVisible();
    const violations = (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations;
    expect(
      violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
    await page.screenshot({
      path: `artifacts/screenshots/library-${mode}.png`,
      fullPage: true,
    });
    await page
      .locator("#docs-financial")
      .screenshot({
        path: `artifacts/screenshots/library-financial-${mode}.png`,
      });
  });
test("10k grid interactions and synthetic benchmark", async ({ page }) => {
  await page.goto("/");
  const start = Date.now();
  await page.getByRole("tab", { name: "Documentation", exact: true }).click();
  const grid = page.locator("#docs-grid");
  await expect(
    grid.getByText("Synthetic account 00000", { exact: true }),
  ).toBeVisible();
  const mountMs = Date.now() - start;
  await expect(grid.locator("tbody tr[data-row-key]")).toHaveCount(25);
  const sortStart = Date.now();
  await grid.getByRole("columnheader", { name: /Account/ }).click();
  await expect(grid.locator('th[aria-sort="ascending"]')).toHaveCount(1);
  const sortMs = Date.now() - sortStart;
  await grid.getByRole("checkbox", { name: "Hide currency column" }).check();
  await expect(
    grid.getByRole("columnheader", { name: "Currency" }),
  ).toHaveCount(0);
  const handle = grid.getByRole("slider", { name: "Resize Account column" });
  await handle.focus();
  await page.keyboard.press("ArrowRight");
  await expect(handle).toHaveAttribute("aria-valuenow", "270");
  await grid.getByTitle("Next Page").click();
  await expect(
    grid.getByText("Synthetic account 00025", { exact: true }),
  ).toBeVisible();
  mkdirSync("artifacts/validation", { recursive: true });
  writeFileSync(
    "artifacts/validation/grid-benchmark.json",
    JSON.stringify(
      {
        datasetRows: 10000,
        pageSize: 25,
        renderedRows: 25,
        mountMs,
        sortMs,
        browser: "Chromium",
        environment:
          "Managed cloud, dev server; includes Playwright action/wait overhead",
        virtualization: false,
      },
      null,
      2,
    ) + "\n",
  );
  await grid.screenshot({ path: "artifacts/screenshots/library-grid.png" });
});
test("public docs on narrow screen", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("tab", { name: "Documentation", exact: true }).click();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "artifacts/screenshots/library-mobile.png",
    fullPage: true,
  });
});
