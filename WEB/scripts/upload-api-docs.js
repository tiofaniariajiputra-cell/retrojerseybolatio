/**
 * Script untuk mengupload API Documentation ke Supabase Storage
 * File ini akan mengupload api-docs.html dan openapi.json ke bucket publik
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('❌ Missing Supabase credentials in .env file');
    console.log('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const BUCKET_NAME = 'api-docs';

async function createBucketIfNotExists() {
    console.log('📦 Checking/creating bucket...');

    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
        console.error('Error listing buckets:', listError);
        return false;
    }

    const bucketExists = buckets.some(b => b.name === BUCKET_NAME);

    if (!bucketExists) {
        console.log(`Creating bucket: ${BUCKET_NAME}`);
        const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
            public: true,
            allowedMimeTypes: ['text/html', 'application/json', 'text/css', 'application/javascript'],
            fileSizeLimit: 10485760 // 10MB
        });

        if (createError) {
            console.error('Error creating bucket:', createError);
            return false;
        }
        console.log('✅ Bucket created successfully');
    } else {
        console.log('✅ Bucket already exists');
    }

    return true;
}

async function uploadFile(localPath, remotePath, contentType) {
    console.log(`📤 Uploading ${path.basename(localPath)}...`);

    const fileContent = fs.readFileSync(localPath);

    // Delete existing file first (to update)
    await supabase.storage.from(BUCKET_NAME).remove([remotePath]);

    const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(remotePath, fileContent, {
            contentType: contentType,
            upsert: true,
            cacheControl: '3600'
        });

    if (error) {
        console.error(`Error uploading ${remotePath}:`, error);
        return null;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(remotePath);

    return urlData.publicUrl;
}

async function main() {
    console.log('\n🚀 Jersey Bola Retro - API Documentation Uploader\n');
    console.log('='.repeat(50));

    // Create bucket
    const bucketReady = await createBucketIfNotExists();
    if (!bucketReady) {
        console.error('❌ Failed to prepare bucket');
        process.exit(1);
    }

    // Read and modify api-docs.html to use absolute URL for openapi.json
    const apiDocsPath = path.join(__dirname, '..', 'public', 'api-docs.html');
    const openapiPath = path.join(__dirname, '..', 'public', 'openapi.json');

    // Upload openapi.json first
    const openapiUrl = await uploadFile(openapiPath, 'openapi.json', 'application/json');
    if (!openapiUrl) {
        console.error('❌ Failed to upload openapi.json');
        process.exit(1);
    }
    console.log(`✅ OpenAPI JSON: ${openapiUrl}`);

    // Modify api-docs.html to use the Supabase URL for openapi.json
    let htmlContent = fs.readFileSync(apiDocsPath, 'utf8');
    htmlContent = htmlContent.replace(
        'url: "/openapi.json"',
        `url: "${openapiUrl}"`
    );

    // Create a temporary modified file
    const tempHtmlPath = path.join(__dirname, 'temp-api-docs.html');
    fs.writeFileSync(tempHtmlPath, htmlContent);

    // Upload modified api-docs.html
    const docsUrl = await uploadFile(tempHtmlPath, 'index.html', 'text/html');
    if (!docsUrl) {
        console.error('❌ Failed to upload api-docs.html');
        fs.unlinkSync(tempHtmlPath);
        process.exit(1);
    }

    // Cleanup temp file
    fs.unlinkSync(tempHtmlPath);

    console.log(`✅ API Docs HTML: ${docsUrl}`);

    console.log('\n' + '='.repeat(50));
    console.log('\n🎉 Upload berhasil!\n');
    console.log('📌 Link API Documentation untuk Dosen:');
    console.log('\n' + '─'.repeat(50));
    console.log(`\n   ${docsUrl}\n`);
    console.log('─'.repeat(50));
    console.log('\n💡 Link ini bisa langsung dibuka di browser');
    console.log('   dan dibagikan ke dosen Anda.\n');
}

main().catch(console.error);
