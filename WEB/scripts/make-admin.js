const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function makeAdmin() {
    console.log('🔧 Setting up admin account...')

    try {
        // First, check if admin user exists
        let user = await prisma.user.findUnique({
            where: { email: 'admin@jersey.com' }
        })

        if (user) {
            // Update existing user to admin
            user = await prisma.user.update({
                where: { email: 'admin@jersey.com' },
                data: { role: 'admin', name: 'Admin Jersey' }
            })
            console.log('✅ Existing user updated to admin!')
        } else {
            // Create new admin user
            user = await prisma.user.create({
                data: {
                    email: 'admin@jersey.com',
                    name: 'Admin Jersey',
                    role: 'admin'
                }
            })
            console.log('✅ New admin user created!')
        }

        // List all users
        const users = await prisma.user.findMany()
        console.log('\n📋 All users in database:')
        users.forEach(u => {
            console.log(`   - ${u.email} (${u.role})`)
        })

        console.log('\n====================================')
        console.log('🔐 ADMIN LOGIN INFO:')
        console.log('====================================')
        console.log('📧 Email:    admin@jersey.com')
        console.log('🔑 Password: (set via Supabase Auth)')
        console.log('====================================')
        console.log('\n⚠️  Note: You need to register this email')
        console.log('   at /register first to set the password!')

    } catch (err) {
        console.error('❌ Error:', err.message)
    } finally {
        await prisma.$disconnect()
    }
}

makeAdmin()
