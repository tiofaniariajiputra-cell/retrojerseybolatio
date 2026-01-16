import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/backend/utils/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, slug } = body

    // Check if slug already exists
    const existing = await prisma.category.findUnique({
      where: { slug },
    })

    if (existing) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
    }

    // Create category
    const category = await prisma.category.create({
      data: {
        name,
        slug,
      },
    })

    return NextResponse.json({ category }, { status: 201 })
  } catch (error: any) {
    console.error('Create category error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: { name: 'asc' },
    })

    return NextResponse.json({ categories })
  } catch (error: any) {
    console.error('Get categories error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
