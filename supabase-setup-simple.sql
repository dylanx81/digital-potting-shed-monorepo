-- Simple Supabase Setup for Digital Potting Shed (Development)
-- Run this in your Supabase SQL Editor

-- Create plants table (simplified for development)
CREATE TABLE IF NOT EXISTS public.plants (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID DEFAULT '00000000-0000-0000-0000-000000000000',
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

-- Create storage bucket for seed packet images
INSERT INTO storage.buckets (id, name, public)
VALUES ('seed-packets', 'seed-packets', true)
ON CONFLICT (id) DO NOTHING;

-- Create simple storage policies (allow all operations for development)
CREATE POLICY "Allow all operations on seed-packets" ON storage.objects
    FOR ALL USING (bucket_id = 'seed-packets');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_plants_user_id ON public.plants(user_id);
CREATE INDEX IF NOT EXISTS idx_plants_status ON public.plants(status);
