-- Simple test to create and access a table
-- Run this in your Supabase SQL Editor

-- Create a simple test table
CREATE TABLE IF NOT EXISTS test_table (
    id SERIAL PRIMARY KEY,
    name TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert a test row
INSERT INTO test_table (name) VALUES ('test') ON CONFLICT DO NOTHING;

-- Grant permissions to anon and authenticated roles
GRANT ALL ON test_table TO anon;
GRANT ALL ON test_table TO authenticated;
GRANT ALL ON test_table TO service_role;

-- Create a sequence for the id column
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- Disable RLS on test table
ALTER TABLE test_table DISABLE ROW LEVEL SECURITY;
