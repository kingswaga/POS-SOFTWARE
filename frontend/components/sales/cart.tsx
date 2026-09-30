'use client'

import { useCartStore } from '@/store/cartStore'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Trash2 } from 'lucide-react'

export default function Cart() {
  const { items, updateQuantity, removeItem } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        Your cart is empty
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 max-h-[70vh] overflow-y-auto">
      <h2 className="font-semibold text-lg mb-4">Cart</h2>
      <ul className="divide-y">
        {items.map((item) => (
          <li key={item.id} className="py-3">
            <div className="flex justify-between">
              <div>
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500">
                  ${item.price} x {item.quantity}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus size={12} />
                </Button>
                <span className="w-6 text-center">{item.quantity}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus size={12} />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => removeItem(item.id)}
                >
                  <Trash2 size={12} />
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${items.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}