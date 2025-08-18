// Debug script to check database schema
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔍 Debugging Supabase Schema...');

// Test with service role key
const supabaseService = createClient(supabaseUrl, supabaseServiceKey);

async function debugSchema() {
  try {
    console.log('\n🔄 Testing basic connection...');
    
    // Try a simple query to see if we can connect at all
    const { data, error } = await supabaseService
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .limit(5);
    
    if (error) {
      console.error('❌ Cannot access information_schema:', error.message);
      
      // Try the most basic connection test
      const { data: testData, error: testError } = await supabaseService
        .from('_dummy_table_that_does_not_exist')
        .select('*')
        .limit(1);
      
      if (testError && testError.message.includes('relation "_dummy_table_that_does_not_exist" does not exist')) {
        console.log('✅ Database connection works, but tables might not exist');
        console.log('💡 This suggests the SQL script might not have run completely');
      } else {
        console.error('❌ Database connection failed:', testError.message);
      }
      
      return false;
    }
    
    console.log('✅ Can access information_schema');
    console.log('Tables found:', data?.map(t => t.table_name) || 'None');
    
    return true;
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
    return false;
  }
}

debugSchema();
