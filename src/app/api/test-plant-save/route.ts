import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    console.log('🧪 Testing plant save directly...');
    
    // Test data
    const testPlant = {
      name: 'Test Tomato',
      type: 'Tomato',
      variety: 'Test Variety',
      source: 'Seed',
      status: 'Sprouting',
      location: 'Test Garden',
      planting_date: new Date().toISOString().split('T')[0]
    };

    console.log('Attempting to save plant:', testPlant);

    // Try to save the plant
    const { data, error } = await supabase
      .from('plants')
      .insert([testPlant])
      .select()
      .single();

    if (error) {
      console.error('❌ Database error:', error);
      return NextResponse.json({ 
        success: false,
        error: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      }, { status: 500 });
    }

    console.log('✅ Plant saved successfully:', data);
    
    // Clean up the test plant
    await supabase
      .from('plants')
      .delete()
      .eq('id', data.id);

    return NextResponse.json({ 
      success: true,
      message: 'Plant saved and cleaned up successfully',
      plant: data
    });
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    console.log('🔍 Checking database schema...');
    
    // Check if plants table exists and its structure
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', 'plants');

    if (tablesError) {
      console.error('Error checking tables:', tablesError);
    }

    // Check plants table structure
    const { data: columns, error: columnsError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable')
      .eq('table_schema', 'public')
      .eq('table_name', 'plants')
      .order('ordinal_position');

    if (columnsError) {
      console.error('Error checking columns:', columnsError);
    }

    // Try to get existing plants
    const { data: plants, error: plantsError } = await supabase
      .from('plants')
      .select('*')
      .limit(5);

    if (plantsError) {
      console.error('Error fetching plants:', plantsError);
    }

    return NextResponse.json({ 
      success: true,
      tables: tables || [],
      columns: columns || [],
      plants: plants || [],
      tableExists: tables && tables.length > 0,
      plantCount: plants ? plants.length : 0
    });
    
  } catch (error) {
    console.error('❌ Error checking schema:', error);
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
