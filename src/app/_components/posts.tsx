"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plant } from "@/lib/plant-service";

import {
  Barcode,
  BookOpen,
  Camera,
  Droplets,
  Keyboard,
  Plus,
  Scissors,
  X,
  Upload,
  FileImage,
} from "lucide-react";

interface JournalEntry {
  id: string;
  plantId: string;
  date: string;
  note: string;
  imageUrl?: string;
}

export function AddPlantModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [plantName, setPlantName] = useState("");
  const [plantType, setPlantType] = useState("");
  const [plantingDate, setPlantingDate] = useState("");
  const [source, setSource] = useState<
    "Seed" | "Seedling" | "Established Plant"
  >("Seed");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add plant to local storage
    console.log("Adding plant:", {
      name: plantName,
      type: plantType,
      plantingDate,
      source,
      location,
    });
    setPlantName("");
    setPlantType("");
    setPlantingDate("");
    setSource("Seed");
    setLocation("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Add New Plant</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Plant Name
            </label>
            <input
              type="text"
              value={plantName}
              onChange={(e) => setPlantName(e.target.value)}
              placeholder="e.g., Cherry Tomatoes"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Plant Type
            </label>
            <input
              type="text"
              value={plantType}
              onChange={(e) => setPlantType(e.target.value)}
              placeholder="e.g., Tomato, Basil"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Planting Date
            </label>
            <input
              type="date"
              value={plantingDate}
              onChange={(e) => setPlantingDate(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Source
            </label>
            <div className="space-y-2">
              {(["Seed", "Seedling", "Established Plant"] as const).map(
                (option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="source"
                      value={option}
                      checked={source === option}
                      onChange={(e) => setSource(e.target.value as any)}
                      className="mr-2"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                )
              )}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Backyard Plot 2, Kitchen Window"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Add Plant
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function JournalEntryModal({
  isOpen,
  onClose,
  plantName,
}: {
  isOpen: boolean;
  onClose: () => void;
  plantName: string;
}) {
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add journal entry to local storage
    console.log("Adding journal entry:", { note });
    setNote("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Journal Entry - {plantName}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="How is your plant doing today?"
              rows={4}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Save Entry
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function FloatingActionButton({
  onScanSeedPacket,
  onScanBarcode,
  onEnterManually,
}: {
  onScanSeedPacket: () => void;
  onScanBarcode: () => void;
  onEnterManually: () => void;
}) {
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
      action: onScanSeedPacket,
      color: "from-blue-400 to-indigo-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Barcode,
      label: "Scan Barcode",
      action: onScanBarcode,
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      icon: Keyboard,
      label: "Enter Manually",
      action: onEnterManually,
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
                  "flex items-center gap-3 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-3 text-gray-900 dark:text-gray-100 shadow-xl border border-gray-200 dark:border-gray-700",
                  "transition-all duration-300 hover:scale-105 hover:shadow-2xl",
                  "transform opacity-0",
                  "theme-transition"
                )}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "forwards",
                  animation: "fadeInUp 0.3s ease-out forwards",
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
                  className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-[-1] transition-opacity duration-300"
                  style={{ animation: "fade-in 0.3s ease-out" }}
                  onClick={() => setIsMenuOpen(false)}
                />
              )}
    </div>
  );
}

export function PlantList({ plants }: { plants: Plant[] }) {
  const [isJournalModalOpen, setIsJournalModalOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  const handleJournalClick = (plant: Plant) => {
    setSelectedPlant(plant);
    setIsJournalModalOpen(true);
  };

  const handleWaterPlant = (plantId: string) => {
    // TODO: Update last watered date in local storage
    console.log("Watering plant:", plantId);
  };

  const handleLogHarvest = (plantId: string) => {
    // TODO: Log harvest in local storage
    console.log("Logging harvest for plant:", plantId);
  };

  if (plants.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <Plus className="h-8 w-8 text-gray-400" />
        </div>
        <p className="mb-4 text-gray-500">
          No plants yet. Add your first plant!
        </p>
        <Button
          onClick={() =>
            console.log("Add plant clicked - handled by main page")
          }
          className="bg-green-600 hover:bg-green-700"
        >
          Add Your First Plant
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plants.map((plant) => (
          <PlantCard
            key={plant.id}
            plant={plant}
            onJournalClick={() => handleJournalClick(plant)}
            onWaterClick={() => handleWaterPlant(plant.id)}
            onHarvestClick={() => handleLogHarvest(plant.id)}
          />
        ))}
      </div>

      {/* FloatingActionButton moved to main page */}

      <JournalEntryModal
        isOpen={isJournalModalOpen}
        onClose={() => setIsJournalModalOpen(false)}
        plantName={selectedPlant?.name || ""}
      />
    </>
  );
}

