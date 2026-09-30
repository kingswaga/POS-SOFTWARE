'use client'

import { useRouter } from 'next/navigation'

export default function ProductDetailPage() {
  const router = useRouter()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Product Detail</h1>
      <p className="mt-4 text-muted-foreground">Select a product or return to the product list.</p>
      <button className="mt-4 rounded bg-blue-600 px-4 py-2 text-white" onClick={() => router.push('/product')}>
        Back to products
      </button>
    </div>
  )
}
