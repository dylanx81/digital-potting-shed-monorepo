-- Fix profiles table to work without auth.users dependency
-- Run this in your Supabase SQL Editor

-- First, let's drop the existing profiles table and recreate it without the auth.users dependency
DROP TABLE IF EXISTS public.journal_entries CASCADE;
DROP TABLE IF EXISTS public.plants CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Create profiles table without auth.users dependency
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create plants table
CREATE TABLE public.plants (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    type TEXT,
    variety TEXT,
    planting_date DATE,
    source TEXT CHECK (source IN ('Seed', 'Seedling', 'Established Plant')),
    location TEXT,
    status TEXT CHECK (status IN ('Sprouting', 'Flowering', 'Fruiting', 'Harvest Ready', 'Dormant')),
    last_watered TIMESTAMP WITH TIME ZONE,
    days_to_germination INTEGER,
    sowing_depth DECIMAL(3,2),
    spacing INTEGER,
    sun_exposure TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create journal entries table
CREATE TABLE public.journal_entries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    plant_id UUID REFERENCES public.plants(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    note TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Grant ALL permissions to all roles
GRANT ALL ON public.profiles TO anon;
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

GRANT ALL ON public.plants TO anon;
GRANT ALL ON public.plants TO authenticated;
GRANT ALL ON public.plants TO service_role;

GRANT ALL ON public.journal_entries TO anon;
GRANT ALL ON public.journal_entries TO authenticated;
GRANT ALL ON public.journal_entries TO service_role;

-- Grant sequence permissions
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- Disable RLS for now (we'll enable it later with proper policies)
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.plants DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries DISABLE ROW LEVEL SECURITY;

-- Create storage bucket for seed packet images
INSERT INTO storage.buckets (id, name, public)
VALUES ('seed-packets', 'seed-packets', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies that allow all access
CREATE POLICY "Allow all access to seed packets" ON storage.objects
    FOR ALL USING (bucket_id = 'seed-packets');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_plants_user_id ON public.plants(user_id);
CREATE INDEX IF NOT EXISTS idx_plants_status ON public.plants(status);
CREATE INDEX IF NOT EXISTS idx_journal_entries_plant_id ON public.journal_entries(plant_id);
CREATE INDEX IF NOT EXISTS idx_journal_entries_user_id ON public.journal_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_journal_entries_date ON public.journal_entries(date);

-- Insert our test user profile
INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    'test@example.com',
    'Test User',
    NOW(),
    NOW()
) ON CONFLICT (id) DO NOTHING;

-- Verify the setup
SELECT 'Profiles table created successfully' as status;
SELECT COUNT(*) as profile_count FROM public.profiles;
SELECT COUNT(*) as plant_count FROM public.plants;
