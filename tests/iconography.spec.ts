import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const mode of ["light", "dark"]) {
  test(`icon gallery search, customization and accessibility: ${mode}`, async ({
    page,
  }, testInfo) => {
    await page.goto("/");
    if (mode === "dark")
      await page.getByRole("button", { name: "Switch to dark theme" }).click();
    await page.getByRole("tab", { name: "Iconography", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "A clear visual language." }),
    ).toBeVisible();
    await page.getByRole("textbox", { name: "Search icons" }).fill("Wallet");
    await expect(
      page.getByRole("button", { name: "Copy Wallet example", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Copy Home example", exact: true }),
    ).toHaveCount(0);
    await page.getByRole("combobox", { name: "Icon tone" }).click();
    await page
      .locator(".ant-select-dropdown")
      .getByText("success", { exact: true })
      .click();
    const slider = page.getByRole("slider", { name: "Icon size", exact: true });
    await slider.focus();
    await page.keyboard.press("ArrowRight");
    await expect(slider).toHaveAttribute("aria-valuenow", "28");
    await page
      .getByRole("button", { name: "Wallet settings", exact: true })
      .click();
    await expect(page.getByRole("status")).toHaveText(
      "Wallet settings demonstration activated",
    );
    const copy = page.getByRole("button", {
      name: "Copy Wallet example",
      exact: true,
    });
    await copy.hover();
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    await page.locator(".main-scroll").evaluate((el) => {
      el.scrollTop = 0;
    });
    await page.screenshot({
      path: `docs/screenshots/iconography-${mode}-${testInfo.project.name || "chromium"}.png`,
      fullPage: true,
    });
    await page
      .getByRole("textbox", { name: "Search icons" })
      .fill("no-such-icon");
    await expect(
      page.getByText("No matching icons. Try another name or category."),
    ).toBeVisible();
  });
}
test("copy example and dark hover foreground regression", async ({
  page,
  context,
  browserName,
}) => {
  test.skip(
    browserName !== "chromium",
    "Clipboard permissions differ across browser engines",
  );
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.getByRole("tab", { name: "Iconography", exact: true }).click();
  await page.getByRole("textbox", { name: "Search icons" }).fill("Wallet");
  const copy = page.getByRole("button", {
    name: "Copy Wallet example",
    exact: true,
  });
  await copy.hover();
  await expect(copy).toHaveCSS("color", "rgb(189, 210, 255)");
  await copy.click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    '<FintrixIcon icon={Wallet} tone="neutral"',
  );
});

test("iconography remains usable on a compact narrow screen", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByText("Compact", { exact: true }).click();
  await page.getByRole("tab", { name: "Iconography", exact: true }).click();
  await page.getByRole("textbox", { name: "Search icons" }).fill("ShieldCheck");
  const stroke = page.getByRole("slider", { name: "Icon stroke width" });
  await stroke.focus();
  await page.keyboard.press("ArrowRight");
  await expect(stroke).toHaveAttribute("aria-valuenow", "2.5");
  await expect
    .poll(() =>
      page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    )
    .toBe(true);
  await page.locator(".main-scroll").evaluate((el) => {
    el.scrollTop = 0;
  });
  await page.screenshot({
    path: "docs/screenshots/iconography-mobile.png",
    fullPage: true,
  });
});
