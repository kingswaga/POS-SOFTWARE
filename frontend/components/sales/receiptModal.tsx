'use client'

import { Dialog } from '@headlessui/react'
import { Printer, ReceiptText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sale } from '@/types'

function formatDate(value: string) {
  return new Date(value).toLocaleString()
}

export default function ReceiptModal({
  sale,
  open,
  onClose,
}: {
  sale: Sale | null
  open: boolean
  onClose: () => void
}) {
  if (!sale) return null

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="receipt-print-area w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <div className="mb-5 flex items-start justify-between border-b pb-4">
            <div>
              <Dialog.Title className="flex items-center gap-2 text-xl font-bold">
                <ReceiptText size={22} /> Receipt
              </Dialog.Title>
              <p className="mt-1 text-sm text-gray-500">Sale #{sale.id.slice(0, 8)}</p>
            </div>
            <span className="text-sm font-medium text-green-700">PAID</span>
          </div>

          <div className="mb-5 text-sm text-gray-600">
            <p>{formatDate(sale.createdAt)}</p>
            {sale.customer && <p>Customer: {sale.customer.name}</p>}
          </div>

          <div className="space-y-3 border-b pb-4">
            {sale.items?.map((item) => (
              <div key={item.id} className="flex justify-between gap-4 text-sm">
                <div>
                  <p className="font-medium">{item.product?.name || 'Product'}</p>
                  <p className="text-gray-500">
                    {item.quantity} x ${item.price.toFixed(2)}
                  </p>
                </div>
                <span className="font-medium">
                  ${(item.quantity * item.price).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between py-4 text-lg font-bold">
            <span>Total paid</span>
            <span>${sale.total.toFixed(2)}</span>
          </div>

          <div className="flex gap-3 print:hidden">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Close
            </Button>
            <Button className="flex-1" onClick={() => window.print()}>
              <Printer size={16} className="mr-2" />
              Print receipt
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}