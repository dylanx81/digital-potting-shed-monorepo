import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    console.log('🧪 Testing Supabase connection from API...');
    
    // Test basic connection
    const { data, error } = await supabase
      .from('plants')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Database connection failed:', error.message);
      
      if (error.message.includes('relation "plants" does not exist')) {
        return NextResponse.json({ 
          success: false,
          error: 'Database tables not set up',
          message: 'Please run the SQL script from supabase-setup.sql in your Supabase dashboard',
          details: error.message
        }, { status: 500 });
      }
      
      return NextResponse.json({ 
        success: false,
        error: 'Database connection failed',
        details: error.message
      }, { status: 500 });
    }
    
    // Test storage bucket
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    
    const seedPacketsBucket = buckets?.find(bucket => bucket.name === 'seed-packets');
    
    return NextResponse.json({ 
      success: true,
      message: 'Supabase connection successful!',
      database: 'Connected',
      storage: seedPacketsBucket ? 'seed-packets bucket exists' : 'seed-packets bucket missing',
      nextSteps: seedPacketsBucket ? 
        'Ready to test OCR and plant saving!' : 
        'Run the SQL script from supabase-setup.sql to create storage bucket'
    });
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
