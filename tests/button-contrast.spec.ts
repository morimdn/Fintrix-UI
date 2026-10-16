import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { palettes } from "fintrix-ui-preview/tokens";

function rgb(hex: string) {
  return `rgb(${[1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16)).join(", ")})`;
}
for (const mode of ["light", "dark"] as const) {
  for (const density of ["comfortable", "compact"] as const) {
    test(`copy button contrast and functionality: ${mode} ${density}`, async ({
      page,
      context,
    }, testInfo) => {
      await context.grantPermissions(["clipboard-read", "clipboard-write"]);
      await page.goto("/");
      if (mode === "dark")
        await page
          .getByRole("button", { name: "Switch to dark theme" })
          .click();
      if (density === "compact")
        await page.getByText("Compact", { exact: true }).click();
      await page
        .getByRole("tab", { name: "Documentation", exact: true })
        .click();
      const button = page.locator("#docs-getting-started .ant-btn");
      await button.scrollIntoViewIfNeeded();
      const measurements: object[] = [];
      async function audit(state: string, color: string) {
        // Assert the settled interaction state rather than relying on machine speed.
        await expect(button).toHaveCSS("color", rgb(color));
        await expect(button).toHaveCSS(
          "background-color",
          rgb(palettes[mode].surface),
        );
        measurements.push({
          state,
          ...(await button.evaluate((el) => {
            const style = getComputedStyle(el);
            return {
              foreground: style.color,
              background: style.backgroundColor,
              hovered: el.matches(":hover"),
              active: el.matches(":active"),
            };
          })),
        });
        const result = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        expect(
          result.violations.map((v) => ({
            id: v.id,
            nodes: v.nodes.map((n) => ({
              target: n.target,
              summary: n.failureSummary,
            })),
          })),
        ).toEqual([]);
      }
      await page.mouse.move(0, 0);
      await audit("idle", palettes[mode].text);
      await button.hover();
      await audit("hover", palettes[mode].primaryHover);
      await page.mouse.down();
      try {
        await audit("active", palettes[mode].primary);
      } finally {
        await page.mouse.up();
      }
      await expect(button).toHaveText("Copied");
      expect(
        await page.evaluate(() => navigator.clipboard.readText()),
      ).toContain('<FintrixProvider initialMode="dark"');
      await page.mouse.move(0, 0);
      await button.focus();
      await expect(button).toBeFocused();
      await audit("focus", palettes[mode].text);
      await testInfo.attach("copy-button-colors", {
        body: JSON.stringify(measurements, null, 2),
        contentType: "application/json",
      });
    });
  }
}
