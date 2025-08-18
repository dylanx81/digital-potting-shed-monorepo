import { NextResponse } from 'next/server';
import { processImageWithGoogleVision } from '@/lib/google-vision';
import { ocrResultToPlantData, createPlant } from '@/lib/plant-service';

export async function POST(request: Request) {
  try {
    const { imageData } = await request.json();
    
    if (!imageData) {
      return NextResponse.json({ 
        error: 'No image data provided'
      }, { status: 400 });
    }

    console.log('🔍 DEBUG: Starting OCR processing...');
    
    // Step 1: Process OCR
    const ocrResult = await processImageWithGoogleVision(imageData);
    console.log('🔍 DEBUG: OCR Result:', JSON.stringify(ocrResult, null, 2));
    
    // Step 2: Convert to plant data
    const plantData = ocrResultToPlantData(ocrResult);
    console.log('🔍 DEBUG: Plant Data:', JSON.stringify(plantData, null, 2));
    
    // Step 3: Try to save to database
    console.log('🔍 DEBUG: Attempting to save plant...');
    const savedPlant = await createPlant(plantData);
    console.log('🔍 DEBUG: Save result:', savedPlant ? 'SUCCESS' : 'FAILED');
    
    return NextResponse.json({ 
      success: true,
      ocrResult,
      plantData,
      savedPlant,
      debug: {
        ocrResultType: typeof ocrResult,
        plantDataType: typeof plantData,
        hasPlantName: !!plantData.name,
        hasType: !!plantData.type,
        hasVariety: !!plantData.variety,
        plantDataKeys: Object.keys(plantData)
      }
    });
    
  } catch (error) {
    console.error('❌ DEBUG: Error:', error);
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
