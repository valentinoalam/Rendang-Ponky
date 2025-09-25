"use client"
import type React from "react"
import { useState } from "react"
import type { Product } from "@/types/product"
import { Separator } from "@/components/ui/separator"
import ProductCard from "../product-card"
import AddressForm from "../address-form"
import OrderSummary from "../order-summary"
import type { Destination } from "@/types/shipping"
import type { ShippingOption } from "@/components/shipping-calculator"
import FlameAnimation from "../FlameAnimation"
import Image from "next/image"
import AnimatedTextReveal from "../text-reveal"

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Original Beef Rendang",
    price: 95000,
    description: "Traditional beef rendang slow-cooked in coconut milk and spices until tender. Our signature recipe.",
    imageSrc: "/products/rendang-daging-original.jpg",
    quantity: 0,
  },
  {
    id: "2",
    name: "Spicy Lung Rendang",
    price: 85000,
    description:
      "A unique take on rendang using tender beef lung, cooked with our special spice blend for a rich flavor.",
    imageSrc: "/products/rendang-paru.jpg",
    quantity: 0,
  },
]

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [destination, setDestination] = useState<Destination>({ city: "", postalCode: "" })
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null)

  const handleQuantityChange = (id: string, quantity: number) => {
    setProducts(products.map((product) => (product.id === id ? { ...product, quantity } : product)))
  }

  // Calculate total weight based on product quantities (400g per item)
  const totalWeight = products.reduce((total, product) => {
    return total + product.quantity * 400
  }, 0)

  return (
    <div className="w-full bg-[#FDF4EE]">
      {/* Hero Section */}
      <section className="max-h-[375px] relative overflow-clip box-content highlight text-white pt-12 md:pt-20">
        <div className="absolute w-full h-full top-0 left-0 border-b-rendang-800 border-s-rendang-300 border-t-gold-soft border-9"></div>
        <div className="flex">
          <AnimatedTextReveal />
          <div className="relative">
            <Image 
              src="/illust/cheff_cooking.png" 
              width={400} height={400}
              className="absolute z-50" 
              alt={"cheff cooking"} />
            <FlameAnimation
              spritesheetUrl="/fire.png" // Path to your uploaded image
              totalFrames={8}
              columns={4} // 8 columns
              rows={2}    // 7 rows
              frameDuration={160} // Faster animation (80ms per frame)
            />
          </div>
          
        </div>
      </section>

      <section id="products" className="container px-4 md:px-8 lg:px-16 py-8 md:py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Our Rendang Selection</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} onQuantityChange={handleQuantityChange} />
                ))}
              </div>
            </div>

            <Separator className="my-8" />

            <div>
              <h2 className="text-2xl font-bold mb-6">Delivery Information</h2>
              <AddressForm
                name={name}
                setName={setName}
                phone={phone}
                setPhone={setPhone}
                address={address}
                setAddress={setAddress}
                destination={destination}
                setDestination={setDestination}
                selectedShipping={selectedShipping}
                setSelectedShipping={setSelectedShipping}
                totalWeight={totalWeight}
              />
            </div>
          </div>

          <aside className="md:col-span-1">
            <OrderSummary
              products={products}
              name={name}
              phone={phone}
              address={address}
              selectedShipping={selectedShipping}
            />
          </aside>
        </div>
      </section>
    </div>
  )
}

export default Products
