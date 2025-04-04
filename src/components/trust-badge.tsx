import React from "react";

const TrustBadges = () => {
  return (
    <div className="flex flex-col items-center mb-8 md:mb-0">
      <div className="flex flex-wrap justify-center gap-6 mb-4">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-rendang-cream flex items-center justify-center mb-2">
            <span className="text-rendang-maroon text-xl font-bold">HALAL</span>
          </div>
          <span className="text-xs text-rendang-darkbrown">Sertifikasi Halal</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-rendang-cream flex items-center justify-center mb-2">
            <span className="text-rendang-maroon text-xl font-bold">BPOM</span>
          </div>
          <span className="text-xs text-rendang-darkbrown">Terjamin BPOM</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-rendang-cream flex items-center justify-center mb-2">
            <span className="text-rendang-maroon text-xl font-bold">MUI</span>
          </div>
          <span className="text-xs text-rendang-darkbrown">Sertifikasi MUI</span>
        </div>
      </div>
      <div className="bg-rendang-cream rounded-lg p-4 max-w-md text-center">
        <p className="italic text-rendang-darkbrown">
          &quot;Rasanya persis seperti buatan nenek! Langganan tiap bulan!&quot;
        </p>
        <p className="font-semibold text-rendang-maroon mt-2">– Anna, Jakarta</p>
      </div>
    </div>
  );
};

export default TrustBadges;
