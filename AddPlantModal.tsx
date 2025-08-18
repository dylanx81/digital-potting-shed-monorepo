"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface AddPlantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddPlantModal({
  isOpen,
  onClose,
}: AddPlantModalProps) {
  const [plantName, setPlantName] = useState("");
  const [plantType, setPlantType] = useState("");
  const [plantingDate, setPlantingDate] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add plant to database
    console.log("Adding plant:", {
      name: plantName,
      type: plantType,
      plantingDate,
      location,
    });
    setPlantName("");
    setPlantType("");
    setPlantingDate("");
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
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Backyard Plot 2"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none"
              required
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
              Add Plant
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
