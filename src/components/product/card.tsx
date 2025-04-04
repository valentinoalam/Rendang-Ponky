import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ProductCardProps {
  title: string;
  description: string;
  imagePath: string;
  isReversed?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  imagePath,
  isReversed = false,
}) => {
  return (
    <Card className={`border-0 shadow-none bg-transparent overflow-hidden`}>
      <CardContent className="p-0">
        <div
          className={`flex flex-col ${
            isReversed ? "md:flex-row-reverse" : "md:flex-row"
          } gap-6 items-center`}
        >
          <div className="w-full md:w-1/2 relative">
            <div className="w-full h-72 sm:h-96 relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-rendang-darkbrown/30 z-10 rounded-xl"></div>
              <Image fill
                src={imagePath}
                alt={title}
                className="w-full h-full object-cover object-[50%_85%] rounded-xl transform transition-all duration-500 hover:scale-105"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 px-4 md:px-0">
            <h3 className="text-2xl md:text-3xl font-bold font-playfair text-rendang-maroon mb-3">
              {title}
            </h3>
            <p className="text-rendang-darkbrown mb-6">{description}</p>
            <Button className="cta-button">
              Pesan Sekarang
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
