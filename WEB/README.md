# Jersey Bola Retro

Project Next.js untuk website jersey bola retro dengan integrasi Supabase dan Prisma ORM.

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Authentication**: Supabase Auth

## Struktur Folder

```
jersey-bola-retro/
├── src/
│   ├── backend/          # Backend logic
│   │   ├── api/          # API route handlers
│   │   ├── services/     # Business logic
│   │   ├── models/       # Data models
│   │   └── utils/        # Utilities (Prisma, Supabase)
│   └── frontend/         # Frontend logic
│       ├── components/   # React components
│       ├── hooks/        # Custom React hooks
│       ├── types/        # TypeScript types
│       └── lib/          # Client libraries
├── app/                  # Next.js App Router
├── prisma/               # Prisma schema & migrations
└── public/               # Static assets
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Salin `.env.example` ke `.env` dan isi dengan credentials Supabase Anda:

```bash
cp .env.example .env
```

Isi variabel berikut di `.env`:
- `DATABASE_URL`: Connection string PostgreSQL dari Supabase
- `DIRECT_URL`: Direct connection string (sama seperti DATABASE_URL untuk Supabase)
- `NEXT_PUBLIC_SUPABASE_URL`: URL project Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Anon/public key dari Supabase
- `SUPABASE_SERVICE_ROLE_KEY`: Service role key (untuk operasi admin)

### 3. Setup Database dengan Prisma

Generate Prisma Client:

```bash
npx prisma generate
```

Push schema ke database:

```bash
npx prisma db push
```

Atau buat migration:

```bash
npx prisma migrate dev --name init
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Prisma Commands

- `npx prisma studio` - Buka Prisma Studio untuk melihat database
- `npx prisma generate` - Generate Prisma Client
- `npx prisma db push` - Push schema tanpa migration
- `npx prisma migrate dev` - Buat migration baru
- `npx prisma db pull` - Pull schema dari database

## Cara Menggunakan

### Backend (API Routes)

Buat API route di `app/api/`:

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/backend/utils/prisma'

export async function GET() {
  const users = await prisma.user.findMany()
  return NextResponse.json({ users })
}
```

### Frontend (Components)

Gunakan hooks dan components yang ada:

```typescript
// app/page.tsx
import ExampleComponent from '@/frontend/components/ExampleComponent'

export default function Home() {
  return <ExampleComponent userId="123" />
}
```

### Services

Buat services untuk business logic di `src/backend/services/`:

```typescript
import { userService } from '@/backend/services/user.service'

const users = await userService.getAllUsers()
```

## Learn More

To learn more about Next.js and the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

MIT

