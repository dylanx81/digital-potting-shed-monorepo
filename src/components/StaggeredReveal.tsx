"use client";

import { useEffect, useRef, useState } from "react";

interface StaggeredRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}

export function StaggeredReveal({ 
  children, 
  className = "", 
  delay = 0,
  threshold = 0.1 
}: StaggeredRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check if device has low memory or large lists
    const isLowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
    const hasManyElements = document.querySelectorAll('.stagger-reveal').length > 20;
    
    if (isLowMemory || hasManyElements) {
      // Auto-reveal for performance
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add delay for staggered effect
            setTimeout(() => {
              setIsRevealed(true);
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: "50px",
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [delay, threshold]);

  return (
    <div
      ref={elementRef}
      className={`stagger-reveal ${isRevealed ? "revealed" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function StaggeredContainer({ 
  children, 
  className = "",
  staggerDelay = 50 
}: { 
  children: React.ReactNode; 
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <StaggeredReveal key={index} delay={index * staggerDelay}>
          {child}
        </StaggeredReveal>
      ))}
    </div>
  );
}
