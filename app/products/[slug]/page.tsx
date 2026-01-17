import { prisma } from '@/backend/utils/prisma'
import { getWaNumber } from '@/frontend/lib/whatsapp'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

type ImageType = { id: string; url: string; alt?: string | null; isPrimary?: boolean }
type Size = { id: string; size: string; stock: number }

interface Props {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      images: {
        orderBy: { order: 'asc' },
      },
      sizes: {
        orderB
  }

  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0]
  const totalStock = product.sizes.reduce((sum: number, size: Size) => sum + size.stock, 0)
  const availableSizes = product.sizes.filter((size: Size) => size.stock > 0)

  const whatsappNumber = getWaNumber()
  const whatsappMessage = encodeURIComponent(
    `Halo, saya tertarik dengan jersey:\n\n` +
    `Produk: ${product.name}\n` +
    `Harga: Rp ${Number(product.price).toLocaleString('id-ID')}\n\n` +
    `Mohon info ketersediaan dan cara pemesanannya. Terima kasih!`
  )
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div classay-900">{product.name}</span>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Images Section */}
            <div>
              {/* Main Image */}
              <div className="relative h-96 lg:h-[500px] bg-gray-200 rounded-lg overflow-hidden mb-4">
                {primaryImage ? (
                  <Image
                    src={primaryImage.url}
                    alt={primaryImage.alt || product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-6xl">
                    ⚽
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image) => (
                    <div
                      key={image.id}
                      className="relative h-20 bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition"
                    >
                      <Image
                        src={image.url}
                        alt={image.alt || product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div>
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                  {product.category.name}
                </span>
              </div>

              {/* Product Name */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Club & Season */}
              <div className="flex items-center gap-4 mb-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚽</span>
                  <span className="font-medium">{product.club}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">📅</span>
                  <span>{product.season}</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-blue-600">
                  Rp {Number(product.price).toLocaleString('id-ID')}
                </span>
              </div>

              {/* Stock Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-700">Ketersediaan:</span>
                  <span className={`font-semibold ${totalStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {totalStock > 0 ? `${totalStock} item tersedia` : 'Stok Habis'}
                  </span>
                </div>

                {/* Available Sizes */}
                {availableSizes.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Ukuran tersedia:</p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size: Size) => (
                        <div
                          key={size.id}
                          className={`px-4 py-2 rounded-lg border-2 text-sm font-semibold ${
                            size.stock > 0
                              ? 'border-green-500 bg-green-50 text-green-700'
                              : 'border-gray-300 bg-gray-100 text-gray-400 line-through'
                          }`}
                        >
                          {size.size} {size.stock > 0 && `(${size.stock})`}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Deskripsi:</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* WhatsApp Order Button */}
              <div className="space-y-4">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-green-600 transition flex items-center justify-center gap-3 shadow-lg"
                >
                  <span className="text-2xl">💬</span>
                  <span>Order via WhatsApp</span>
                </a>

                <div className="text-center text-sm text-gray-500">
                  <p>Hubungi kami untuk informasi lebih lanjut dan pemesanan</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products - Optional */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Produk Serupa</h2>
          <div className="text-gray-600">
            <Link href="/products" className="text-blue-600 hover:underline">
              Lihat semua produk →
            </Link>
          </
}
