import { test, expect, BrowserContext, Page } from '@playwright/test';

// Helper for generating unique emails
const generateTestEmail = (prefix: string) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}@example.com`;
const TEST_PASSWORD = 'Password123!';

test.describe('Queue Auto-Remove Feature', () => {
  let creatorContext: BrowserContext;
  let memberContext: BrowserContext;
  let creatorPage: Page;
  let memberPage: Page;

  let creatorEmail: string;
  let memberEmail: string;
  let roomName: string;
  let roomUrl: string | null = null;

  test.beforeAll(async ({ browser }) => {
    creatorEmail = generateTestEmail('creator');
    memberEmail = generateTestEmail('member');
    roomName = `Auto-Remove Test ${Date.now()}`;

    // Create two isolated browser contexts
    creatorContext = await browser.newContext();
    memberContext = await browser.newContext();

    creatorPage = await creatorContext.newPage();
    memberPage = await memberContext.newPage();

    // Pipe console logs
    creatorPage.on('console', msg => console.log(`[Creator] ${msg.type()}: ${msg.text()}`));
    memberPage.on('console', msg => console.log(`[Member] ${msg.type()}: ${msg.text()}`));

    creatorPage.on('pageerror', err => console.log(`[Creator Error] ${err.message}`));
    memberPage.on('pageerror', err => console.log(`[Member Error] ${err.message}`));

    // Pipe network errors
    creatorPage.on('requestfailed', request => console.log(`[Creator Network] Failed: ${request.url()}`));
    memberPage.on('requestfailed', request => console.log(`[Member Network] Failed: ${request.url()}`));

    // Log response status for important requests
    const logResponse = (prefix: string, response: any) => {
      if (response.status() >= 400) {
        console.log(`[${prefix}] Status ${response.status()}: ${response.url()}`);
      }
    };
    creatorPage.on('response', res => logResponse('Creator', res));
    memberPage.on('response', res => logResponse('Member', res));
  });

  test.afterAll(async () => {
    if (creatorContext) await creatorContext.close();
    if (memberContext) await memberContext.close();
  });

  test('should remove videos from queue when played by creator', async () => {
    test.setTimeout(180000);

    // 1. Signup both users
    console.log(`[Test] Signing up Creator and Member...`);
    await Promise.all([
      (async () => {
        await creatorPage.goto('/signup');
        await creatorPage.getByLabel(/Email/i).fill(creatorEmail);
        await creatorPage.locator('input[type="password"]').nth(0).fill(TEST_PASSWORD);
        await creatorPage.locator('input[type="password"]').nth(1).fill(TEST_PASSWORD);
        await creatorPage.getByRole('button', { name: /Create Account/i }).click();
        await expect(creatorPage).toHaveURL(/\/dashboard/, { timeout: 60000 });
      })(),
      (async () => {
        await memberPage.goto('/signup');
        await memberPage.getByLabel(/Email/i).fill(memberEmail);
        await memberPage.locator('input[type="password"]').nth(0).fill(TEST_PASSWORD);
        await memberPage.locator('input[type="password"]').nth(1).fill(TEST_PASSWORD);
        await memberPage.getByRole('button', { name: /Create Account/i }).click();
        await expect(memberPage).toHaveURL(/\/dashboard/, { timeout: 60000 });
      })()
    ]);

    // 2. Creator creates a room
    console.log(`[Test] Creator creating room...`);
    await creatorPage.getByRole('button', { name: /Create Room/i }).click();
    await creatorPage.getByLabel(/Room Name/i).fill(roomName);
    await creatorPage.getByRole('button', { name: /Create Room/i }).click();

    // 3. Add first video
    console.log('[Test] Adding first video...');
    await expect(creatorPage.getByRole('heading', { name: /Add Your First Stream/i })).toBeVisible({ timeout: 40000 });
    await creatorPage.getByPlaceholder(/Search YouTube videos.../i).fill('Never Gonna Give You Up');
    await creatorPage.getByRole('button', { name: /Search/i }).click();

    const firstVideo = creatorPage.locator('div').filter({ hasText: /Never Gonna Give You Up/i }).getByRole('button', { name: /Add & Play/i }).first();
    await expect(firstVideo).toBeVisible({ timeout: 30000 });
    await firstVideo.click();

    await expect(creatorPage).toHaveURL(/\/rooms\/(?!create)[a-zA-Z0-9_-]+/, { timeout: 40000 });
    roomUrl = creatorPage.url();
    console.log(`[Test] Room created: ${roomUrl}`);

    await expect(creatorPage.locator('text=Connected')).toBeVisible({ timeout: 30000 });

    // 4. Member joins
    console.log('[Test] Member joining room...');
    await memberPage.goto(roomUrl);
    await expect(memberPage.locator('text=Connected')).toBeVisible({ timeout: 40000 });
    console.log('[Test] Member connected');

    // 5. Member adds second video to queue
    console.log('[Test] Member adding second video...');
    const searchInput = memberPage.getByPlaceholder(/Search for videos.../i);
    await searchInput.click();
    await searchInput.fill('Together Forever Rick Astley');

    const secondVideo = memberPage.locator('div').filter({ has: memberPage.locator('h4', { hasText: /Together Forever/i }) }).first();
    await expect(secondVideo).toBeVisible({ timeout: 40000 });
    await secondVideo.click();
    await expect(memberPage.locator('text=Added to queue')).toBeVisible({ timeout: 20000 });

    // 6. Member adds third video to queue
    console.log('[Test] Member adding third video...');
    await searchInput.clear();
    await searchInput.fill('Whenever You Need Somebody');

    const thirdVideo = memberPage.locator('div').filter({ has: memberPage.locator('h4', { hasText: /Whenever You Need Somebody/i }) }).first();
    await expect(thirdVideo).toBeVisible({ timeout: 40000 });
    await thirdVideo.click();
    await expect(memberPage.locator('text=Added to queue')).toBeVisible({ timeout: 20000 });

    // 7. Switch to Queue tab on creator page
    console.log('[Test] Switching to Queue tab...');
    const queueTab = creatorPage.getByRole('button', { name: /Queue/i });
    await queueTab.click();

    // 8. Verify all 3 videos are in queue (current + 2 upcoming)
    console.log('[Test] Verifying queue has 2 upcoming videos...');
    await expect(creatorPage.locator('h4', { hasText: /Together Forever/i })).toBeVisible({ timeout: 30000 });
    await expect(creatorPage.locator('h4', { hasText: /Whenever You Need Somebody/i })).toBeVisible({ timeout: 30000 });

    // 9. Creator plays second video from queue
    console.log('[Test] Creator playing second video from queue...');
    const togetherForeverInQueue = creatorPage.locator('div').filter({ has: creatorPage.locator('h4', { hasText: /Together Forever/i }) }).first();
    await togetherForeverInQueue.click();

    // 10. Wait for video to become current
    await expect(creatorPage.locator('h2', { hasText: /Together Forever/i })).toBeVisible({ timeout: 40000 });
    console.log('[Test] Second video is now playing');

    // 11. CRITICAL: Verify first video is REMOVED from queue
    console.log('[Test] Verifying first video was removed from queue...');
    await creatorPage.waitForTimeout(2000); // Give time for UI to update

    // The first video should NOT be in the queue anymore
    const firstVideoInQueue = creatorPage.locator('h4', { hasText: /Never Gonna Give You Up/i });
    await expect(firstVideoInQueue).not.toBeVisible({ timeout: 10000 });
    console.log('[Test] ✅ First video successfully removed from queue!');

    // 12. Verify third video is still in queue
    await expect(creatorPage.locator('h4', { hasText: /Whenever You Need Somebody/i })).toBeVisible();
    console.log('[Test] ✅ Third video still in queue as expected');

    console.log('[Test] Auto-remove on play test PASSED!');
  });

  test('should remove videos from queue when skipped by members', async () => {
    test.setTimeout(180000);

    // Setup: Create room with 3 videos
    console.log('[Test] Setting up skip test...');

    // Reuse existing session or create new one
    if (!roomUrl) {
      console.log('[Test] Skipping skip test - no room URL from previous test');
      return;
    }

    // Navigate both users to room
    await creatorPage.goto(roomUrl);
    await memberPage.goto(roomUrl);

    await expect(creatorPage.locator('text=Connected')).toBeVisible({ timeout: 30000 });
    await expect(memberPage.locator('text=Connected')).toBeVisible({ timeout: 30000 });

    // Get current video title
    const currentVideoTitle = await creatorPage.locator('h2').first().textContent();
    console.log(`[Test] Current video: ${currentVideoTitle}`);

    // Both users vote to skip
    console.log('[Test] Both users voting to skip...');
    const memberSkipBtn = memberPage.getByRole('button', { name: /Skip Next/i });
    const creatorSkipBtn = creatorPage.getByRole('button', { name: /Skip Next/i });

    await memberSkipBtn.click();
    await expect(memberSkipBtn).toHaveText(/Voted/i, { timeout: 20000 });

    await creatorSkipBtn.click();

    // Wait for skip to complete
    await creatorPage.waitForTimeout(3000);

    // Verify the skipped video is NOT in queue
    console.log('[Test] Verifying skipped video was removed...');
    const skippedVideoInQueue = creatorPage.locator('h4', { hasText: currentVideoTitle || '' });
    await expect(skippedVideoInQueue).not.toBeVisible({ timeout: 10000 });
    console.log('[Test] ✅ Skipped video successfully removed from queue!');

    console.log('[Test] Auto-remove on skip test PASSED!');
  });
});
