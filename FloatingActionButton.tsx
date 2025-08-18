"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Camera, Barcode, Keyboard, Plus } from "lucide-react";

interface FloatingActionButtonProps {
  onScanSeedPacket: () => void;
  onScanBarcode: () => void;
  onEnterManually: () => void;
}

export function FloatingActionButton({
  onScanSeedPacket,
  onScanBarcode,
  onEnterManually,
}: FloatingActionButtonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOptionClick = (action: () => void) => {
    setIsMenuOpen(false);
    action();
  };

  return (
    <div className="fixed bottom-6 right-6">
      {/* Menu Options */}
      {isMenuOpen && (
        <div className="mb-4 space-y-2">
          <button
            onClick={() => handleOptionClick(onScanSeedPacket)}
            className="flex items-center gap-3 rounded-full bg-white px-4 py-3 text-gray-700 shadow-lg transition-all hover:scale-105 hover:bg-gray-50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Camera className="h-5 w-5 text-blue-600" />
            </div>
            <span className="font-medium">Scan Seed Packet</span>
          </button>

          <button
            onClick={() => handleOptionClick(onScanBarcode)}
            className="flex items-center gap-3 rounded-full bg-white px-4 py-3 text-gray-700 shadow-lg transition-all hover:scale-105 hover:bg-gray-50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <Barcode className="h-5 w-5 text-green-600" />
            </div>
            <span className="font-medium">Scan Barcode</span>
          </button>

          <button
            onClick={() => handleOptionClick(onEnterManually)}
            className="flex items-center gap-3 rounded-full bg-white px-4 py-3 text-gray-700 shadow-lg transition-all hover:scale-105 hover:bg-gray-50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
              <Keyboard className="h-5 w-5 text-orange-600" />
            </div>
            <span className="font-medium">Enter Manually</span>
          </button>
        </div>
      )}

      {/* Main FAB Button */}
      <button
        onClick={handleButtonClick}
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition-all hover:bg-green-700",
          isMenuOpen && "rotate-45",
        )}
      >
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}
