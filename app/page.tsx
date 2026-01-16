import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Jersey Bola Retro
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Koleksi Jersey Klasik Terlengkap dari Berbagai Klub & Era
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Lihat Koleksi
              </Link>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '62xxx'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition flex items-center justify-center gap-2"
              >
                <span>💬</span>
                <span>Order via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Kenapa Pilih Kami?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2">Kualitas Original</h3>
              <p className="text-gray-600">
                Jersey retro berkualitas premium dengan detail autentik
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-semibold mb-2">Pengiriman Cepat</h3>
              <p className="text-gray-600">
                Pengiriman ke seluruh Indonesia dengan packing aman
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">💯</div>
              <h3 className="text-xl font-semibold mb-2">Harga Terjangkau</h3>
              <p className="text-gray-600">
                Harga kompetitif dengan kualitas terjamin
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Clubs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Klub Populer
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'Manchester United',
              'Real Madrid',
              'Barcelona',
              'AC Milan',
              'Liverpool',
              'Arsenal',
              'Juventus',
              'Bayern Munich'
            ].map((club) => (
              <div
                key={club}
                className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition cursor-pointer"
              >
                <div className="text-3xl mb-2">⚽</div>
                <p className="font-semibold text-gray-800">{club}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Siap Order Jersey Retro Impian Anda?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Hubungi kami sekarang via WhatsApp untuk konsultasi dan pemesanan
          </p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '62xxx'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition text-lg"
          >
            <span>💬</span>
            <span>Chat Sekarang</span>
          </a>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Apa Kata Pelanggan Kami?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-xl">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-gray-600 mb-4">
                "Jersey yang diterima sesuai ekspektasi! Kualitas bagus dan pengiriman cepat. Sangat puas!"
              </p>
              <p className="font-semibold text-gray-900">- Budi S.</p>
              <p className="text-sm text-gray-500">Jakarta</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-xl">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-gray-600 mb-4">
                "Koleksi jersey retro terlengkap! Admin responsif dan membantu. Highly recommended!"
              </p>
              <p className="font-semibold text-gray-900">- Andi P.</p>
              <p className="text-sm text-gray-500">Bandung</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-xl">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-gray-600 mb-4">
                "Harga terjangkau dengan kualitas premium. Packing rapi dan aman. Terima kasih!"
              </p>
              <p className="font-semibold text-gray-900">- Rini M.</p>
              <p className="text-sm text-gray-500">Surabaya</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Tentang Jersey Bola Retro
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Kami adalah toko spesialis jersey retro yang menyediakan koleksi jersey klasik dari berbagai klub dan era. 
                Setiap jersey dipilih dengan cermat untuk memastikan kualitas dan keaslian desain.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Dengan pengalaman bertahun-tahun, kami berkomitmen memberikan pelayanan terbaik kepada para pecinta jersey retro di seluruh Indonesia.
              </p>
              <Link
                href="/more-info"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Selengkapnya →
              </Link>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-8 rounded-lg">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                    5+
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Tahun Pengalaman</p>
                    <p className="text-sm text-gray-600">Melayani pecinta jersey retro</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                    1K+
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Pelanggan Puas</p>
                    <p className="text-sm text-gray-600">Di seluruh Indonesia</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                    100+
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Koleksi Jersey</p>
                    <p className="text-sm text-gray-600">Dari berbagai klub dan era</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
