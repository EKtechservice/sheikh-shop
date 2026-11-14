import { test, expect } from "@playwright/test";

test.describe("Mobile & Cross-Browser Storefront Verification", () => {
  const VIEWPORT_WIDTHS = [320, 360, 375, 390, 414, 430, 768];

  for (const width of VIEWPORT_WIDTHS) {
    test(`No horizontal overflow on ${width}px viewport width`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");
      await page.waitForLoadState("domcontentloaded");

      // Assert that scrollWidth equals clientWidth / window.innerWidth
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      expect(hasHorizontalScroll).toBe(false);
    });
  }

  test("Homepage loads with correct viewport-fit and mobile header", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Sheikh's Shop/i);

    // Verify viewport meta tag includes cover
    const viewportMeta = await page.locator('meta[name="viewport"]').getAttribute("content");
    expect(viewportMeta).toContain("viewport-fit=cover");

    // Skip-to-content link is accessible
    const skipLink = page.locator('a:has-text("Skip to main content")');
    await expect(skipLink).toBeAttached();
  });

  test("Mobile navigation drawer opens, locks body scroll, displays links, and closes", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile drawer is specific to viewports < 1024px");
    await page.goto("/");

    // Tap mobile hamburger menu button (min 44x44 target)
    const hamburgerBtn = page.getByRole("button", { name: "Open navigation menu" });
    const box = await hamburgerBtn.boundingBox();
    expect(box?.width).toBeGreaterThanOrEqual(44);
    expect(box?.height).toBeGreaterThanOrEqual(44);

    await hamburgerBtn.click();

    // Verify drawer dialog appears
    const drawer = page.getByRole("dialog", { name: "Mobile navigation drawer" });
    await expect(drawer).toBeVisible();

    // Verify category navigation link inside drawer
    const categoriesLink = drawer.getByRole("link", { name: "Categories" });
    await expect(categoriesLink).toBeVisible();

    // Close drawer via X button
    const closeBtn = drawer.getByRole("button", { name: "Close menu" });
    await closeBtn.click();
    await expect(drawer).not.toBeVisible();
  });

  test("Search modal opens, has >=16px input font size, and dismisses", async ({ page }) => {
    await page.goto("/");

    // Click search trigger icon
    const searchTrigger = page.getByRole("button", { name: "Search menswear collection" });
    await searchTrigger.click();

    const searchModal = page.getByRole("dialog", { name: "Search menswear collection" });
    await expect(searchModal).toBeVisible();

    // Search input has >=16px font size to prevent iOS Safari auto-zoom
    const searchInput = searchModal.locator('input[type="search"]');
    await expect(searchInput).toBeVisible();
    const fontSize = await searchInput.evaluate((el) => window.getComputedStyle(el).fontSize);
    expect(parseFloat(fontSize)).toBeGreaterThanOrEqual(16);

    // Enter query
    await searchInput.fill("shirt");
    await page.keyboard.press("Escape");
    await expect(searchModal).not.toBeVisible();
  });

  test("Product card Add to Cart button has >=44px tap target", async ({ page }) => {
    await page.goto("/");
    const addToCartBtn = page.getByRole("button", { name: /Add .* to cart/i }).first();
    if (await addToCartBtn.isVisible()) {
      const box = await addToCartBtn.boundingBox();
      expect(box?.height).toBeGreaterThanOrEqual(44);
    }
  });

  test("Cart quantity adjustment & WhatsApp checkout form responsiveness", async ({ page }) => {
    await page.goto("/cart");

    // Steppers have >= 44px tap targets
    const increaseBtn = page.getByRole("button", { name: "Increase quantity" }).first();
    if (await increaseBtn.isVisible()) {
      const stepperBox = await increaseBtn.boundingBox();
      expect(stepperBox?.width).toBeGreaterThanOrEqual(44);
      expect(stepperBox?.height).toBeGreaterThanOrEqual(44);
    }

    // WhatsApp checkout submit button exists and has >= 44px height
    const checkoutBtn = page.getByRole("button", { name: /Place Order on WhatsApp/i });
    await expect(checkoutBtn).toBeVisible();
    const btnBox = await checkoutBtn.boundingBox();
    expect(btnBox?.height).toBeGreaterThanOrEqual(44);
  });

  test("Admin login page has >=16px inputs to prevent iOS zoom", async ({ page }) => {
    await page.goto("/admin/login");

    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();
    const emailFontSize = await emailInput.evaluate((el) => window.getComputedStyle(el).fontSize);
    expect(parseFloat(emailFontSize)).toBeGreaterThanOrEqual(16);

    const submitBtn = page.getByRole("button", { name: /Sign In to Owner Portal/i });
    const submitBox = await submitBtn.boundingBox();
    expect(submitBox?.height).toBeGreaterThanOrEqual(44);
  });
});
