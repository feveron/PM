import { test, expect } from "@playwright/test";

test("user can add task", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await page.fill("input", "My E2E Task");
  await page.click("button:has-text('Add')");

  await expect(page.locator("text=My E2E Task")).toBeVisible();
});

test("user can filter completed tasks", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await page.fill("input", "Task A");
  await page.click("button:has-text('Add')");

  await page.fill("input", "Task B");
  await page.click("button:has-text('Add')");

  // відмічаємо першу таску
  const checkbox = page.locator('[data-testid="todo-checkbox"]').first();
  await checkbox.click();

  // фільтр Done
  await page.click("button:has-text('Done')");

  await expect(page.locator("text=Task A")).toBeVisible();
  await expect(page.locator("text=Task B")).not.toBeVisible();
});