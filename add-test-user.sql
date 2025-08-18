-- Add test user profile to fix foreign key constraint
-- Run this in your Supabase SQL Editor

-- Insert a test user profile
INSERT INTO public.profiles (id, email, full_name, created_at, updated_at)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    'test@example.com',
    'Test User',
    NOW(),
    NOW()
) ON CONFLICT (id) DO NOTHING;

-- Verify the profile was created
SELECT * FROM public.profiles WHERE id = '11111111-1111-1111-1111-111111111111';
