"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Barcode, X } from "lucide-react";

interface ScanBarcodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ScanBarcodeModal({
  isOpen,
  onClose,
}: ScanBarcodeModalProps) {
  const [isScanning, setIsScanning] = useState(false);

  const handleStartScan = () => {
    setIsScanning(true);
    // TODO: Implement barcode scanning functionality
    setTimeout(() => {
      setIsScanning(false);
      console.log("Barcode scanned successfully");
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Scan Barcode</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex aspect-video items-center justify-center rounded-lg bg-gray-100">
            {isScanning ? (
              <div className="text-center">
                <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-2 border-green-600 border-t-transparent"></div>
                <p className="text-sm text-gray-600">Scanning barcode...</p>
              </div>
            ) : (
              <div className="text-center">
                <Barcode className="mx-auto mb-2 h-12 w-12 text-gray-400" />
                <p className="text-sm text-gray-600">
                  Position barcode in frame
                </p>
              </div>
            )}
          </div>

          <Button
            onClick={handleStartScan}
            disabled={isScanning}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isScanning ? "Scanning..." : "Start Scan"}
          </Button>

          <div className="rounded-lg bg-green-50 p-3">
            <h3 className="mb-1 text-sm font-medium text-green-800">
              📱 Barcode scanning:
            </h3>
            <ul className="space-y-1 text-xs text-green-700">
              <li>• Point camera at the barcode</li>
              <li>• Keep steady and well-lit</li>
              <li>• Works with most seed packet barcodes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
