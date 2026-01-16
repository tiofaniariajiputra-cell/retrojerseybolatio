import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/backend/utils/prisma'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    // Create supabase admin client
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Email admin yang akan auto-granted admin role
    const isAdminEmail = email.toLowerCase() === 'admin@example.com' || email.toLowerCase() === 'admin@gmail.com'

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto confirm email
      user_metadata: {
        name,
        role: isAdminEmail ? 'admin' : 'user'
      }
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
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

  } catch (error: any) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
