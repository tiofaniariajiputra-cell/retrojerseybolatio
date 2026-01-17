import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/backend/utils/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, slug, club, season, description, price, categoryId, imageUrl, sizes } = body

    // Calculate total stock
    const totalStock = Object.values(sizes).reduce((sum: number, stock) => sum + (stock as number), 0)

    // Create product
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        club,
        season,
        description: description || null,
        price,
        stock: totalStock,
        categoryId: categoryId,
        images: {
          create: {
            url: imageUrl,
            alt: name,
            isPrimary: true,
            order: 0,
          },
        },
        sizes: {
          create: Object.entries(sizes).map(([size, stock]) => ({
            size,
            stock: stock as number,
          })),
        },
      },
    })

    return NextResponse.json({ product }, { status: 201 })
  } catch (error: unknown) {
    console.error('Create product error:', error)
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        images: true,
        sizes: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ products })
  } catch (error: unknown) {
    console.error('Get products error:', error)
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
