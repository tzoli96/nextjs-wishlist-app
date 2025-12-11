// API Configuration
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://fakestoreapi.com'

// API Endpoints
export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id: string | number) => `/products/${id}`,
} as const

// Grid breakpoints (matching Tailwind)
export const GRID_COLUMNS = {
  MOBILE: 1,
  TABLET: 2,
  DESKTOP: 3,
  DESKTOP_XL: 4,
} as const

// Rating
export const MAX_RATING = 5

// Storage keys
export const STORAGE_KEYS = {
  WISHLIST: 'wishlist-storage',
} as const
