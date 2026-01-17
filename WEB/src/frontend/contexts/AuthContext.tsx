'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/frontend/lib/supabase-client'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const checkAdminRole = async (user: User | null) => {
    if (!user) {
      setIsAdmin(false)
      return
    }

    // Check if user has admin role in user_metadata or app_metadata
    const role = user.user_metadata?.role || user.app_metadata?.role
    setIsAdmin(role === 'admin')
  }

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
        checkAdminRole(session.user)
      } else {
        // Check for dev admin session in localStorage
        const devSession = localStorage.getItem('dev_admin_session')
        if (devSession) {
          try {
            const mockUser = JSON.parse(devSession)
            setUser(mockUser)
            setIsAdmin(true)
          } catch {
            localStorage.removeItem('dev_admin_session')
          }
        }
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      checkAdminRole(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      // First try Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (!error && data.session) {
        // Update local user state when login succeeds
        setUser(data.session?.user ?? null)
        return {}
      }

      // If Supabase Auth fails, try dev-login for admin
      if (email === 'admin@jersey.com') {
        const response = await fetch('/api/auth/dev-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })

        if (response.ok) {
          const devData = await response.json()
          // Create a mock user object for admin
          const mockUser = {
            id: devData.user.id,
            email: devData.user.email,
            user_metadata: devData.user.user_metadata,
            app_metadata: { role: 'admin' },
          } as unknown as User

          setUser(mockUser)
          setIsAdmin(true)
          // Store in localStorage for persistence
          localStorage.setItem('dev_admin_session', JSON.stringify(mockUser))
          return {}
        }
      }

      return { error: error?.message || 'Login failed' }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      return { error: message }
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    // Call our API route instead of directly calling Supabase
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Signup failed')
    }
  }

  const signOut = async () => {
    // Clear dev admin session from localStorage
    localStorage.removeItem('dev_admin_session')
    setUser(null)
    setIsAdmin(false)
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
