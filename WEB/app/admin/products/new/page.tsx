'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ImageUploader from '@/frontend/components/ImageUploader'

interface Category {
  id: string
  name: string
  slug: string
}

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    // Fetch categories
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data.categories || []))
      .catch(err => console.error('Failed to fetch categories:', err))
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!imageUrl) {
      setError('Silakan upload gambar produk terlebih dahulu')
      setLoading(false)
      return
    }

    const formData = new FormData(e.currentTarget)

    // Find category by slug to get ID
    const categorySlug = formData.get('categoryId') as string
    const category = categories.find(c => c.slug === categorySlug)

    if (!category) {
      setError('Kategori tidak valid')
      setLoading(false)
      return
    }

    const data = {
      name: formData.get('name'),
      slug: formData.get('slug'),
      club: formData.get('club'),
      season: formData.get('season'),
      description: formData.get('description'),
      price: Number(formData.get('price')),
      categoryId: category.id,
      imageUrl: imageUrl,
      sizes: {
        S: Number(formData.get('size_S')),
        M: Number(formData.get('size_M')),
        L: Number(formData.get('size_L')),
        XL: Number(formData.get('size_XL')),
        XXL: Number(formData.get('size_XXL')),
      },
    }

    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to create product')
      }

      router.push('/admin/products')
      router.refresh()
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message)
      else setError(String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Tambah Produk Baru</h1>
        <p className="text-gray-600 mt-1">Tambahkan jersey baru ke katalog</p>
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                placeholder="Manchester United 1999 Home"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                placeholder="manchester-united-1999-home"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                placeholder="Manchester United"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                placeholder="1998-1999"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                placeholder="250000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Kategori *
              </label>
              <select
                name="categoryId"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              >
                <option value="">Pilih Kategori</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              placeholder="Deskripsi singkat tentang jersey..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Gambar Produk *
            </label>
            <ImageUploader
              onUploadComplete={(url) => setImageUrl(url)}
              currentImageUrl={imageUrl}
            />
            {imageUrl && (
              <p className="text-sm text-green-600 mt-2">✓ Gambar berhasil diupload</p>
            )}
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
                    defaultValue="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading || !imageUrl}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Menyimpan...' : 'Simpan Produk'}
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

// recovery: page fix #11

// recovery: automated tweak commit #8
