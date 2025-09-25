import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
    <Card className={cn("border-0 shadow-none bg-transparent overflow-hidden ")}>
      <CardContent className="p-0">
        <div
          className={`flex flex-col ${
            isReversed ? "md:flex-row-reverse" : "md:flex-row"
          } gap-6 items-center`}
        >
          <div className="w-full h-80 sm:h-96 md:w-1/2 overflow-hidden relative group">
            <div className="w-[90%] h-[90%] relative overflow-hidden hover:border rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-rendang-darkbrown/30 z-10 rounded-xl transition-all duration-500"></div>
              <Image fill
                src={imagePath}
                alt={title}
                className="w-full h-full object-cover object-[50%_90%] bg-bottom transform transition-all duration-500 group-hover:scale-105 rounded-xl outline-rendang-600 outline-dashed outline-1 -outline-offset-8"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 px-4 md:px-0">
            <h3 className="text-2xl md:text-3xl font-bold font-playfair text-rendang-maroon mb-3">
              {title}
            </h3>
            <p className="text-rendang-darkbrown mb-6">{description}</p>
            <button className="cta-button">
              Pesan Sekarang
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
