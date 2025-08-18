const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testUserProfile() {
  try {
    console.log('🔍 Checking if test user profile exists...');
    
    // Check if the test user profile exists
    const { data: existingProfile, error: checkError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', '11111111-1111-1111-1111-111111111111')
      .single();
    
    if (checkError && checkError.code !== 'PGRST116') {
      console.error('❌ Error checking profile:', checkError);
      return;
    }
    
    if (existingProfile) {
      console.log('✅ Test user profile already exists:', existingProfile);
      return;
    }
    
    console.log('📝 Creating test user profile...');
    
    // Create the test user profile
    const { data: newProfile, error: createError } = await supabase
      .from('profiles')
      .insert([{
        id: '11111111-1111-1111-1111-111111111111',
        email: 'test@example.com',
        full_name: 'Test User',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();
    
    if (createError) {
      console.error('❌ Error creating profile:', createError);
      return;
    }
    
    console.log('✅ Test user profile created successfully:', newProfile);
    
    // Test creating a plant with this user
    console.log('🌱 Testing plant creation with test user...');
    
    const { data: testPlant, error: plantError } = await supabase
      .from('plants')
      .insert([{
        user_id: '11111111-1111-1111-1111-111111111111',
        name: 'Test Tomato',
        type: 'Tomato',
        variety: 'Test Variety',
        source: 'Seed',
        status: 'Sprouting',
        location: 'Test Garden',
        planting_date: new Date().toISOString().split('T')[0]
      }])
      .select()
      .single();
    
    if (plantError) {
      console.error('❌ Error creating test plant:', plantError);
      return;
    }
    
    console.log('✅ Test plant created successfully:', testPlant);
    
    // Clean up the test plant
    console.log('🧹 Cleaning up test plant...');
    const { error: deleteError } = await supabase
      .from('plants')
      .delete()
      .eq('id', testPlant.id);
    
    if (deleteError) {
      console.error('❌ Error deleting test plant:', deleteError);
      return;
    }
    
    console.log('✅ Test plant cleaned up successfully');
    console.log('🎉 Everything is working! The app should now save plants successfully.');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testUserProfile();
