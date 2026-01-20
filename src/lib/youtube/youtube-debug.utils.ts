/**
 * YouTube API Debug Utilities
 * 
 * Comprehensive diagnostics for YouTube IFrame API loading issues
 */

export interface YouTubeAPIDebugInfo {
  status: 'idle' | 'loading' | 'loaded' | 'error';
  attempts: number;
  maxAttempts: number;
  lastError: string | null;
  logs: Array<{
    timestamp: number;
    level: 'info' | 'warn' | 'error';
    message: string;
  }>;
  checks: {
    windowYT: boolean;
    windowYTPlayer: boolean;
    scriptInDOM: boolean;
    scriptLoaded: boolean;
    callbackDefined: boolean;
    networkBlocked: boolean | null;
  };
}

let debugInfo: YouTubeAPIDebugInfo = {
  status: 'idle',
  attempts: 0,
  maxAttempts: 3,
  lastError: null,
  logs: [],
  checks: {
    windowYT: false,
    windowYTPlayer: false,
    scriptInDOM: false,
    scriptLoaded: false,
    callbackDefined: false,
    networkBlocked: null,
  }
};

const debugListeners: Array<(info: YouTubeAPIDebugInfo) => void> = [];

/**
 * Subscribe to debug info updates
 */
export const subscribeToDebugInfo = (callback: (info: YouTubeAPIDebugInfo) => void) => {
  debugListeners.push(callback);
  // Immediately send current state
  callback({ ...debugInfo });

  return () => {
    const index = debugListeners.indexOf(callback);
    if (index > -1) {
      debugListeners.splice(index, 1);
    }
  };
};

/**
 * Log debug message
 */
export const logDebug = (level: 'info' | 'warn' | 'error', message: string) => {
  const logEntry = {
    timestamp: Date.now(),
    level,
    message,
  };

  debugInfo.logs.push(logEntry);

  // Keep only last 100 logs to prevent clearing important early history
  if (debugInfo.logs.length > 100) {
    debugInfo.logs.shift();
  }

  // Console log with appropriate level
  const consoleMessage = `[YouTube API Debug] ${message}`;
  switch (level) {
    case 'error':
      console.error(consoleMessage);
      break;
    case 'warn':
      console.warn(consoleMessage);
      break;
    default:
      console.log(consoleMessage);
  }

  notifyListeners();
};



/**
 * Update debug status
 */
export const updateDebugStatus = (
  status: YouTubeAPIDebugInfo['status'],
  error?: string
) => {
  debugInfo.status = status;
  if (error) {
    debugInfo.lastError = error;
  }
  notifyListeners();
};

/**
 * Update attempt count
 */
export const updateAttempts = (count: number) => {
  debugInfo.attempts = count;
  notifyListeners();
};

/**
 * Run diagnostic checks
 */
export const runDiagnostics = (notify: boolean = true): YouTubeAPIDebugInfo['checks'] => {
  const checks = {
    windowYT: !!(window.YT),
    windowYTPlayer: !!(window.YT && window.YT.Player),
    scriptInDOM: !!document.querySelector('script[src*="youtube.com/iframe_api"]'),
    scriptLoaded: false,
    callbackDefined: !!(window.onYouTubeIframeAPIReady),
    networkBlocked: debugInfo.checks.networkBlocked,
  };

  // Check if script loaded successfully
  const script = document.querySelector('script[src*="youtube.com/iframe_api"]') as HTMLScriptElement;
  if (script) {
    // Check script load state
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const scriptAny = script as any;
    checks.scriptLoaded = scriptAny.readyState === 'complete' || scriptAny.readyState === 'loaded';
  }

  debugInfo.checks = checks;

  if (notify) {
    notifyListeners();
  }

  return checks;
};
export const testYouTubeConnectivity = async (): Promise<boolean> => {
  try {
    const timestamp = Date.now();
    logDebug('info', `Testing YouTube connectivity (ts: ${timestamp})...`);

    // Try to fetch a YouTube resource with timestamp to bust cache
    // Using favicon.ico as it's small and typically not blocked by ad blockers specific to API
    await fetch(`https://www.youtube.com/favicon.ico?t=${timestamp}`, {
      method: 'HEAD',
      mode: 'no-cors',
      cache: 'no-store',
    });

    logDebug('info', 'YouTube connectivity test passed (fetch successful)');
    debugInfo.checks.networkBlocked = false;
    notifyListeners();
    return true;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    logDebug('error', `YouTube connectivity test failed: ${msg}`);
    debugInfo.checks.networkBlocked = true;
    notifyListeners();
    return false;
  }
};

/**
 * Get current debug info
 */
export const getDebugInfo = (): YouTubeAPIDebugInfo => {
  return { ...debugInfo };
};

/**
 * Reset debug info
 */
export const resetDebugInfo = () => {
  debugInfo = {
    status: 'idle',
    attempts: 0,
    maxAttempts: 3,
    lastError: null,
    logs: [],
    checks: {
      windowYT: false,
      windowYTPlayer: false,
      scriptInDOM: false,
      scriptLoaded: false,
      callbackDefined: false,
      networkBlocked: null,
    }
  };
  notifyListeners();
};

/**
 * Notify all listeners
 */
const notifyListeners = () => {
  const info = { ...debugInfo };
  debugListeners.forEach(listener => {
    try {
      listener(info);
    } catch (error) {
      console.error('[YouTube API Debug] Error in listener:', error);
    }
  });
};

/**
 * Generate diagnostic report
 */
export const generateDiagnosticReport = (): string => {
  const checks = runDiagnostics(false);
  const lines = [
    '=== YouTube API Diagnostic Report ===',
    `Status: ${debugInfo.status}`,
    `Attempts: ${debugInfo.attempts}/${debugInfo.maxAttempts}`,
    `Last Error: ${debugInfo.lastError || 'None'}`,
    '',
    '--- Checks ---',
    `✓ window.YT exists: ${checks.windowYT ? 'YES' : 'NO'}`,
    `✓ window.YT.Player exists: ${checks.windowYTPlayer ? 'YES' : 'NO'}`,
    `✓ Script in DOM: ${checks.scriptInDOM ? 'YES' : 'NO'}`,
    `✓ Script loaded: ${checks.scriptLoaded ? 'YES' : 'NO'}`,
    `✓ Callback defined: ${checks.callbackDefined ? 'YES' : 'NO'}`,
    `✓ Network blocked: ${checks.networkBlocked === null ? 'UNKNOWN' : checks.networkBlocked ? 'YES (BLOCKED)' : 'NO'}`,
    '',
    '--- Recent Logs ---',
    ...debugInfo.logs.slice(-10).map(log => {
      const time = new Date(log.timestamp).toLocaleTimeString();
      return `[${time}] [${log.level.toUpperCase()}] ${log.message}`;
    }),
    '',
    '--- Recommendations ---',
  ];

  // Add recommendations based on checks
  if (checks.networkBlocked === true) {
    lines.push('⚠️  YouTube appears to be blocked. Check firewall/network settings.');
  }
  if (checks.scriptInDOM && !checks.scriptLoaded) {
    lines.push('⚠️  Script in DOM but not loaded. Possible ad blocker or CSP issue.');
  }
  if (!checks.scriptInDOM) {
    lines.push('⚠️  Script not in DOM. Check if script injection is working.');
  }
  if (checks.scriptLoaded && !checks.windowYT) {
    lines.push('⚠️  Script loaded but window.YT not available. Possible JavaScript error.');
  }

  return lines.join('\n');
};
