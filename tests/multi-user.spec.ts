import { test, expect, BrowserContext, Page } from '@playwright/test';

// Helper for generating unique emails
const generateTestEmail = (prefix: string) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}@example.com`;
const TEST_PASSWORD = 'Password123!';

test.describe('NextUp Multi-User Synchronization', () => {
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
    roomName = `Sync Test Room ${Date.now()}`;

    // Create two isolated browser contexts
    creatorContext = await browser.newContext();
    memberContext = await browser.newContext();

    creatorPage = await creatorContext.newPage();
    memberPage = await memberContext.newPage();

    // Pipe console logs
    creatorPage.on('console', msg => console.log(`[Browser: Creator] ${msg.type()}: ${msg.text()}`));
    memberPage.on('console', msg => console.log(`[Browser: Member] ${msg.type()}: ${msg.text()}`));

    creatorPage.on('pageerror', err => console.log(`[Browser: Creator Error] ${err.message}`));
    memberPage.on('pageerror', err => console.log(`[Browser: Member Error] ${err.message}`));

    // Pipe network errors
    creatorPage.on('requestfailed', request => console.log(`[Network: Creator] Failed: ${request.url()} - ${request.failure()?.errorText}`));
    memberPage.on('requestfailed', request => console.log(`[Network: Member] Failed: ${request.url()} - ${request.failure()?.errorText}`));

    // Log response status for important requests
    const logResponse = (prefix: string, response: any) => {
      if (response.status() >= 400) {
        console.log(`[Network: ${prefix}] Status ${response.status()}: ${response.url()}`);
      }
    };
    creatorPage.on('response', res => logResponse('Creator', res));
    memberPage.on('response', res => logResponse('Member', res));

    // Warm up the server and check DB
    console.log('[Setup] Warming up server and checking DB...');
    try {
      await creatorPage.goto('/');
      await expect(creatorPage.getByRole('heading', { name: /NextUp/i })).toBeVisible({ timeout: 30000 });

      // Ping an API to ensure DB is awake
      const response = await creatorPage.request.get('/api/user');
      console.log(`[Setup] DB Check status: ${response.status()}`);
    } catch (err: any) {
      console.log(`[Setup] Warm-up warning: ${err.message || String(err)}`);
    }
  });

  test.afterAll(async () => {
    if (creatorContext) await creatorContext.close();
    if (memberContext) await memberContext.close();
  });

  test('should synchronize actions between Creator and Member in real-time', async () => {
    test.setTimeout(240000);

    // 1. Signup both users
    console.log(`[Flow] Signing up Creator (${creatorEmail}) and Member (${memberEmail})...`);
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
    console.log(`[Flow] Creator creating room: ${roomName}`);
    await creatorPage.getByRole('button', { name: /Create Room/i }).click();
    await creatorPage.getByLabel(/Room Name/i).fill(roomName);
    await creatorPage.getByRole('button', { name: /Create Room/i }).click();

    // Add first stream as Creator
    console.log('[Flow] Creator searching for first stream...');
    await expect(creatorPage.getByRole('heading', { name: /Add Your First Stream/i })).toBeVisible({ timeout: 40000 });
    await creatorPage.getByPlaceholder(/Search YouTube videos.../i).fill('Never Gonna Give You Up');
    await creatorPage.getByRole('button', { name: /Search/i }).click();

    console.log('[Flow] Waiting for search results...');
    const addAndPlayBtn = creatorPage.locator('div').filter({ hasText: /Never Gonna Give You Up/i }).getByRole('button', { name: /Add & Play/i }).first();
    await expect(addAndPlayBtn).toBeVisible({ timeout: 30000 });

    console.log('[Flow] Clicking Add & Play and waiting for redirect...');
    await addAndPlayBtn.click();

    await expect(creatorPage).toHaveURL(/\/rooms\/(?!create)[a-zA-Z0-9_-]+/, { timeout: 40000 });
    roomUrl = creatorPage.url();
    console.log(`[Flow] Room URL established: ${roomUrl}`);

    await expect(creatorPage.locator('text=Connected')).toBeVisible({ timeout: 30000 });
    console.log('[Flow] Creator connected to Ably.');

    // 3. Member joins
    console.log('[Flow] Member joining room...');
    await memberPage.goto(roomUrl);
    await memberPage.click('body');

    await expect(memberPage.getByRole('heading', { name: roomName })).toBeVisible({ timeout: 40000 });
    console.log('[Flow] Member sees room heading.');

    await expect(memberPage.locator('text=Connected')).toBeVisible({ timeout: 40000 });
    console.log('[Flow] Member connected to Ably.');

    console.log('[Flow] Waiting for Member YouTube player synchronization...');
    await expect(memberPage.locator('text=Synchronized')).toBeVisible({ timeout: 80000 });
    console.log('[Flow] Member YouTube player is synchronized.');

    // 4. Queue Sync
    console.log('[Flow] Member adds Together Forever to queue via Smart Suggestions...');
    await expect(memberPage.locator('text=Smart Suggestions')).toBeVisible({ timeout: 30000 });

    const searchInput = memberPage.getByPlaceholder(/Search for videos.../i);
    await searchInput.click();
    await searchInput.fill('Together Forever Rick Astley');

    const togetherItem = memberPage.locator('div').filter({ has: memberPage.locator('h4', { hasText: /Together Forever/i }) }).first();
    await expect(togetherItem).toBeVisible({ timeout: 40000 });

    console.log('[Flow] Clicking to add video...');
    await togetherItem.click();
    await expect(memberPage.locator('text=Added to queue')).toBeVisible({ timeout: 20000 });

    console.log('[Flow] Verifying Queue Sync on Creator page...');
    await expect(creatorPage.locator('h4', { hasText: /Together Forever/i })).toBeVisible({ timeout: 50000 });
    console.log('[Flow] Queue synced successfully.');

    // 5. Voting Sync
    console.log('[Flow] Testing Voting Sync...');
    await togetherItem.click();

    console.log('[Flow] Waiting for vote count update on Creator page...');
    const creatorVoteElement = creatorPage.locator('div').filter({ has: creatorPage.locator('h4', { hasText: /Together Forever/i }) }).locator('text=/^[12]$/');
    await expect(creatorVoteElement).toBeVisible({ timeout: 40000 });
    console.log('[Flow] Voting synced successfully.');

    // 6. Skip Next Sync
    console.log('[Flow] Testing Skip Next Sync...');
    const memberSkipBtn = memberPage.getByRole('button', { name: /Skip Next/i });
    await expect(memberSkipBtn).toBeVisible();
    await memberSkipBtn.click();
    await expect(memberSkipBtn).toHaveText(/Voted/i, { timeout: 20000 });

    console.log('[Flow] Verifying Skip progress for Creator...');
    await expect(creatorPage.locator('text=1 / 2')).toBeVisible({ timeout: 40000 });

    const creatorSkipBtn = creatorPage.getByRole('button', { name: /Skip Next/i });
    await creatorSkipBtn.click();

    console.log('[Flow] Verifying final transition to skipped stream...');
    await expect(creatorPage.locator('h2', { hasText: /Together Forever/i })).toBeVisible({ timeout: 60000 });
    await expect(memberPage.locator('h2', { hasText: /Together Forever/i })).toBeVisible({ timeout: 60000 });

    console.log('[Flow] Multi-user synchronization test completed successfully!');
  });
});
