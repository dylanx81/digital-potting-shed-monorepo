"use client";

import { useState } from "react";
import {
  Camera,
  Clock,
  MapPin,
  Sprout,
  AlertCircle,
  Droplets,
  Calendar,
  Thermometer,
} from "lucide-react";
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
  onDiscardDraft,
}: PlantCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const statusConfig = {
    Sprouting: {
      color:
        "bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30",
      textColor: "text-yellow-800 dark:text-yellow-200",
      borderColor: "border-yellow-200 dark:border-yellow-700",
      icon: Sprout,
      label: "Sprouting",
      accent: "from-yellow-400 to-amber-500",
    },
    Flowering: {
      color:
        "bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30",
      textColor: "text-pink-800 dark:text-pink-200",
      borderColor: "border-pink-200 dark:border-pink-700",
      icon: Sprout,
      label: "Flowering",
      accent: "from-pink-400 to-rose-500",
    },
    Fruiting: {
      color:
        "bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30",
      textColor: "text-orange-800 dark:text-orange-200",
      borderColor: "border-orange-200 dark:border-orange-700",
      icon: Sprout,
      label: "Fruiting",
      accent: "from-orange-400 to-red-500",
    },
    "Harvest Ready": {
      color:
        "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30",
      textColor: "text-green-800 dark:text-green-200",
      borderColor: "border-green-200 dark:border-green-700",
      icon: Sprout,
      label: "Ready",
      accent: "from-green-400 to-emerald-500",
    },
    Dormant: {
      color:
        "bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-800/30 dark:to-slate-800/30",
      textColor: "text-gray-800 dark:text-gray-200",
      borderColor: "border-gray-200 dark:border-gray-700",
      icon: Sprout,
      label: "Dormant",
      accent: "from-gray-400 to-slate-500",
    },
  };

  const status = statusConfig[plant.status];
  const StatusIcon = status.icon;

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  if (variant === "draft") {
    return (
      <div className="draft-card plant-card rounded-xl p-6 shadow-lg theme-transition">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-gradient-to-r from-amber-400 to-orange-500 p-2">
              <Camera className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100">
              Draft Entry
            </h3>
          </div>
          <span className="rounded-full bg-amber-100 dark:bg-amber-900/50 px-2 py-1 text-xs font-medium text-amber-700 dark:text-amber-300">
            Draft
          </span>
        </div>

        <p className="mb-4 text-sm text-amber-700 dark:text-amber-300">
          You have an incomplete entry for this plant. Complete it to add to
          your garden.
        </p>

        <div className="flex gap-2">
          <button
            onClick={onCompleteDraft}
            className="flex-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-sm font-medium text-white shadow-md hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200"
          >
            Complete Entry
          </button>
          <button
            onClick={onDiscardDraft}
            className="flex-1 rounded-lg border border-amber-300 dark:border-amber-600 bg-transparent px-4 py-2 text-sm font-medium text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200"
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
        "plant-card group relative cursor-pointer rounded-xl border bg-white/90 dark:bg-earth-800/90 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 theme-transition",
        "hover:shadow-xl hover:scale-[1.02] focus-within:ring-2 focus-within:ring-sage-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-gray-800",
        "border-earth-200 dark:border-earth-700"
      )}
      onClick={onCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        <div className="absolute right-4 top-4 z-10">
          <div className="rounded-full bg-gradient-to-r from-rose-400 to-pink-500 p-2 shadow-lg">
            <AlertCircle className="h-4 w-4 text-white" />
          </div>
        </div>
      )}

      {/* Image section with enhanced styling */}
      <div className="mb-4 aspect-square w-full overflow-hidden rounded-lg bg-gradient-to-br from-sage-100 to-earth-100 dark:from-sage-900/50 dark:to-earth-900/50 relative group">
        {plant.imageUrl && !imageError ? (
          <img
            src={plant.imageUrl}
            alt={`${plant.name} plant`}
            className={cn(
              "h-full w-full object-cover transition-transform duration-500",
              isHovered ? "scale-110" : "scale-100"
            )}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="rounded-full bg-gradient-to-r from-sage-400 to-earth-400 p-4">
              <Camera className="h-8 w-8 text-white" />
            </div>
          </div>
        )}

        {/* Overlay gradient on hover */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300",
            isHovered && "opacity-100"
          )}
        />
      </div>

      {/* Plant info */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-earth-900 dark:text-earth-100 group-hover:text-sage-700 dark:group-hover:text-sage-300 transition-colors duration-200">
            {plant.name}
          </h3>
          <p className="text-sm text-earth-600 dark:text-earth-400 font-medium">
            {plant.type}
          </p>
        </div>

        {/* Status and source */}
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm",
              status.color,
              status.textColor,
              status.borderColor
            )}
          >
            <StatusIcon className="h-3 w-3" />
            {status.label}
          </span>
          <span className="text-xs text-earth-500 dark:text-earth-400 capitalize font-medium">
            {plant.source.toLowerCase()}
          </span>
        </div>

        {/* Plant details with enhanced icons */}
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3 text-earth-600 dark:text-earth-400">
            <div className="rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 p-1.5">
              <MapPin className="h-3 w-3 text-white" />
            </div>
            <span className="font-medium">{plant.location}</span>
          </div>
          <div className="flex items-center gap-3 text-earth-600 dark:text-earth-400">
            <div className="rounded-full bg-gradient-to-r from-green-400 to-emerald-500 p-1.5">
              <Sprout className="h-3 w-3 text-white" />
            </div>
            <span>{plant.daysSincePlanting} days since planting</span>
          </div>
          <div className="flex items-center gap-3 text-earth-600 dark:text-earth-400">
            <div className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 p-1.5">
              <Droplets className="h-3 w-3 text-white" />
            </div>
            <span>Last watered {formatTimeAgo(plant.lastWatered)}</span>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-xs text-earth-500 dark:text-earth-400 mb-1">
            <span>Growth Progress</span>
            <span>{Math.min(plant.daysSincePlanting * 2, 100)}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-earth-200 dark:bg-earth-700 overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full bg-gradient-to-r transition-all duration-500",
                status.accent
              )}
              style={{
                width: `${Math.min(plant.daysSincePlanting * 2, 100)}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Focus indicator for keyboard navigation */}
      <div className="absolute inset-0 rounded-xl ring-2 ring-transparent transition-all group-focus-within:ring-sage-500" />
    </div>
  );
}
