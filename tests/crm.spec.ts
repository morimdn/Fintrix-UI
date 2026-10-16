import { test, expect } from "@playwright/test";
test("client workflow, themes, columns, sorting and real screenshots", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /Client management/ }),
  ).toBeVisible();
  await page.screenshot({
    path: "docs/screenshots/crm-light.png",
    fullPage: true,
  });
  await page
    .getByRole("textbox", { name: "Search clients" })
    .fill("Olivia Rhye");
  await expect(page.getByRole("button", { name: /Olivia Rhye/ })).toHaveCount(
    1,
  );
  await expect(page.getByText("Phoenix Baker")).toHaveCount(0);
  await page.getByRole("button", { name: /Olivia Rhye/ }).click();
  await page.getByRole("textbox", { name: "Full name" }).fill("Olivia Updated");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page
    .getByRole("textbox", { name: "Search clients" })
    .fill("Olivia Updated");
  await expect(
    page.getByRole("button", { name: /Olivia Updated/ }),
  ).toBeVisible();
  await page.getByRole("textbox", { name: "Search clients" }).fill("");
  await page.getByRole("button", { name: "Customize columns" }).click();
  await page.getByRole("checkbox", { name: "Manager", exact: true }).uncheck();
  await page.getByRole("button", { name: "Move tier left" }).click();
  await page.getByRole("button", { name: "Customize columns" }).click();
  await expect(page.getByRole("columnheader", { name: /Manager/ })).toHaveCount(
    0,
  );
  await page.getByRole("slider", { name: "Resize balance column" }).fill("220");
  await page.getByRole("columnheader", { name: /Wallet balance/ }).click();
  await expect(page.locator("th[aria-sort]")).toHaveAttribute(
    "aria-sort",
    "ascending",
  );
  await page.getByTitle("2", { exact: true }).click();
  await expect(page.getByTitle("2", { exact: true })).toHaveClass(
    /ant-pagination-item-active/,
  );
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await page.getByText("Compact", { exact: true }).click();
  await expect(page.locator(".fintrix-root")).toHaveAttribute(
    "data-density",
    "compact",
  );
  await page.screenshot({
    path: "docs/screenshots/crm-dark-compact.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Add client" }).click();
  await page.getByRole("button", { name: "Create client" }).click();
  await expect(page.getByText("Enter a full name")).toBeVisible();
  await page.screenshot({
    path: "docs/screenshots/client-modal-dark.png",
    fullPage: true,
  });
  await page.getByRole("textbox", { name: "Full name" }).fill("Taylor Demo");
  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("taylor@example.com");
  await page.getByRole("combobox", { name: "Country", exact: true }).click();
  await page
    .locator(".ant-select-item-option-content")
    .filter({ hasText: /^Canada$/ })
    .click();
  await page.getByRole("button", { name: "Create client" }).click();
  await page
    .getByRole("textbox", { name: "Search clients" })
    .fill("Taylor Demo");
  await expect(page.getByRole("button", { name: /Taylor Demo/ })).toBeVisible();
  await page.getByRole("button", { name: /Design system/ }).click();
  await page.screenshot({
    path: "docs/screenshots/showcase-dark.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await page.screenshot({
    path: "docs/screenshots/showcase-light.png",
    fullPage: true,
  });
});
test("mobile table scroll and filters", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("combobox", { name: "Filter status" }).click();
  await page.getByTitle("Pending", { exact: true }).click();
  await expect(
    page.locator(".client-link").filter({ hasText: "Demi Wilkinson" }),
  ).toBeVisible();
  await page.getByRole("combobox", { name: "Filter KYC" }).click();
  await page.getByTitle("Verified", { exact: true }).click();
  await expect(page.locator(".ant-empty-description")).toBeVisible();
  await page.keyboard.press("Escape");
  await page.getByRole("combobox", { name: "Filter status" }).click();
  await page.getByTitle("All statuses", { exact: true }).click();
  await page.getByRole("combobox", { name: "Filter KYC" }).click();
  await page.getByTitle("All KYC", { exact: true }).click();
  await page.keyboard.press("Escape");
  await expect(page.locator(".client-link").first()).toBeVisible();
  await page.getByRole("heading",{name:"Client directory"}).click();
  await expect(page.locator(".ant-select-dropdown:visible")).toHaveCount(0);
  await page.screenshot({
    path: "docs/screenshots/mobile.png",
    fullPage: true,
  });
});
