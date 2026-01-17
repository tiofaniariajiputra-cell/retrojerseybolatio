import { NextResponse } from 'next/server'
import { prisma } from '@/backend/utils/prisma'
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    })

    return NextResponse.json({ categories })
  } catch (error: unknown) {
    console.error('Get categories error:', error)
    const err = error as Error & { name?: string }
    if (err?.message?.includes("Can't reach database server") || err?.name === 'PrismaClientInitializationError') {
      return NextResponse.json({ categories: [] })
    }
    return NextResponse.json({ error: err?.message ?? 'Unknown error' }, { status: 500 })
  }
}
