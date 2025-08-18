// Test script to verify Supabase connection
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Testing Supabase Connection...');
console.log('URL:', supabaseUrl);
console.log('Anon Key:', supabaseAnonKey ? '✅ Present' : '❌ Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log('\n🔄 Testing database connection...');
    
    // Test basic connection
    const { data, error } = await supabase
      .from('plants')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Database connection failed:', error.message);
      
      if (error.message.includes('relation "plants" does not exist')) {
        console.log('💡 The plants table might not be created yet.');
        console.log('   Please run the SQL script from supabase-setup.sql in your Supabase dashboard.');
      }
      
      return false;
    }
    
    console.log('✅ Database connection successful!');
    console.log('✅ Plants table exists and is accessible');
    
    // Test storage bucket
    console.log('\n🔄 Testing storage bucket...');
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    
    if (bucketError) {
      console.error('❌ Storage test failed:', bucketError.message);
      return false;
    }
    
    const seedPacketsBucket = buckets.find(bucket => bucket.name === 'seed-packets');
    if (seedPacketsBucket) {
      console.log('✅ seed-packets storage bucket exists');
    } else {
      console.log('⚠️  seed-packets storage bucket not found');
      console.log('   Please run the SQL script from supabase-setup.sql');
    }
    
    console.log('\n🎉 Supabase setup looks good!');
    console.log('   You can now test the app at http://localhost:3001');
    
    return true;
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return false;
  }
}

testConnection();
