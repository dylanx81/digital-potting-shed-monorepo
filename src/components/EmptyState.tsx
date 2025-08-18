"use client";

import { Camera, Plus, BookOpen, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onAddFirstPlant: () => void;
  onTrySample: () => void;
  onAddManually: () => void;
}

export function EmptyState({ 
  onAddFirstPlant, 
  onTrySample, 
  onAddManually 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {/* Illustration */}
      <div className="mb-8 relative">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-sage-100 to-earth-100 flex items-center justify-center">
          <div className="relative">
            {/* Sprout illustration */}
            <div className="w-16 h-16 bg-gradient-to-b from-sage-400 to-sage-600 rounded-full flex items-center justify-center">
              <Sprout className="h-8 w-8 text-white" />
            </div>
            {/* Small sprout details */}
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-sage-300 rounded-full opacity-60"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-earth-300 rounded-full opacity-60"></div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-rose-200 rounded-full opacity-40"></div>
        <div className="absolute -bottom-2 -left-6 w-6 h-6 bg-amber-200 rounded-full opacity-40"></div>
      </div>

      {/* Content */}
      <div className="max-w-md space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-earth-900 mb-2">
            Welcome to Your Digital Potting Shed
          </h2>
          <p className="text-earth-600 leading-relaxed">
            Start your gardening journey by adding your first plant. 
            Take a photo, scan a seed packet, or add details manually.
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <Button
            onClick={onAddFirstPlant}
            className="w-full bg-sage-600 hover:bg-sage-700 text-white py-3 px-6 rounded-lg font-medium"
          >
            <Camera className="h-5 w-5 mr-2" />
            Add Your First Plant
          </Button>
          
          <div className="flex gap-3">
            <Button
              onClick={onTrySample}
              variant="outline"
              className="flex-1 border-earth-200 text-earth-700 hover:bg-earth-50"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Try a Sample
            </Button>
            
            <Button
              onClick={onAddManually}
              variant="outline"
              className="flex-1 border-earth-200 text-earth-700 hover:bg-earth-50"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Manually
            </Button>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 p-4 bg-earth-50 rounded-lg border border-earth-200">
          <h3 className="text-sm font-medium text-earth-800 mb-2">
            💡 Pro Tips
          </h3>
          <ul className="text-xs text-earth-600 space-y-1 text-left">
            <li>• Take photos in good lighting for better plant identification</li>
            <li>• Scan seed packet barcodes for instant plant details</li>
            <li>• Add your garden location to track local growing conditions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Simple Sprout icon component
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
