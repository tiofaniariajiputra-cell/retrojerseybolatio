const { createClient } = require('@supabase/supabase-js')
const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

// Use environment variables
require('dotenv').config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function uploadImageToSupabase() {
    try {
        // Path to the generated image
        const imagePath = 'C:/Users/ASUS/.gemini/antigravity/brain/50cf3060-9a21-477d-afdf-f4a25b26a66f/sample_jersey_1768680344504.png'

        // Read the file
        const fileBuffer = fs.readFileSync(imagePath)

        // Generate unique filename
        const fileName = `products/${Date.now()}-jersey-sample.png`

        console.log('Uploading image to Supabase...')
        console.log('File:', imagePath)
        console.log('Target:', fileName)

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
            .from('jersey-images')
            .upload(fileName, fileBuffer, {
                contentType: 'image/png',
                upsert: true,
            })

        if (error) {
            console.error('Upload error:', error)
            return
        }

        console.log('Upload successful:', data)

        // Get public URL
        const { data: urlData } = supabase.storage
            .from('jersey-images')
            .getPublicUrl(fileName)

        const publicUrl = urlData.publicUrl
        console.log('Public URL:', publicUrl)

        // Update the product image in database
        const images = await prisma.productImage.findMany()

        if (images.length > 0) {
            console.log('Updating product image URL in database...')
            await prisma.productImage.update({
                where: { id: images[0].id },
                data: { url: publicUrl }
            })
            console.log('Database updated!')
        }

        console.log('\n✅ Done! Image has been uploaded and database updated.')
        console.log('New image URL:', publicUrl)

    } catch (error) {
        console.error('Error:', error)
    } finally {
        await prisma.$disconnect()
    }
}

uploadImageToSupabase()
