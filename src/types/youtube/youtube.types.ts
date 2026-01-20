export interface YouTubeVideo {
  id: string;
  title: string;
  url: string;
  extractedId: string;
  thumbnail: string;
  channelTitle: string;
  duration: string;
}

export interface YouTubeSearchResponse {
  videos: YouTubeVideo[];
}

export interface YouTubeRelatedResponse {
  videos: YouTubeVideo[];
}

