import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/backend/utils/supabase'

export async function POST() {
    try {
        // Check if bucket exists
        const { data: buckets, error: listError } = await supabaseAdmin.storage.listBuckets()

        if (listError) {
            console.error('Error listing buckets:', listError)
            return NextResponse.json({ error: listError.message }, { status: 500 })
        }

        const bucketExists = buckets?.some(bucket => bucket.name === 'jersey-images')

        if (bucketExists) {
            return NextResponse.json({
                message: 'Bucket "jersey-images" already exists',
                success: true
            })
        }

        // Create the bucket
        const { data, error } = await supabaseAdmin.storage.createBucket('jersey-images', {
            public: true,
            allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
            fileSizeLimit: 5 * 1024 * 1024, // 5MB
        })

        if (error) {
            console.error('Error creating bucket:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({
            message: 'Bucket "jersey-images" created successfully',
            success: true,
            data
        })
    } catch (error: unknown) {
        console.error('Create bucket error:', error)
        const message = error instanceof Error ? error.message : String(error)
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
