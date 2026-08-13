"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MagnifyingGlassPlus, X } from "@phosphor-icons/react/ssr";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  // Handle mouse move for zoom magnifier
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  // Close zoom on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isZoomed) {
        setIsZoomed(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isZoomed]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main image with hover zoom */}
      <div
        ref={imageRef}
        className="relative aspect-square overflow-hidden rounded-2xl bg-background-secondary cursor-zoom-in group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          key={active}
          src={images[active]}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover animate-fade-in transition-transform duration-300"
          style={
            isZoomed
              ? {
                  transform: "scale(2)",
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }
              : {}
          }
        />

        {/* Zoom indicator */}
        {!isZoomed && (
          <div className="absolute top-4 right-4 flex items-center gap-2 rounded-lg bg-card/90 backdrop-blur-sm px-3 py-2 text-xs font-semibold text-foreground shadow-lg border border-border opacity-0 group-hover:opacity-100 transition-opacity">
            <MagnifyingGlassPlus className="h-4 w-4" />
            Hover to zoom
          </div>
        )}

        {/* Zoomed overlay indicator */}
        {isZoomed && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 right-4 rounded-lg bg-primary text-primary-foreground px-3 py-2 text-xs font-bold shadow-lg">
              2x ZOOM
            </div>
          </div>
        )}
      </div>

      {/* Thumbnail navigation */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((image, idx) => (
          <button
            key={image}
            onClick={() => setActive(idx)}
            className={cn(
              "relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 sm:w-24",
              active === idx
                ? "border-primary ring-2 ring-primary/20"
                : "border-border hover:border-primary/50"
            )}
            aria-label={`View image ${idx + 1}`}
          >
            <Image src={image} alt="" fill sizes="96px" className="object-cover" />
            {active === idx && (
              <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
            )}
          </button>
        ))}
      </div>

      {/* Image count indicator */}
      <div className="flex items-center justify-center gap-2">
        <span className="text-xs text-foreground-secondary">
          {active + 1} / {images.length}
        </span>
      </div>
    </div>
  );
}
