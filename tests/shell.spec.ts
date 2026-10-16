import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const viewports = [
  { name: "desktop", width: 1536, height: 960 },
  { name: "tablet", width: 1024, height: 768 },
  { name: "mobile", width: 390, height: 844 },
  { name: "short", width: 844, height: 390 },
  { name: "mobile-landscape", width: 667, height: 375 },
];
for (const mode of ["light", "dark"] as const) {
  for (const viewport of viewports) {
    test(`app shell ${viewport.name} ${mode}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto("/?view=crm");
      await page.getByRole("heading", { name: /Client management/ }).waitFor();
      if (mode === "dark")
        await page
          .getByRole("button", { name: "Switch to dark theme" })
          .click();
      await page.evaluate(() => document.fonts.ready);
      const topbar = page.locator(".topbar");
      const scroller = page.locator(".main-scroll");
      const sidebar = page.locator(".sidebar");
      const before = await topbar.boundingBox();
      expect(
        await page.evaluate(() => ({
          width: document.documentElement.scrollWidth <= innerWidth,
          height: document.documentElement.scrollHeight <= innerHeight,
        })),
      ).toEqual({ width: true, height: true });
      await expect(topbar).toHaveCSS(
        "background-color",
        await sidebar.evaluate((el) => getComputedStyle(el).backgroundColor),
      );
      const shellBox = (await page.locator(".main-shell").boundingBox())!;
      expect(before!.x).toBe(shellBox.x);
      expect(before!.width).toBe(shellBox.width);
      expect((await scroller.boundingBox())!.y).toBe(
        before!.y + before!.height,
      );
      await page.mouse.move(viewport.width - 2, viewport.height - 2);
      await expect(page.getByRole("tooltip")).toHaveCount(0);
      await page.screenshot({
        animations: "disabled",
        path: `docs/screenshots/shell-${viewport.name}-${mode}.png`,
      });

      if (viewport.width <= 760) {
        await expect(sidebar).toBeHidden();
        const trigger = page.getByRole("button", { name: "Open navigation" });
        await trigger.click();
        const drawer = page.getByRole("dialog", {
          name: "Workspace navigation",
        });
        await expect(drawer).toBeVisible();
        const drawerNav = drawer.getByRole("region", {
          name: "Sidebar navigation",
        });
        await expect(drawerNav).toHaveCSS("overflow-y", "auto");
        const drawerProfile = (await drawer.locator(".profile").boundingBox())!;
        const drawerBody = (await drawer
          .locator(".ant-drawer-body")
          .boundingBox())!;
        expect(
          Math.abs(
            drawerProfile.y +
              drawerProfile.height -
              drawerBody.y -
              drawerBody.height,
          ),
        ).toBeLessThan(1);
        await expect(
          drawerNav.getByRole("button", { name: "Clients", exact: true }),
        ).toHaveAttribute("aria-current", "page");
        await expect
          .poll(async () => Math.abs((await drawer.boundingBox())!.x))
          .toBeLessThan(1);
        await page.screenshot({
          animations: "disabled",
          path: `docs/screenshots/shell-drawer-${viewport.name}-${mode}.png`,
        });
        await page.keyboard.press("Escape");
        await expect(drawer).toHaveCount(0);
        await expect(trigger).toBeFocused();
        await trigger.click();
        await drawer.getByRole("button", { name: /Design system/ }).click();
        await expect(drawer).toHaveCount(0);
        await expect(trigger).toBeFocused();
      } else {
        await expect(sidebar).toBeVisible();
        await expect(sidebar).toHaveCSS("overflow-y", "hidden");
        const brand = sidebar.locator(".brand");
        const profile = sidebar.locator(".profile");
        const brandBefore = await brand.boundingBox();
        const profileBefore = (await profile.boundingBox())!;
        expect(
          Math.abs(profileBefore.y + profileBefore.height - viewport.height),
        ).toBeLessThan(1);
        const navigation = sidebar.getByRole("region", {
          name: "Sidebar navigation",
        });
        await expect(navigation).toHaveCSS("scrollbar-width", "thin");
        if (viewport.name === "short") {
          expect(
            await navigation.evaluate(
              (el) => el.scrollHeight > el.clientHeight,
            ),
          ).toBe(true);
          await navigation.focus();
          await page.keyboard.press("End");
          await expect
            .poll(() => navigation.evaluate((el) => el.scrollTop))
            .toBeGreaterThan(0);
          expect(await brand.boundingBox()).toEqual(brandBefore);
          expect(await profile.boundingBox()).toEqual(profileBefore);
          expect(await scroller.evaluate((el) => el.scrollTop)).toBe(0);
          await navigation.evaluate((el) => {
            el.scrollTop = 0;
          });
        } else if (viewport.name === "desktop") {
          expect(
            await navigation.evaluate(
              (el) => el.scrollHeight <= el.clientHeight,
            ),
          ).toBe(true);
        }
        await sidebar.getByRole("button", { name: /Design system/ }).click();
      }
      await page
        .getByRole("tab", { name: "Documentation", exact: true })
        .click();
      await expect(
        page.getByRole("tab", { name: "Documentation", exact: true }),
      ).toHaveAttribute("aria-selected", "true");
      const tabs = page.getByRole("tablist", {
        name: "Design system sections",
      });
      await page
        .getByRole("tab", { name: "Documentation", exact: true })
        .focus();
      await page.keyboard.press("Home");
      await expect(
        tabs.getByRole("tab", { name: "Foundations", exact: true }),
      ).toBeFocused();
      await page.keyboard.press("End");
      await expect(
        tabs.getByRole("tab", { name: "Documentation", exact: true }),
      ).toBeFocused();
      await page.locator("#docs-developers").scrollIntoViewIfNeeded();
      await expect
        .poll(() => scroller.evaluate((el) => el.scrollTop))
        .toBeGreaterThan(0);
      await scroller.focus();
      await page.keyboard.press("Home");
      await expect.poll(() => scroller.evaluate((el) => el.scrollTop)).toBe(0);
      await page.keyboard.press("PageDown");
      await expect
        .poll(() => scroller.evaluate((el) => el.scrollTop))
        .toBeGreaterThan(0);
      expect(await topbar.boundingBox()).toEqual(before);
      expect(await page.evaluate(() => window.scrollY)).toBe(0);
      if (viewport.width > 760) {
        const box = (await sidebar.boundingBox())!;
        expect(box.y).toBe(0);
        expect(box.height).toBe(viewport.height);
        await expect(sidebar.locator(".brand")).toBeVisible();
        await expect(sidebar.locator(".profile")).toBeVisible();
      }
      const violations = (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations;
      expect(
        violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
            data: n.any.map((check) => check.data),
          })),
        })),
      ).toEqual([]);
    });
  }
}
test("skip link targets independently scrolling content", async ({ page }) => {
  await page.goto("/?view=crm");
  await page.getByRole("heading", { name: /Client management/ }).waitFor();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
});
