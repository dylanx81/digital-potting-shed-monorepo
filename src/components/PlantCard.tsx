"use client";

import { useState } from "react";
import { Camera, Clock, MapPin, Sprout, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Plant {
  id: string;
  name: string;
  type: string;
  plantingDate: string;
  source: "Seed" | "Seedling" | "Established Plant";
  location: string;
  status: "Sprouting" | "Flowering" | "Fruiting" | "Harvest Ready" | "Dormant";
  lastWatered: string;
  daysSincePlanting: number;
  imageUrl?: string;
  hasAlerts?: boolean;
}

interface PlantCardProps {
  plant: Plant;
  variant?: "default" | "draft";
  onCardClick?: () => void;
  onCompleteDraft?: () => void;
  onDiscardDraft?: () => void;
}

export function PlantCard({ 
  plant, 
  variant = "default",
  onCardClick,
  onCompleteDraft,
  onDiscardDraft
}: PlantCardProps) {
  const [imageError, setImageError] = useState(false);

  const statusConfig = {
    Sprouting: { 
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      icon: Sprout,
      label: "Sprouting"
    },
    Flowering: { 
      color: "bg-pink-100 text-pink-800 border-pink-200",
      icon: Sprout,
      label: "Flowering"
    },
    Fruiting: { 
      color: "bg-orange-100 text-orange-800 border-orange-200",
      icon: Sprout,
      label: "Fruiting"
    },
    "Harvest Ready": { 
      color: "bg-green-100 text-green-800 border-green-200",
      icon: Sprout,
      label: "Ready"
    },
    Dormant: { 
      color: "bg-gray-100 text-gray-800 border-gray-200",
      icon: Sprout,
      label: "Dormant"
    },
  };

  const status = statusConfig[plant.status];
  const StatusIcon = status.icon;

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  if (variant === "draft") {
    return (
      <div className="draft-card plant-card rounded-lg p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-amber-600" />
            <h3 className="text-lg font-semibold text-amber-900">Draft Entry</h3>
          </div>
          <span className="text-xs text-amber-600">Draft</span>
        </div>
        
        <p className="mb-4 text-sm text-amber-700">
          You have an incomplete entry for this plant. Complete it to add to your garden.
        </p>
        
        <div className="flex gap-2">
          <button
            onClick={onCompleteDraft}
            className="flex-1 rounded-md bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            Complete Entry
          </button>
          <button
            onClick={onDiscardDraft}
            className="flex-1 rounded-md border border-amber-300 bg-transparent px-4 py-2 text-sm font-medium text-amber-700 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            Discard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "plant-card group relative cursor-pointer rounded-lg border border-earth-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md",
        "focus-within:ring-2 focus-within:ring-sage-500 focus-within:ring-offset-2"
      )}
      onClick={onCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onCardClick?.();
        }
      }}
    >
      {/* Alert indicator */}
      {plant.hasAlerts && (
        <div className="absolute right-4 top-4">
          <AlertCircle className="h-5 w-5 text-rose-500" />
        </div>
      )}

      {/* Image section */}
      <div className="mb-4 aspect-square w-full overflow-hidden rounded-lg bg-gradient-to-br from-sage-100 to-earth-100">
        {plant.imageUrl && !imageError ? (
          <img
            src={plant.imageUrl}
            alt={`${plant.name} plant`}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Camera className="h-8 w-8 text-sage-400" />
          </div>
        )}
      </div>

      {/* Plant info */}
      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-semibold text-earth-900 group-hover:text-earth-700">
            {plant.name}
          </h3>
          <p className="text-sm text-earth-600">{plant.type}</p>
        </div>

        {/* Status and source */}
        <div className="flex items-center justify-between">
          <span className={cn(
            "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium",
            status.color
          )}>
            <StatusIcon className="h-3 w-3" />
            {status.label}
          </span>
          <span className="text-xs text-earth-500 capitalize">
            {plant.source.toLowerCase()}
          </span>
        </div>

        {/* Plant details */}
        <div className="space-y-2 text-sm text-earth-600">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{plant.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Sprout className="h-4 w-4" />
            <span>{plant.daysSincePlanting} days since planting</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Last watered {formatTimeAgo(plant.lastWatered)}</span>
          </div>
        </div>
      </div>

      {/* Focus indicator for keyboard navigation */}
      <div className="absolute inset-0 rounded-lg ring-2 ring-transparent transition-all group-focus-within:ring-sage-500" />
    </div>
  );
}
