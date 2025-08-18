// Test with service role key to bypass permissions
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔍 Testing with Service Role Key...');
console.log('URL:', supabaseUrl);
console.log('Service Key Present:', !!supabaseServiceKey);

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function testWithServiceRole() {
  try {
    console.log('\n🔄 Testing database access with service role...');
    
    // Try to access the test table
    const { data, error } = await supabase
      .from('test_table')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Service role cannot access test_table:', error.message);
      
      // Try to create a new table with service role
      console.log('\n🔄 Trying to create a new table with service role...');
      
      const { data: createData, error: createError } = await supabase
        .rpc('exec_sql', { sql: `
          CREATE TABLE IF NOT EXISTS service_test_table (
            id SERIAL PRIMARY KEY,
            name TEXT DEFAULT 'service_test',
            created_at TIMESTAMP DEFAULT NOW()
          );
          INSERT INTO service_test_table (name) VALUES ('test') ON CONFLICT DO NOTHING;
        ` });
      
      if (createError) {
        console.error('❌ Cannot create table with service role:', createError.message);
        return false;
      }
      
      console.log('✅ Created table with service role');
      
      // Try to access the new table
      const { data: newData, error: newError } = await supabase
        .from('service_test_table')
        .select('*')
        .limit(1);
      
      if (newError) {
        console.error('❌ Cannot access new table:', newError.message);
        return false;
      }
      
      console.log('✅ Successfully accessed service_test_table!');
      console.log('Data:', newData);
      return true;
      
    } else {
      console.log('✅ Successfully accessed test_table with service role!');
      console.log('Data:', data);
      return true;
    }
    
  } catch (error) {
    console.error('❌ Service role test failed:', error.message);
    return false;
  }
}

testWithServiceRole();
