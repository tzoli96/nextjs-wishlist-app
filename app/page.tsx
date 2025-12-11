import { ProductsService } from '@/lib/api'
import ProductsListClient from '@/components/features/ProductsListClient'
import EmptyState from '@/components/ui/EmptyState'

// Server Component - SSR for SEO
export default async function Home() {
  // Server-side fetch for initial data (SEO + fast first paint)
  const initialProducts = await ProductsService.getAllProducts()

  if (initialProducts.length === 0) {
    return (
      <EmptyState
        title="No products available"
        description="Check back later for new products."
      />
    )
  }

  // Pass initial data to Client Component
  // Client Component will use SWR for cache + revalidation
  return <ProductsListClient initialProducts={initialProducts} />
}
