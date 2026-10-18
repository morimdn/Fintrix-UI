import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
async function ready(page: Page) {
  await page.getByRole("heading", { name: /Client management/ }).waitFor();
  await page.evaluate(() => document.fonts.ready);
}
async function noViolations(page: Page) {
  // Contrast must be evaluated after overlays finish their opacity/scale transition.
  await page.evaluate(async () => {
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve)),
    );
    await Promise.all(
      Array.from(
        document.querySelectorAll(
          ".ant-modal, .ant-modal-mask, .ant-drawer-content-wrapper, .ant-popover, .ant-form-item",
        ),
      )
        .flatMap((element) => element.getAnimations({ subtree: true }))
        .filter(
          (animation) =>
            animation.playState === "running" &&
            animation.effect?.getTiming().iterations !== Infinity,
        )
        .map((animation) => animation.finished.catch(() => {})),
    );
  });
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(
    result.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
  ).toEqual([]);
}
for (const mode of ["light", "dark"] as const)
  for (const density of ["comfortable", "compact"] as const)
    test(`CRM accessibility and font: ${mode} ${density}`, async ({ page }) => {
      await page.goto("/?view=crm");
      await ready(page);
      if (mode === "dark")
        await page
          .getByRole("button", { name: "Switch to dark theme" })
          .click();
      if (density === "compact")
        await page.getByText("Compact", { exact: true }).click();
      expect(
        await page.evaluate(() =>
          document.fonts.check('400 14px "Inter Variable"'),
        ),
      ).toBe(true);
      expect(
        await page.evaluate(() =>
          [...document.fonts].some(
            (font) =>
              font.family === "Inter Variable" && font.status === "loaded",
          ),
        ),
      ).toBe(true);
      await noViolations(page);
      await page.screenshot({
        path: `artifacts/screenshots/crm-${mode}${density === "compact" ? "-compact" : ""}.png`,
        fullPage: true,
      });
      if (mode === "dark" && density === "compact")
        await page
          .locator(".directory")
          .screenshot({ path: "artifacts/screenshots/compact-grid.png" });
      await page.getByRole("button", { name: "Add client" }).click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      await expect(page.locator(".ant-modal")).toHaveCSS(
        "animation-name",
        "none",
      );
      await noViolations(page);
      await page.keyboard.press("Tab");
      await expect(dialog.locator(":focus")).toHaveCount(1);
      await page.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);
      await expect(
        page.getByRole("button", { name: "Add client" }),
      ).toBeFocused();
    });
for (const mode of ["light", "dark"] as const)
  test(`showcase accessibility and screenshots: ${mode}`, async ({ page }) => {
    await page.goto("/?view=crm");
    await ready(page);
    if (mode === "dark")
      await page.getByRole("button", { name: "Switch to dark theme" }).click();
    await page.getByRole("button", { name: /Design system/ }).click();
    await expect(
      page.getByRole("tab", { name: "Foundations", exact: true }),
    ).toBeVisible();
    for (const [tab, file] of [
      ["Foundations", "tokens"],
      ["Core components", "components"],
      ["Financial UI", "financial"],
    ]) {
      await page.getByRole("tab", { name: tab, exact: true }).click();
      await noViolations(page);
      await page.screenshot({
        path: `artifacts/screenshots/${file}-${mode}.png`,
        fullPage: true,
      });
    }
    await page
      .getByRole("tab", { name: "Core components", exact: true })
      .click();
    await page.getByRole("button", { name: "Open form modal" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.locator(".ant-modal")).toHaveCSS(
      "animation-name",
      "none",
    );
    await noViolations(page);
    await page.keyboard.press("Escape");
    await page
      .getByRole("button", { name: "Open popover", exact: true })
      .click();
    await expect(
      page.getByText(
        "Synthetic funds available in this demonstration account.",
      ),
    ).toBeVisible();
    await noViolations(page);
  });
test("mobile navigation, table scroll, touch sizes and modal", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/?view=crm");
  await ready(page);
  await page.getByText("Compact", { exact: true }).click();
  for (const control of [
    page.getByRole("button", { name: "Add client" }),
    page.locator(".table-toolbar .search"),
    page.locator(".table-toolbar .ant-select").first(),
  ]) {
    await expect
      .poll(async () => (await control.boundingBox())!.height)
      .toBeGreaterThanOrEqual(44);
  }
  await page.getByText("Comfortable", { exact: true }).click();
  await page.getByRole("button", { name: "Customize columns" }).click();
  await page
    .getByRole("spinbutton", { name: "status column width" })
    .fill("200");
  await page
    .getByRole("spinbutton", { name: "status column width" })
    .press("Tab");
  await expect(
    page.getByRole("spinbutton", { name: "status column width" }),
  ).toHaveValue("200");
  await page.getByRole("button", { name: "Customize columns" }).click();
  await page.getByRole("heading", { name: /Client management/ }).click();
  const menu = page.getByRole("button", { name: "Open navigation" });
  await menu.click();
  await expect(
    page.getByRole("dialog", { name: "Workspace navigation" }),
  ).toBeVisible();
  await noViolations(page);
  await page.getByRole("button", { name: /Design system/ }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(menu).toBeFocused();
  await expect(
    page.getByRole("tab", { name: "Foundations", exact: true }),
  ).toBeVisible();
  await menu.click();
  await page.getByRole("button", { name: "Clients", exact: true }).click();
  await ready(page);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  const scroller = page.locator(".ant-table-content");
  expect(await scroller.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(
    true,
  );
  const pinnedHeader = page
    .locator("th.ant-table-cell-fix-start")
    .filter({ hasText: "Client" });
  const headerBefore = await pinnedHeader.boundingBox();
  await scroller.evaluate((el) => (el.scrollLeft = 300));
  await expect
    .poll(async () =>
      Math.abs((await pinnedHeader.boundingBox())!.x - headerBefore!.x),
    )
    .toBeLessThan(1);
  await expect(page.locator(".client-link").first()).toBeVisible();
  await page.getByRole("button", { name: "Add client" }).click();
  await expect(page.getByRole("textbox", { name: "Full name" })).toBeVisible();
  await page.getByRole("button", { name: "Create client" }).click();
  await expect(page.getByText("Enter a full name")).toBeVisible();
  await noViolations(page);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Add client" })).toBeFocused();
  await page.getByRole("heading", { name: /Client management/ }).click();
  await scroller.evaluate((el) => (el.scrollLeft = 0));
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: "artifacts/screenshots/mobile.png",
    fullPage: true,
  });
  await menu.click();
  await page.screenshot({
    path: "artifacts/screenshots/mobile-navigation.png",
  });
  await page.keyboard.press("Escape");
});
test("tablet layout and keyboard resize limits", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto("/?view=crm");
  await ready(page);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  const handle = page.getByRole("slider", { name: "Resize name column" });
  await handle.focus();
  await page.keyboard.press("Home");
  await expect(handle).toHaveAttribute("aria-valuenow", "220");
  await page.keyboard.press("End");
  await expect(handle).toHaveAttribute("aria-valuenow", "320");
  await page.keyboard.press("ArrowRight");
  await expect(handle).toHaveAttribute("aria-valuenow", "320");
  await expect(page.locator("th[aria-sort]")).toHaveCount(0);
  await page.screenshot({
    path: "artifacts/screenshots/tablet.png",
    fullPage: true,
  });
});
