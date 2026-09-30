'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { saleService } from '@/services/saleService'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog } from '@headlessui/react'
import { Sale } from '@/types'

export default function CheckoutModal({
  open,
  onClose,
  onCompleted,
}: {
  open: boolean
  onClose: () => void
  onCompleted: (sale: Sale) => void
}) {
  const { items, total, clearCart } = useCartStore()
  const [customerId, setCustomerId] = useState('')
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const { data: sale } = await saleService.create({
        customerId: customerId || undefined,
        items: items.map((i) => ({
          productId: i.id,
          quantity: i.quantity,
          price: i.price,
        })),
        total,
      })
      toast.success('Sale completed!')
      clearCart()
      queryClient.invalidateQueries({ queryKey: ['sales'] })
      onClose()
      onCompleted(sale)
    } catch (error) {
      toast.error('Checkout failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
          <Dialog.Title className="text-xl font-bold mb-4">
            Complete Sale
          </Dialog.Title>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Customer ID (optional)
              </label>
              <Input
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                placeholder="Enter customer ID"
              />
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Confirm'}
              </Button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}