import type { ShippingCostResult } from "@/types/rajaongkir"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/utils/shipping"

interface ShippingResultsProps {
  results: ShippingCostResult[]
}

export function ShippingResults({ results }: ShippingResultsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Hasil Estimasi Biaya Ongkir</h3>

      {results.map((result) => (
        <div key={result.code} className="space-y-2">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">{result.name}</h4>
            <Badge variant="outline">{result.code.toUpperCase()}</Badge>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Layanan</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Biaya</TableHead>
                <TableHead>Estimasi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.costs.map((service) =>
                service.cost.map((cost, costIndex) => (
                  <TableRow key={`${service.service}-${costIndex}`}>
                    <TableCell className="font-medium">{service.service}</TableCell>
                    <TableCell>{service.description}</TableCell>
                    <TableCell>{formatCurrency(cost.value)}</TableCell>
                    <TableCell>
                      {cost.etd} {cost.etd.includes("HARI") ? "" : "hari"}
                    </TableCell>
                  </TableRow>
                )),
              )}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  )
}
