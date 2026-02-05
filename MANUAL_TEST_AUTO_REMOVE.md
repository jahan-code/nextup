# Manual Testing Guide for Auto-Remove Feature

## Setup
1. Open http://localhost:3000 in your browser
2. Open DevTools Console (F12 → Console tab)
3. Keep the Network tab open to monitor API calls

## Test 1: Auto-Remove on Play

### Steps:
1. **Create a room** and add 3 videos:
   - Video A: "Never Gonna Give You Up"
   - Video B: "Together Forever"
   - Video C: "Whenever You Need Somebody"

2. **Verify initial state:**
   - Video A should be currently playing
   - Open the "Queue" tab in the sidebar
   - You should see Videos B and C in the queue

3. **Play Video B from queue:**
   - Click on "Together Forever" in the Queue tab
   - Watch the Network tab for: `PUT /api/rooms/[id]/streams/[streamId]/play`

4. **Expected Results:**
   ✅ Video B starts playing (becomes the current video)
   ✅ Video A **disappears** from the Queue tab
   ✅ Only Video C remains in the queue
   ✅ No errors in console

5. **Check Console for:**
   ```
   [Ably] Room updated
   [API] Play response: { success: true, ... }
   ```

## Test 2: Auto-Remove on Skip

### Steps:
1. **Setup:** Have at least 2 users in the room (Creator + 1 Member)
   - Open room in two different browsers or incognito windows
   - Make sure both are connected (see "Connected" status)

2. **Current state:**
   - Video B is playing
   - Video C is in the queue

3. **Both users vote to skip:**
   - Click "Skip Next" button on both browsers
   - Watch for: `POST /api/rooms/[id]/streams/[streamId]/skip`

4. **Expected Results:**
   ✅ Video C starts playing automatically
   ✅ Video B **disappears** from the Queue tab
   ✅ Queue is now empty (or shows next videos if you added more)
   ✅ No errors in console

5. **Check Console for:**
   ```
   [Ably] Skip vote registered
   [Ably] Room updated - new current stream
   [API] Skip response: { shouldSkip: true, nextStreamId: "..." }
   ```

## Debugging Tips

### If videos are NOT being removed:

1. **Check Network Tab:**
   - Look for the DELETE request to `/api/rooms/[id]/streams/[streamId]`
   - If missing, the deletion logic isn't executing

2. **Check Console Errors:**
   - Look for any red error messages
   - Common issues: "Failed to delete stream", "Permission denied"

3. **Check API Response:**
   - In Network tab, click on the play/skip request
   - Check the Response tab - should show `success: true`

4. **Verify Database:**
   - After playing/skipping, refresh the page
   - The removed video should NOT reappear in the queue

### Console Commands for Debugging:

```javascript
// Get current room data
fetch('/api/rooms/YOUR_ROOM_ID')
  .then(r => r.json())
  .then(d => console.log('Room streams:', d.data.streams));

// Check how many streams are in the queue
fetch('/api/rooms/YOUR_ROOM_ID')
  .then(r => r.json())
  .then(d => console.log('Queue size:', d.data.streams.length));
```

## Success Criteria

- ✅ Playing a video from queue removes the previously playing video
- ✅ Skipping a video removes it from the queue
- ✅ Queue only shows upcoming videos, not played/skipped ones
- ✅ No console errors during the process
- ✅ Changes persist after page refresh

## Report Issues

If you find any issues, note:
1. Which test failed (Play or Skip)
2. Console error messages
3. Network tab errors (status codes, response bodies)
4. Whether the video was removed from UI but still in database (check after refresh)
