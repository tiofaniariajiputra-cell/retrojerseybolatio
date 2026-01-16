import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/backend/utils/prisma'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Delete product (cascade will delete images and sizes)
    await prisma.product.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error: any) {
    console.error('Delete product error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        images: true,
        sizes: true,
      },
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json({ product })
  } catch (error: any) {
    console.error('Get product error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, slug, club, season, description, price, categoryId, imageUrl, isAvailable, sizes } = body

    // Calculate total stock
    const totalStock = Object.values(sizes).reduce((sum: number, stock) => sum + (stock as number), 0)

    // Update product
    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        club,
        season,
        description: description || null,
        price,
        stock: totalStock,
        categoryId,
        isAvailable,
      },
    })

    // Update image
    await prisma.productImage.updateMany({
      where: { productId: id, isPrimary: true },
      data: { url: imageUrl },
    })

    // Update sizes
    for (const [size, stock] of Object.entries(sizes)) {
      await prisma.productSize.upsert({
        where: {
          productId_size: {
            productId: id,
            size: size,
          },
        },
        update: {
          stock: stock as number,
        },
        create: {
          productId: id,
          size: size,
          stock: stock as number,
        },
      })
    }

    return NextResponse.json({ product })
  } catch (error: any) {
    console.error('Update product error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
