// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fraeskcamwaciehqensn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyYWVza2NhbXdhY2llaHFlbnNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMjAyMTgsImV4cCI6MjA1OTU5NjIxOH0.NGeKinVVm9RYQ11fKfM0bkASy9D68wfPLrfih57PJM4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
