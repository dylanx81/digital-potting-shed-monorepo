"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";

interface ScanSeedPacketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ScanSeedPacketModal({
  isOpen,
  onClose,
}: ScanSeedPacketModalProps) {
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleCapture = () => {
    setIsCapturing(true);
    // TODO: Implement camera capture functionality
    // For now, we'll simulate capturing an image
    setTimeout(() => {
      setCapturedImage("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."); // Placeholder
      setIsCapturing(false);
    }, 2000);
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleProcess = () => {
    // TODO: Upload image and process with OCR
    console.log("Processing captured image...");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Scan Seed Packet
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {!capturedImage ? (
            <div className="flex aspect-video items-center justify-center rounded-lg bg-gray-100">
              {isCapturing ? (
                <div className="text-center">
                  <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-2 border-green-600 border-t-transparent"></div>
                  <p className="text-sm text-gray-600">Capturing image...</p>
                </div>
              ) : (
                <div className="text-center">
                  <Camera className="mx-auto mb-2 h-12 w-12 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Position seed packet in frame
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-lg bg-gray-100">
              <div className="text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <Camera className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-sm text-gray-600">
                  Image captured successfully!
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            {!capturedImage ? (
              <Button
                onClick={handleCapture}
                disabled={isCapturing}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {isCapturing ? "Capturing..." : "Take Photo"}
              </Button>
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
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Process Image
                </Button>
              </>
            )}
          </div>

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
