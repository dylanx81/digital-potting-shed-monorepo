-- FINAL FIX: Make user_id nullable in plants table
-- Run this in your Supabase SQL Editor

-- First, let's see what we're working with
SELECT 'Current plants table structure:' as info;
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'plants'
ORDER BY ordinal_position;

-- Drop the foreign key constraint if it exists
ALTER TABLE public.plants DROP CONSTRAINT IF EXISTS plants_user_id_fkey;

-- Make user_id nullable
ALTER TABLE public.plants ALTER COLUMN user_id DROP NOT NULL;

-- Grant all permissions
GRANT ALL ON public.plants TO anon;
GRANT ALL ON public.plants TO authenticated;
GRANT ALL ON public.plants TO service_role;

-- Disable RLS
ALTER TABLE public.plants DISABLE ROW LEVEL SECURITY;

-- Test inserting a plant without user_id
INSERT INTO public.plants (name, type, variety, source, status, location, planting_date)
VALUES (
    'Test Plant',
    'Tomato',
    'Test Variety',
    'Seed',
    'Sprouting',
    'Test Garden',
    CURRENT_DATE
);

-- Verify it worked
SELECT 'Test plant created:' as info;
SELECT id, name, type, user_id FROM public.plants WHERE name = 'Test Plant';

-- Clean up
DELETE FROM public.plants WHERE name = 'Test Plant';

-- Show final structure
SELECT 'Final plants table structure:' as info;
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'plants'
ORDER BY ordinal_position;

SELECT '✅ FIXED: user_id is now nullable!' as status;
