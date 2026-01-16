import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/backend/utils/prisma'

export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    })

    return NextResponse.json({ categories })
  } catch (error: any) {
    console.error('Get categories error:', error)
    if (error?.message?.includes("Can't reach database server") || error?.name === 'PrismaClientInitializationError') {
      return NextResponse.json({ categories: [] })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
