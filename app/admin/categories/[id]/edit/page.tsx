"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Category {
  id: string
  name: string
  slug: string
}

export default function EditCategoryPage({ params }: { params: { id: string } }) {
  const id = params.id
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')
  const [category, setCategory] = useState<Category | null>(null)
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')

  useEffect(() => {
    // Fetch category
    fetch(`/api/admin/categories/${id}`)
      .then(res => res.json())
      .then(data => {
        setCategory(data.category)
        setName(data.category.name)
        setSlug(data.category.slug)
        setFetching(false)
      })
      .catch((err: unknown) => {
        console.error('Failed to fetch category:', err)
        setError('Gagal memuat data kategori')
        setFetching(false)
      })
  }, [id])

  const handleNameChange = (value: string) => {
    setName(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/admin/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update category')
      }

      router.push('/admin/categories')
      router.refresh()
    } catch (err: unknown) {
      const e = err as Error
      setError(e?.message || 'Gagal memperbarui kategori')
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

  if (!category) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">Kategori tidak ditemukan</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Kategori</h1>
        <p className="text-gray-600 mt-1">Update informasi kategori</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Nama Kategori *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Slug (URL) *
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-black"
            />
            <p className="text-xs text-gray-500 mt-1">
              Hati-hati mengubah slug, ini akan mempengaruhi URL produk
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Menyimpan...' : 'Update Kategori'}
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
