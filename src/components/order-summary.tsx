
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { Send } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

interface OrderSummaryProps {
  products: Product[];
  name: string;
  phone: string;
  address: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  products,
  name,
  phone,
  address
}) => {
  const { toast } = useToast();
  
  const totalItems = products.reduce((sum, product) => sum + product.quantity, 0);
  const totalPrice = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  
  const selectedProducts = products.filter(product => product.quantity > 0);
  
  const handleSubmitOrder = () => {
    if (totalItems === 0) {
      toast({
        title: "No items selected",
        description: "Please select at least one product to order.",
        variant: "destructive"
      });
      return;
    }
    
    if (!name || !phone || !address) {
      toast({
        title: "Missing information",
        description: "Please fill in all delivery details.",
        variant: "destructive"
      });
      return;
    }
    
    // Format the WhatsApp message
    const productDetails = selectedProducts
      .map(product => `- ${product.name}: ${product.quantity} x Rp${product.price.toLocaleString()} = Rp${(product.price * product.quantity).toLocaleString()}`)
      .join("%0A");
      
    const message = `*New Order*%0A%0A*Products:*%0A${productDetails}%0A%0A*Total: Rp${totalPrice.toLocaleString()}*%0A%0A*Delivery Details:*%0AName: ${name}%0APhone: ${phone}%0AAddress: ${address}`;
    
    // Open WhatsApp with the pre-filled message
    const whatsappUrl = `https://wa.me/+6281234567890?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <Card className="sticky top-18">
      <CardHeader className="pb-2">
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-1">
          {selectedProducts.length > 0 ? (
            selectedProducts.map(product => (
              <div key={product.id} className="flex justify-between py-1">
                <span className="text-sm">{product.name} x {product.quantity}</span>
                <span className="text-sm font-medium">Rp{(product.price * product.quantity).toLocaleString()}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">No items selected</p>
          )}
          
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>Rp{totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-rendang-700 hover:bg-rendang-800" 
          onClick={handleSubmitOrder}
        >
          <Send className="h-4 w-4 mr-2" />
          Submit Order via WhatsApp
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;
