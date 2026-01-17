'use client'

import { createClient } from '@supabase/supabase-js'
cess.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
