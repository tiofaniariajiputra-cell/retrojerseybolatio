import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/backend/utils/prisma'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const search = url.searchParams.get('search') || undefined
    const category = url.searchParams.get('category') || undefined

    const where: any = { isAvailable: true }

    if (category) {
      where.category = { slug: category }
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { club: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        images: { where: { isPrimary: true }, take: 1 },
        sizes: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ products })
  } catch (error: any) {
    console.error('Get products error:', error)
    // If DB is unreachable during development, return empty list instead of 500
    if (error?.message?.includes("Can't reach database server") || error?.name === 'PrismaClientInitializationError') {
      return NextResponse.json({ products: [] })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
