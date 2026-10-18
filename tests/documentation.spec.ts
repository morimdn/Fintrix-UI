import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const mode of ["light", "dark"]) {
  for (const [label, width, height] of [
    ["desktop", 1536, 1120],
    ["tablet", 1024, 768],
    ["mobile", 390, 844],
  ] as const) {
    test(`documentation deep links and accessibility ${mode} ${label}`, async ({
      page,
    }, testInfo) => {
      await page.setViewportSize({ width, height });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto("/#docs-getting-started");
      if (mode === "dark")
        await page
          .getByRole("button", { name: "Switch to dark theme" })
          .click();
      await expect(
        page.getByRole("tab", { name: "Documentation", exact: true }),
      ).toHaveAttribute("aria-selected", "true");
      await expect(page.locator("#heading-getting-started")).toBeInViewport();
      const nav = page.getByRole("navigation", {
        name: "Documentation sections",
      });
      await expect(nav.getByRole("link")).toHaveCount(14);
      await expect(
        nav.getByRole("link", { name: "Getting Started", exact: true }),
      ).toHaveAttribute("aria-current", "location");
      await expect
        .poll(() =>
          page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        )
        .toBe(true);
      const code = page.getByLabel("Getting Started source code", {
        exact: true,
      });
      await code.focus();
      await expect(code).toBeFocused();
      if (label === "desktop") {
        // Shell copy must follow Techosoul tokens even while Ant replaces its styles.
        for (const selector of [".workspace strong", ".poc-note strong"]) {
          const colors = await page
            .locator(`.sidebar ${selector}`)
            .evaluate((element) => ({
              actual: getComputedStyle(element).color,
              expected: getComputedStyle(
                document.querySelector(".techosoul-root")!,
              ).color,
            }));
          expect(colors.actual).toBe(colors.expected);
        }
      }
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze()
        ).violations,
      ).toEqual([]);
      await page
        .locator("#docs-getting-started")
        .evaluate((el) => el.scrollIntoView({ block: "start" }));
      await page.screenshot({
        path: `artifacts/screenshots/docs-${label}-${mode}-${testInfo.project.name || "chromium"}.png`,
      });
      await nav
        .getByRole("link", { name: "Core Components", exact: true })
        .click();
      await expect(page).toHaveURL(/#docs-core$/);
      await expect(page.locator("#heading-core")).toBeFocused();
      await page
        .getByRole("link", { name: "Browse the 36-icon gallery" })
        .click();
      await expect(
        page.getByRole("tab", { name: "Iconography", exact: true }),
      ).toHaveAttribute("aria-selected", "true");
      await expect(
        page.getByRole("textbox", { name: "Search icons" }),
      ).toBeVisible();
      await page.goBack();
      await expect(page.locator("#heading-core")).toBeInViewport();
      await page.reload();
      await expect(page.locator("#heading-core")).toBeInViewport();
      await expect(
        page.getByRole("link", { name: "Read repository documentation" }),
      ).toHaveAttribute(
        "href",
        "https://github.com/morimdn/Fintrix-UI/tree/main/docs",
      );
    });
  }
}
test("clipboard rejection preserves readable source and reports recovery", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: () => Promise.reject(new Error("Unavailable")) },
      configurable: true,
    }),
  );
  await page.goto("/#docs-getting-started");
  await page
    .getByRole("button", { name: "Copy Getting Started example" })
    .click();
  await expect(page.locator("#docs-getting-started [role=status]")).toHaveText(
    "Clipboard unavailable. Select and copy the code above.",
  );
  await expect(
    page.getByLabel("Getting Started source code", { exact: true }),
  ).toContainText('from "@techosoul/ui"');
});

test("long documentation scroll region supports boundary keys without intercepting code", async ({
  page,
}) => {
  await page.goto("/#docs-developers");
  const scroller = page.getByLabel("Scrollable page content", { exact: true });
  await scroller.focus();
  await expect(scroller).toBeFocused();
  await page.keyboard.press("Home");
  await expect.poll(() => scroller.evaluate((el) => el.scrollTop)).toBe(0);
  await page.keyboard.press("End");
  await expect
    .poll(() =>
      scroller.evaluate((el) =>
        Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop),
      ),
    )
    .toBeLessThan(2);
  await page.goto("/#docs-getting-started");
  const code = page.getByLabel("Getting Started source code", { exact: true });
  await code.focus();
  await page.keyboard.press("Home");
  await expect(code).toBeFocused();
  await expect
    .poll(() => scroller.evaluate((el) => el.scrollTop))
    .toBeGreaterThan(0);
});
