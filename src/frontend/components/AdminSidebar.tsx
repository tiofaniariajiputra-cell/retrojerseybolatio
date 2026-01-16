'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminSidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: '📊',
    },
    {
      title: 'Kelola Produk',
      href: '/admin/products',
      icon: '⚽',
    },
    {
      title: 'Kategori',
      href: '/admin/categories',
      icon: '🏷️',
    },
  ]

  return (
    <div className="w-64 bg-gray-900 min-h-screen p-6">
      <div className="mb-8">
        <h2 className="text-white text-xl font-bold">Admin Panel</h2>
        <p className="text-gray-400 text-sm mt-1">Jersey Bola Retro</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || 
                          (item.href !== '/admin' && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-white text-gray-900 font-semibold'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
