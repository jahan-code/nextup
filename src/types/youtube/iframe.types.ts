// YouTube IFrame Player API types
// Official API documentation: https://developers.google.com/youtube/iframe_api_reference

export interface YouTubePlayer {
  // Playback controls
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;

  // Playback status
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  getPlaybackRate: () => number;
  setPlaybackRate: (suggestedRate: number) => void;
  getAvailablePlaybackRates: () => number[];

  // Volume controls
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  setVolume: (volume: number) => void;
  getVolume: () => number;

  // Video information
  getVideoUrl: () => string;
  getVideoEmbedCode: () => string;

  // Playlist controls (if applicable)
  nextVideo?: () => void;
  previousVideo?: () => void;
  getPlaylist?: () => string[];
  getPlaylistIndex?: () => number;

  // Cleanup
  destroy: () => void;

  // DOM access
  getIframe: () => HTMLIFrameElement;
}

export interface YouTubePlayerEvent {
  target: YouTubePlayer;
  data: number;
}

export interface YouTubePlayerError {
  target: YouTubePlayer;
  data: number; // Error code: 2, 5, 100, 101, 150
}

export interface YouTubePlayerOptions {
  videoId?: string;
  width?: number | string;
  height?: number | string;
  playerVars?: {
    autoplay?: 0 | 1;
    cc_load_policy?: 0 | 1;
    color?: 'red' | 'white';
    controls?: 0 | 1;
    disablekb?: 0 | 1;
    enablejsapi?: 0 | 1;
    end?: number;
    fs?: 0 | 1;
    hl?: string;
    iv_load_policy?: 1 | 3;
    list?: string;
    listType?: 'playlist' | 'search' | 'user_uploads';
    loop?: 0 | 1;
    modestbranding?: 0 | 1;
    origin?: string;
    playlist?: string;
    playsinline?: 0 | 1;
    rel?: 0 | 1;
    start?: number;
    widget_referrer?: string;
  };
  events?: {
    onReady?: (event: YouTubePlayerEvent) => void;
    onStateChange?: (event: YouTubePlayerEvent) => void;
    onPlaybackQualityChange?: (event: YouTubePlayerEvent) => void;
    onPlaybackRateChange?: (event: YouTubePlayerEvent) => void;
    onError?: (event: YouTubePlayerError) => void;
    onApiChange?: (event: YouTubePlayerEvent) => void;
  };
}

// Player states
export enum PlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  CUED = 5,
}

// Error codes
export enum PlayerError {
  INVALID_PARAM = 2,
  HTML5_ERROR = 5,
  VIDEO_NOT_FOUND = 100,
  VIDEO_NOT_EMBEDDABLE = 101,
  VIDEO_NOT_EMBEDDABLE_IN_DISGUISE = 150,
}

export interface YouTubePlayerState {
  UNSTARTED: number;
  ENDED: number;
  PLAYING: number;
  PAUSED: number;
  BUFFERING: number;
  CUED: number;
}

export interface YouTube {
  Player: new (
    elementId: string | HTMLElement,
    options: YouTubePlayerOptions
  ) => YouTubePlayer;
  PlayerState: YouTubePlayerState;
  loaded: number;
}

declare global {
  interface Window {
    YT?: YouTube;
    onYouTubeIframeAPIReady?: () => void;
  }
}
