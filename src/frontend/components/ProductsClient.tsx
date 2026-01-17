"use client"

import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import FilterToggle from './FilterToggle'
import Image from 'next/image'
import Link from 'next/link'

type ImageType = { url: string; alt?: string }
type Size = { id: string; size: string; stock?: number }
type Product = {
  id: string
  slug: string
  name: string
  images?: ImageType[]
  sizes?: Size[]
  price?: number
  club?: string
  season?: string
  category?: { name?: string }
}
type Category = { id: string; name: string; slug: string }

function useDebounced<T>(value: T, delay = 300) {
  const [v, setV] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return v
}

export default function ProductsClient() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const searchParams = useSearchParams()
  const [category, setCategory] = useState<string | null>(null)
  const [search, setSearch] = useState<string>('')
  const debouncedSearch = useDebounced(search, 300)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // fetch categories
    fetch('/api/categories')
      .then((r) => r.json())
      .then((data) => setCategories(data.categories || []))
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    // sync category from URL search params
    const q = searchParams?.get('category') || null
    setCategory((prev) => (prev !== q ? q : prev))
  }, [searchParams])

  useEffect(() => {
    let mounted = true
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (debouncedSearch) params.set('search', debouncedSearch)

    const fetchProducts = async () => {
      try {
        if (mounted) setLoading(true)
        const r = await fetch('/api/products?' + params.toString())
        const data = await r.json()
        if (!mounted) return
        setProducts(data.products || [])
      } catch (err) {
        console.error(err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchProducts()
    return () => {
      mounted = false
    }
  }, [category, debouncedSearch])

  const total = products.length

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Koleksi Jersey Retro</h1>
            <p className="text-gray-600">Temukan jersey klasik favorit Anda dari berbagai klub legendaris</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Produk</p>
            <p className="text-3xl font-bold text-blue-600">{total}</p>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between gap-4">
          <FilterToggle categories={categories} category={category} search={search} />

          <div className="flex items-center gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari produk, klub, atau musim..."
              className="px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <p className="text-gray-500 text-lg mb-6">Belum ada produk tersedia.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: Product) => {
              const primaryImage = product.images?.[0]
              const totalStock = (product.sizes || []).reduce((sum: number, size: Size) => sum + (size.stock || 0), 0)

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div className="relative h-72 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {primaryImage ? (
                      <Image src={primaryImage.url} alt={primaryImage.alt || product.name} fill className="object-cover group-hover:scale-110 transition duration-500" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-300"></div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-gray-800 shadow-lg">
                      {product.category?.name}
                    </div>

                    {totalStock === 0 ? (
                      <div className="absolute top-3 left-3 bg-red-500 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg">Stok Habis</div>
                    ) : totalStock < 10 ? (
                      <div className="absolute top-3 left-3 bg-orange-500 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg">Stok Terbatas</div>
                    ) : null}
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition min-h-[3.5rem]">{product.name}</h3>

                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <span className="font-medium">{product.club}</span>
                      <span className="text-gray-400">•</span>
                      <span>{product.season}</span>
                    </div>

                    <div className="flex items-end justify-between mb-4 pb-4 border-b border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Harga</p>
                        <p className="text-2xl font-extrabold text-blue-600">Rp {Number(product.price).toLocaleString('id-ID')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 mb-1">Stok</p>
                        <p className={`text-lg font-bold ${totalStock > 0 ? 'text-green-600' : 'text-red-600'}`}>{totalStock}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Ukuran Tersedia</p>
                      <div className="flex flex-wrap gap-1.5">
                        {(product.sizes || [])
                          .sort((a: Size, b: Size) => ['S', 'M', 'L', 'XL', 'XXL'].indexOf(a.size) - ['S', 'M', 'L', 'XL', 'XXL'].indexOf(b.size))
                          .map((size: Size) => (
                            <span key={size.id} className={`text-xs font-bold px-3 py-1.5 rounded-lg border-2 transition ${size.stock > 0 ? 'bg-green-50 border-green-500 text-green-700' : 'bg-gray-50 border-gray-300 text-gray-400 line-through'}`}>{size.size}</span>
                          ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-center text-blue-600 font-semibold text-sm group-hover:text-blue-700">
                        <span>Lihat Detail</span>
                        <span className="ml-2 transform group-hover:translate-x-1 transition">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
