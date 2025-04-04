'use client'
import React, { useState } from "react";
import { Product } from "@/types/product";
import { Separator } from "@/components/ui/separator";
import ProductCard from "../product-card";
import AddressForm from "../address-form";
import OrderSummary from "../order-summary";

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Original Beef Rendang",
    price: 95000,
    description: "Traditional beef rendang slow-cooked in coconut milk and spices until tender. Our signature recipe.",
    imageSrc: "/products/rendang-daging-original.jpg",
    quantity: 0
  },
  {
    id: "2",
    name: "Spicy Lung Rendang",
    price: 85000,
    description: "A unique take on rendang using tender beef lung, cooked with our special spice blend for a rich flavor.",
    imageSrc: "/products/rendang-paru.jpg",
    quantity: 0
  }
];

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleQuantityChange = (id: string, quantity: number) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, quantity } : product
    ));
  };

  return (
    <div className="w-full bg-[#FDF4EE]">
      {/* Hero Section */}
      <section className="bg-rendang-800 text-white py-12 md:py-20">
        <div className="container px-4 md:px-8 lg:px-16 mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Rendang Delight</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl">
            Experience the authentic taste of Indonesian cuisine with our premium rendang dishes, 
            delivered straight to your door.
          </p>
        </div>
      </section>

      <section id="products" className="container px-4 md:px-8 lg:px-16 py-8 md:py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Our Rendang Selection</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {products.map(product => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    onQuantityChange={handleQuantityChange}
                  />
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
              />
            </div>
          </div>

          <aside className="md:col-span-1">
            <OrderSummary 
              products={products}
              name={name}
              phone={phone}
              address={address}
            />
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Products;