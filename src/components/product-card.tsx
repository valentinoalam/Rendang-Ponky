import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle } from "lucide-react";
import Image from 'next/image';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  imageSrc: string;
  quantity: number;
  onQuantityChange: (id: string, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  description,
  imageSrc,
  quantity,
  onQuantityChange
}) => {
  const handleIncrease = () => {
    onQuantityChange(id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      onQuantityChange(id, quantity - 1);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden">
        <Image
          src={imageSrc}
          alt={name}
          width={300}
          height={300}
          className="w-full h-48 object-cover object-center transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">{name}</CardTitle>
        <CardDescription className="text-rendang-800 font-semibold">
          Rp{price.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-gray-600 text-sm">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleDecrease}
            disabled={quantity === 0}
            className="h-8 w-8"
          >
            <MinusCircle className="h-5 w-5" />
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleIncrease}
            className="h-8 w-8"
          >
            <PlusCircle className="h-5 w-5" />
          </Button>
        </div>
        <span className="font-semibold">
          {quantity > 0 ? `Rp${(price * quantity).toLocaleString()}` : ''}
        </span>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
