"use client";

import { useState, useEffect } from "react";
import { AnnouncerProvider } from "@/components/Announcer";
import { EmptyState } from "@/components/EmptyState";
import { StaggeredReveal } from "@/components/StaggeredReveal";
import { Filter, Plus, Search, Sparkles, Flower, Leaf } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

import {
  FloatingActionButton,
  PlantList,
  ScanBarcodeModal,
} from "./_components/posts";
import { AddPlantModal } from "../../AddPlantModal";
import { NuclearTestModal } from "./_components/NuclearTestModal";
import { EMERGENCY_BREAKING_CHANGE } from "./_components/EMERGENCY_BREAKING_CHANGE";
import { getPlants, Plant } from "@/lib/plant-service";

export default function GardenDashboard() {
  // Force rebuild with environment variable
  const forceRebuild = process.env.FORCE_REBUILD || "false";
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);

  const filters = [
    { id: "all", label: "All Plants", icon: Flower },
    { id: "growing", label: "Growing", icon: Leaf },
    { id: "flowering", label: "Flowering", icon: Sparkles },
    { id: "ready", label: "Ready to Harvest", icon: Plus },
  ];

  const handleAddFirstPlant = () => {
    setIsScanModalOpen(true);
  };

  const handleTrySample = () => {
    // TODO: Add sample plants
    console.log("Add sample plants");
  };

  const handleAddManually = () => {
    setIsAddModalOpen(true);
  };

  // Load plants from database
  const loadPlants = async () => {
    try {
      setLoading(true);

      // Use API endpoint instead of direct plant service
      const response = await fetch("/api/get-plants");
      if (!response.ok) {
        throw new Error("Failed to fetch plants");
      }

      const result = await response.json();
      if (result.success) {
        setPlants(result.plants);
      } else {
        throw new Error(result.error || "Failed to load plants");
      }
    } catch (error) {
      console.error("Failed to load plants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlants();
  }, []);

  // Filter plants based on search and filter
  const filteredPlants = plants.filter((plant) => {
    const matchesSearch =
      plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.type?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" || plant.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const hasPlants = plants.length > 0;

  // Calculate garden statistics
  const gardenStats = {
    total: plants.length,
    growing: plants.filter((p) => p.status === "Sprouting").length,
    flowering: plants.filter((p) => p.status === "Flowering").length,
    ready: plants.filter((p) => p.status === "Harvest Ready").length,
  };

  return (
    <AnnouncerProvider>
      <div className="min-h-screen bg-gradient-to-br from-earth-50 via-sage-50 to-earth-100 dark:from-earth-900 dark:via-sage-900 dark:to-earth-800 theme-transition">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
          {/* Header with Theme Toggle */}
          <StaggeredReveal>
            <div className="mb-8 flex items-center justify-between">
              <div className="text-center flex-1">
                <h1 className="text-earth-900 dark:text-earth-100 mb-2 text-4xl font-bold md:text-5xl theme-transition">
                  Digital Potting Shed
                </h1>
                <p className="text-earth-700 dark:text-earth-300 mb-4 text-lg theme-transition">
                  Your Garden Journal
                </p>
                <div className="from-sage-500 to-earth-500 mx-auto h-1 w-24 rounded-full bg-gradient-to-r dark:from-sage-400 dark:to-earth-400"></div>
              </div>
              <div className="ml-4">
                <ThemeToggle />
              </div>
            </div>
          </StaggeredReveal>

          {/* Garden Statistics */}
          {hasPlants && (
            <StaggeredReveal>
              <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-lg bg-white/80 dark:bg-gray-800/80 p-4 text-center backdrop-blur-sm theme-transition">
                  <div className="text-2xl font-bold text-sage-600 dark:text-sage-400">
                    {gardenStats.total}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-200">
                    Total Plants
                  </div>
                </div>
                <div className="rounded-lg bg-white/80 dark:bg-gray-800/80 p-4 text-center backdrop-blur-sm theme-transition">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {gardenStats.growing}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-200">
                    Growing
                  </div>
                </div>
                <div className="rounded-lg bg-white/80 dark:bg-gray-800/80 p-4 text-center backdrop-blur-sm theme-transition">
                  <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                    {gardenStats.flowering}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-200">
                    Flowering
                  </div>
                </div>
                <div className="rounded-lg bg-white/80 dark:bg-gray-800/80 p-4 text-center backdrop-blur-sm theme-transition">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {gardenStats.ready}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-200">
                    Ready
                  </div>
                </div>
              </div>
            </StaggeredReveal>
          )}

          {/* Search and Filter */}
          {hasPlants && (
            <StaggeredReveal>
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-earth-400 dark:text-earth-500" />
                  <input
                    type="text"
                    placeholder="Search plants..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 pl-10 pr-4 py-2 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-sage-500 dark:focus:border-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-500/20 dark:focus:ring-sage-400/20 theme-transition"
                  />
                </div>

                {/* Filter Buttons */}
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                  {filters.map((filter) => {
                    const Icon = filter.icon;
                    return (
                      <button
                        key={filter.id}
                        onClick={() => setSelectedFilter(filter.id)}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 theme-transition ${
                          selectedFilter === filter.id
                            ? "bg-sage-500 text-white shadow-md"
                            : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 hover:bg-sage-50 dark:hover:bg-gray-700/80"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {filter.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </StaggeredReveal>
          )}

          {/* Main Content */}
          <div className="space-y-6">
            {loading ? (
              <StaggeredReveal>
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage-500"></div>
                </div>
              </StaggeredReveal>
            ) : hasPlants ? (
              <StaggeredReveal>
                <PlantList plants={filteredPlants} />
              </StaggeredReveal>
            ) : (
              <StaggeredReveal>
                <EmptyState
                  onAddFirstPlant={handleAddFirstPlant}
                  onTrySample={handleTrySample}
                  onAddManually={handleAddManually}
                />
              </StaggeredReveal>
            )}
          </div>
        </div>

        {/* Floating Action Button */}
        {hasPlants && (
          <FloatingActionButton
            onScanSeedPacket={() => setIsScanModalOpen(true)}
            onScanBarcode={() => setIsBarcodeModalOpen(true)}
            onEnterManually={() => setIsAddModalOpen(true)}
          />
        )}

        {/* Modals */}
        <NuclearTestModal
          isOpen={isScanModalOpen}
          onClose={() => setIsScanModalOpen(false)}
        />
        <ScanBarcodeModal
          isOpen={isBarcodeModalOpen}
          onClose={() => setIsBarcodeModalOpen(false)}
        />
        <AddPlantModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
        <EMERGENCY_BREAKING_CHANGE />
      </div>
    </AnnouncerProvider>
  );
}
