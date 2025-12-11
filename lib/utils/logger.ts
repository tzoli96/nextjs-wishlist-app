/**
 * Simple logger utility
 * Only logs in development mode
 */

const isDevelopment = process.env.NODE_ENV === 'development'

export const logger = {
  error: (...args: unknown[]) => {
    if (isDevelopment) {
      console.error(...args)
    }
    // In production, you could send to error tracking service
    // e.g., Sentry, LogRocket, etc.
  },

  warn: (...args: unknown[]) => {
    if (isDevelopment) {
      console.warn(...args)
    }
  },

  info: (...args: unknown[]) => {
    if (isDevelopment) {
      console.info(...args)
    }
  },

  debug: (...args: unknown[]) => {
    if (isDevelopment) {
      console.debug(...args)
    }
  },
}
