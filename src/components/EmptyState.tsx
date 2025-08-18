"use client";

import {
  Camera,
  Plus,
  BookOpen,
  Sparkles,
  Flower,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onAddFirstPlant: () => void;
  onTrySample: () => void;
  onAddManually: () => void;
}

export function EmptyState({
  onAddFirstPlant,
  onTrySample,
  onAddManually,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {/* Enhanced Illustration */}
      <div className="mb-8 relative">
        <div className="w-40 h-40 rounded-full bg-gradient-to-br from-sage-100 via-earth-100 to-amber-100 dark:from-sage-900/50 dark:via-earth-900/50 dark:to-amber-900/50 flex items-center justify-center shadow-2xl backdrop-blur-sm theme-transition">
          <div className="relative">
            {/* Main sprout illustration */}
            <div className="w-20 h-20 bg-gradient-to-b from-sage-400 via-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <Sprout className="h-10 w-10 text-white" />
            </div>

            {/* Floating decorative elements */}
            <div
              className="absolute -top-3 -left-3 w-6 h-6 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full opacity-80 animate-bounce"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute -bottom-2 -right-2 w-5 h-5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full opacity-80 animate-bounce"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 -right-6 w-4 h-4 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-80 animate-bounce"
              style={{ animationDelay: "1.5s" }}
            ></div>
            <div
              className="absolute top-1/2 -left-6 w-4 h-4 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full opacity-80 animate-bounce"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-rose-200 to-pink-200 dark:from-rose-800/30 dark:to-pink-800/30 rounded-full opacity-40 animate-pulse"></div>
        <div
          className="absolute -bottom-4 -left-8 w-10 h-10 bg-gradient-to-r from-amber-200 to-orange-200 dark:from-amber-800/30 dark:to-orange-800/30 rounded-full opacity-40 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 -right-10 w-8 h-8 bg-gradient-to-r from-blue-200 to-indigo-200 dark:from-blue-800/30 dark:to-indigo-800/30 rounded-full opacity-40 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Enhanced Content */}
      <div className="max-w-lg space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-sage-400 to-green-500 flex items-center justify-center">
              <Flower className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-earth-900 dark:text-earth-100 theme-transition">
              Welcome to Your Digital Potting Shed
            </h2>
          </div>
          <p className="text-earth-600 dark:text-earth-400 leading-relaxed text-lg theme-transition">
            Start your gardening journey by adding your first plant. Take a
            photo, scan a seed packet, or add details manually.
          </p>
        </div>

        {/* Enhanced Action buttons */}
        <div className="space-y-4">
          <Button
            onClick={onAddFirstPlant}
            className="w-full bg-gradient-to-r from-sage-500 to-green-600 hover:from-sage-600 hover:to-green-700 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Camera className="h-6 w-6 mr-3" />
            Add Your First Plant
          </Button>

          <div className="flex gap-4">
            <Button
              onClick={onTrySample}
              variant="outline"
              className="flex-1 border-earth-200 dark:border-earth-700 text-earth-700 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800/50 py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:scale-105 theme-transition"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Try a Sample
            </Button>

            <Button
              onClick={onAddManually}
              variant="outline"
              className="flex-1 border-earth-200 dark:border-earth-700 text-earth-700 dark:text-earth-300 hover:bg-earth-50 dark:hover:bg-earth-800/50 py-3 px-6 rounded-xl font-medium transition-all duration-200 hover:scale-105 theme-transition"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Manually
            </Button>
          </div>
        </div>

        {/* Enhanced Tips Section */}
        <div className="mt-10 p-6 bg-gradient-to-br from-earth-50 to-sage-50 dark:from-earth-800/50 dark:to-sage-800/50 rounded-2xl border border-earth-200 dark:border-earth-700 backdrop-blur-sm theme-transition">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-earth-800 dark:text-earth-200">
              Pro Tips for Success
            </h3>
          </div>
          <div className="grid gap-3 text-sm text-earth-600 dark:text-earth-400 text-left">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-sage-400 mt-2 flex-shrink-0"></div>
              <span>
                Take photos in good lighting for better plant identification
              </span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-sage-400 mt-2 flex-shrink-0"></div>
              <span>Scan seed packet barcodes for instant plant details</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-sage-400 mt-2 flex-shrink-0"></div>
              <span>
                Add your garden location to track local growing conditions
              </span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-sage-400 mt-2 flex-shrink-0"></div>
              <span>
                Use the dark mode toggle for comfortable viewing in any lighting
              </span>
            </div>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="p-4 rounded-xl bg-white/80 dark:bg-earth-800/80 backdrop-blur-sm border border-earth-200 dark:border-earth-700 theme-transition">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center mx-auto mb-2">
              <Camera className="h-4 w-4 text-white" />
            </div>
            <h4 className="font-semibold text-earth-800 dark:text-earth-200 text-sm">
              Smart OCR
            </h4>
            <p className="text-xs text-earth-600 dark:text-earth-400">
              Extract plant data from photos
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/80 dark:bg-earth-800/80 backdrop-blur-sm border border-earth-200 dark:border-earth-700 theme-transition">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-2">
              <Leaf className="h-4 w-4 text-white" />
            </div>
            <h4 className="font-semibold text-earth-800 dark:text-earth-200 text-sm">
              Track Growth
            </h4>
            <p className="text-xs text-earth-600 dark:text-earth-400">
              Monitor plant progress
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/80 dark:bg-earth-800/80 backdrop-blur-sm border border-earth-200 dark:border-earth-700 theme-transition">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-violet-500 flex items-center justify-center mx-auto mb-2">
              <Flower className="h-4 w-4 text-white" />
            </div>
            <h4 className="font-semibold text-earth-800 dark:text-earth-200 text-sm">
              Garden Journal
            </h4>
            <p className="text-xs text-earth-600 dark:text-earth-400">
              Keep detailed records
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Sprout icon component
function Sprout({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
      <path d="M12 16L13.09 22.26L20 23L13.09 23.74L12 30L10.91 23.74L4 23L10.91 22.26L12 16Z" />
    </svg>
  );
}
