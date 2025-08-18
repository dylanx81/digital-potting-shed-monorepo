"use client";

import { useRef, useEffect } from "react";
import PlantCard from "./PlantCard";

interface Plant {
  id: string;
  name: string;
  imageUrl: string;
  status: "draft" | "active";
  hasAlert: boolean;
}

interface PlantGridProps {
  plants: Plant[];
}

export default function PlantGrid({ plants }: PlantGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Add staggered fade-in animation with prefers-reduced-motion support
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !gridRef.current) return;
    
    const cards = gridRef.current.querySelectorAll(".plant-card");
    cards.forEach((card, index) => {
      const element = card as HTMLElement;
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      
      setTimeout(() => {
        element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }, 100 + index * 100); // Staggered delay
    });
  }, [plants]);

  if (plants.length === 0) {
    return (
      <div className="text-center py-12 bg-white/50 rounded-lg border border-green-100">
        <p className="text-green-700">No plants in your garden yet. Start planting!</p>
      </div>
    );
  }

  return (
    <section aria-label="Active plants">
      <div 
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {plants.map((plant, index) => (
          <div 
            key={plant.id} 
            className={`plant-card ${
              // Create masonry effect by adjusting height on some cards
              index % 3 === 0 ? "md:col-span-1 md:row-span-1" : 
              index % 5 === 0 ? "md:col-span-1 md:row-span-2" : ""
            }`}
          >
            <PlantCard plant={plant} />
          </div>
        ))}
      </div>
    </section>
  );
}
