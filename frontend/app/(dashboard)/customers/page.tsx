'use client'

import { useQuery } from '@tanstack/react-query'
import { customerService } from '@/services/customerService'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CustomersPage() {
  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: () => customerService.getAll().then((res) => res.data),
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Customers</h1>
      <div className="grid gap-4">
        {customers?.map((customer: any) => (
          <Card key={customer.id}>
            <CardHeader>
              <CardTitle>{customer.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{customer.email}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
