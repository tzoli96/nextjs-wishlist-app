'use client'

import Link from 'next/link'
import { Product } from '@/types/product'
import { useWishlistStore } from '@/features/wishlist/store/useWishlistStore'
import { formatPrice } from '@/lib/utils'
import ProductImage from '@/components/ui/ProductImage'
import Rating from '@/components/ui/Rating'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, removeItem, isInWishlist } = useWishlistStore()
  const inWishlist = isInWishlist(product.id)

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    if (inWishlist) {
      removeItem(product.id)
    } else {
      addItem(product)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link href={`/product/${product.id}`}>
        <ProductImage
          src={product.image}
          alt={product.title}
          containerClassName="relative h-64 bg-gray-100"
          className="object-contain p-4 hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-blue-600">
            {formatPrice(product.price)}
          </p>
          <button
            onClick={handleWishlistToggle}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 transition-colors ${
                inWishlist ? 'fill-red-500 text-red-500' : 'fill-none text-gray-400'
              }`}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
        <div className="mt-2">
          <Rating rating={product.rating.rate} count={product.rating.count} size="sm" />
        </div>
      </div>
    </div>
  )
}
