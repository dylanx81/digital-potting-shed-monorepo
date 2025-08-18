// Simple test to debug Supabase connection
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔍 Testing Supabase Connection...');
console.log('URL:', supabaseUrl);
console.log('Anon Key:', supabaseAnonKey ? '✅ Present' : '❌ Missing');
console.log('Service Key:', supabaseServiceKey ? '✅ Present' : '❌ Missing');

// Test with service role key (should have full access)
const supabaseService = createClient(supabaseUrl, supabaseServiceKey);

async function testServiceConnection() {
  try {
    console.log('\n🔄 Testing with service role key...');
    
    // Test basic connection
    const { data, error } = await supabaseService
      .from('plants')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Service role connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Service role connection successful!');
    console.log('✅ Plants table exists and is accessible');
    
    // Test storage bucket
    console.log('\n🔄 Testing storage bucket...');
    const { data: buckets, error: bucketError } = await supabaseService.storage.listBuckets();
    
    if (bucketError) {
      console.error('❌ Storage test failed:', bucketError.message);
      return false;
    }
    
    const seedPacketsBucket = buckets.find(bucket => bucket.name === 'seed-packets');
    if (seedPacketsBucket) {
      console.log('✅ seed-packets storage bucket exists');
    } else {
      console.log('⚠️  seed-packets storage bucket not found');
    }
    
    console.log('\n🎉 Supabase setup looks good with service role!');
    return true;
    
  } catch (error) {
    console.error('❌ Service role test failed:', error.message);
    return false;
  }
}

testServiceConnection();
