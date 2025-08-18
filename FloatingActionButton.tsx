"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Camera, Barcode, Keyboard, Plus, Sparkles } from "lucide-react";

interface FloatingActionButtonProps {
  onScanClick: () => void;
  onBarcodeClick: () => void;
  onManualClick: () => void;
}

export function FloatingActionButton({
  onScanClick,
  onBarcodeClick,
  onManualClick,
}: FloatingActionButtonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOptionClick = (action: () => void) => {
    setIsMenuOpen(false);
    action();
  };

  const menuItems = [
    {
      icon: Camera,
      label: "Scan Seed Packet",
      action: onScanClick,
      color: "from-blue-400 to-indigo-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Barcode,
      label: "Scan Barcode",
      action: onBarcodeClick,
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      icon: Keyboard,
      label: "Enter Manually",
      action: onManualClick,
      color: "from-orange-400 to-red-500",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
      textColor: "text-orange-600 dark:text-orange-400",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Menu Options */}
      {isMenuOpen && (
        <div className="mb-4 space-y-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => handleOptionClick(item.action)}
                className={cn(
                  "flex items-center gap-3 rounded-full bg-white/90 dark:bg-earth-800/90 backdrop-blur-sm px-4 py-3 text-earth-700 dark:text-earth-300 shadow-xl border border-earth-200 dark:border-earth-700",
                  "transition-all duration-300 hover:scale-105 hover:shadow-2xl",
                  "transform opacity-0 animate-in slide-in-from-bottom-2",
                  "theme-transition"
                )}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r shadow-md",
                    item.color
                  )}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold whitespace-nowrap">
                  {item.label}
                </span>
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-sage-400 to-green-500 animate-pulse"></div>
              </button>
            );
          })}
        </div>
      )}

      {/* Main FAB Button */}
      <button
        onClick={handleButtonClick}
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-sage-500 to-green-600 hover:from-sage-600 hover:to-green-700 text-white shadow-2xl",
          "transition-all duration-300 hover:scale-110 hover:shadow-3xl",
          "focus:outline-none focus:ring-4 focus:ring-sage-500/30 dark:focus:ring-sage-400/30",
          isMenuOpen &&
            "rotate-45 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700",
          "theme-transition"
        )}
      >
        <Plus
          className={cn(
            "h-7 w-7 transition-transform duration-300",
            isMenuOpen && "rotate-180"
          )}
        />

        {/* Glow effect */}
        <div
          className={cn(
            "absolute inset-0 rounded-full bg-gradient-to-r from-sage-400 to-green-500 opacity-0 blur-xl transition-opacity duration-300",
            isMenuOpen && "opacity-30"
          )}
        />
      </button>

      {/* Background overlay for menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-[-1] animate-in fade-in duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
}
