import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    console.log('🌱 API: Fetching plants with service role key...');
    
    // Use service role key to fetch plants
    const { data, error } = await supabase
      .from('plants')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ API: Error fetching plants:', error);
      return NextResponse.json({ 
        success: false,
        error: error.message,
        details: error
      }, { status: 500 });
    }

    console.log('✅ API: Plants fetched successfully:', data?.length || 0, 'plants');
    
    return NextResponse.json({ 
      success: true,
      plants: data || []
    });
    
  } catch (error) {
    console.error('❌ API: Unexpected error:', error);
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
