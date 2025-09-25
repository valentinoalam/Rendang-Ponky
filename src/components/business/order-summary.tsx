"use client"

import type React from "react"
import type { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { ShippingOption } from "@/types/shipping"

type OrderSummaryProps = {
  products?: Product[]
  name: string
  phone: string
  address: string
  selectedShipping: ShippingOption | null
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ products = [], name, phone, address, selectedShipping }) => {
  const selectedProducts = products.filter((product) => product.quantity > 0)
  const subtotal = selectedProducts.reduce((total, product) => total + product.price * product.quantity, 0)
  const shippingCost = selectedShipping ? selectedShipping.cost : 0
  const total = subtotal + shippingCost

  const handleCheckout = () => {
    // Implement checkout logic here
    alert("Checkout functionality will be implemented here")
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedProducts.length > 0 ? (
          <>
            <div className="space-y-2">
              {selectedProducts.map((product) => (
                <div key={product.id} className="flex justify-between">
                  <span>
                    {product.quantity}x {product.name}
                  </span>
                  <span>Rp {(product.price * product.quantity).toLocaleString("id-ID")}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Shipping</span>
                {selectedShipping ? (
                  <span>Rp {shippingCost.toLocaleString("id-ID")}</span>
                ) : (
                  <span className="text-muted-foreground text-sm">Select destination</span>
                )}
              </div>

              {selectedShipping && (
                <div className="text-sm text-muted-foreground mt-1">
                  {selectedShipping.courier} - {selectedShipping.service}
                </div>
              )}

              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total</span>
                <span>Rp {total.toLocaleString("id-ID")}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-4 text-muted-foreground">No items in cart</div>
        )}

        <div className="space-y-2 border-t pt-4">
          <h3 className="font-medium">Delivery Details</h3>
          {name && (
            <div className="text-sm">
              <p className="font-medium">{name}</p>
              <p>{phone}</p>
              <p>{address}</p>
              {selectedShipping && (
                <p className="mt-2 text-muted-foreground">Est. delivery: {selectedShipping.etd} days</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          size="lg"
          disabled={selectedProducts.length === 0 || !name || !phone || !address || !selectedShipping}
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </CardFooter>
    </Card>
  )
}

export default OrderSummary
