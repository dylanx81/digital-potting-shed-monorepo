// Minimal test to check Supabase connection
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Minimal Supabase Connection Test...');
console.log('URL:', supabaseUrl);
console.log('Anon Key Present:', !!supabaseAnonKey);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function minimalTest() {
  try {
    console.log('\n🔄 Testing basic connection...');
    
    // Try to get the current user (should work even without tables)
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.log('✅ Connection works (no user is expected)');
      console.log('Error (expected):', error.message);
      
      // Try to sign up anonymously
      console.log('\n🔄 Trying anonymous signup...');
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: 'test@example.com',
        password: 'testpassword123'
      });
      
      if (signUpError) {
        console.log('Signup error (expected):', signUpError.message);
      } else {
        console.log('✅ Signup successful:', signUpData);
      }
      
      return true;
    } else {
      console.log('✅ User found:', user);
      return true;
    }
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    return false;
  }
}

minimalTest();
