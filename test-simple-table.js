// Test script for simple table access
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Testing Simple Table Access...');

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSimpleTable() {
  try {
    console.log('\n🔄 Testing test_table access...');
    
    // Try to access the test table
    const { data, error } = await supabase
      .from('test_table')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Cannot access test_table:', error.message);
      return false;
    }
    
    console.log('✅ Successfully accessed test_table!');
    console.log('Data:', data);
    
    return true;
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return false;
  }
}

testSimpleTable();
