import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test if Google Cloud Vision API key is configured
    const apiKey = process.env.GOOGLE_CLOUD_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'Google Cloud API key not configured',
        status: 'missing_api_key'
      }, { status: 400 });
    }

    return NextResponse.json({ 
      message: 'Google Cloud Vision API key is configured',
      status: 'ready',
      hasApiKey: !!apiKey
    });
    
  } catch (error) {
    console.error('Test OCR error:', error);
    return NextResponse.json({ 
      error: 'Failed to test OCR configuration',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
