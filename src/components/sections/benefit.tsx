import React from "react";
import { Check, Clock, Truck, ShieldCheck } from "lucide-react";

const KeyBenefits = () => {
  const benefits = [
    {
      icon: <Check className="h-6 w-6 text-rendang-maroon" />,
      title: "100% Daging Sapi Pilihan",
      description: "Kami hanya menggunakan daging sapi berkualitas premium",
    },
    {
      icon: <Clock className="h-6 w-6 text-rendang-maroon" />,
      title: "Masak 8 Jam, Rempah Tanpa Kompromi",
      description: "Dimasak dengan teknik tradisional untuk rasa terbaik",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-rendang-maroon" />,
      title: "Halal & Terjamin BPOM",
      description: "Aman dikonsumsi dan terjamin kualitasnya",
    },
    {
      icon: <Truck className="h-6 w-6 text-rendang-maroon" />,
      title: "Dikirim Hari Ini Juga!",
      description: "Pengiriman cepat ke seluruh Indonesia",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
      {benefits.map((benefit, index) => (
        <div
          key={index}
          className="flex items-start space-x-4 p-4 rounded-lg bg-white/50 border border-rendang-golden/20 hover:border-rendang-golden transition-all duration-300"
        >
          <div className="rounded-full bg-rendang-cream p-2 flex-shrink-0">
            {benefit.icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-rendang-darkbrown">
              {benefit.title}
            </h3>
            <p className="text-sm text-rendang-darkbrown/80">
              {benefit.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KeyBenefits;
