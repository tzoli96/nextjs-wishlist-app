import { notFound } from 'next/navigation'
import { ProductsService } from '@/lib/api'
import ProductDetailClient from '@/components/features/ProductDetailClient'

// Server Component - SSR for SEO
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // Server-side fetch for initial data (SEO + fast first paint)
  const initialProduct = await ProductsService.getProductById(id)

  if (!initialProduct) {
    notFound()
  }

  // Pass initial data to Client Component
  // Client Component will use SWR for cache + revalidation
  return <ProductDetailClient productId={id} initialProduct={initialProduct} />
}
