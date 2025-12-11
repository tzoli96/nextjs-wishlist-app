import useSWR from 'swr'
import { Product } from '@/types/product'
import { ProductsService } from '@/lib/api'

/**
 * Custom hook to fetch all products with SWR
 * Provides automatic caching, revalidation, and state management
 * @param fallbackData - Initial data from SSR (optional)
 */
export function useProducts(fallbackData?: Product[]) {
  const { data, error, isLoading, mutate } = useSWR<Product[]>(
    'products',
    ProductsService.getAllProducts,
    {
      fallbackData, // Use SSR data as initial value
      revalidateOnMount: !fallbackData, // Only fetch on mount if no fallback
      revalidateOnFocus: false, // Don't refetch when window regains focus
      revalidateOnReconnect: true, // Refetch when reconnecting to internet
      dedupingInterval: 60000, // Dedupe requests within 60 seconds
      shouldRetryOnError: true, // Retry on error
      errorRetryCount: 3, // Max 3 retries
    }
  )

  return {
    products: data || fallbackData || [],
    isLoading,
    isError: error,
    mutate, // For manual cache updates
  }
}
