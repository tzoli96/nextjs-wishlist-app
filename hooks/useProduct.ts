import useSWR from 'swr'
import { Product } from '@/types/product'
import { ProductsService } from '@/lib/api'

/**
 * Custom hook to fetch a single product by ID with SWR
 * Provides automatic caching, revalidation, and state management
 * @param id - Product ID
 * @param fallbackData - Initial data from SSR (optional)
 */
export function useProduct(id: string | number, fallbackData?: Product | null) {
  const { data, error, isLoading, mutate } = useSWR<Product | null>(
    id ? `product-${id}` : null, // null = don't fetch
    () => ProductsService.getProductById(id),
    {
      fallbackData, // Use SSR data as initial value
      revalidateOnMount: !fallbackData, // Only fetch on mount if no fallback
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 120000, // 2 minutes - product details change less often
      shouldRetryOnError: true,
      errorRetryCount: 3,
    }
  )

  return {
    product: data || fallbackData,
    isLoading,
    isError: error,
    mutate,
  }
}
