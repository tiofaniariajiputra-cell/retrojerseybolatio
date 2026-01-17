import { getWaNumber } from '@/frontend/lib/whatsapp'

export default function Footer() {
  const waNumber = getWaNumber()
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">Jersey Bola Retro</h3>
            <p className="text-gray-400 text-sm">
              Toko jersey retro terlengkap dengan koleksi jersey klasik dari berbagai klub dan era.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Link Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="text-gray-400 hover:text-white transition">
                  Produk
                </a>
              </li>
              <li>
                <a href="/more-info" className="text-gray-400 hover:text-white transition">
                  More Info
                </a>
              </li>
            </ul>
          </div>

          {/* More Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Informasi</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">
                Lampung, Indonesia
              </li>
              <li className="text-gray-400">
                ⏰ Senin - Sabtu: 09:00 - 21:00
              </li>
              <li className="text-gray-400">
                📧 info@jerseyretro.com
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Kontak</h3>
            <p className="text-gray-400 text-sm mb-2">
              Order via WhatsApp untuk pemesanan
            </p>
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm"
            >
              <span>Chat WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Jersey Bola Retro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
