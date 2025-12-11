import axios, { AxiosInstance, AxiosError } from 'axios'
import { showErrorToast } from '@/lib/utils/toast'
import { logger } from '@/lib/utils/logger'
import { API_BASE_URL } from '@/lib/constants'

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor with global error handling
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    // Only show toasts on client-side with deduplication
    if (typeof window !== 'undefined') {
      if (error.response) {
        // Server responded with error status
        const status = error.response.status
        if (status === 404) {
          showErrorToast('Resource not found')
        } else if (status >= 500) {
          showErrorToast('Server error. Please try again later.')
        } else {
          showErrorToast(`Error: ${status}`)
        }
      } else if (error.request) {
        // Request was made but no response received
        showErrorToast('Network error. Please check your connection.')
      } else {
        // Something else happened
        showErrorToast('An unexpected error occurred')
      }
    }

    // Log errors for debugging (dev only)
    logger.error('API Error:', error)
    return Promise.reject(error)
  }
)

export default apiClient
