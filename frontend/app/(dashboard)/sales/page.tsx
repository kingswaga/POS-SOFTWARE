'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { productService } from '@/services/productService'
import { useCartStore } from '@/store/cartStore'
import Cart from '@/components/sales/cart'
import ProductSearch from '@/components/sales/ProductSearch'
import CheckoutModal from '@/components/sales/checkoutModal'
import { Button } from '@/components/ui/button'
import { Sale } from '@/types'
import ReceiptModal from '@/components/sales/receiptModal'

export default function SalesPage() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [completedSale, setCompletedSale] = useState<Sale | null>(null)
  const { items, total } = useCartStore()
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getAll().then((res) => res.data),
  })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Product search and list */}
      <div className="lg:col-span-2">
        <ProductSearch products={products || []} />
      </div>

      {/* Cart */}
      <div className="lg:col-span-1">
        <Cart />
        <Button
          className="w-full mt-4"
          disabled={items.length === 0}
          onClick={() => setIsCheckoutOpen(true)}
        >
          Checkout (${total.toFixed(2)})
        </Button>
      </div>

      <CheckoutModal
        open={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onCompleted={setCompletedSale}
      />

      <ReceiptModal
        sale={completedSale}
        open={completedSale !== null}
        onClose={() => setCompletedSale(null)}
      />
    </div>
  )
}