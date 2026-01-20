/**
 * Video Synchronization Constants
 * 
 * Defines thresholds and intervals for multi-user video synchronization
 */

/**
 * Synchronization drift thresholds (in seconds)
 */
export const SYNC_THRESHOLDS = {
  /**
   * Hard sync threshold: If drift exceeds this, immediately seek to target time
   * 2.5s allows aggressive playback rate catchup (up to 1.25x) to work before giving up
   */
  HARD_SYNC: 2.5,

  /**
   * Soft sync threshold: Use adaptive correction (playback rate or seek during pause)
   * 0.15s enables the Predictive Engine to catch small drifts early
   */
  SOFT_SYNC: 0.15,

  /**
   * Acceptable drift: No correction needed
   * 0.05s is ultra-tight (1-2 frames)
   */
  ACCEPTABLE: 0.05,
} as const;

/**
 * Sync broadcast and check intervals (in milliseconds)
 */
export const SYNC_INTERVALS = {
  /**
   * How often the creator broadcasts playback state to members
   * INCREASED to 2000ms to reduce network load
   */
  CREATOR_BROADCAST: 2000,

  /**
   * How often members check for sync corrections
   */
  MEMBER_CHECK: 1000,

  /**
   * Debounce interval for database updates
   */
  DB_UPDATE_DEBOUNCE: 1000,
} as const;

/**
 * Playback rate adjustments for soft sync
 */
export const PLAYBACK_RATE = {
  /**
   * Normal playback rate
   */
  NORMAL: 1.0,

  /**
   * Slightly faster to catch up
   */
  CATCH_UP: 1.05,

  /**
   * Slightly slower to fall back
   */
  SLOW_DOWN: 0.95,

  /**
   * Duration to apply adjusted rate before reverting (ms)
   */
  ADJUSTMENT_DURATION: 2000,
} as const;
