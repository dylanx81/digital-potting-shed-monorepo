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
                ),
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
  const statusColors = {
    Sprouting: "bg-yellow-100 text-yellow-800",
    Flowering: "bg-pink-100 text-pink-800",
    Fruiting: "bg-orange-100 text-orange-800",
    "Harvest Ready": "bg-green-100 text-green-800",
    Dormant: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
      {/* Photo placeholder */}
      <div className="mb-4 flex h-32 w-full items-center justify-center rounded-md bg-gradient-to-br from-green-100 to-green-200">
        <span className="text-sm text-green-600">📸 Plant Photo</span>
      </div>

      {/* Plant info */}
      <div className="mb-4">
        <h3 className="mb-1 text-xl font-semibold text-gray-900">
          {plant.name}
        </h3>
        <p className="mb-2 text-sm text-gray-600">{plant.type}</p>

        <div className="mb-3 flex items-center justify-between">
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium",
              statusColors[plant.status || 'Sprouting'],
            )}
          >
            {plant.status || 'Sprouting'}
          </span>
          <span className="text-xs text-gray-500">{plant.source || 'Seed'}</span>
        </div>

        <div className="space-y-1 text-sm text-gray-600">
          <div>📍 {plant.location || 'Garden'}</div>
          <div>🌱 Days since planting: {plant.planting_date ? Math.floor((new Date().getTime() - new Date(plant.planting_date).getTime()) / (1000 * 60 * 60 * 24)) : 0}</div>
          <div>
            💧 Last watered: {plant.last_watered ? new Date(plant.last_watered).toLocaleDateString() : 'Never'}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <button
          onClick={onWaterClick}
          className="flex flex-1 items-center justify-center gap-1 rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-700 transition-colors hover:bg-blue-100"
        >
          <Droplets className="h-4 w-4" />
          Water
        </button>
        <button
          onClick={onJournalClick}
          className="flex flex-1 items-center justify-center gap-1 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-700 transition-colors hover:bg-amber-100"
        >
          <BookOpen className="h-4 w-4" />
          Journal
        </button>
        <button
          onClick={onHarvestClick}
          className="flex flex-1 items-center justify-center gap-1 rounded-md bg-green-50 px-3 py-2 text-sm text-green-700 transition-colors hover:bg-green-100"
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
