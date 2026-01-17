'use client'

import Link from 'next/link'
import { useAuth } from '@/frontend/contexts/AuthContext'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const { user, signOut, isAdmin } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">⚽</span>
              <span className="font-bold text-xl text-gray-900">Jersey Bola Retro</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`transition font-medium ${
                isActive('/') && !isActive('/products') && !isActive('/about')
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className={`transition font-medium ${
                isActive('/products') 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Produk
            </Link>
            <Link 
              href="/about" 
              className={`transition font-medium ${
                isActive('/about') 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              More Info
            </Link>
            
            {user ? (
              <>
                {isAdmin && (
                  <Link 
                    href="/admin" 
                    className={`transition font-medium ${
                      isActive('/admin') 
                        ? 'text-blue-600 border-b-2 border-blue-600' 
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    Dashboard Admin
                  </Link>
                )}
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {user.user_metadata?.name || user.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className={`transition font-medium ${
                    isActive('/login') 
                      ? 'text-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className={`transition font-medium ${
                  isActive('/') && !isActive('/products') && !isActive('/about')
                    ? 'text-blue-600 font-bold' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className={`transition font-medium ${
                  isActive('/products') 
                    ? 'text-blue-600 font-bold' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Produk
              </Link>
              <Link 
                href="/about" 
                className={`transition font-medium ${
                  isActive('/about') 
                    ? 'text-blue-600 font-bold' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                More Info
              </Link>
              
              {user ? (
                <>
                  {isAdmin && (
                    <Link 
                      href="/admin" 
                      className={`transition font-medium ${
                        isActive('/admin') 
                          ? 'text-blue-600 font-bold' 
                          : 'text-gray-700 hover:text-blue-600'
                      }`}
                    >
                      Dashboard Admin
                    </Link>
                  )}
                  <span className="text-sm text-gray-600">
                    {user.user_metadata?.name || user.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className={`transition font-medium ${
                      isActive('/login') 
                        ? 'text-blue-600 font-bold' 
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-center"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
