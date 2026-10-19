import { test, expect } from "@playwright/test";

test("production project-site assets, catalog, docs and CRM survive navigation and reload", async ({
  page,
}) => {
  const failures: string[] = [];
  const assets = new Set<string>();
  page.on("pageerror", (error) => failures.push(error.message));
  page.on("requestfailed", (request) => failures.push(request.url()));
  page.on("response", (response) => {
    const url = new URL(response.url());
    if (url.origin !== "http://127.0.0.1:4173") return;
    if (response.status() >= 400)
      failures.push(`${response.status()} ${url.pathname}`);
    if (
      ["script", "stylesheet", "font"].includes(
        response.request().resourceType(),
      )
    ) {
      assets.add(url.pathname);
      if (!url.pathname.startsWith("/Techosoul-UI/assets/"))
        failures.push(`Asset outside project base: ${url.pathname}`);
      if ((response.headers()["content-type"] || "").includes("text/html"))
        failures.push(`HTML fallback for asset: ${url.pathname}`);
    }
  });
  await page.goto("./");
  await expect(page).toHaveTitle("Techosoul UI · React Design System");
  await expect(page.locator(".sidebar .brand")).toHaveText("Techosoul UI");
  for (const name of [
    "Foundations",
    "Core components",
    "Financial UI",
    "Iconography",
    "Documentation",
  ]) {
    await page.getByRole("tab", { name, exact: true }).click();
    await expect(page.getByRole("tab", { name, exact: true })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  }
  await page.goto("./#docs-getting-started");
  await page.reload();
  await expect(page.locator("#heading-getting-started")).toBeInViewport();
  await expect(
    page
      .getByRole("navigation", { name: "Documentation sections" })
      .getByRole("link"),
  ).toHaveCount(14);
  await expect(
    page.getByRole("link", { name: "Read repository documentation" }),
  ).toHaveAttribute(
    "href",
    "https://github.com/morimdn/Techosoul-UI/tree/main/docs",
  );
  await page.goto("./?view=crm");
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Client management" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.getByText("Compact", { exact: true }).click();
  await expect(page.locator(".techosoul-root")).toHaveAttribute(
    "data-theme",
    "dark",
  );
  await expect(page.locator(".techosoul-root")).toHaveAttribute(
    "data-density",
    "compact",
  );
  await page
    .getByRole("button", { name: "Design system", exact: true })
    .click();
  await expect(
    page.getByRole("tab", { name: "Foundations", exact: true }),
  ).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  expect([...assets].some((path) => path.endsWith(".woff2"))).toBe(true);
  expect([...assets].some((path) => path.endsWith(".css"))).toBe(true);
  expect(
    [...assets].filter((path) => path.endsWith(".js")).length,
  ).toBeGreaterThan(2);
  expect(failures).toEqual([]);
});
