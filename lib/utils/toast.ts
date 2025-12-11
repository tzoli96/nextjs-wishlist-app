import toast from 'react-hot-toast'

// Track active toasts to prevent duplicates
const activeToasts = new Set<string>()

/**
 * Show an error toast with deduplication
 * Prevents showing the same error message multiple times
 */
export function showErrorToast(message: string, duration: number = 4000) {
  // Check if this message is already being displayed
  if (activeToasts.has(message)) {
    return
  }

  // Add to active toasts
  activeToasts.add(message)

  // Show the toast
  toast.error(message, {
    duration,
  })

  // Remove from active toasts after duration + small buffer
  setTimeout(() => {
    activeToasts.delete(message)
  }, duration + 500)
}

/**
 * Show a success toast with deduplication
 */
export function showSuccessToast(message: string, duration: number = 3000) {
  if (activeToasts.has(message)) {
    return
  }

  activeToasts.add(message)

  toast.success(message, {
    duration,
  })

  setTimeout(() => {
    activeToasts.delete(message)
  }, duration + 500)
}

/**
 * Show an info toast with deduplication
 */
export function showInfoToast(message: string, duration: number = 3000) {
  if (activeToasts.has(message)) {
    return
  }

  activeToasts.add(message)

  toast(message, {
    duration,
  })

  setTimeout(() => {
    activeToasts.delete(message)
  }, duration + 500)
}

/**
 * Clear all active toasts
 */
export function clearAllToasts() {
  activeToasts.clear()
  toast.dismiss()
}
