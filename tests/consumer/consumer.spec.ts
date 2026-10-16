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
  await expect(page.locator(".fx-financial-card")).toHaveCSS(
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
  await expect(page.locator(".fintrix-root")).toHaveAttribute(
    "data-theme",
    "dark",
  );
  await expect(page.locator(".fintrix-root")).toHaveAttribute(
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
