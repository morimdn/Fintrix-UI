import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function expectBalanceAlignment(page: Page) {
  const header = page.getByRole("columnheader", { name: /Wallet balance/ });
  const title = header.locator(".ant-table-column-title");
  const titleBox = await title.boundingBox();
  expect(titleBox).not.toBeNull();
  const right = titleBox!.x + titleBox!.width;
  for (const amount of await page.locator(".ant-table-row .money").all()) {
    const metrics = await amount.evaluate((element) => {
      const range = document.createRange();
      range.selectNodeContents(element.firstChild!);
      return {
        amountRight: range.getBoundingClientRect().right,
        currencyRight: element.querySelector("small")!.getBoundingClientRect()
          .right,
        numerals: getComputedStyle(element).fontVariantNumeric,
      };
    });
    expect(Math.abs(metrics.amountRight - right)).toBeLessThan(1);
    expect(Math.abs(metrics.currencyRight - right)).toBeLessThan(1);
    expect(metrics.numerals).toContain("tabular-nums");
  }
  const sorter = await header.locator(".ant-table-column-sorter").boundingBox();
  expect(sorter!.x + sorter!.width).toBeLessThanOrEqual(titleBox!.x);
  if (await header.getByRole("slider").isVisible()) {
    const handle = await header.getByRole("slider").boundingBox();
    expect(handle!.x).toBeGreaterThanOrEqual(right);
  }
}

for (const mode of ["light", "dark"] as const) {
  for (const density of ["comfortable", "compact"] as const) {
    for (const [layout, width, height] of [
      ["desktop", 1536, 1120],
      ["mobile", 390, 844],
    ] as const) {
      test(`financial column alignment ${mode} ${density} ${layout}`, async ({
        page,
      }, testInfo) => {
        await page.setViewportSize({ width, height });
        await page.goto("/?view=crm");
        if (mode === "dark")
          await page
            .getByRole("button", { name: "Switch to dark theme" })
            .click();
        if (density === "compact")
          await page.getByText("Compact", { exact: true }).click();
        await page.evaluate(() => document.fonts.ready);
        const header = page.getByRole("columnheader", {
          name: /Wallet balance/,
        });
        await header.scrollIntoViewIfNeeded();
        await expectBalanceAlignment(page);
        const handle = header.getByRole("slider", {
          name: "Resize balance column",
        });
        if (layout === "desktop") {
          await handle.focus();
          await handle.press("ArrowRight");
          await expect(handle).toHaveAttribute("aria-valuenow", "190");
        } else {
          // The existing touch layout hides edge resize controls.
          await expect(handle).toBeHidden();
        }
        await expect(header).not.toHaveAttribute("aria-sort");
        await expectBalanceAlignment(page);
        await header.focus();
        await header.press("Enter");
        await expect(header).toHaveAttribute("aria-sort", "ascending");
        if (layout === "mobile") {
          // Reveal the balance beside the pinned identity column after sorting.
          await header.evaluate((element) => {
            const scroller = element.closest(".ant-table-content")!;
            scroller.scrollLeft +=
              element.getBoundingClientRect().right -
              scroller.getBoundingClientRect().right;
          });
          const titleBox = await header
            .locator(".ant-table-column-title")
            .boundingBox();
          const identity = await page
            .getByRole("columnheader", { name: /^Client/ })
            .boundingBox();
          expect(titleBox!.x).toBeGreaterThanOrEqual(
            identity!.x + identity!.width,
          );
          const amountBox = await page
            .locator(".ant-table-row .money")
            .first()
            .boundingBox();
          expect(amountBox!.x).toBeGreaterThanOrEqual(
            identity!.x + identity!.width,
          );
        }
        await expectBalanceAlignment(page);
        expect(
          (
            await new AxeBuilder({ page })
              .include(".techosoul-data-table")
              .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
              .analyze()
          ).violations,
        ).toEqual([]);
        await page.screenshot({
          path: `artifacts/screenshots/balance-${layout}-${mode}-${density}-${testInfo.project.name || "chromium"}.png`,
        });
      });
    }
  }
}
