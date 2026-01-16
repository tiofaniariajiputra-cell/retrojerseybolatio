const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Read .env file manually
const envPath = path.join(__dirname, '..', '.env')
const envContent = fs.readFileSync(envPath, 'utf-8')
const envVars = {}
envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=')
  if (key && valueParts.length) {
    envVars[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '')
  }
})

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = envVars.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createAdmin() {
  try {
    console.log('🔄 Creating admin user...')
    
    const { data, error } = await supabase.auth.admin.createUser({
      email: 'admin@jerseyretro.com',
      password: 'admin123',
      email_confirm: true,
      user_metadata: {
        name: 'Administrator',
        role: 'admin'
      }
    })

    if (error) {
      console.error('❌ Error creating admin:', error.message)
      process.exit(1)
    }

    console.log('✅ Admin user created successfully!')
    console.log('📧 Email: admin@jerseyretro.com')
    console.log('🔑 Password: admin123')
    console.log('👤 Role: admin')
    console.log('\n🎉 You can now login with these credentials!')
  } catch (err) {
    console.error('❌ Unexpected error:', err.message)
    process.exit(1)
  }
}

createAdmin()
