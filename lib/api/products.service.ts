import apiClient from './client'
import { Product } from '@/types/product'
import { API_ENDPOINTS } from '@/lib/constants'
import { logger } from '@/lib/utils/logger'

/**
 * Product API Service
 * Handles all product-related API calls
 */
export class ProductsService {
  /**
   * Fetch all products
   * @returns Promise<Product[]>
   */
  static async getAllProducts(): Promise<Product[]> {
    try {
      console.log('🔍 [DEBUG] Fetching products from:', process.env.NEXT_PUBLIC_API_BASE_URL)
      console.log('🔍 [DEBUG] Endpoint:', API_ENDPOINTS.PRODUCTS)

      const response = await apiClient.get<Product[]>(API_ENDPOINTS.PRODUCTS)

      console.log('✅ [DEBUG] Products fetched successfully:', response.data.length, 'items')
      return response.data
    } catch (error) {
      console.error('❌ [DEBUG] Failed to fetch products')
      console.error('❌ [DEBUG] Error details:', error)
      console.error('❌ [DEBUG] API Base URL:', process.env.NEXT_PUBLIC_API_BASE_URL)
      logger.error('Failed to fetch products:', error)
      return []
    }
  }

  /**
   * Fetch a single product by ID
   * @param id - Product ID
   * @returns Promise<Product | null>
   */
  static async getProductById(id: string | number): Promise<Product | null> {
    try {
      const response = await apiClient.get<Product>(
        API_ENDPOINTS.PRODUCT_BY_ID(id)
      )
      return response.data
    } catch (error) {
      logger.error(`Failed to fetch product ${id}:`, error)
      return null
    }
  }
}
