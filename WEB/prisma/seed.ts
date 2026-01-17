import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.productSize.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email: 'admin@jersey.com',
      name: 'Admin Jersey',
      role: 'admin',
    },
  })
  console.log('✅ Created admin user')

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Home',
        slug: 'home',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Away',
        slug: 'away',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Third',
        slug: 'third',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Special Edition',
        slug: 'special-edition',
      },
    }),
  ])
  console.log('✅ Created categories')

  // Create sample products
  const products = [
    {
      name: 'Manchester United 1999 Treble Retro Home',
      slug: 'manchester-united-1999-home',
      club: 'Manchester United',
      season: '1998-1999',
      description: 'Jersey klasik Manchester United saat meraih treble 1999. Dengan nomor punggung Beckham, Giggs, atau Scholes.',
      price: 250000,
      stock: 25,
      categoryId: categories[0].id, // Home
      imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800',
    },
    {
      name: 'Real Madrid 2002 Champions League Retro Home',
      slug: 'real-madrid-2002-home',
      club: 'Real Madrid',
      season: '2001-2002',
      description: 'Jersey legendaris Real Madrid era Galacticos. Tersedia nomor Zidane, Ronaldo, Figo, dan Raul.',
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
      description: 'Jersey Barcelona era Pep Guardiola dengan Messi, Xavi, dan Iniesta.',
      price: 260000,
      stock: 30,
      categoryId: categories[0].id,
      imageUrl: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aac?w=800',
    },
    {
      name: 'AC Milan 2007 Champions League Away',
      slug: 'ac-milan-2007-away',
      club: 'AC Milan',
      season: '2006-2007',
      description: 'Jersey away AC Milan juara Champions League 2007. Era Kaka, Pirlo, Maldini.',
      price: 240000,
      stock: 15,
      categoryId: categories[1].id, // Away
      imageUrl: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800',
    },
    {
      name: 'Liverpool 2005 Istanbul Miracle Retro Home',
      slug: 'liverpool-2005-home',
      club: 'Liverpool',
      season: '2004-2005',
      description: 'Jersey ikonik Liverpool saat miracle di Istanbul. Gerrard, Alonso, Carragher.',
      price: 270000,
      stock: 18,
      categoryId: categories[0].id,
      imageUrl: 'https://images.unsplash.com/photo-1624880357913-a8539238245a?w=800',
    },
    {
      name: 'Arsenal 2003-04 Invincibles Home',
      slug: 'arsenal-2004-home',
      club: 'Arsenal',
      season: '2003-2004',
      description: 'Jersey Arsenal musim invincibles. Henry, Bergkamp, Vieira.',
      price: 265000,
      stock: 22,
      categoryId: categories[0].id,
      imageUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800',
    },
  ]

  for (const productData of products) {
    const { imageUrl, ...data } = productData
    
    const product = await prisma.product.create({
      data: {
        ...data,
        createdById: admin.id,
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
    console.log(`✅ Created product: ${product.name}`)
  }

  console.log('🎉 Database seed completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
