import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/backend/utils/prisma'

// Development-only admin login bypass
// This should be removed in production!
export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json()

        // Check for admin credentials
        if (email === 'admin@jersey.com' && password === 'admin123') {
            // Get admin user from database
            let user = await prisma.user.findUnique({
                where: { email: 'admin@jersey.com' }
            })

            if (!user) {
                // Create admin user if not exists
                user = await prisma.user.create({
                    data: {
                        email: 'admin@jersey.com',
                        name: 'Admin Jersey',
                        role: 'admin'
                    }
                })
            }

            // Return a mock session for development
            return NextResponse.json({
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    user_metadata: {
                        name: user.name,
                        role: user.role
                    }
                }
            })
        }

        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

    } catch (error: unknown) {
        console.error('Dev login error:', error)
        const message = error instanceof Error ? error.message : String(error)
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
