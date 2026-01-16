'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { use } from 'react'

interface Category {
  id: string
  name: string
  slug: string
}

interface Product {
  id: string
  name: string
  slug: string
  club: string
  season: string
  description: string | null
  price: number
  categoryId: string
  isAvailable: boolean
  images: { url: string }[]
  sizes: { size: string; stock: number }[]
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    // Fetch product and categories
    Promise.all([
      fetch(`/api/admin/products/${id}`).then(res => res.json()),
      fetch('/api/categories').then(res => res.json())
    ])
      .then(([productData, categoriesData]) => {
        setProduct(productData.product)
        setCategories(categoriesData.categories || [])
        setFetching(false)
      })
      .catch(err => {
        console.error('Failed to fetch:', err)
        setError('Gagal memuat data produk')
        setFetching(false)
      })
  }, [id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      slug: formData.get('slug'),
      club: formData.get('club'),
      season: formData.get('season'),
      description: formData.get('description'),
      price: Number(formData.get('price')),
      categoryId: formData.get('categoryId'),
      imageUrl: formData.get('imageUrl'),
      isAvailable: formData.get('isAvailable') === 'true',
      sizes: {
        S: Number(formData.get('size_S')),
        M: Number(formData.get('size_M')),
        L: Number(formData.get('size_L')),
        XL: Number(formData.get('size_XL')),
        XXL: Number(formData.get('size_XXL')),
      },
    }

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to update product')
      }

      router.push('/admin/products')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">Produk tidak ditemukan</p>
      </div>
    )
  }

  const getSizeStock = (size: string) => {
    const sizeData = product.sizes.find(s => s.size === size)
    return sizeData?.stock || 0
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Produk</h1>
        <p className="text-gray-600 mt-1">Update informasi produk</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Nama Produk *
              </label>
              <input
                type="text"
                name="name"
                required
                defaultValue={product.name}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Slug (URL) *
              </label>
              <input
                type="text"
                name="slug"
                required
                defaultValue={product.slug}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Klub *
              </label>
              <input
                type="text"
                name="club"
                required
                defaultValue={product.club}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Season *
              </label>
              <input
                type="text"
                name="season"
                required
                defaultValue={product.season}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Harga (Rp) *
              </label>
              <input
                type="number"
                name="price"
                required
                min="0"
                step="1000"
                defaultValue={product.price}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Kategori *
              </label>
              <select
                name="categoryId"
                required
                defaultValue={product.categoryId}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              >
                <option value="">Pilih Kategori</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Deskripsi
            </label>
            <textarea
              name="description"
              rows={4}
              defaultValue={product.description || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              URL Gambar *
            </label>
            <input
              type="url"
              name="imageUrl"
              required
              defaultValue={product.images[0]?.url || ''}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-3">
              Stok per Ukuran *
            </label>
            <div className="grid grid-cols-5 gap-4">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <div key={size}>
                  <label className="block text-xs text-gray-600 mb-1">{size}</label>
                  <input
                    type="number"
                    name={`size_${size}`}
                    required
                    min="0"
                    defaultValue={getSizeStock(size)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Status *
            </label>
            <select
              name="isAvailable"
              defaultValue={product.isAvailable ? 'true' : 'false'}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            >
              <option value="true">Aktif</option>
              <option value="false">Nonaktif</option>
            </select>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Menyimpan...' : 'Update Produk'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
