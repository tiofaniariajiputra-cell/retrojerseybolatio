import { createClient } from '@supabase/supabase-js'

// Read from environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})

async function createAdmin() {
    console.log('🔧 Creating admin user...')

    const adminEmail = 'admin@jersey.com'
    const adminPassword = 'admin123'
    const adminName = 'Admin Jersey'

    try {
        // Create user with Supabase Auth Admin API
        const { data, error } = await supabase.auth.admin.createUser({
            email: adminEmail,
            password: adminPassword,
            email_confirm: true, // Auto-confirm email
            user_metadata: {
                name: adminName,
                role: 'admin'
            },
            app_metadata: {
                role: 'admin'
            }
        })

        if (error) {
            // If user already exists, try to update their role
            if (error.message.includes('already been registered')) {
                console.log('⚠️ User already exists, updating role...')

                // Get user by email
                const { data: users, error: listError } = await supabase.auth.admin.listUsers()
                if (listError) throw listError

                const existingUser = users.users.find(u => u.email === adminEmail)
                if (existingUser) {
                    const { error: updateError } = await supabase.auth.admin.updateUserById(
                        existingUser.id,
                        {
                            password: adminPassword,
                            email_confirm: true,
                            user_metadata: {
                                name: adminName,
                                role: 'admin'
                            },
                            app_metadata: {
                                role: 'admin'
                            }
                        }
                    )
                    if (updateError) throw updateError
                    console.log('✅ Admin user updated successfully!')
                }
            } else {
                throw error
            }
        } else {
            console.log('✅ Admin user created successfully!')
        }

        console.log('')
        console.log('====================================')
        console.log('🔐 ADMIN LOGIN CREDENTIALS:')
        console.log('====================================')
        console.log(`📧 Email:    ${adminEmail}`)
        console.log(`🔑 Password: ${adminPassword}`)
        console.log('====================================')
        console.log('')

    } catch (err) {
        console.error('❌ Error:', err)
        process.exit(1)
    }
}

createAdmin()
