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
      const response = await apiClient.get<Product[]>(API_ENDPOINTS.PRODUCTS)
      return response.data
    } catch (error) {
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
