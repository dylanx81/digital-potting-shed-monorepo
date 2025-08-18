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

interface DraftsShelfProps {
  plants: Plant[];
}

export default function DraftsShelf({ plants }: DraftsShelfProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Add fade-in animation with prefers-reduced-motion support
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const container = scrollContainerRef.current;
    
    if (container && !prefersReducedMotion) {
      container.style.opacity = "0";
      container.style.transform = "translateY(10px)";
      
      setTimeout(() => {
        container.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        container.style.opacity = "1";
        container.style.transform = "translateY(0)";
      }, 100);
    }
  }, []);

  if (plants.length === 0) return null;

  return (
    <section 
      ref={scrollContainerRef}
      className="mb-10 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 border border-amber-100 shadow-sm"
      aria-labelledby="drafts-heading"
    >
      <h2 
        id="drafts-heading" 
        className="text-xl md:text-2xl font-semibold text-amber-800 mb-4 flex items-center"
      >
        <span className="inline-block w-3 h-3 bg-amber-400 rounded-full mr-2"></span>
        Drafts
      </h2>
      
      <div className="relative">
        <div className="overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-4 min-w-max">
            {plants.map((plant) => (
              <div key={plant.id} className="w-64 flex-shrink-0">
                <PlantCard plant={plant} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Scroll indicators */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-amber-50 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-yellow-50 to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
}
