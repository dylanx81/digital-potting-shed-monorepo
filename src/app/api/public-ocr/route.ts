import { NextResponse } from 'next/server';
import { processImageWithGoogleVision } from '@/lib/google-vision';

// Force public access - no authentication required
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { imageData } = await request.json();
    
    if (!imageData) {
      return NextResponse.json({ 
        error: 'No image data provided',
        status: 'missing_image'
      }, { status: 400 });
    }

    console.log('🚀 PUBLIC API: Starting Google Cloud Vision OCR...');
    
    // Test the OCR processing
    const result = await processImageWithGoogleVision(imageData);
    
    return NextResponse.json({ 
      success: true,
      result,
      status: 'ocr_completed',
      message: 'PUBLIC API SUCCESS'
    });
    
  } catch (error) {
    console.error('❌ PUBLIC API: OCR test error:', error);
    return NextResponse.json({ 
      error: 'Failed to process image with OCR',
      details: error instanceof Error ? error.message : 'Unknown error',
      status: 'ocr_failed'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Check if Google Cloud Vision API key is configured
    const apiKey = process.env.GOOGLE_CLOUD_API_KEY;
    
    if (!apiKey || apiKey === 'test-key') {
      return NextResponse.json({ 
        message: 'PUBLIC API: Google Cloud API key not configured - using fallback',
        status: 'fallback_mode',
        hasApiKey: false
      });
    }

    return NextResponse.json({ 
      message: 'PUBLIC API: Google Cloud Vision API key is configured',
      status: 'ready',
      hasApiKey: true
    });
    
  } catch (error) {
    console.error('❌ PUBLIC API: OCR test error:', error);
    return NextResponse.json({ 
      error: 'Failed to test OCR configuration',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
