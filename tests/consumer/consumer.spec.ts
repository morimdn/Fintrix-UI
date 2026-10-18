import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("packed artifact loads CSS, fonts, forms, finance and both theme axes", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Independent consumer" }),
  ).toBeVisible();
  await expect(
    page.getByText("$9,007,199,254,740,993.25", { exact: true }),
  ).toBeVisible();
  await expect(page.locator(".techosoul-financial-card")).toHaveCSS(
    "border-top-style",
    "solid",
  );
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page.evaluate(() =>
      [...document.fonts].some(
        (font) => font.family === "Inter Variable" && font.status === "loaded",
      ),
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Save reference" }).click();
  await expect(page.getByText("Please enter Account reference")).toBeVisible();
  await page
    .getByRole("textbox", { name: "Account reference" })
    .fill("DEMO-1042");
  await page.getByRole("button", { name: "Theme: light" }).click();
  await page.getByRole("button", { name: "Density: comfortable" }).click();
  await expect(page.locator(".techosoul-root")).toHaveAttribute(
    "data-theme",
    "dark",
  );
  await expect(page.locator(".techosoul-root")).toHaveAttribute(
    "data-density",
    "compact",
  );
  await expect
    .poll(async () =>
      Math.abs(
        (await page
          .getByRole("textbox", { name: "Account reference" })
          .boundingBox())!.height - 32,
      ),
    )
    .toBeLessThan(1);
  expect(
    (
      await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze()
    ).violations.map((v) => v.id),
  ).toEqual([]);
  expect(errors).toEqual([]);
});

test("packed production grid and overlays preserve keyboard behavior", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("cell", { name: "Operating", exact: true }),
  ).toBeVisible();
  await page.getByTitle("Next Page").click();
  await expect(
    page.getByRole("cell", { name: "Reserve", exact: true }),
  ).toBeVisible();
  const trigger = page.getByRole("button", {
    name: "Open dialog",
    exact: true,
  });
  await trigger.click();
  await expect(
    page.getByRole("dialog", { name: "Consumer dialog" }),
  ).toBeVisible();
  await expect
    .poll(() =>
      page
        .getByRole("dialog")
        .evaluate((el) =>
          (el.closest(".ant-drawer") ?? el).contains(document.activeElement),
        ),
    )
    .toBe(true);
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("dialog", { name: "Consumer dialog" }),
  ).toBeHidden();
  await expect(trigger).toBeFocused();
  await page.getByRole("button", { name: "Open drawer", exact: true }).click();
  await expect(
    page.getByRole("dialog", { name: "Consumer drawer" }),
  ).toBeVisible();
  await expect
    .poll(() =>
      page
        .getByRole("dialog")
        .evaluate((el) =>
          (el.closest(".ant-drawer") ?? el).contains(document.activeElement),
        ),
    )
    .toBe(true);
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("dialog", { name: "Consumer drawer" }),
  ).toBeHidden();
});

test("complete onboarding App works from the independently packed library", async ({
  page,
}) => {
  await page.goto("/?example=onboarding");
  await expect(page.getByRole("heading", { name: "My wallet" })).toBeVisible();
  await expect(page.getByText("€12,500.25", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Theme: dark" }).click();
  await page.getByRole("button", { name: "Density: comfortable" }).click();
  await expect(page.locator(".techosoul-root")).toHaveAttribute(
    "data-theme",
    "light",
  );
  await expect(page.locator(".techosoul-root")).toHaveAttribute(
    "data-density",
    "compact",
  );
  expect(
    (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze())
      .violations,
  ).toEqual([]);
});
for (const example of [
  "actions",
  "forms",
  "overlays",
  "grid",
  "financial",
  "icons",
  "feedback",
]) {
  test(`documentation example renders without runtime errors: ${example}`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`/?example=${example}`);
    await expect(
      page.getByRole("heading", { name: "Documentation example" }),
    ).toBeVisible();
    if (example === "icons") {
      const icon = page.getByRole("img", { name: "Wallet", exact: true });
      await expect(icon).toBeVisible();
      await expect(icon).toHaveCSS("color", "rgb(89, 65, 169)");
      await page.getByRole("button", { name: "Wallet settings" }).click();
      await expect(page.getByRole("status")).toHaveText("Settings selected");
      const color = await page
        .locator(".techosoul-financial-card svg")
        .evaluate((el) => getComputedStyle(el).color);
      const success = await page
        .locator(".techosoul-root")
        .evaluate((el) =>
          getComputedStyle(el).getPropertyValue("--techosoul-success").trim(),
        );
      expect(color).toBe(
        await page.evaluate((value) => {
          const el = document.createElement("span");
          el.style.color = value;
          document.body.append(el);
          const color = getComputedStyle(el).color;
          el.remove();
          return color;
        }, success),
      );
    }
    if (example === "actions") {
      await page
        .getByRole("button", { name: "Create report", exact: true })
        .click();
      await expect(page.getByRole("status")).toHaveText("Report requested");
    }
    if (example === "grid") {
      const right = await page
        .getByRole("columnheader", { name: /^Balance/ })
        .evaluate((element) => {
          const range = document.createRange();
          range.selectNodeContents(element.firstChild!);
          return range.getBoundingClientRect().right;
        });
      for (const amount of await page
        .locator(".ant-table-row .techosoul-currency")
        .all()) {
        const box = await amount.boundingBox();
        expect(Math.abs(box!.x + box!.width - right)).toBeLessThan(1);
        await expect(amount).toHaveCSS("font-variant-numeric", "tabular-nums");
      }
      await page.getByRole("checkbox", { name: "Hide note column" }).check();
      await expect(
        page.getByRole("columnheader", { name: "Note", exact: true }),
      ).toHaveCount(0);
      await page.getByTitle("Next Page").click();
      await expect(
        page.getByRole("cell", { name: "Reserve", exact: true }),
      ).toBeVisible();
    }
    if (example === "feedback") {
      await page.getByRole("button", { name: "Show notification" }).click();
      await expect(
        page.getByText("Report ready", { exact: true }),
      ).toBeVisible();
    }
    if (example === "forms") {
      await page.getByRole("button", { name: "Save preferences" }).click();
      await expect(
        page.getByText("Enter an account reference", { exact: true }),
      ).toBeVisible();
    }
    expect(errors).toEqual([]);
  });
}
