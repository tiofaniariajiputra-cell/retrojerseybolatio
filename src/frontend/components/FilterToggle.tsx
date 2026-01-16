"use client"

import React, { useState } from 'react'
import Link from 'next/link'

type Category = { id: string; name: string; slug: string }

export default function FilterToggle({
  categories,
  category,
  search,
}: {
  categories: Category[]
  category?: string | null
  search?: string | null
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition"
      >
        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-50 text-blue-600 rounded-full text-lg">⚽</span>
        <span className="text-sm font-semibold text-gray-700">Filter</span>
      </button>

      {open && (
        <div className="mt-3 bg-white rounded-xl shadow-sm border border-gray-200 p-4 w-full max-w-full sm:max-w-md z-50">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm font-semibold text-gray-700">Filter Kategori:</span>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/products${search ? `?search=${encodeURIComponent(search as string)}` : ''}`}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  !category ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Semua
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.slug}${search ? `&search=${encodeURIComponent(search as string)}` : ''}`}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    category === cat.slug ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
