'use client'

import { Product } from '@/types/product'
import { useWishlistStore } from '@/features/wishlist/store/useWishlistStore'

interface WishlistButtonProps {
  product: Product
}

export default function WishlistButton({ product }: WishlistButtonProps) {
  const { addItem, removeItem, isInWishlist } = useWishlistStore()
  const inWishlist = isInWishlist(product.id)

  const handleToggle = () => {
    if (inWishlist) {
      removeItem(product.id)
    } else {
      addItem(product)
    }
  }

  return (
    <button
      onClick={handleToggle}
      className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center ${
        inWishlist
          ? 'bg-red-500 hover:bg-red-600 text-white'
          : 'bg-blue-600 hover:bg-blue-700 text-white'
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 mr-2 ${inWishlist ? 'fill-white' : 'fill-none'}`}
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
      {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
    </button>
  )
}