export function PlantCard({
  plant,
  onJournalClick,
  onWaterClick,
  onHarvestClick,
}: {
  plant: Plant;
  onJournalClick: () => void;
  onWaterClick: () => void;
  onHarvestClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const statusConfig = {
    Sprouting: {
      color:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      accent: "from-yellow-400 to-orange-500",
    },
    Flowering: {
      color: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
      accent: "from-pink-400 to-rose-500",
    },
    Fruiting: {
      color:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      accent: "from-orange-400 to-red-500",
    },
    "Harvest Ready": {
      color:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      accent: "from-green-400 to-emerald-500",
    },
    Dormant: {
      color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
      accent: "from-gray-400 to-slate-500",
    },
  };

  const status = plant.status || "Sprouting";
  const config = statusConfig[status];

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 shadow-lg",
        "transition-all duration-300 hover:scale-105 hover:shadow-2xl",
        "theme-transition"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Photo placeholder with enhanced styling */}
      <div className="mb-6 overflow-hidden rounded-lg">
        <div
          className={cn(
            "flex h-40 w-full items-center justify-center bg-gradient-to-br transition-transform duration-300",
            "from-green-100 via-emerald-100 to-green-200 dark:from-green-900/50 dark:via-emerald-900/50 dark:to-green-800/50",
            isHovered && "scale-110"
          )}
        >
          <div className="text-center">
            <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 p-3 shadow-lg">
              <span className="text-xl">🌱</span>
            </div>
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              Plant Photo
            </span>
          </div>
        </div>
      </div>

      {/* Plant info with enhanced styling */}
      <div className="mb-6">
        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100 theme-transition">
          {plant.name}
        </h3>
        <p className="mb-3 text-sm font-medium text-gray-600 dark:text-gray-300 theme-transition">
          {plant.type}
        </p>

        <div className="mb-4 flex items-center justify-between">
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold shadow-sm",
              config.color
            )}
          >
            {status}
          </span>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 theme-transition">
              {plant.source || "Seed"}
            </span>
        </div>

                  <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 theme-transition">
              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-sage-400 to-green-500"></div>
              📍 {plant.location || "Garden"}
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 theme-transition">
              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
              🌱{" "}
              {plant.planting_date
                ? Math.floor(
                    (new Date().getTime() -
                      new Date(plant.planting_date).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )
                : 0}{" "}
              days
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 theme-transition">
              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>
              💧{" "}
              {plant.last_watered
                ? new Date(plant.last_watered).toLocaleDateString()
                : "Never"}
            </div>
          </div>
      </div>

      {/* Progress indicator */}
      <div className="mb-6">
                  <div className="mb-2 flex items-center justify-between text-xs font-medium text-gray-600 dark:text-gray-400">
            <span>Growth Progress</span>
            <span>
              {Math.min(
                100,
                Math.floor(
                  ((new Date().getTime() -
                    new Date(plant.planting_date || new Date()).getTime()) /
                    (1000 * 60 * 60 * 24 * 30)) *
                    100
                )
              )}
              %
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className={cn(
              "h-full rounded-full bg-gradient-to-r transition-all duration-500",
              config.accent
            )}
            style={{
              width: `${Math.min(
                100,
                Math.floor(
                  ((new Date().getTime() -
                    new Date(plant.planting_date || new Date()).getTime()) /
                    (1000 * 60 * 60 * 24 * 30)) *
                    100
                )
              )}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Enhanced action buttons */}
      <div className="flex gap-3">
        <button
          onClick={onWaterClick}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg hover:from-blue-600 hover:to-indigo-700"
        >
          <Droplets className="h-4 w-4" />
          Water
        </button>
        <button
          onClick={onJournalClick}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg hover:from-amber-600 hover:to-orange-700"
        >
          <BookOpen className="h-4 w-4" />
          Journal
        </button>
        <button
          onClick={onHarvestClick}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg hover:from-green-600 hover:to-emerald-700"
        >
          <Scissors className="h-4 w-4" />
          Harvest
        </button>
      </div>
    </div>
  );
}

export function ScanBarcodeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
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
      <div className="w-full max-w-md rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Scan Barcode</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5 text-gray-900 dark:text-gray-100" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex aspect-video items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
            {isScanning ? (
              <div className="text-center">
                <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-2 border-green-600 border-t-transparent"></div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Scanning barcode...</p>
              </div>
            ) : (
              <div className="text-center">
                <Barcode className="mx-auto mb-2 h-12 w-12 text-gray-400 dark:text-gray-500" />
                <p className="text-sm text-gray-600 dark:text-gray-300">
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

          <div className="rounded-lg bg-green-50 dark:bg-green-900/30 p-3">
            <h3 className="mb-1 text-sm font-medium text-green-800 dark:text-green-300">
              📱 Barcode scanning:
            </h3>
            <ul className="space-y-1 text-xs text-green-700 dark:text-green-400">
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
