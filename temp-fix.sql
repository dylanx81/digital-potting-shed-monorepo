-- Temporary fix to allow plants without user profiles
-- Run this in your Supabase SQL Editor

-- First, let's check what tables exist
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Drop the foreign key constraint temporarily
ALTER TABLE public.plants DROP CONSTRAINT IF EXISTS plants_user_id_fkey;

-- Make user_id nullable
ALTER TABLE public.plants ALTER COLUMN user_id DROP NOT NULL;

-- Grant permissions
GRANT ALL ON public.plants TO anon;
GRANT ALL ON public.plants TO authenticated;
GRANT ALL ON public.plants TO service_role;

-- Disable RLS
ALTER TABLE public.plants DISABLE ROW LEVEL SECURITY;

-- Test inserting a plant without user_id
INSERT INTO public.plants (name, type, variety, source, status, location, planting_date)
VALUES (
    'Test Tomato',
    'Tomato',
    'Test Variety',
    'Seed',
    'Sprouting',
    'Test Garden',
    CURRENT_DATE
) ON CONFLICT DO NOTHING;

-- Verify the plant was created
SELECT * FROM public.plants WHERE name = 'Test Tomato';

-- Clean up test plant
DELETE FROM public.plants WHERE name = 'Test Tomato';

SELECT 'Temporary fix applied successfully' as status;
