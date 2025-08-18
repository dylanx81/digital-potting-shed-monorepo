"use client";

import { useState, useEffect } from "react";
import { AnnouncerProvider } from "@/components/Announcer";
import { EmptyState } from "@/components/EmptyState";
import { StaggeredReveal } from "@/components/StaggeredReveal";
import { Filter, Plus, Search } from "lucide-react";

import {
  AddPlantModal,
  FloatingActionButton,
  PlantList,
  ScanBarcodeModal,
} from "./_components/posts";
import { NuclearTestModal } from "./_components/NuclearTestModal";
import { EMERGENCY_BREAKING_CHANGE } from "./_components/EMERGENCY_BREAKING_CHANGE";
import { getPlants, Plant } from "@/lib/plant-service";

export default function GardenDashboard() {
  // Force rebuild with environment variable
  const forceRebuild = process.env.FORCE_REBUILD || 'false';
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);

  const filters = [
    { id: "all", label: "All Plants" },
    { id: "growing", label: "Growing" },
    { id: "flowering", label: "Flowering" },
    { id: "ready", label: "Ready to Harvest" },
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
      const response = await fetch('/api/get-plants');
      if (!response.ok) {
        throw new Error('Failed to fetch plants');
      }
      
      const result = await response.json();
      if (result.success) {
        setPlants(result.plants);
      } else {
        throw new Error(result.error || 'Failed to load plants');
      }
    } catch (error) {
      console.error('Failed to load plants:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlants();
  }, []);

  // Filter plants based on search and filter
  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plant.type?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || plant.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const hasPlants = plants.length > 0;

  return (
    <AnnouncerProvider>
      <div className="from-earth-50 via-sage-50 to-earth-100 min-h-screen bg-gradient-to-br">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
          {/* Header */}
          <StaggeredReveal>
            <div className="mb-8 text-center">
              <h1 className="text-earth-900 mb-2 text-4xl font-bold md:text-5xl">
                Digital Potting Shed
              </h1>
              <p className="text-earth-700 mb-4 text-lg">Your Garden Journal</p>
              <div className="from-sage-500 to-earth-500 mx-auto h-1 w-24 rounded-full bg-gradient-to-r"></div>
            </div>
          </StaggeredReveal>

          {/* Search and Filters */}
          <StaggeredReveal delay={100}>
            <div className="mb-6 space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="text-earth-400 absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search your plants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-earth-200 text-earth-900 placeholder-earth-500 focus:border-sage-500 focus:ring-sage-500 w-full rounded-lg border bg-white/80 px-10 py-3 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                />
              </div>

              {/* Filter chips */}
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      selectedFilter === filter.id
                        ? "bg-sage-600 text-white"
                        : "text-earth-700 hover:bg-sage-50 border-earth-200 border bg-white/80"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </StaggeredReveal>

          {/* Garden Stats */}
          <StaggeredReveal delay={200}>
            <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="border-earth-200 rounded-lg border bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                <h3 className="text-earth-700 text-xs font-medium uppercase tracking-wide">
                  Total Plants
                </h3>
                <p className="text-earth-900 text-2xl font-bold">{plants.length}</p>
              </div>
              <div className="border-sage-200 rounded-lg border bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                <h3 className="text-sage-700 text-xs font-medium uppercase tracking-wide">
                  Growing
                </h3>
                <p className="text-sage-900 text-2xl font-bold">{plants.filter(p => p.status === 'Sprouting').length}</p>
              </div>
              <div className="rounded-lg border border-rose-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                <h3 className="text-xs font-medium uppercase tracking-wide text-rose-700">
                  Flowering
                </h3>
                <p className="text-2xl font-bold text-rose-900">{plants.filter(p => p.status === 'Flowering').length}</p>
              </div>
              <div className="rounded-lg border border-amber-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
                <h3 className="text-xs font-medium uppercase tracking-wide text-amber-700">
                  Ready to Harvest
                </h3>
                <p className="text-2xl font-bold text-amber-900">{plants.filter(p => p.status === 'Harvest Ready').length}</p>
              </div>
            </div>
          </StaggeredReveal>

          {/* Main Content */}
          <StaggeredReveal delay={300}>
            <div className="border-earth-200 rounded-xl border bg-white/90 p-6 shadow-lg backdrop-blur-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-earth-900 text-2xl font-semibold">
                  My Garden
                </h2>
                <div className="text-earth-600 text-sm">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sage-100">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-sage-600 border-t-transparent"></div>
                  </div>
                  <p className="text-sage-700">Loading your garden...</p>
                </div>
              ) : hasPlants ? (
                <PlantList plants={filteredPlants} />
              ) : (
                <EmptyState
                  onAddFirstPlant={handleAddFirstPlant}
                  onTrySample={handleTrySample}
                  onAddManually={handleAddManually}
                />
              )}
            </div>
          </StaggeredReveal>

          {/* Floating Action Button */}
          {hasPlants && (
            <FloatingActionButton
              onScanSeedPacket={() => setIsScanModalOpen(true)}
              onScanBarcode={() => setIsBarcodeModalOpen(true)}
              onEnterManually={() => setIsAddModalOpen(true)}
            />
          )}

          {/* Footer */}
          <StaggeredReveal delay={400}>
            <div className="text-earth-600 mt-8 text-center text-sm">
              <p>🌱 Growing together, one plant at a time - OCR Ready!</p>
            </div>
          </StaggeredReveal>
        </div>
      </div>

      {/* Modals */}
      <AddPlantModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

              <NuclearTestModal
          isOpen={isScanModalOpen}
          onClose={() => {
            setIsScanModalOpen(false);
            loadPlants(); // Refresh plants after closing modal
          }}
        />

      <ScanBarcodeModal
        isOpen={isBarcodeModalOpen}
        onClose={() => setIsBarcodeModalOpen(false)}
      />
    </AnnouncerProvider>
  );
}
