const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function fixImageUrls() {
    try {
        // Get all product images with the old bucket URL
        const images = await prisma.productImage.findMany()

        console.log(`Found ${images.length} images to check`)

        for (const image of images) {
            // Check if URL points to old 'jersey' bucket
            if (image.url && image.url.includes('/jersey/products/')) {
                const oldUrl = image.url
                const newUrl = image.url.replace('/jersey/products/', '/jersey-images/products/')

                console.log(`Updating image ${image.id}:`)
                console.log(`  Old: ${oldUrl}`)
                console.log(`  New: ${newUrl}`)

                await prisma.productImage.update({
                    where: { id: image.id },
                    data: { url: newUrl }
                })
            }
        }

        console.log('\nDone! All images have been updated to use the new bucket.')
    } catch (error) {
        console.error('Error:', error)
    } finally {
        await prisma.$disconnect()
    }
}

fixImageUrls()
