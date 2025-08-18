-- Supabase Setup for Digital Potting Shed
-- Run this in your Supabase SQL Editor

-- Enable Row Level Security
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.plants ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.journal_entries ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create plants table
CREATE TABLE IF NOT EXISTS public.plants (
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
CREATE TABLE IF NOT EXISTS public.journal_entries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    plant_id UUID REFERENCES public.plants(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    note TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for plants
CREATE POLICY "Users can view own plants" ON public.plants
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own plants" ON public.plants
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own plants" ON public.plants
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own plants" ON public.plants
    FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for journal entries
CREATE POLICY "Users can view own journal entries" ON public.journal_entries
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own journal entries" ON public.journal_entries
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own journal entries" ON public.journal_entries
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own journal entries" ON public.journal_entries
    FOR DELETE USING (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create storage bucket for seed packet images
INSERT INTO storage.buckets (id, name, public)
VALUES ('seed-packets', 'seed-packets', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for seed-packets bucket
CREATE POLICY "Anyone can view seed packet images" ON storage.objects
    FOR SELECT USING (bucket_id = 'seed-packets');

CREATE POLICY "Authenticated users can upload seed packet images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'seed-packets' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update own seed packet images" ON storage.objects
    FOR UPDATE USING (bucket_id = 'seed-packets' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own seed packet images" ON storage.objects
    FOR DELETE USING (bucket_id = 'seed-packets' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_plants_user_id ON public.plants(user_id);
CREATE INDEX IF NOT EXISTS idx_plants_status ON public.plants(status);
CREATE INDEX IF NOT EXISTS idx_journal_entries_plant_id ON public.journal_entries(plant_id);
CREATE INDEX IF NOT EXISTS idx_journal_entries_user_id ON public.journal_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_journal_entries_date ON public.journal_entries(date);
