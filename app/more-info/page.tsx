import { getWaNumber } from '@/frontend/lib/whatsapp'
import Link from 'next/link'

export default function MoreInfoPage() {
  const waNumber = getWaNumber()

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tentang Jersey Bola Retro
            </h1>
            <p className="text-xl text-blue-100">
              Destinasi Terpercaya untuk Jersey Klasik Berkualitas
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Siapa Kami?
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed text-lg">
                Jersey Bola Retro adalah toko spesialis yang fokus menyediakan jersey klasik dari berbagai klub terkenal dunia. 
                Kami memahami bahwa setiap jersey retro memiliki cerita dan kenangan tersendiri bagi para pecinta sepak bola.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed text-lg">
                Didirikan oleh para penggemar jersey retro, kami berkomitmen untuk menghadirkan koleksi jersey autentik dengan 
                kualitas terbaik dan harga yang kompetitif.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Kualitas Premium</h3>
                    <p className="text-gray-600">
                      Setiap jersey melalui quality control ketat untuk memastikan kualitas jahitan, bahan, dan detail desain
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Desain Autentik</h3>
                    <p className="text-gray-600">
                      Kami hanya menjual jersey dengan desain yang sesuai dengan original, termasuk logo, sponsor, dan detail lainnya
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Pelayanan Terbaik</h3>
                    <p className="text-gray-600">
                      Tim customer service kami siap membantu Anda menemukan jersey impian dengan pelayanan ramah dan profesional
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Mengapa Memilih Kami?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="text-5xl mb-4"></div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Pengiriman Aman</h3>
              <p className="text-gray-600 leading-relaxed">
                Jersey dikemas dengan bubble wrap dan box khusus untuk memastikan kondisi sempurna saat sampai ke tangan Anda
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="text-5xl mb-4">🔄</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Garansi Kepuasan</h3>
              <p className="text-gray-600 leading-relaxed">
                Kami memberikan garansi kepuasan. Jika ada masalah dengan produk, kami siap membantu penyelesaiannya
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="text-5xl mb-4">💳</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Pembayaran Mudah</h3>
              <p className="text-gray-600 leading-relaxed">
                Tersedia berbagai metode pembayaran untuk kemudahan transaksi Anda: transfer bank, e-wallet, dan COD
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="text-5xl mb-4"></div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Pengiriman Cepat</h3>
              <p className="text-gray-600 leading-relaxed">
                Bekerjasama dengan ekspedisi terpercaya untuk pengiriman ke seluruh Indonesia dalam 2-5 hari kerja
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Konsultasi Gratis</h3>
              <p className="text-gray-600 leading-relaxed">
                Tim kami siap membantu Anda memilih jersey yang tepat, memberikan saran ukuran, dan menjawab pertanyaan Anda
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition">
              <div className="text-5xl mb-4">🎁</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Bonus & Promo</h3>
              <p className="text-gray-600 leading-relaxed">
                Dapatkan berbagai promo menarik, diskon pembelian banyak, dan bonus khusus untuk pelanggan setia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Collection */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
            Koleksi Kami
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto text-lg">
            Kami menyediakan jersey retro dari berbagai era dan klub terkenal dunia, mulai dari tahun 80-an hingga 2000-an
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl text-center border-2 border-red-200">
              <div className="text-4xl mb-3">🏴󠁧󠁢󠁥󠁮󠁧󠁿</div>
              <h3 className="font-bold text-gray-900 mb-2">Premier League</h3>
              <p className="text-sm text-gray-600">Manchester United, Liverpool, Arsenal, Chelsea</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center border-2 border-blue-200">
              <div className="text-4xl mb-3">🇪🇸</div>
              <h3 className="font-bold text-gray-900 mb-2">La Liga</h3>
              <p className="text-sm text-gray-600">Real Madrid, Barcelona, Valencia, Atletico</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center border-2 border-green-200">
              <div className="text-4xl mb-3">🇮🇹</div>
              <h3 className="font-bold text-gray-900 mb-2">Serie A</h3>
              <p className="text-sm text-gray-600">AC Milan, Juventus, Inter Milan, Roma</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl text-center border-2 border-yellow-200">
              <div className="text-4xl mb-3">🇩🇪</div>
              <h3 className="font-bold text-gray-900 mb-2">Bundesliga</h3>
              <p className="text-sm text-gray-600">Bayern Munich, Borussia Dortmund, dan lainnya</p>
            </div>
          </div>
        </
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Lokasi</h3>
              <p className="text-gray-600">Bandar Lampung, Lampung, Indonesia</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">WhatsApp</h3>
              <p className="text-gray-600">Order via WhatsApp untuk respon cepat</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Jam Operasional</h3>
              <p className="text-gray-600">Senin - Sabtu<br/>09:00 - 21:00 WIB</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Siap Memiliki Jersey Retro Impian Anda?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Jangan ragu untuk menghubungi kami. Tim kami siap membantu Anda menemukan jersey yang sempurna!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition text-lg"
            >
              <span>💬</span>
              <span>Chat WhatsApp</span>
            </a>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
            >
              <span>🛍️</span>
              <span>Lihat Koleksi</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

// recovery: small tweak commit #6

// recovery: page fix #4

// recovery: automated tweak commit #3
