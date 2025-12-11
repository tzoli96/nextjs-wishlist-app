'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ProductImageProps {
  src: string
  alt: string
  fill?: boolean
  priority?: boolean
  className?: string
  containerClassName?: string
}

export default function ProductImage({
  src,
  alt,
  fill = true,
  priority = false,
  className = 'object-contain p-4',
  containerClassName = 'relative h-64 bg-gray-100',
}: ProductImageProps) {
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return (
      <div className={containerClassName}>
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          No Image Available
        </div>
      </div>
    )
  }

  return (
    <div className={containerClassName}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={className}
        priority={priority}
        onError={() => setImageError(true)}
      />
    </div>
  )
}
