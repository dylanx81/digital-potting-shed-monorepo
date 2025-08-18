// OCR.space API implementation
// Free tier: 500 requests per day
// Sign up at: https://ocr.space/ocrapi

const OCR_API_KEY = process.env.OCR_SPACE_API_KEY || 'helloworld'; // 'helloworld' is the free demo key

export interface OCRResult {
  rawText: string;
  parsedData: {
    plantName: string;
    variety: string;
    daysToGermination: string;
    sowingDepth: string;
    spacing: string;
    sunExposure: string;
    confidence: number;
  };
}

export async function processImageWithOCR(imageData: string): Promise<OCRResult> {
  try {
    // Remove data:image/jpeg;base64, prefix if present
    const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, '');
    
    const formData = new FormData();
    formData.append('apikey', OCR_API_KEY);
    formData.append('base64Image', base64Data);
    formData.append('language', 'eng');
    formData.append('isOverlayRequired', 'false');
    formData.append('filetype', 'jpg');
    formData.append('detectOrientation', 'true');
    formData.append('scale', 'true');
    formData.append('OCREngine', '2'); // More accurate engine

    const response = await fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (result.IsErroredOnProcessing) {
      throw new Error(`OCR Error: ${result.ErrorMessage}`);
    }

    // Extract text from all parsed results
    const rawText = result.ParsedResults
      ?.map((parsed: any) => parsed.ParsedText)
      ?.join('\n') || '';

    console.log('OCR.space raw text:', rawText);

    // Parse the extracted text
    const parsedData = parseOcrText(rawText);

    return {
      rawText,
      parsedData,
    };
  } catch (error) {
    console.error('OCR.space processing error:', error);
    throw new Error('Failed to process image with OCR.space');
  }
}

// Helper function to parse OCR text and extract plant information
function parseOcrText(rawText: string) {
  const text = rawText.toLowerCase();
  const lines = rawText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  const result = {
    plantName: '',
    variety: '',
    daysToGermination: '',
    sowingDepth: '',
    spacing: '',
    sunExposure: '',
    confidence: 0,
  };

  // Extract plant name (usually the largest/boldest text)
  const plantNamePatterns = [
    /^([a-z\s]+)(?:seeds?|variety|hybrid)/i,
    /(?:seeds? of|variety:)\s*([a-z\s]+)/i,
    /^([a-z\s]{3,20})$/i, // Single line with reasonable length
  ];
  
  for (const pattern of plantNamePatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      result.plantName = match[1].trim();
      break;
    }
  }

  // Extract variety
  const varietyPatterns = [
    /variety[:\s]+([a-z\s]+)/i,
    /([a-z\s]+)\s+hybrid/i,
    /([a-z\s]+)\s+f1/i,
  ];
  
  for (const pattern of varietyPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      result.variety = match[1].trim();
      break;
    }
  }

  // Extract days to germination
  const germinationPatterns = [
    /(\d+)\s*days?\s*(?:to|for)\s*germination/i,
    /germination[:\s]+(\d+)\s*days?/i,
    /(\d+)\s*days?\s*to\s*sprout/i,
  ];
  
  for (const pattern of germinationPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      result.daysToGermination = match[1];
      break;
    }
  }

  // Extract sowing depth
  const depthPatterns = [
    /sow\s*(?:at|to)?\s*(\d+(?:\.\d+)?)\s*(?:inch|in|cm)/i,
    /depth[:\s]+(\d+(?:\.\d+)?)\s*(?:inch|in|cm)/i,
    /plant\s*(?:at|to)?\s*(\d+(?:\.\d+)?)\s*(?:inch|in|cm)/i,
  ];
  
  for (const pattern of depthPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      result.sowingDepth = match[1];
      break;
    }
  }

  // Extract spacing
  const spacingPatterns = [
    /spacing[:\s]+(\d+(?:\.\d+)?)\s*(?:inch|in|cm)/i,
    /space\s*(?:at|to)?\s*(\d+(?:\.\d+)?)\s*(?:inch|in|cm)/i,
    /(\d+(?:\.\d+)?)\s*(?:inch|in|cm)\s*apart/i,
  ];
  
  for (const pattern of spacingPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      result.spacing = match[1];
      break;
    }
  }

  // Extract sun exposure
  const sunPatterns = [
    /(full\s*sun|partial\s*shade|shade|sun|light\s*shade)/i,
    /(sunny|shaded|partially\s*sunny)/i,
  ];
  
  for (const pattern of sunPatterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      result.sunExposure = match[1].toLowerCase();
      break;
    }
  }

  // Calculate confidence based on how many fields we found
  const foundFields = Object.values(result).filter(value => value !== '').length - 1; // -1 for confidence field
  result.confidence = Math.min(100, (foundFields / 6) * 100);

  return result;
}
