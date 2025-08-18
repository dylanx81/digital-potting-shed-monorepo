// Basic connection test
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Basic Connection Test...');
console.log('URL:', supabaseUrl);
console.log('Anon Key Present:', !!supabaseAnonKey);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testBasicConnection() {
  try {
    console.log('\n🔄 Testing basic connection...');
    
    // Try to access the database directly
    const { data, error } = await supabase
      .from('plants')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Database access failed:', error.message);
      
      // Try to access a system table
      console.log('\n🔄 Trying to access system information...');
      const { data: sysData, error: sysError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .limit(1);
      
      if (sysError) {
        console.error('❌ Cannot access system tables:', sysError.message);
        console.log('\n💡 This suggests a fundamental permission issue.');
        console.log('   Please check your Supabase project settings or create a new project.');
        return false;
      } else {
        console.log('✅ Can access system tables');
        console.log('Tables found:', sysData);
        return true;
      }
    } else {
      console.log('✅ Successfully accessed plants table!');
      console.log('Data:', data);
      return true;
    }
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    return false;
  }
}

testBasicConnection();
