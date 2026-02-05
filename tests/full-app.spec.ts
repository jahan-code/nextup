import { test, expect } from '@playwright/test';

// Helper for generating unique emails
const generateTestEmail = () => `test-${Date.now()}@example.com`;
const TEST_PASSWORD = 'Password123!';

test.describe('NextUp Full App Journey', () => {
  let userEmail: string;

  test.beforeAll(async () => {
    userEmail = generateTestEmail();
  });

  test('should complete the full user journey: signup -> create room -> add stream -> interaction', async ({ page }) => {
    // 1. Signup Flow
    console.log('Starting Signup Flow...');
    await page.goto('/signup');

    // Wait for the heading
    await expect(page.getByRole('heading', { name: /Create Account/i })).toBeVisible();

    await page.getByLabel(/Email/i).fill(userEmail);
    // Use nth(0) for first password field and nth(1) for confirm password if labels are ambiguous
    await page.locator('input[type="password"]').nth(0).fill(TEST_PASSWORD);
    await page.locator('input[type="password"]').nth(1).fill(TEST_PASSWORD);

    await page.getByRole('button', { name: /Create Account/i }).click();

    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15000 });
    console.log('Signup successful, redirected to dashboard.');

    // 2. Dashboard Interaction
    console.log('Interacting with Dashboard...');
    // Updated Heading: "My Dashboard"
    await expect(page.getByRole('heading', { name: /My Dashboard/i })).toBeVisible({ timeout: 15000 });

    // 3. Create Room Flow
    console.log('Creating a Room...');
    await page.getByRole('button', { name: /Create Room/i }).click();
    await expect(page).toHaveURL(/\/rooms\/create/);

    const roomName = `Test Room ${Date.now()}`;
    await page.getByLabel(/Room Name/i).fill(roomName);
    await page.getByLabel(/Description/i).fill('This is a test room for Playwright E2E tests.');

    // Use a longer timeout for the "Creating..." state to transition
    console.log('Submitting room creation form...');
    await page.getByRole('button', { name: /Create Room/i }).click();

    // 4. Stream Selection (The "Smooth" experience part)
    console.log('Waiting for stream selection modal...');
    // Increase timeout to 30s as Ably broadcast + DB ops might be slow
    await expect(page.getByRole('heading', { name: /Add Your First Stream/i })).toBeVisible({ timeout: 30000 });

    // Search for a video
    console.log('Searching for video...');
    await page.getByPlaceholder(/Search YouTube videos.../i).fill('never gonna give you up');
    await page.getByRole('button', { name: /Search/i }).click();

    // Wait for the specific result and its 'Add & Play' button
    console.log('Waiting for search results and interactive button...');
    const resultItem = page.locator('div:has(h4:has-text("Rick Astley - Never Gonna Give You Up"))').first();
    await expect(resultItem).toBeVisible({ timeout: 20000 });

    // Simply wait for the button to be enabled and then click
    const addBtn = resultItem.getByRole('button', { name: /Add & Play/i });
    await expect(addBtn).toBeEnabled({ timeout: 10000 });
    await addBtn.click();

    // Should redirect to the room page
    await expect(page).toHaveURL(/\/rooms\/.+/, { timeout: 20000 });
    console.log('Room created and stream added successfully.');

    // 5. Room Interaction & Smooth Experience
    console.log('Verifying Room Interaction...');
    await expect(page.getByRole('heading', { name: roomName })).toBeVisible();

    // Verify YouTube player is present
    const player = page.locator('#player');
    await expect(player).toBeVisible();

    // Verify Chat functionality (smooth transitions)
    const chatInput = page.getByPlaceholder(/Type a message.../i);
    // Be careful with visibility check if it's dynamic
    await expect(chatInput).toBeVisible({ timeout: 10000 });
    await chatInput.fill('Hello from Playwright!');
    await page.keyboard.press('Enter');
    await expect(page.locator('div:has-text("Hello from Playwright!")')).toBeVisible();

    console.log('Full app journey completed successfully!');
  });
});
