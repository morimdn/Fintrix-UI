import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { palettes, type ColorMode } from "@techosoul/ui/tokens";

function rgb(hex: string) {
  return `rgb(${[1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16)).join(", ")})`;
}
function contrast(foreground: string, background: string) {
  const luminance = (color: string) => {
    const channels = color
      .match(/[\d.]+/g)!
      .slice(0, 3)
      .map(Number)
      .map((value) => {
        const channel = value / 255;
        return channel <= 0.04045
          ? channel / 12.92
          : ((channel + 0.055) / 1.055) ** 2.4;
      });
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  const a = luminance(foreground),
    b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
async function expectDocumentationTheme(page: Page, mode: ColorMode) {
  await expect(page.locator(".techosoul-root")).toHaveAttribute(
    "data-theme",
    mode,
  );
  const inheritance = await page.locator(".showcase-tabs").evaluate((el) => ({
    tabs: getComputedStyle(el).color,
    providerToken: getComputedStyle(el)
      .getPropertyValue("--techosoul-text")
      .trim(),
    documentation: getComputedStyle(el.querySelector(".documentation-layout")!)
      .color,
  }));
  await test.info().attach(`documentation-colors-${mode}`, {
    body: JSON.stringify(inheritance),
    contentType: "application/json",
  });
  if (inheritance.tabs !== rgb(palettes[mode].text))
    console.info("Independent theme paths", { mode, ...inheritance });
  const section = "#docs-getting-started";
  for (const [text, surface, token] of [
    [`${section} h2`, section, "surface"],
    [`${section} summary`, section, "surface"],
    [
      `${section} pre[aria-label="Installation commands"] > code`,
      `${section} pre[aria-label="Installation commands"]`,
      "subtle",
    ],
    [
      `${section} pre[aria-label="Getting Started source code"] > code`,
      `${section} pre[aria-label="Getting Started source code"]`,
      "subtle",
    ],
  ] as const) {
    const foreground = page.locator(text),
      background = page.locator(surface);
    await expect(foreground).toHaveCSS("color", rgb(palettes[mode].text));
    await expect(background).toHaveCSS(
      "background-color",
      rgb(palettes[mode][token]),
    );
    const colors = await Promise.all([
      foreground.evaluate((el) => getComputedStyle(el).color),
      background.evaluate((el) => getComputedStyle(el).backgroundColor),
    ]);
    expect(
      contrast(...(colors as [string, string])),
      `${mode}: ${text}`,
    ).toBeGreaterThanOrEqual(4.5);
  }
}

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
      await expect(page.locator("#heading-getting-started")).toBeFocused();
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
      await expectDocumentationTheme(page, mode as ColorMode);
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze()
        ).violations,
      ).toEqual([]);
      await expectDocumentationTheme(page, mode as ColorMode);
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
      await expect(page.locator("#heading-core")).toBeFocused();
      await page.goForward();
      await expect(
        page.getByRole("tab", { name: "Iconography", exact: true }),
      ).toHaveAttribute("aria-selected", "true");
      await expect(
        page.getByRole("textbox", { name: "Search icons" }),
      ).toBeVisible();
      await page.goBack();
      await expect(page.locator("#heading-core")).toBeInViewport();
      await expect(page.locator("#heading-core")).toBeFocused();
      await page.reload();
      await expect(page.locator("#heading-core")).toBeInViewport();
      await expect(page.locator("#heading-core")).toBeFocused();
      await expect(
        page.getByRole("link", { name: "Read repository documentation" }),
      ).toHaveAttribute(
        "href",
        "https://github.com/morimdn/Techosoul-UI/tree/main/docs",
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
  await expect(page.locator("#heading-developers")).toBeFocused();
  await page.evaluate(() => document.fonts.ready);
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
  await expect(page.locator("#heading-getting-started")).toBeFocused();
  await expect(page.locator("#heading-getting-started")).toBeInViewport();
  const code = page.getByLabel("Getting Started source code", { exact: true });
  await code.focus();
  await expect(code).toBeFocused();
  const outerTop = await scroller.evaluate((el) => el.scrollTop);
  expect(outerTop).toBeGreaterThan(0);
  // Exercise both boundaries inside the nested region, including an already
  // reached boundary. The shell must not consume these descendant key events.
  await page.keyboard.press("End");
  await expect
    .poll(() =>
      code.evaluate((el) =>
        Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop),
      ),
    )
    .toBeLessThan(2);
  await expect
    .poll(() => scroller.evaluate((el) => el.scrollTop))
    .toBe(outerTop);
  await page.keyboard.press("Home");
  await expect.poll(() => code.evaluate((el) => el.scrollTop)).toBe(0);
  await page.keyboard.press("Home");
  await expect(code).toBeFocused();
  await expect
    .poll(() => scroller.evaluate((el) => el.scrollTop))
    .toBe(outerTop);
  await expect
    .poll(() => scroller.evaluate((el) => el.scrollTop))
    .toBeGreaterThan(0);
});

test("documentation theme colors follow tokens through repeated mode changes", async ({
  page,
}) => {
  await page.goto("/#docs-getting-started");
  await expect(page.locator("#heading-getting-started")).toBeFocused();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expectDocumentationTheme(page, "light");
  for (const mode of ["dark", "light", "dark"] as const) {
    await page.getByRole("button", { name: `Switch to ${mode} theme` }).click();
    await expectDocumentationTheme(page, mode);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    await expectDocumentationTheme(page, mode);
  }
});

test("documentation foreground is independent of a stale Tabs theme color", async ({
  page,
}) => {
  await page.goto("/#docs-getting-started");
  await expect(page.locator("#heading-getting-started")).toBeFocused();
  // Reproduce the exact inherited light foreground from the failing WebKit run.
  // Keep the ancestor stale to distinguish a cascade fix from merely waiting.
  await page.addStyleTag({
    content: `.showcase-tabs { color: ${palettes.light.text} !important; }`,
  });
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator(".showcase-tabs")).toHaveCSS(
    "color",
    rgb(palettes.light.text),
  );
  await expectDocumentationTheme(page, "dark");
});
