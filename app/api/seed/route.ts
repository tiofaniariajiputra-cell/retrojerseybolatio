// API route untuk seed database
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/backend/utils/prisma'

export async function POST(request: NextRequest) {
  try {
    // Clear existing data
    await prisma.productSize.deleteMany()
    await prisma.productImage.deleteMany()
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()

    // Create categories
    const categories = await Promise.all([
      prisma.category.create({ data: { name: 'Home', slug: 'home' } }),
      prisma.category.create({ data: { name: 'Away', slug: 'away' } }),
      prisma.category.create({ data: { name: 'Third', slug: 'third' } }),
      prisma.category.create({ data: { name: 'Special Edition', slug: 'special-edition' } }),
    ])

    // Create sample products
    const products = [
      {
        name: 'Manchester United 1999 Treble Retro Home',
        slug: 'manchester-united-1999-home',
        club: 'Manchester United',
        season: '1998-1999',
        description: 'Jersey klasik Manchester United saat meraih treble 1999.',
        price: 250000,
        stock: 25,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800',
      },
      {
        name: 'Real Madrid 2002 Champions League Retro Home',
        slug: 'real-madrid-2002-home',
        club: 'Real Madrid',
        season: '2001-2002',
        description: 'Jersey legendaris Real Madrid era Galacticos.',
        price: 275000,
        stock: 20,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800',
      },
      {
        name: 'Barcelona 2008-09 Retro Home',
        slug: 'barcelona-2008-home',
        club: 'Barcelona',
        season: '2008-2009',
        description: 'Jersey Barcelona era Pep Guardiola.',
        price: 260000,
        stock: 30,
        categoryId: categories[0].id,
        imageUrl: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aac?w=800',
      },
    ]

    for (const productData of products) {
      const { imageUrl, ...data } = productData
      
      await prisma.product.create({
        data: {
          ...data,
          images: {
            create: {
              url: imageUrl,
              alt: data.name,
              isPrimary: true,
              order: 0,
            },
          },
          sizes: {
            create: [
              { size: 'S', stock: 5 },
              { size: 'M', stock: 8 },
              { size: 'L', stock: 8 },
              { size: 'XL', stock: 6 },
              { size: 'XXL', stock: 3 },
            ],
          },
        },
      })
    }

    return NextResponse.json({ message: 'Database seeded successfully!', count: products.length })
  } catch (error: unknown) {
    console.error('Seed error:', error)
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
