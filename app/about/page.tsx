import { getWaNumber } from '@/frontend/lib/whatsapp'

export default function AboutPage() {
  const waNumber = geter()
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">More Info</h1>
          <p className="text-xl text-gray-600">Tentang Jersey Bola Retro</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* About Us */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>Tentang Kami</span>
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Jersey Bola Retro adalah toko online yang menyediakan koleksi jersey retro terlengkap
                dari berbagai klub sepakbola legendaris di dunia.
              </p>
              <p>
                Kami berkomitmen untuk menyediakan produk berkualitas premium dengan harga yang terjangkau,
                sehingga para penggemar sepakbola dapat memiliki jersey favorit mereka dari era keemasan.
              </p>
              <p>
                Setiap jersey yang kami jual dipilih dengan cermat untuk memastikan kualitas dan
                keaslian desain retro yang autentik.
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>Informasi Kontak</span>
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div>
                  <p className="font-semibold text-gray-900">Alamat</p>
                  <p className="text-gray-600">Bandar Lampung, Lampung, Indonesia</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div>
                  <p className="font-semibold text-gray-900">Jam Operasional</p>
                  <p className="text-gray-600">Senin - Sabtu: 09:00 - 21:00</p>
                  <p className="text-gray-600">Minggu: Libur</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-600">info@jerseyretro.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div>
                  <p className="font-semibold text-gray-900 mb-2">WhatsApp</p>
                  <a
                    href={`https://wa.me/${waNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    <span>Chat WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Kenapa Pilih Jersey Bola Retro?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Kualitas Original</h3>
              <p className="text-gray-600 text-sm">
                Jersey retro berkualitas premium dengan detail autentik dan bahan terbaik
              </p>
            </div>

            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Pengiriman Cepat</h3>
              <p className="text-gray-600 text-sm">
                Pengiriman ke seluruh Indonesia dengan packing aman dan rapi
              </p>
            </div>

            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Harga Terjangkau</h3>
              <p className="text-gray-600 text-sm">
                Harga kompetitif dengan kualitas terjamin untuk semua kalangan
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions (FAQ)
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                ❓ Bagaimana cara memesan?
              </h3>
              <p className="text-gray-600">
                Anda bisa memesan melalui WhatsApp dengan menghubungi nomor yang tertera.
                Tim kami akan membantu proses pemesanan Anda.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                ❓ Apakah produk original?
              </h3>
              <p className="text-gray-600">
                Ya, semua jersey retro kami adalah produk berkualitas dengan detail autentik
                sesuai era aslinya.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                ❓ Berapa lama pengiriman?
              </h3>
              <p className="text-gray-600">
                Estimasi pengiriman tergantung lokasi, biasanya 2-5 hari kerja untuk area
                Jabodetabek dan 3-7 hari kerja untuk luar kota.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                ❓ Apakah bisa custom nomor punggung?
              </h3>
              <p className="text-gray-600">
                Ya, kami menyediakan layanan custom nomor punggung dan nama pemain.
                Silakan diskusikan dengan tim kami via WhatsApp.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-blue-600 text-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Punya Pertanyaan Lain?
          </h2>
          <p className
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition font-semibold"
          >
            <span>💬</span>
            <span>Chat WhatsApp Sekarang</span>
          </a>
        </div>
      </div>
    </div>
  )
}

// recovery: small tweak commit #1

// recovery: page fix #12
