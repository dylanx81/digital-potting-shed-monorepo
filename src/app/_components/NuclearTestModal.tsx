"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Camera,
  X,
  Upload,
  FileImage,
  Check,
} from "lucide-react";
import { createPlant, ocrResultToPlantData } from "@/lib/plant-service";

interface NuclearTestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NuclearTestModal({
  isOpen,
  onClose,
}: NuclearTestModalProps) {
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mode, setMode] = useState<'camera' | 'upload'>('camera');
  const [ocrResult, setOcrResult] = useState<any>(null);
  const [showSaveOptions, setShowSaveOptions] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsCapturing(true);
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImage(imageData);
    }
    
    setIsCapturing(false);
    stopCamera();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setCapturedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setOcrResult(null);
    setShowSaveOptions(false);
    if (mode === 'camera') {
      startCamera();
    }
  };

  const handleSaveToDatabase = async () => {
    if (!ocrResult) return;
    
    try {
      setIsUploading(true);
      setUploadProgress(0);
      
      console.log('🔍 DEBUG: OCR Result in modal:', ocrResult);
      
      // Convert OCR result to plant data
      const plantData = ocrResultToPlantData(ocrResult);
      console.log('🔍 DEBUG: Plant data in modal:', plantData);
      
      // Add the captured image URL if available
      if (capturedImage) {
        plantData.image_url = capturedImage;
      }
      
      setUploadProgress(50);
      
      console.log('🔍 DEBUG: About to call save-plant API with:', plantData);
      
      // Save to database via API endpoint (uses service role key)
      const response = await fetch('/api/save-plant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(plantData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save plant');
      }
      
      const result = await response.json();
      console.log('🔍 DEBUG: save-plant API result:', result);
      
      setUploadProgress(100);
      
      if (result.success) {
        alert(`✅ Plant saved successfully!\n\n${plantData.name} has been added to your garden.`);
        onClose();
      } else {
        throw new Error('Failed to save plant to database');
      }
      
    } catch (error) {
      console.error('❌ DEBUG: Error saving plant:', error);
      alert('Failed to save plant to database. Error: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSkipSave = () => {
    setOcrResult(null);
    setShowSaveOptions(false);
    onClose();
  };

  const handleProcess = async () => {
    if (!capturedImage) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      setUploadProgress(25);
      
      console.log('🚀 Starting real OCR processing...');
      
      // Call our local API endpoint
      const response = await fetch('/api/public-ocr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageData: capturedImage,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      setUploadProgress(75);
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'OCR processing failed');
      }
      
      setUploadProgress(100);
      
      console.log('✅ OCR completed:', result.result);
      
      const { parsedData, rawText } = result.result;
      
      // Store OCR result for saving to database
      setOcrResult(result.result);
      setShowSaveOptions(true);
      
      const resultMessage = `🌱 Plant Information Extracted!

Plant: ${parsedData.plantName || 'Not detected'}
Variety: ${parsedData.variety || 'Not detected'}
Days to Germination: ${parsedData.daysToGermination || 'Not detected'}
Sowing Depth: ${parsedData.sowingDepth || 'Not detected'} inch
Spacing: ${parsedData.spacing || 'Not detected'} inches
Sun Exposure: ${parsedData.sunExposure || 'Not detected'}
Confidence: ${parsedData.confidence.toFixed(1)}%

${parsedData.aiNotes ? `💡 AI Notes: ${parsedData.aiNotes}` : ''}

Raw Text: ${rawText.substring(0, 200)}...`;

      alert(resultMessage);
      
      setIsUploading(false);
      
    } catch (error) {
      console.error('❌ Error processing image:', error);
      alert('Failed to process image with OCR. Error: ' + error.message);
      setIsUploading(false);
    }
  };

  React.useEffect(() => {
    if (isOpen && mode === 'camera' && !capturedImage) {
      startCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, [isOpen, mode, capturedImage]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <canvas ref={canvasRef} className="hidden" />
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            🌱 Seed Packet Scanner
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              onClick={() => setMode('camera')}
              variant={mode === 'camera' ? 'default' : 'outline'}
              size="sm"
              className="flex-1"
            >
              <Camera className="mr-2 h-4 w-4" />
              Camera
            </Button>
            <Button
              onClick={() => setMode('upload')}
              variant={mode === 'upload' ? 'default' : 'outline'}
              size="sm"
              className="flex-1"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </div>

          {!capturedImage ? (
            <div className="flex aspect-video items-center justify-center rounded-lg bg-gray-100 overflow-hidden relative">
              {mode === 'camera' ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  {isCapturing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="text-center">
                        <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-2 border-red-600 border-t-transparent"></div>
                        <p className="text-sm text-white">Capturing image...</p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center">
                  <FileImage className="mx-auto mb-2 h-12 w-12 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-2">
                    Select an image file
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    size="sm"
                  >
                    Choose File
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-lg bg-gray-100 overflow-hidden">
              <img
                src={capturedImage}
                alt="Captured seed packet"
                className="w-full h-full object-contain"
              />
            </div>
          )}

          <div className="flex gap-2">
            {!capturedImage ? (
              mode === 'camera' ? (
                <Button
                  onClick={handleCapture}
                  disabled={isCapturing}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {isCapturing ? "Capturing..." : "Take Photo"}
                </Button>
              ) : null
            ) : showSaveOptions ? (
              <>
                <Button
                  onClick={handleSkipSave}
                  variant="outline"
                  className="flex-1"
                >
                  Skip
                </Button>
                <Button
                  onClick={handleSaveToDatabase}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {isUploading ? "Saving..." : "Save to Garden"}
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleRetake}
                  variant="outline"
                  className="flex-1"
                >
                  Retake
                </Button>
                <Button
                  onClick={handleProcess}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  {isUploading ? "Processing..." : "Process Image"}
                </Button>
              </>
            )}
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 text-center">
                {uploadProgress < 25 ? "🚀 Processing with Google Cloud Vision API..." : 
                 uploadProgress < 50 ? "📝 Extracting text with OCR..." : 
                 uploadProgress < 75 ? "🌱 Parsing plant data..." : 
                 uploadProgress < 100 ? "💾 Saving to database..." :
                 "✅ Finalizing results..."}
              </p>
            </div>
          )}

          {showSaveOptions && ocrResult && (
            <div className="rounded-lg bg-green-50 p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Check className="h-5 w-5 text-green-600" />
                <h3 className="text-sm font-medium text-green-800">
                  Plant Detected Successfully!
                </h3>
              </div>
              <div className="text-xs text-green-700 space-y-1">
                <p><strong>Plant:</strong> {ocrResult.parsedData.plantName || 'Unknown'}</p>
                <p><strong>Variety:</strong> {ocrResult.parsedData.variety || 'Not specified'}</p>
                <p><strong>Germination:</strong> {ocrResult.parsedData.daysToGermination || 'Unknown'} days</p>
                <p><strong>Confidence:</strong> {ocrResult.parsedData.confidence?.toFixed(1) || 'Unknown'}%</p>
              </div>
              <p className="text-xs text-green-600 mt-2">
                Would you like to save this plant to your garden?
              </p>
            </div>
          )}

          <div className="rounded-lg bg-blue-50 p-3">
            <h3 className="mb-1 text-sm font-medium text-blue-800">
              💡 Tips for best results:
            </h3>
            <ul className="space-y-1 text-xs text-blue-700">
              <li>• Ensure good lighting</li>
              <li>• Keep the packet flat and in focus</li>
              <li>• Include all text on the packet</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
