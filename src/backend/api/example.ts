// Example API route handler
// Place your Next.js API routes in app/api/ directory

import { NextResponse } from 'next/server'
import { prisma } from '@/backend/utils/prisma'

export async function GET() {
  try {
    // Example: Fetch users from database
    const users = await prisma.user.findMany()
    
    return NextResponse.json({ users }, { status: 200 })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Example: Create a new user
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
      },
    })
    
    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
