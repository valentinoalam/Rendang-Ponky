import { Check, Clock, Truck, Package, Utensils, Heart, Award } from "lucide-react"

import Image from "next/image"
import TrustBadges from "../business/trust-badge"
import ServingSuggestions from "./serving-suggest";

const KeyBenefits = () => {
  const benefits = [
    {
      icon: <Check className="h-6 w-6 text-primary" />,
      title: "100% Daging Sapi Pilihan",
      description: "Kami hanya menggunakan daging sapi berkualitas premium",
      illustration: "🥩",
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Masak 8 Jam, Rempah Tanpa Kompromi",
      description: "Dimasak dengan teknik tradisional untuk rasa terbaik",
      illustration: "⏰",
    },
    {
      icon: <Truck className="h-6 w-6 text-primary" />,
      title: "Dikirim Hari Ini Juga!",
      description: "Pengiriman cepat ke seluruh Indonesia",
      illustration: "🚚",
    },
  ]

  const nutritionalInfo = {
    servingSize: "100g",
    calories: 185,
    protein: "26g",
    fat: "8.2g",
    carbs: "2.1g",
    sodium: "320mg",
    fiber: "0.8g",
  }

  const productSpecs = [
    { icon: <Package className="h-5 w-5" />, label: "Netto", value: "250g per kemasan" },
    { icon: <Utensils className="h-5 w-5" />, label: "Porsi", value: "2-3 orang" },
    { icon: <Heart className="h-5 w-5" />, label: "Umur Simpan", value: "6 bulan (frozen)" },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:px-6 lg:py-10">
      {/* Main Benefits Section */}
      <div className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50 to-amber-100 p-6 shadow-xl md:p-8">
        <Image fill
          src="/abstract-food-pattern.png"
          alt="Background Illustration"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="relative mb-2.5 z-10">
          <h2 className="text-rendang-maroon font-playfair text-3xl font-extrabold text-center mb-3 text-balance md:text-4xl">
            Mengapa Pilih Rendang Kami?
          </h2>
          <p className="text-center text-amber-800 text-base mb-8 md:text-lg">
            Kualitas terbaik untuk keluarga Indonesia, dijamin lezat dan praktis.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-amber-200 p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute top-3 right-3 text-4xl opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  {benefit.illustration}
                </div>
                <div className="flex items-start space-x-3">
                  <div className="rounded-full bg-amber-100 p-2 flex-shrink-0 group-hover:bg-amber-200 transition-colors duration-300">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-amber-900 mb-1 text-balance">{benefit.title}</h3>
                    <p className="text-sm text-amber-800/90 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="translate-y-5"><TrustBadges /></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Product Specifications */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100 shadow-md md:p-8">
            <div className="flex items-center justify-center mb-6">
              <Award className="h-7 w-7 text-primary mr-3" />
              <h3 className="text-2xl font-bold text-red-900 text-balance md:text-3xl">Spesifikasi Produk</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              {productSpecs.map((spec, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-white/70 rounded-xl border border-red-200 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex justify-center text-primary mb-2">{spec.icon}</div>
                  <p className="text-sm font-medium text-red-800 mb-0.5">{spec.label}</p>
                  <p className="text-lg font-bold text-red-900">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Nutritional Information */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 shadow-md md:p-8">
            <h3 className="text-xl font-bold text-center mb-6 text-green-900 text-balance md:text-2xl">
              📊 Informasi Gizi per {nutritionalInfo.servingSize}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left table-auto border-collapse">
                <thead>
                  <tr className="bg-green-100 text-green-800">
                    <th className="px-4 py-2 border-b-2 border-green-200 font-semibold text-sm">Nutrisi</th>
                    <th className="px-4 py-2 border-b-2 border-green-200 font-semibold text-sm">Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-green-100">
                    <td className="px-4 py-2 text-green-700">Kalori</td>
                    <td className="px-4 py-2 font-medium text-green-800">{nutritionalInfo.calories}</td>
                  </tr>
                  <tr className="border-b border-green-100">
                    <td className="px-4 py-2 text-green-700">Protein</td>
                    <td className="px-4 py-2 font-medium text-green-800">{nutritionalInfo.protein}</td>
                  </tr>
                  <tr className="border-b border-green-100">
                    <td className="px-4 py-2 text-green-700">Lemak</td>
                    <td className="px-4 py-2 font-medium text-green-800">{nutritionalInfo.fat}</td>
                  </tr>
                  <tr className="border-b border-green-100">
                    <td className="px-4 py-2 text-green-700">Karbohidrat</td>
                    <td className="px-4 py-2 font-medium text-green-800">{nutritionalInfo.carbs}</td>
                  </tr>
                  <tr className="border-b border-green-100">
                    <td className="px-4 py-2 text-green-700">Sodium</td>
                    <td className="px-4 py-2 font-medium text-green-800">{nutritionalInfo.sodium}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-green-700">Serat</td>
                    <td className="px-4 py-2 font-medium text-green-800">{nutritionalInfo.fiber}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Serving Suggestions */}
        <ServingSuggestions />
      </div>
    </div>
  )
}

export default KeyBenefits
