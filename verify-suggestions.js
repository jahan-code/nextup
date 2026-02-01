const youtubesearchapi = require("youtube-search-api");

async function run() {
  const videoId = "5qap5aO4i9A";
  console.log(`Fetching details for ${videoId}...`);
  try {
    const details = await youtubesearchapi.GetVideoDetails(videoId);
    console.log("Details title:", details.title);

    if (details.suggestion && details.suggestion.length > 0) {
      console.log(`Found ${details.suggestion.length} suggestions via GetVideoDetails.`);
    } else {
      console.log("No suggestions via GetVideoDetails. Attempting fallback search...");
      if (details.title) {
        const searchResults = await youtubesearchapi.GetListByKeyword(details.title, false, 10);
        console.log(`Fallback search found ${searchResults.items.length} items.`);
        console.log("First item:", searchResults.items[0]);
      } else {
        console.log("Cannot fallback: No title found.");
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

run();
