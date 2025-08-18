import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const plantData = await request.json();
    
    console.log('🌱 API: Saving plant with service role key:', plantData);
    
    // Use service role key to save plant
    const { data, error } = await supabase
      .from('plants')
      .insert([plantData])
      .select()
      .single();

    if (error) {
      console.error('❌ API: Error saving plant:', error);
      return NextResponse.json({ 
        success: false,
        error: error.message,
        details: error
      }, { status: 500 });
    }

    console.log('✅ API: Plant saved successfully:', data);
    
    return NextResponse.json({ 
      success: true,
      plant: data
    });
    
  } catch (error) {
    console.error('❌ API: Unexpected error:', error);
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
