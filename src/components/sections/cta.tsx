
import React from "react";
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <div className="bg-linear-(--rendang-gradient) rounded-xl p-6 md:p-8 shadow-lg text-white flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="text-center md:text-left">
        <h3 className="font-playfair text-2xl md:text-3xl font-bold mb-2">
          Jangan Lewatkan Promo Spesial!
        </h3>
        <p className="text-white/90 mb-4">
          Beli 2 Gratis 1 – Buruan, Stok Terbatas!
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="cta-button animate-pulse-soft">
          🛒 Pesan Sekarang
        </Button>
        <Button className="cta-button-secondary">
          🎁 Lihat Promo
        </Button>
      </div>
    </div>
  );
};

export default CTA;
