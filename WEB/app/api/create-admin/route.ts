import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/backend/utils/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Create admin user with Supabase Admin API
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        name: name || 'Admin',
        role: 'admin',
      },
    })

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      message: 'Admin user created successfully',
      user: {
        id: authData.user.id,
        email: authData.user.email,
        role: 'admin',
      },
    })
  } catch (error: unknown) {
    console.error('Create admin error:', error)
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
