require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function useLocalImage() {
    try {
        // Get all product images
        const images = await prisma.productImage.findMany()

        console.log(`Found ${images.length} images to update`)

        for (const image of images) {
            // Use local image from public folder
            const newUrl = '/sample-jersey.png'

            console.log(`Updating image ${image.id}:`)
            console.log(`  Old: ${image.url}`)
            console.log(`  New: ${newUrl}`)

            await prisma.productImage.update({
                where: { id: image.id },
                data: { url: newUrl }
            })
        }

        console.log('\n✅ Done! All images now use local file.')
    } catch (error) {
        console.error('Error:', error)
    } finally {
        await prisma.$disconnect()
    }
}

useLocalImage()
