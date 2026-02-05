// Manual test script to verify auto-remove functionality
// Run with: node test-auto-remove-manual.js

const BASE_URL = 'http://localhost:3000';

async function testAutoRemove() {
  console.log('🧪 Testing Auto-Remove Feature\n');

  // This is a manual test - you'll need to:
  // 1. Create a room manually in the browser
  // 2. Add 3 videos to the queue
  // 3. Note the room ID and stream IDs
  // 4. Update the variables below
  // 5. Run this script

  const ROOM_ID = 'YOUR_ROOM_ID_HERE';
  const STREAM_ID_1 = 'FIRST_VIDEO_STREAM_ID';
  const STREAM_ID_2 = 'SECOND_VIDEO_STREAM_ID';
  const AUTH_COOKIE = 'YOUR_AUTH_COOKIE_HERE';

  console.log('📋 Test Setup:');
  console.log(`   Room ID: ${ROOM_ID}`);
  console.log(`   Stream 1: ${STREAM_ID_1}`);
  console.log(`   Stream 2: ${STREAM_ID_2}\n`);

  // Test 1: Play endpoint should remove previous stream
  console.log('Test 1: Playing second video (should remove first from queue)');

  try {
    const playResponse = await fetch(`${BASE_URL}/api/rooms/${ROOM_ID}/streams/${STREAM_ID_2}/play`, {
      method: 'PUT',
      headers: {
        'Cookie': AUTH_COOKIE,
        'Content-Type': 'application/json'
      }
    });

    const playData = await playResponse.json();
    console.log(`   ✓ Play API response:`, playData.success ? '✅ Success' : '❌ Failed');

    // Check if first stream still exists
    const roomResponse = await fetch(`${BASE_URL}/api/rooms/${ROOM_ID}`, {
      headers: { 'Cookie': AUTH_COOKIE }
    });

    const roomData = await roomResponse.json();
    const streams = roomData.data?.streams || [];

    const firstStreamExists = streams.some(s => s.streamId === STREAM_ID_1);
    console.log(`   First stream in queue: ${firstStreamExists ? '❌ STILL EXISTS (BUG!)' : '✅ REMOVED (CORRECT!)'}`);
    console.log(`   Current queue size: ${streams.length} videos\n`);

  } catch (error) {
    console.error('   ❌ Error:', error.message);
  }

  console.log('\n💡 To run this test:');
  console.log('1. Open http://localhost:3000 in your browser');
  console.log('2. Create a room and add 3 videos');
  console.log('3. Open browser DevTools → Application → Cookies');
  console.log('4. Copy the auth cookie value');
  console.log('5. Get room ID from URL and stream IDs from Network tab');
  console.log('6. Update variables in this script');
  console.log('7. Run: node test-auto-remove-manual.js');
}

// Check if running in Node.js environment
if (typeof fetch === 'undefined') {
  console.log('❌ This script requires Node.js 18+ with native fetch support');
  console.log('   Or run: npm install node-fetch');
  process.exit(1);
}

testAutoRemove().catch(console.error);
