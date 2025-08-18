-- Enable anonymous access for testing
-- Run this in your Supabase SQL Editor

-- Temporarily disable RLS for testing
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.plants DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries DISABLE ROW LEVEL SECURITY;

-- Or alternatively, create policies that allow anonymous access for testing
-- (This is safer than disabling RLS entirely)

-- Allow anonymous access to plants table for testing
DROP POLICY IF EXISTS "Users can view own plants" ON public.plants;
CREATE POLICY "Allow anonymous access for testing" ON public.plants
    FOR ALL USING (true);

-- Allow anonymous access to profiles table for testing
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Allow anonymous access for testing" ON public.profiles
    FOR ALL USING (true);

-- Allow anonymous access to journal entries table for testing
DROP POLICY IF EXISTS "Users can view own journal entries" ON public.journal_entries;
CREATE POLICY "Allow anonymous access for testing" ON public.journal_entries
    FOR ALL USING (true);

-- Allow anonymous access to storage
DROP POLICY IF EXISTS "Anyone can view seed packet images" ON storage.objects;
CREATE POLICY "Allow anonymous access to storage" ON storage.objects
    FOR ALL USING (bucket_id = 'seed-packets');
