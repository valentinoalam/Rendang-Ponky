import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';

const ServingSuggestions = () => {
  const servingSuggestions = [
    {
      emoji: "🍔",
      dish: "Burger Rendang",
      description: "Kombinasi klasik yang sempurna",
      image: "/resep/burger.png",
      tips: {
        title: "Tips Menyajikan Rendang Burger",
        steps: [
          "Siapkan rendang matang, potong atau suwir dagingnya",
          "Panggang roti burger hingga hangat dan renyah",
          "Letakkan daun selada dan tomat di bawah roti",
          "Tambahkan potongan atau suwir rendang sebagai isian utama",
          "Tambahkan acar, bawang bombay, atau keju sesuai selera",
          "Tutup dengan roti atas dan sajikan hangat"
        ]
      }

    },
    {
      emoji: "🥪",
      dish: "Rendang Sandwich",
      description: "Fusion modern yang unik",
      image: "/resep/sandwitch.png",
      tips: {
        title: "Tips Membuat Rendang Sandwich",
        steps: [
          "Gunakan roti sourdough atau ciabatta yang dipanggang",
          "Suwir daging rendang hingga halus",
          "Tambahkan mayones atau butter tipis pada roti",
          "Masukkan daun selada segar dan tomat cherry",
          "Tekan sandwich ringan agar tidak mudah berantakan"
        ]
      }
    },
    {
      emoji: "🍝",
      dish: "Pasta Rendang",
      description: "Fusion Indonesia-Italia",
      image: "/resep/pasta.png",
      tips: {
        title: "Tips Membuat Pasta Rendang",
        steps: [
            "Siapkan rendang matang, potong kecil atau suwir",
            "Pilih pasta seperti penne, rigatoni, atau fettuccine",
            "Rebus pasta hingga al dente, simpan 1-2 cangkir air rebusannya",
            "Tumis bumbu rendang, masukkan potongan rendang, tambahkan santan atau kaldu bila perlu",
            "Masukkan pasta, aduk rata, tambah air rebusan jika saus terlalu kental",
            "Cicipi dan koreksi rasa, bisa tambahkan parmesan parut (opsional)",
            "Sajikan hangat dengan garnish cabai, daun ketumbar, atau bawang goreng"
        ]
      }
    },
    {
      emoji: "🥗",
      dish: "Salad Rendang",
      description: "Menikmati rendang dengan cara sehat dan bergizi tinggi",
      image: "/resep/salad.png",
      tips: {
        title: "Tips Menyajikan Rendang dengan Salad",
        steps: [
            "Siapkan rendang matang, potong kecil atau suwir",
            "Gunakan sayuran segar seperti lettuce, tomat, timun, dan paprika",
            "Letakkan potongan rendang di atas campuran sayuran",
            "Tambahkan dressing sederhana (misalnya minyak zaitun dan perasan jeruk nipis)",
            "Taburi dengan bawang goreng atau biji wijen untuk garnish"
        ]
      }
    }
  ];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-center mb-6 text-purple-900 text-balance md:text-2xl">
        🍽️ Ide Penyajian Kreatif
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {servingSuggestions.map((suggestion, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <div className="group h-60 relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl overflow-hidden border border-purple-200 hover:border-purple-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                {/* Image Cover */}
                <div className="relative h-full overflow-hidden">
                  <Image fill 
                    src={suggestion.image} 
                    alt={suggestion.dish}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/10 bg-opacity-20 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
                  <div className="absolute top-2 right-2 text-2xl bg-gold-soft bg-opacity-90 rounded-full p-1">
                    {suggestion.emoji}
                  </div>
                </div>
                
                {/* Content */}
                <div className="absolute w-full bg-gold-soft transition-all duration-300 left-0 -bottom-10 group-hover:bottom-0 h-0 group-hover:h-32 p-4 text-center">
                  <h4 className="font-bold text-purple-900 mb-2 text-sm">{suggestion.dish}</h4>
                  <p className="text-xs text-purple-700 leading-relaxed">{suggestion.description}</p>
                  <div className="mt-3 text-xs text-purple-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Klik untuk tips lengkap →
                  </div>
                </div>
              </div>
            </DialogTrigger>
            
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-purple-900 text-lg mb-4">
                  {suggestion.tips.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                {/* Featured Image */}
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <Image fill
                    src={suggestion.image} 
                    alt={suggestion.dish}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-white bg-opacity-95 rounded-full p-2 text-lg">
                    {suggestion.emoji}
                  </div>
                </div>

                {/* Tips List */}
                <div className="space-y-3">
                  <h5 className="font-semibold text-purple-800 text-sm">Langkah-langkah:</h5>
                  <div className="space-y-2">
                    {suggestion.tips.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold">
                          {stepIndex + 1}
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Tip */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-3 border border-yellow-200">
                  <div className="flex items-start gap-2">
                    <span className="text-lg">💡</span>
                    <div>
                      <p className="text-sm font-medium text-yellow-900 mb-1">Tips Tambahan:</p>
                      <p className="text-xs text-yellow-800">
                        Selalu cicipi dan sesuaikan rasa sebelum disajikan. Setiap orang punya preferensi yang berbeda!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      <div className="mt-8 text-center">
        <div className="inline-block bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 border border-yellow-200 shadow-md max-w-2xl">
          <h4 className="font-bold text-yellow-900 mb-3 text-base">🔥 Pro Tips Penyajian Umum</h4>
          <div className="space-y-2 text-left">
            <p className="text-sm text-yellow-800">
              <span className="font-medium">Pemanasan:</span> Hangatkan rendang dengan api kecil selama 5 menit untuk rasa terbaik
            </p>
            <p className="text-sm text-yellow-800">
              <span className="font-medium">Tekstur:</span> Tambahkan sedikit santan segar jika ingin tekstur lebih creamy
            </p>
            <p className="text-sm text-yellow-800">
              <span className="font-medium">Penyimpanan:</span> Rendang akan semakin nikmat setelah didiamkan semalaman
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServingSuggestions;