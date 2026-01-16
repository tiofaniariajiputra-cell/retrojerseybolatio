'use client'

import { useUser } from '@/frontend/hooks/useUser'

interface ExampleComponentProps {
  userId?: string
}

export default function ExampleComponent({ userId }: ExampleComponentProps) {
  const { user, loading, error } = useUser(userId)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!user) return <div>No user found</div>

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold">{user.name || 'Anonymous'}</h2>
      <p className="text-gray-600">{user.email}</p>
    </div>
  )
}
