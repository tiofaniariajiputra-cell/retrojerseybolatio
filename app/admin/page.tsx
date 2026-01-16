import { prisma } from '@/backend/utils/prisma'

export default async function AdminDashboard() {
  // Get statistics with graceful handling when the DB is unreachable
  let totalProducts = 0
  let totalCategories = 0
  let lowStockProducts: any[] = []
  let recentProducts: any[] = []
  let totalStock = 0

  try {
    ;[
      totalProducts,
      totalCategories,
      lowStockProducts,
      recentProducts,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.product.findMany({
        where: {
          stock: {
            lt: 10,
          },
        },
        include: {
          category: true,
          sizes: true,
        },
        take: 5,
      }),
      prisma.product.findMany({
        include: {
          category: true,
          images: {
            where: { isPrimary: true },
            take: 1,
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ])

    const allProducts = await prisma.product.findMany({
      include: { sizes: true },
    })
    totalStock = allProducts.reduce((sum: number, product: any) => {
      return sum + product.sizes.reduce((pSum: number, size: any) => pSum + size.stock, 0)
    }, 0)
  } catch (err) {
    // Log the error but do not crash the page — show empty/default stats instead
    // eslint-disable-next-line no-console
    console.error('AdminDashboard DB error:', err)
    totalProducts = 0
    totalCategories = 0
    lowStockProducts = []
    recentProducts = []
    totalStock = 0
  }

  const stats = [
    {
      title: 'Total Produk',
      value: totalProducts,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Kategori',
      value: totalCategories,
      color: 'bg-green-500',
    },
    {
      title: 'Total Stok',
      value: totalStock,
      color: 'bg-purple-500',
    },
    {
      title: 'Stok Rendah',
      value: lowStockProducts.length,
      color: 'bg-red-500',
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
        <p className="text-gray-600 mt-2">Selamat datang di panel admin Jersey Bola Retro</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} w-12 h-12 rounded-full`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Low Stock Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Produk Stok Rendah</h2>
          {lowStockProducts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Tidak ada produk dengan stok rendah</p>
          ) : (
            <div className="space-y-3">
              {lowStockProducts.map((product: any) => {
                const totalStock = product.sizes.reduce((sum: number, size: any) => sum + size.stock, 0)
                return (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                    <div>
                      <p className="font-semibold text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.category.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-red-600">{totalStock}</p>
                      <p className="text-xs text-gray-500">unit</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Produk Terbaru</h2>
          {recentProducts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Belum ada produk</p>
          ) : (
            <div className="space-y-3">
              {recentProducts.map((product: any) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.category.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-blue-600">
                      Rp {Number(product.price).toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/products/new"
            className="bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition text-center font-semibold"
          >
            Tambah Produk Baru
          </a>
          <a
            href="/admin/products"
            className="bg-gray-600 text-white px-6 py-4 rounded-lg hover:bg-gray-700 transition text-center font-semibold"
          >
            Kelola Produk
          </a>
          <a
            href="/products"
            className="bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition text-center font-semibold"
          >
            Lihat Katalog
          </a>
        </div>
      </div>
    </div>
  )
}
