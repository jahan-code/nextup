/**
 * YouTube IFrame Player API Loader Utility
 * 
 * Provides a singleton pattern for loading and initializing the YouTube IFrame Player API.
 * Handles script injection, ready state detection, error handling, and retries.
 * 
 * @see https://developers.google.com/youtube/iframe_api_reference
 */

import type { YouTube } from '@/src/types/youtube';

import {
  logDebug,
  updateDebugStatus,
  updateAttempts,
  runDiagnostics,
  testYouTubeConnectivity
} from './youtube-debug.utils';

let isLoading = false;
let isLoaded = false;
const loadCallbacks: Array<() => void> = [];
const errorCallbacks: Array<(error: Error) => void> = [];
let retryCount = 0;
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;

/**
 * Load the YouTube IFrame Player API script with retry logic
 * @returns Promise that resolves when the API is ready
 */
export const loadYouTubeAPI = (): Promise<YouTube> => {
  return new Promise((resolve, reject) => {
    // Already loaded
    if (isLoaded && window.YT && window.YT.Player) {
      logDebug('info', 'API already loaded (cached)');
      updateDebugStatus('loaded');
      resolve(window.YT);
      return;
    }

    // Add to callback queue
    loadCallbacks.push(() => {
      if (window.YT && window.YT.Player) {
        resolve(window.YT);
      } else {
        const error = new Error('YouTube API loaded but YT.Player not available');
        logDebug('error', error.message);
        reject(error);
      }
    });

    errorCallbacks.push(reject);

    // Already loading, wait for callbacks
    if (isLoading) {
      logDebug('info', 'Already loading, waiting for callbacks...');
      return;
    }

    isLoading = true;
    updateDebugStatus('loading');
    logDebug('info', 'Starting load process...');

    // Try loading the API
    attemptLoad();
  });
};

/**
 * Attempt to load the API script
 */
const attemptLoad = () => {
  updateAttempts(retryCount + 1);

  // Check if script already exists
  const existingScript = document.querySelector('script[src*="youtube.com/iframe_api"]');
  if (existingScript) {
    logDebug('info', 'Script already in DOM, waiting for ready callback...');
    window.onYouTubeIframeAPIReady = handleAPIReady;

    // Set a timeout in case the script loaded but callback never fired
    setTimeout(() => {
      if (!isLoaded && window.YT && window.YT.Player) {
        logDebug('warn', 'Script loaded but callback not fired, calling manually');
        handleAPIReady();
      } else if (!isLoaded) {
        logDebug('warn', 'Script in DOM but API not ready after timeout');
        runDiagnostics();
      }
    }, 3000);
    return;
  }

  logDebug('info', 'Creating and injecting script tag...');

  // Create and inject script
  const script = document.createElement('script');
  script.src = 'https://www.youtube.com/iframe_api';
  script.async = true;
  script.defer = true;
  script.id = 'youtube-iframe-api';

  script.onerror = (event) => {
    logDebug('error', 'Script load error event received');
    isLoading = false;
    updateDebugStatus('error', 'Script load failed');

    // Run diagnostics immediately to catch network blocks
    if (retryCount === 0) {
      testYouTubeConnectivity();
    }

    // Retry logic
    if (retryCount < MAX_RETRIES) {
      retryCount++;
      logDebug('warn', `Retrying (${retryCount}/${MAX_RETRIES}) in ${RETRY_DELAY}ms...`);

      // Remove failed script
      script.remove();

      // Retry after delay
      setTimeout(() => {
        isLoading = true;
        updateDebugStatus('loading');
        attemptLoad();
      }, RETRY_DELAY);
    } else {
      // Max retries reached
      const error = new Error(
        'Failed to load YouTube IFrame API script after multiple attempts. ' +
        'Please check your internet connection, disable ad blockers for this site, ' +
        'or try refreshing the page.'
      );
      logDebug('error', `Max retries reached: ${error.message}`);

      // Run final diagnostics including connectivity
      testYouTubeConnectivity();
      runDiagnostics();

      errorCallbacks.forEach(cb => cb(error));
      errorCallbacks.length = 0;
      loadCallbacks.length = 0;
      retryCount = 0;
    }
  };

  script.onload = () => {
    logDebug('info', 'Script tag loaded successfully');
    runDiagnostics();
  };

  // Define the global callback that YouTube API will call
  window.onYouTubeIframeAPIReady = handleAPIReady;

  // Inject script into document
  try {
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
      logDebug('info', 'Script injected into DOM');
    } else {
      document.head.appendChild(script);
      logDebug('info', 'Script appended to head');
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    logDebug('error', `Error injecting script: ${msg}`);
    const injectionError = new Error(`Failed to inject YouTube API script: ${msg}`);
    errorCallbacks.forEach(cb => cb(injectionError));
    errorCallbacks.length = 0;
    loadCallbacks.length = 0;
    isLoading = false;
    updateDebugStatus('error', msg);
  }
};

/**
 * Handler called by YouTube API when ready
 */
const handleAPIReady = () => {
  logDebug('info', 'onYouTubeIframeAPIReady callback fired');
  isLoaded = true;
  isLoading = false;
  retryCount = 0;
  updateDebugStatus('loaded');

  // Execute all pending callbacks
  loadCallbacks.forEach(cb => {
    try {
      cb();
    } catch (error) {
      logDebug('error', `Error in ready callback: ${error}`);
    }
  });

  // Clear callback queues
  loadCallbacks.length = 0;
  errorCallbacks.length = 0;
};

/**
 * Check if YouTube API is already loaded
 */
export const isYouTubeAPILoaded = (): boolean => {
  return !!(window.YT && window.YT.Player && isLoaded);
};

/**
 * Get player state name from state number
 */
export const getPlayerStateName = (state: number): string => {
  switch (state) {
    case -1: return 'UNSTARTED';
    case 0: return 'ENDED';
    case 1: return 'PLAYING';
    case 2: return 'PAUSED';
    case 3: return 'BUFFERING';
    case 5: return 'CUED';
    default: return 'UNKNOWN';
  }
};

/**
 * Get error message from error code
 */
export const getPlayerErrorMessage = (errorCode: number): string => {
  switch (errorCode) {
    case 2:
      return 'Invalid parameter value';
    case 5:
      return 'HTML5 player error';
    case 100:
      return 'Video not found or has been removed';
    case 101:
    case 150:
      return 'Video owner does not allow embedding';
    default:
      return `Unknown error (code: ${errorCode})`;
  }
};

