'use client'

import { useState } from 'react'
import { Product } from '@/types'
import { Input } from '@/components/ui/input'
import { useCartStore } from '@/store/cartStore'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ProductSearch({
  products,
}: {
  products: Product[]
}) {
  const [search, setSearch] = useState('')
  const addItem = useCartStore((s) => s.addItem)

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <Input
        placeholder="Search products by name or SKU..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-3 hover:shadow-md transition"
          >
            <div className="font-medium">{product.name}</div>
            <div className="text-sm text-gray-500">SKU: {product.sku}</div>
            <div className="flex justify-between items-center mt-2">
              <span className="font-bold">${product.price}</span>
              <Button
                size="sm"
                onClick={() => addItem(product)}
                disabled={product.stock <= 0}
              >
                <Plus size={14} />
              </Button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-500">
            No products found
          </div>
        )}
      </div>
    </div>
  )
}