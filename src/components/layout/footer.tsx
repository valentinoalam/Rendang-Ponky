
import Link from 'next/link'
import React from 'react'
import { Phone, MapPin, Clock, Instagram, Facebook, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-rendang-darkbrown text-white">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              {/* Logo placeholder - replace with actual logo */}
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-sm">RP</span>
                </div>
                <h3 className="text-xl font-bold">Rendang Ponky</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Kelezatan tradisi rendang autentik Minangkabau dalam setiap gigitan. 
                Dibuat dengan resep turun temurun dan bahan-bahan pilihan terbaik.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Menu</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#tentang" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="#produk" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">
                  Produk
                </Link>
              </li>
              <li>
                <Link href="#testimoni" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">
                  Testimoni
                </Link>
              </li>
              <li>
                <Link href="#cara-pesan" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 text-sm">
                  Cara Pesan
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Phone className="w-4 h-4 mt-1 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">WhatsApp</p>
                  <a href="https://wa.me/6285694311195" 
                     className="text-white hover:text-yellow-400 transition-colors text-sm font-medium">
                    0812-3456-7890
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">Alamat</p>
                  <p className="text-white text-sm">Jakarta, Indonesia</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 mt-1 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">Jam Operasional</p>
                  <p className="text-white text-sm">08:00 - 20:00 WIB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Ikuti Kami</h4>
            <div className="flex space-x-3 mb-4">
              <a href="https://www.instagram.com/rendangponky/" className="w-8 h-8 bg-gray-700 hover:bg-yellow-600 rounded-full flex items-center justify-center transition-colors duration-200">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/valentinonooralam/#" className="w-8 h-8 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-200">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="mailto:info@rendangponky.com" className="w-8 h-8 bg-gray-700 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-200">
                <Mail className="w-4 h-4" />
              </a>
            </div>
            
            {/* Newsletter Signup */}
            <div>
              <p className="text-gray-300 text-sm mb-2">Dapatkan promo terbaru</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Email Anda"
                  className="flex-1 px-3 py-2 text-sm bg-gray-700 border border-gray-600 rounded-l-md focus:outline-none focus:border-yellow-400 text-white"
                />
                <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium rounded-r-md transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-300 text-sm">
                © 2025 Rendang Ponky. All rights reserved.
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Kelezatan Tradisi dalam Setiap Gigitan
              </p>
            </div>
            
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white text-xs transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-xs transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer