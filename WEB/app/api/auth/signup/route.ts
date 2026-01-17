import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/backend/utils/prisma'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    // Create supabase client with anon key
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Email admin yang akan auto-granted admin role
    const isAdminEmail = email.toLowerCase() === 'admin@jersey.com' ||
      email.toLowerCase() === 'admin@example.com' ||
      email.toLowerCase() === 'admin@gmail.com'

    // Create user in Supabase Auth using signUp (not admin API)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role: isAdminEmail ? 'admin' : 'user'
        }
      }
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    if (!authData.user) {
      return NextResponse.json({ error: 'Failed to create user' }, { status: 400 })
    }

    // Create user in database
    const user = await prisma.user.create({
      data: {
        id: authData.user.id,
        email,
        name,
        role: isAdminEmail ? 'admin' : 'user'
      }
    })

    return NextResponse.json({
      message: 'User created successfully',
      user
    }, { status: 201 })

  } catch (error: unknown) {
    console.error('Signup error:', error)
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
