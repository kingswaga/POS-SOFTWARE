'use client'

import { useQuery } from '@tanstack/react-query'
import { reportService } from '@/services/reportService'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ReportsPage() {
  const { data: reports } = useQuery({
    queryKey: ['reports'],
    queryFn: () => reportService.getAll().then((res) => res.data),
  })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reports</h1>
      <div className="grid gap-4">
        {reports?.map((report: any) => (
          <Card key={report.id}>
            <CardHeader>
              <CardTitle>{report.id}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Total: {report.total}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
